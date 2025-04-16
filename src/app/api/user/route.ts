// app/api/user/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
  // Crea el cliente de Supabase a partir de la request (se encarga de leer las cookies)
  const supabase = createServerSupabaseClient({ cookies: request.cookies });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: error?.message || "Usuario no autenticado" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
