import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  //   const queryClient = useQueryClient();
  //   const navigate = useNavigate();

  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { isLoading, signup };
}
