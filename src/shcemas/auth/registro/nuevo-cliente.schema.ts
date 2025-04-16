import { z } from "zod";

export const NuevoClienteSchema = z.object({
  nombre: z
    .string({ required_error: "Campo requerido", invalid_type_error: "El nombre debe ser un texto" })
    .min(1, { message: "Campo requerido" }),
  telefono: z
    .number({ required_error: "Campo requerido", invalid_type_error: "Debe ser un número" })
    .refine((val) => val.toString().length === 8, {
      message: "Debe tener exactamente 8 dígitos",
    }),
  fechaNacimiento: z.date({
    required_error: "Campo requerido",
    invalid_type_error: "La fecha de nacimiento debe ser una fecha",
  }),
  sexo: z.enum(["m", "f"], {
    required_error: "Campo requerido",
    invalid_type_error: "El sexo debe ser Masculino o Femenino",
  }),
  estatura: z.number({ required_error: "Campo requerido", invalid_type_error: "La estatura debe ser un número" }),
  peso: z.number({ required_error: "Campo requerido", invalid_type_error: "El peso debe ser un número" }),
  tipoCuerpo: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "El tipo de cuerpo debe ser Ectomorfo, Mesomorfo o Endomorfo",
  }),
  inscripcion: z.date({
    required_error: "Campo requerido",
    invalid_type_error: "La fecha de inscripción debe ser una fecha",
  }),
  plan: z.string({
    required_error: "Campo requerido",
    invalid_type_error: "El plan debe ser Mensual, Trimestral, Semestral o Anual",
  }),
  valor: z.number({ required_error: "Campo requerido", invalid_type_error: "El valor debe ser un número" }),
  fechaInicio: z.date({
    required_error: "Campo requerido",
    invalid_type_error: "La fecha de inicio debe ser una fecha",
  }),
  imagenPerfil: z.instanceof(File).optional(),
});

export type nuevoClienteType = z.infer<typeof NuevoClienteSchema>;
