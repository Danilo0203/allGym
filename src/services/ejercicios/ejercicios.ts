import { api } from "../axios.config";

interface Ejercicio {
  id: number;
  name: string;
  gifUrl: string;
}

export const getEjercicios = async (): Promise<Ejercicio[]> => {
  const res = await api.get<Ejercicio[]>("/exercises");
  // Retornar solo los campos necesarios
  return res.data.map((ejercicio: Ejercicio) => ({
    id: ejercicio.id,
    name: ejercicio.name,
    gifUrl: ejercicio.gifUrl,
  }));
};
