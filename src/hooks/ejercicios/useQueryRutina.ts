"use client";
import { rutinaPost } from "@/services/rutina/rutina.services";
import { useQuery } from "@tanstack/react-query";
interface RutinaParams {
  diasEntrenamiento: number;
  tipoCuerpo: string;
}

export function useRutina(body: RutinaParams) {
  return useQuery({
    queryKey: ["rutina", body.diasEntrenamiento, body.tipoCuerpo],
    queryFn: () => rutinaPost(body),
    enabled: !!body.diasEntrenamiento && !!body.tipoCuerpo,
  });
}
