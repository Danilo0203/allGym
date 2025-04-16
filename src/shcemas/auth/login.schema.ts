import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "El correo es requerido",
      invalid_type_error: "El correo no es valido",
    })
    .email({
      message: "El correo no es valido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "Minimo 6 caracteres",
    }),
});

export type LoginTypeSchema = z.infer<typeof LoginSchema>;
