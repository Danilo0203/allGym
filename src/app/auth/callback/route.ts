// src/app/auth/callback/route.ts

import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Sesión creada exitosamente, redirigir al destino
      redirect(next);
    }

    console.error("Error al intercambiar el código:", error.message);
  }

  // Si hay error o no hay código, redirigir a error
  redirect("/error");
}
