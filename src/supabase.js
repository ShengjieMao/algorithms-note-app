import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iefudbgadqqtjnseqkrv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZnVkYmdhZHFxdGpuc2Vxa3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI5MzQ4MDUsImV4cCI6MTk5ODUxMDgwNX0.Z7JTUm2XO63f7o0tC3bPwCqUHCuK_Dv91Nkow0uLQwg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
