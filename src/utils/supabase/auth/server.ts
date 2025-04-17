"use server";
import { createClient } from "@/utils/supabase/server";
export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.error("Error al obtener el usuario:", error?.message);
    return null;
  }

  return data.user;
}
