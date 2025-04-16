import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string({
        required_error: "El correo es requerido",
        invalid_type_error: "El correo no es valido",
      })
      .email({
        message: "El correo no es valido",
      }),
    name: z
      .string({
        required_error: "El nombre de usuario es requerido",
      })
      .min(3, {
        message: "Minimo 3 caracteres",
      }),
    password: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(6, {
        message: "Minimo 6 caracteres",
      }),
    passwordConfirmation: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(6, {
        message: "Minimo 6 caracteres",
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Las contraseñas no coinciden",
  });

export type RegisterTypeSchema = z.infer<typeof RegisterSchema>;
