import { getEjercicios } from "@/services/ejercicios/ejercicios";
import { useQuery } from "@tanstack/react-query";

export const useQueryEjercicios = () => {
  const queryEjercicios = useQuery({
    queryKey: ["ejercicios"],
    queryFn: getEjercicios,
  });
  return { queryEjercicios };
};
