import { NuevoClienteSchema, nuevoClienteType } from "@/shcemas/auth/registro/nuevo-cliente.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useNuevoClienteForm = () => {
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
    },
    mode: "onChange",
  });
  const onSumbit = async (data: nuevoClienteType) => {
    console.log("data", data);
    // Aquí puedes manejar el envío del formulario, como enviar los datos a una API o realizar alguna acción
    // Por ejemplo, puedes hacer una llamada a una función de registro de cliente
    // await registerClient(data);
    // console.log("Cliente registrado:", data);
  };
  return { form, onSumbit, reset: form.reset };
};
