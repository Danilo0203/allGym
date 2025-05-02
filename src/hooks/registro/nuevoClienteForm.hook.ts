import { newClient } from "@/app/(admin)/actions";
import { NuevoClienteSchema, nuevoClienteType } from "@/shcemas/auth/registro/nuevo-cliente.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useNuevoClienteForm = (onSuccess?: () => void) => {
  const date = new Date();

  const form = useForm<nuevoClienteType>({
    resolver: zodResolver(NuevoClienteSchema),
    defaultValues: {
      nombre: "",
      telefono: undefined, // Valor numérico por defecto
      fechaNacimiento: undefined,
      sexo: undefined,
      estatura: undefined, // Valor numérico por defecto
      peso: undefined, // Valor numérico por defecto
      tipoCuerpo: undefined, // Seleccionar un valor por defecto válido del enum
      inscripcion: date,
      plan: undefined, // Valor válido del enum
      valor: undefined, // Valor numérico por defecto
      fechaInicio: date,
      descuento: 0, // Valor numérico por defecto
      total: undefined, // Valor numérico por defecto
      diasPorSemana: undefined, // Valor numérico por defecto
    },
    mode: "onChange",
  });
  const onSumbit = async (data: nuevoClienteType) => {
    const error = await newClient(data);
    if (error) {
      if (error.message.includes("Phone number already registered by another user")) {
        toast.error("El número de teléfono ya está registrado por otro usuario", {
          position: "top-right",
        });
      } else {
        toast.success("Cliente creado correctamente", {
          position: "top-right",
        });
        form.reset();
        if (onSuccess) onSuccess();
      }
    }
  };
  return { form, onSumbit, reset: form.reset };
};
