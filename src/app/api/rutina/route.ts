type Somatotipo = "ectomorfo" | "mesomorfo" | "endomorfo";

/* ------------------------- 1. Catálogo de ejercicios ------------------------- */
const exerciseCatalog: Record<string, string[]> = {
  ABDOMEN: [
    "Elevación de rodillas sentado (Pull-In)",
    "Elevaciones de piernas en banco plano",
    "Elevaciones de piernas en paralelas (Silla del capitán)",
    "Libre en descansos activos",
  ],
  BICEPS: [
    "Curl araña con barra Z",
    "Curl con barra Z",
    "Curl con barra tumbado sobre banco inclinado",
    "Curl con barra sentado",
  ],
  CARDIO: ["Bicicleta", "Caminadora"],
  ESPALDA: ["Dominadas agarre ancho", "Dominadas tras nuca", "Jalón dorsal a una mano", "Remo con barra agarre supino"],
  GLUTEO: ["Aductores en máquina", "Búlgaras con mancuerna", "Hip thrust con barra", "Patada de glúteo en polea baja"],
  HOMBRO: ["Press militar con barra", "Elevaciones laterales con mancuernas", "Pájaros con mancuernas", "Press Arnold"],
  PECHO: [
    "Press inclinado en Multipower",
    "Aperturas en poleas en banco inclinado",
    "Press con barra en banco inclinado",
    "Press inclinado en máquina de discos",
  ],
  CUADRICEPS: [
    "Prensa inclinada",
    "Sentadilla frontal con barra",
    "Extensiones de cuádriceps en máquina",
    "Zancadas caminando con mancuernas",
  ],
  TRAPECIO: [
    "Encogimientos con barra",
    "Remo al mentón con barra Z",
    "Face pull en polea",
    "Encogimientos con mancuernas",
  ],
  TRICEPS: [
    "Press francés con barra Z",
    "Fondos en paralelas",
    "Extensión a una mano en polea alta",
    "Extensión de tríceps en polea con cuerda",
  ],
  ISQUIOS: [
    "Femoral en máquina de pie",
    "Buenos días con barra y piernas separadas",
    "Femoral en máquina sentado",
    "Peso muerto piernas rígidas con barra",
  ],
  GEMELOS: [
    "Elevación de gemelo a un pie",
    "Elevación de gemelos con barra sentado",
    "Elevación de gemelos de pie con barra",
    "Elevaciones de gemelo tipo burro",
  ],
  ANTEBRAZO: [
    "Curl invertido con barra",
    "Curl de muñecas con barra palmas abajo",
    "Curl de muñeca con barra por detrás de la espalda",
    "Rodillos de muñeca",
  ],
};

/* -------------------- 2. Rutina semanal predeterminada -------------------- */
const weeklySchedule: Record<string, string[]> = {
  lunes: ["GLUTEO", "ESPALDA", "GLUTEO", "CARDIO"],
  martes: ["ESPALDA", "BICEPS", "PECHO", "TRICEPS"],
  miercoles: ["GEMELOS", "HOMBRO", "ISQUIOS", "PECHO"],
  jueves: ["PECHO", "TRICEPS", "HOMBRO", "ABDOMEN"],
  viernes: ["ESPALDA", "ABDOMEN", "GEMELOS", "ISQUIOS"],
};

/* -------- 3. Series y repeticiones según somatotipo -------- */
const seriesReps: Record<Somatotipo, { series: number; repeticiones: number }> = {
  ectomorfo: { series: 6, repeticiones: 10 },
  mesomorfo: { series: 4, repeticiones: 12 },
  endomorfo: { series: 4, repeticiones: 12 },
};

/* -------------------------------------------------------------------------- */
/*                                API handler                                 */
/* -------------------------------------------------------------------------- */

/** POST /api/rutina
 *  body: { tipoCuerpo: Somatotipo; diasPorSemana?: number; fechaInicio?: string }
 */
export async function POST(request: Request) {
  try {
    const { tipoCuerpo, diasPorSemana = 5 } = (await request.json()) as {
      tipoCuerpo: Somatotipo;
      diasPorSemana?: number;
      fechaInicio?: string;
    };

    if (!tipoCuerpo || !seriesReps[tipoCuerpo]) {
      return new Response(JSON.stringify({ error: "tipoCuerpo inválido. Use ectomorfo | mesomorfo | endomorfo." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    /* --- Selecciona los días solicitados (máx. 5) --- */
    const daysOrder = ["lunes", "martes", "miercoles", "jueves", "viernes"] as const;
    const selectedDays = daysOrder.slice(0, Math.min(5, Math.max(1, diasPorSemana)));

    /* --- Genera la rutina completa --- */
    const rutina = selectedDays.map((dia) => {
      const bloques = weeklySchedule[dia].map((grupo, idx) => {
        const ejercicios = exerciseCatalog[grupo];
        const ejercicio = ejercicios[idx % ejercicios.length]; // rota si hay menos de 4
        return {
          bloque: idx + 1,
          grupo,
          ejercicio,
          ...seriesReps[tipoCuerpo],
        };
      });

      return { dia, bloques };
    });

    return new Response(JSON.stringify({ rutina }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "JSON inválido o faltan campos", details: String(error) }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/* GET /api/rutina?tipoCuerpo=ectomorfo&diasPorSemana=3
 *  Atajo de prueba rápida desde el navegador
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipoCuerpo = (searchParams.get("tipoCuerpo") ?? "") as Somatotipo;
  const diasPorSemana = Number(searchParams.get("diasPorSemana") ?? 5) || 5;
  return POST(
    new Request(request.url, {
      method: "POST",
      body: JSON.stringify({ tipoCuerpo, diasPorSemana }),
      headers: { "Content-Type": "application/json" },
    })
  );
}
