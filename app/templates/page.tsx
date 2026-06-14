import Link from "next/link";
import { ArrowRight, FileText, LayoutTemplate } from "lucide-react";

import { TemplateCard } from "@/components/TemplateCard";
import { reportTemplates } from "@/data/templates";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <header className="mb-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
                <LayoutTemplate className="h-4 w-4" aria-hidden="true" />
                Plantillas
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Catalogo de plantillas de reporte
              </h1>
              <p className="mt-3 max-w-3xl text-slate-600">
                Formatos educativos para documentacion tecnica biomedica. La
                plantilla correctiva esta activa; las demas quedan como mapa de
                crecimiento del sistema.
              </p>
            </div>
            <aside className="rounded-lg border border-teal-200 bg-teal-50 p-4">
              <FileText className="h-6 w-6 text-teal-700" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-teal-950">
                Flujo recomendado
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Caso simulado - Reporte correctivo - Evidencia para actividad
                piloto.
              </p>
            </aside>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reportTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Volver al inicio
          </Link>
          <Link
            href="/builder/corrective"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-teal-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            Crear reporte correctivo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
}
