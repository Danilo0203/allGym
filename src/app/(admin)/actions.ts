"use server";
import { nuevoClienteType } from "@/shcemas/auth/registro/nuevo-cliente.schema";
import { supabaseAdmin } from "@/utils/supabase/admin";

export async function newClient(formData: nuevoClienteType) {
  const supabase = supabaseAdmin;
  console.log(formData);
  const { data, error } = await supabase.auth.admin.createUser({
    phone: formData.telefono.toString(),
    password: "gym@2025",
    user_metadata: {
      display_name: formData.nombre,
    },
  });
  if (data?.user?.id) {
    const userID = data.user.id;
    await supabase.from("usuarios").insert({
      userID,
      fechaNacimiento: formData.fechaNacimiento,
      sexo: formData.sexo,
      estatura: formData.estatura,
      peso: formData.peso,
      tipoCuerpo: formData.tipoCuerpo,
      inscripcion: formData.inscripcion,
      plan: formData.plan,
      valor: formData.valor,
      fechaInicio: formData.fechaInicio,
    });
  }
  if (error) {
    console.error("Error de Supabase Auth:", error); // <-- añade esto
    return error;
  }
}
