import {
  ArrowRightLeft,
  Eye,
  FileOutput,
  FileText,
  LayoutTemplate,
  PenSquare,
  ShieldCheck,
} from "lucide-react";
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
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)]">
          <div className="grid lg:grid-cols-[15.5rem_1fr]">
            <aside className="hidden bg-blue-950 p-5 text-white lg:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/10 text-teal-100">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                    BioMedTools MX
                  </p>
                  <h2 className="text-sm font-semibold">
                    Clinical Report Builder
                  </h2>
                </div>
              </div>

              <nav className="mt-7 space-y-1 text-sm">
                {[
                  ["Nuevo reporte", "/builder/corrective", FileText],
                  ["Mis reportes", "/preview", FileOutput],
                  ["Plantillas", "/templates", LayoutTemplate],
                  ["Guia", "/", ShieldCheck],
                ].map(([label, href, Icon]) => (
                  <Link
                    key={String(label)}
                    href={String(href)}
                    className={`flex min-h-9 items-center gap-2 rounded-md px-3 ${
                      href === "/builder/corrective"
                        ? "bg-teal-700 text-white"
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {String(label)}
                  </Link>
                ))}
              </nav>

              <div className="mt-7 rounded-md border border-white/10 bg-white/[0.06] p-3 text-xs leading-5 text-blue-100">
                <p className="font-semibold uppercase tracking-wide text-teal-100">
                  Topic Tales Biomedica
                </p>
                <p className="mt-1">
                  Documentacion academica con formato tecnico para evidencia de
                  practica.
                </p>
              </div>
            </aside>

            <div className="min-w-0 bg-white">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 md:px-5">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-semibold text-slate-950">
                    Tipo de reporte:
                  </span>
                  <span className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700">
                    Correctivo
                  </span>
                  <span className="hidden items-center gap-1 rounded-md border border-teal-200 bg-teal-50 px-2 py-1 font-semibold text-teal-800 sm:inline-flex">
                    <PenSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    Captura activa
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/templates"
                    className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <ArrowRightLeft className="h-4 w-4" aria-hidden="true" />
                    Cambiar plantilla
                  </Link>
                  <span className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Vista previa
                  </span>
                </div>
              </header>

              <div className="p-4 md:p-6">
                <ReportBuilderClient
                  prefill={prefill.values}
                  prefillMessage={prefill.message}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
