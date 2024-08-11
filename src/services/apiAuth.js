import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUserData({ fullName, avatar, password }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  // 2. Upload avatar
  if (!avatar) return data;

  const avatarName = `avatar-${data.user.id}-${Math.random()}`;

  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (storageError) {
    throw new Error("Avatar could not be uploaded");
  }

  // 3. Add the avatar to the user
  const { updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: { avatar: avatarPath },
    });

  if (updateUserError) {
    throw new Error(updateUserError.message);
  }

  return updatedUser;
}
