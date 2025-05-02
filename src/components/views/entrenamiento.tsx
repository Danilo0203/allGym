// import { useQueryEjercicios } from "@/hooks/ejercicios/useQueryEjercicios";
import { useQueryEjercicios } from "@/hooks/ejercicios/useQueryEjercicios";
import { useRutina } from "@/hooks/ejercicios/useQueryRutina";
import { diccionarioEjercicios } from "@/lib/diccionario";

interface Ejercicio {
  id: number;
  name: string;
  gifUrl: string;
}

export const Entrenamiento = () => {
  const { queryEjercicios } = useQueryEjercicios();
  const ejerciciosExternos = queryEjercicios.data;
  console.log(ejerciciosExternos);
  const { data, isLoading, error } = useRutina({ diasEntrenamiento: 4, tipoCuerpo: "ENDOMORFO".toLocaleLowerCase() });
  const rutina = data?.rutina;
  if (isLoading) return <p>Cargando rutina...</p>;
  if (error) return <p>Error al cargar rutina</p>;
  const gifIndex: Record<string, string> = {};
  ejerciciosExternos?.forEach((ejercicio: Ejercicio) => {
    gifIndex[ejercicio.name.toLowerCase()] = ejercicio.gifUrl;
  });
  return (
    <div>
      <div className="space-y-4">
        {rutina?.map((dia) => (
          <div key={dia.dia} className="p-4 border rounded-xl bg-accent">
            <h2 className="text-xl font-bold capitalize">{dia.dia}</h2>
            {dia.bloques.map((bloque) => {
              const nombreEjercicio = bloque.ejercicio.trim();
              const nombreIngles = diccionarioEjercicios[nombreEjercicio];

              if (!nombreIngles) {
                console.warn("No se encontró traducción en diccionario para:", nombreEjercicio);
              }

              const gifUrl = nombreIngles
                ? gifIndex[nombreIngles.trim().toLowerCase()]
                : null;

              if (nombreIngles && !gifUrl) {
                console.warn("No se encontró gif para:", nombreIngles);
              }

              return (
                <div key={bloque.bloque}>
                  <h3 className="text-lg font-semibold mt-2">{bloque.bloque}</h3>
                  <p>{bloque.grupo}</p>
                  <p>{nombreEjercicio}</p>
                  <p>{bloque.series}</p>
                  <p>{bloque.repeticiones}</p>
                  {gifUrl ? <img src={gifUrl} alt={nombreEjercicio} /> : <p>GIF no disponible</p>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* <h1>Entrenamiento</h1>
      {queryEjercicios.isLoading ? (
        <p>Cargando...</p>
      ) : queryEjercicios.isError ? (
        <p>Error: {queryEjercicios.error.message}</p>
      ) : (
        <ul>
          {queryEjercicios.data.map((ejercicio: any) => (
            <li key={ejercicio.id}>
              <h2>{ejercicio.name}</h2>
              <p>{ejercicio.bodyPart}</p>
              <p>{ejercicio.target}</p>
              <img src={ejercicio.gifUrl} alt={ejercicio.name} />
            </li>
          ))}
        </ul>
      )}
      <div className="space-y-4">
        {rutina?.map((dia) => (
          <div key={dia.dia} className="p-4 border rounded-xl bg-accent">
            <h2 className="text-xl font-bold capitalize">{dia.dia}</h2>
            {dia.bloques.map((bloque) => (
              <div key={bloque.bloque}>
                <h3 className="text-lg font-semibold mt-2">{bloque.bloque}</h3>
                <p>{bloque.grupo}</p>
                <p>{bloque.ejercicio}</p>
                <p>{bloque.series}</p>
                <p>{bloque.repeticiones}</p>
              </div>
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
};
