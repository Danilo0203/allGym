import { register } from "@/app/(auth)/actions";
import { RegisterSchema, RegisterTypeSchema } from "@/shcemas/auth/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useFormRegister = () => {
  const form = useForm<RegisterTypeSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterTypeSchema) => {
    await register(data);
  };

  return { form, onSubmit };
};
