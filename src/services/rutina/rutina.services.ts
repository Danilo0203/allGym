import axios from "axios";
interface RutinaParams {
  diasEntrenamiento: number;
  tipoCuerpo: string;
}

export interface RutinaTypes {
  rutina: Rutina[];
}

export interface Rutina {
  dia: string;
  bloques: Bloque[];
}

export interface Bloque {
  bloque: number;
  grupo: string;
  ejercicio: string;
  series: number;
  repeticiones: number;
}

export const rutinaPost = async (body: RutinaParams): Promise<RutinaTypes> => {
  const res = await axios.post<RutinaTypes>("/api/rutina", body);
  console.log(res.data);
  return res.data;
};
