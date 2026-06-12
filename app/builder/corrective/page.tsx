import { ArrowRightLeft, Eye, FileOutput, PenSquare } from "lucide-react";
import Link from "next/link";

import { ReportBuilderClient } from "@/components/ReportBuilderClient";
import { ReportFormValues } from "@/types/report";

type CorrectiveBuilderPageProps = {
  searchParams: Promise<{
    activity?: string;
    category?: string;
    categoryName?: string;
    caseId?: string;
    caseTitle?: string;
    equipment?: string;
    score?: string;
    total?: string;
    maxScore?: string;
  }>;
};

const CASE_PREFILLS: Record<
  string,
  {
    title: string;
    fallaReportada: string;
    diagnostico: string;
    accionRealizada: string;
    pruebasFuncionales: string;
    recomendaciones: string;
  }
> = {
  "monitor-sin-spo2": {
    title: "Monitor sin lectura de SpO2",
    fallaReportada:
      "Monitor multiparametrico con lectura SpO2 ausente o inestable en escenario simulado de monitoreo.",
    diagnostico:
      "Falla probable asociada a sensor/cable de SpO2 danado y conector con residuos. El analisis se limita a la verificacion tecnica del equipo y accesorios.",
    accionRealizada:
      "Se selecciono reemplazo de sensor, limpieza de conector y prueba funcional con simulador de SpO2.",
    pruebasFuncionales:
      "Verificacion educativa de la cadena sensor-cable-modulo mediante simulador de SpO2, revisando presencia de senal estable.",
    recomendaciones:
      "Registrar accesorio probado o reemplazado, documentar mensajes de alarma, revisar calidad de senal y seguir protocolo institucional antes de liberar el equipo.",
  },
};

function buildScoreText(params: Awaited<CorrectiveBuilderPageProps["searchParams"]>) {
  if (!params.score) {
    return "";
  }

  const denominator = params.maxScore ?? params.total;
  return denominator
    ? ` Puntaje registrado: ${params.score}/${denominator}.`
    : ` Puntaje registrado: ${params.score}.`;
}

function buildPrefill(
  params: Awaited<CorrectiveBuilderPageProps["searchParams"]>,
): { values?: Partial<ReportFormValues>; message?: string } {
  const scoreText = buildScoreText(params);
  const baseValues: Partial<ReportFormValues> = {
    institucion: "Actividad academica",
    area: "BioMedTools MX Core",
    marcaModelo: "No aplica (simulacion)",
    numeroSerie: "N/A",
    inventario: "N/A",
    fecha: new Date().toISOString().slice(0, 10),
    estadoFinal: "operativo-con-observaciones",
    responsable: "Ing. Andres Monreal / estudiante",
  };

  if (params.activity === "quiz") {
    const category = params.category ?? "categoria no especificada";
    const categoryName = params.categoryName ?? category;
    return {
      values: {
        ...baseValues,
        equipo: "Actividad Quiz Arena",
        fallaReportada: `Evidencia educativa generada desde Quiz Arena. Categoria: ${categoryName}.${scoreText}`,
        diagnostico:
          "Actividad de repaso/pretest enfocada en conceptos tecnicos de ingenieria biomedica.",
        accionRealizada:
          "Se completo quiz por categoria y se registro desempeno para seguimiento academico.",
        pruebasFuncionales:
          `Resultado de actividad documentado desde BioMed Quiz Arena.${scoreText}`,
        recomendaciones:
          "Revisar explicaciones tecnicas, practicar caso relacionado y repetir como postest.",
        observaciones:
          "Reporte generado como evidencia educativa. No sustituye protocolo clinico ni mantenimiento certificado.",
      },
      message: "Reporte prellenado desde Quiz Arena.",
    };
  }

  if (params.activity === "case") {
    const equipment = params.equipment ?? "Equipo simulado";
    const caseId = params.caseId ?? "caso no especificado";
    const casePrefill = params.caseId ? CASE_PREFILLS[params.caseId] : undefined;
    const caseTitle = params.caseTitle ?? casePrefill?.title ?? caseId;
    return {
      values: {
        ...baseValues,
        equipo: equipment,
        fallaReportada: casePrefill
          ? `${casePrefill.fallaReportada} Caso: ${caseTitle}.${scoreText}`
          : `Caso simulado resuelto en Case Simulator. ID: ${caseId}.${scoreText}`,
        diagnostico:
          casePrefill?.diagnostico ??
          "Se analizaron pistas, causa probable, herramienta, accion correctiva y contexto de cierre.",
        accionRealizada:
          casePrefill?.accionRealizada ??
          "Se completo el flujo de simulacion y se genero evidencia de razonamiento tecnico.",
        pruebasFuncionales: casePrefill
          ? `${casePrefill.pruebasFuncionales}${scoreText}`
          : `Resultado del caso documentado para actividad academica.${scoreText}`,
        recomendaciones:
          casePrefill?.recomendaciones ??
          "Revisar resolucion tecnica, documentar aprendizaje clave y contrastar con protocolo institucional.",
        observaciones:
          "Reporte generado desde una simulacion educativa. Debe adaptarse si se usa en laboratorio.",
      },
      message: "Reporte prellenado desde Case Simulator.",
    };
  }

  return {};
}

export default async function CorrectiveBuilderPage({
  searchParams,
}: CorrectiveBuilderPageProps) {
  const prefill = buildPrefill(await searchParams);

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white/95 p-5 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Generador
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Reporte de Mantenimiento Correctivo
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Completa el formulario, valida los datos clave y descarga el
              reporte en PDF.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
              <span className="inline-flex items-center gap-1 rounded border border-teal-200 bg-teal-50 px-2 py-1 text-teal-800">
                <PenSquare className="h-3.5 w-3.5" aria-hidden="true" />
                Captura
              </span>
              <span className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                Vista previa
              </span>
              <span className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1">
                <FileOutput className="h-3.5 w-3.5" aria-hidden="true" />
                Exportacion PDF
              </span>
            </div>
          </div>
          <Link
            href="/templates"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowRightLeft className="h-4 w-4" aria-hidden="true" />
            Cambiar plantilla
          </Link>
        </header>

        <ReportBuilderClient
          prefill={prefill.values}
          prefillMessage={prefill.message}
        />
      </main>
    </div>
  );
}
