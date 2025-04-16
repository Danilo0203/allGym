import { login } from "@/app/(auth)/actions";
import { LoginSchema, LoginTypeSchema } from "@/shcemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useFormLogin = () => {
  const form = useForm<LoginTypeSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const onSubmit = async (data: LoginTypeSchema) => {
    const res = await login(data);
    if (res.error) {
      setErrorMessage(res.error);
      return;
    }
  };
  return {
    form,
    onSubmit,
    errorMessage,
  };
};
