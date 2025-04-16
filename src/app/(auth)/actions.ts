"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LoginTypeSchema } from "@/shcemas/auth/login.schema";
import { RegisterTypeSchema } from "@/shcemas/auth/register.schema";

export async function login(formData: LoginTypeSchema) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(formData);
  if (error && error.code === "invalid_credentials") {
    return {
      error: "Credenciales inválidas",
    };
  } else if (error && error.code === "email_not_confirmed") {
    return {
      error: "Confima tu correo electrónico",
    };
  }

  if (error) {
    return {
      error: "Error al iniciar sesión",
    };
  }

  revalidatePath("/", "layout");
  redirect("/panel");
}

export async function register(formData: RegisterTypeSchema) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        display_name: formData.name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/admin`,
    },
  });

  if (error) {
    redirect("/error");
  }

  redirect(`/verify-email?email=${encodeURIComponent(formData.email)}`);
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/login", "layout");
  redirect("/login");
}
