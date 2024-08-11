import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gnxgzotewzgrirpfruin.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueGd6b3Rld3pncmlycGZydWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyNjE4NDUsImV4cCI6MjAzNTgzNzg0NX0.Du_th7j_RgaieBVvSlV3-7vHES4H1hAHX4qhMbuwzfI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
