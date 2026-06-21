import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  FileText,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";

import { TemplateCard } from "@/components/TemplateCard";
import { reportTemplates } from "@/data/templates";

export default function TemplatesPage() {
  const activeTemplates = reportTemplates.filter((template) => template.enabled);
  const upcomingTemplates = reportTemplates.length - activeTemplates.length;

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-teal-700">
                  <LayoutTemplate className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                    Catalogo de plantillas
                  </p>
                  <h1 className="text-3xl font-semibold text-slate-950">
                    Selecciona formato de reporte
                  </h1>
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                Formatos educativos para documentacion tecnica biomedica. La
                plantilla correctiva esta activa y el resto marca el crecimiento
                natural del sistema.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/builder/corrective"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  Crear reporte correctivo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>

            <section className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { label: "Activas", value: activeTemplates.length, icon: FileCheck2 },
                { label: "Proximas", value: upcomingTemplates, icon: ShieldCheck },
                { label: "Salida", value: "PDF", icon: FileText },
              ].map((item) => (
                <article
                  key={item.label}
                  className="rounded-md border border-slate-200 bg-white p-3"
                >
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <item.icon className="h-4 w-4 text-teal-700" aria-hidden="true" />
                    {item.label}
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-950">
                    {item.value}
                  </p>
                </article>
              ))}
            </section>
          </div>
        </header>

        <section className="mt-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <LayoutTemplate className="h-4 w-4" aria-hidden="true" />
              Plantillas disponibles
            </h2>
            <p className="text-sm text-slate-500">
              Usa la correctiva para el flujo Quiz - Caso - Reporte.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reportTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
