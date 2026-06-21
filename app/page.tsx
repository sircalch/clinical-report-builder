import {
  ArrowRight,
  Clock3,
  FileCheck2,
  FileText,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { reportTemplates } from "@/data/templates";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const QUIZ_ARENA_URL =
  process.env.NEXT_PUBLIC_QUIZ_ARENA_URL ??
  "https://biomed-quiz-arena.vercel.app";
const CASE_SIMULATOR_URL =
  process.env.NEXT_PUBLIC_CASE_SIMULATOR_URL ??
  "https://biomed-case-simulator.vercel.app";

function toBuilderQuery(params: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      if (value[0]) {
        query.set(key, value[0]);
      }
      continue;
    }
    if (value) {
      query.set(key, value);
    }
  }
  return query.toString();
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  if (params.activity) {
    const query = toBuilderQuery(params);
    redirect(`/builder/corrective${query ? `?${query}` : ""}`);
  }

  const activeTemplates = reportTemplates.filter((template) => template.enabled);
  const upcomingTemplates = reportTemplates.length - activeTemplates.length;

  const metrics = [
    { label: "Plantillas activas", value: activeTemplates.length, icon: LayoutTemplate },
    { label: "Formato", value: "PDF", icon: FileText },
    { label: "Tiempo objetivo", value: "< 5 min", icon: Clock3 },
    { label: "Proximas", value: upcomingTemplates, icon: ShieldCheck },
  ];

  const quickLinks = [
    {
      href: "/templates",
      title: "Seleccionar plantilla",
      body: "Revisa formatos activos y proximas plantillas.",
    },
    {
      href: "/builder/corrective",
      title: "Reporte correctivo",
      body: "Llena formulario, previsualiza y exporta PDF.",
    },
    {
      href: "/builder/corrective?activity=case&caseId=monitor-sin-spo2&equipment=Monitor%20multiparametrico",
      title: "Evidencia caso SpO2",
      body: "Abre un reporte prellenado para la actividad piloto.",
    },
  ];

  const workflow = [
    {
      title: "Elegir plantilla",
      body: "Selecciona el formato correctivo activo o revisa los proximos formatos.",
      icon: LayoutTemplate,
    },
    {
      title: "Capturar datos",
      body: "Completa equipo, falla, diagnostico, acciones y pruebas funcionales.",
      icon: FileCheck2,
    },
    {
      title: "Exportar evidencia",
      body: "Revisa la vista previa y descarga el PDF para anexar a la practica.",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-teal-700">
                  <FileCheck2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                    Clinical Report Builder
                  </p>
                  <p className="text-sm text-slate-500">
                    Documentacion tecnica y evidencia academica
                  </p>
                </div>
              </div>

              <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Genera reportes tecnicos biomedicos con vista previa y PDF
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Convierte resultados de quiz y casos simulados en evidencia
                estructurada para practicas, mantenimiento y documentacion
                profesional.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/builder/corrective"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  Crear reporte
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={`${CASE_SIMULATOR_URL}/cases/monitor-sin-spo2`}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
                >
                  Resolver caso antes
                </a>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-md border border-slate-200 bg-slate-50/80 p-3"
                  >
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <item.icon className="h-4 w-4 text-teal-700" aria-hidden="true" />
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-950">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="border-t border-slate-200 bg-blue-950 p-5 text-white lg:border-l lg:border-t-0 md:p-7">
              <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-teal-100">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Evidencia piloto
                </h2>
                <p className="mt-3 text-2xl font-semibold leading-tight">
                  Reporte correctivo para caso SpO2
                </p>
                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Flujo listo para documentar el caso de monitor sin lectura de
                  SpO2 y exportar PDF como evidencia de actividad.
                </p>
                <div className="mt-4 grid gap-2">
                  <Link
                    href="/builder/corrective?activity=case&caseId=monitor-sin-spo2&equipment=Monitor%20multiparametrico"
                    className="inline-flex min-h-10 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-950 transition hover:bg-blue-50"
                  >
                    Abrir reporte prellenado
                  </Link>
                  <a
                    href={`${QUIZ_ARENA_URL}/quiz/monitoreo-signos-vitales?mode=study&difficulty=intermediate`}
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Iniciar desde quiz
                  </a>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md border border-white/10 bg-white/[0.04] p-3 transition hover:bg-white/[0.08]"
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-blue-100">{item.body}</p>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {workflow.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
            >
              <item.icon className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
