import Link from "next/link";

import { TemplateCard } from "@/components/TemplateCard";
import { reportTemplates } from "@/data/templates";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Plantillas
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Catalogo de plantillas de reporte
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            La version gratuita incluye mantenimiento correctivo. Las plantillas
            premium se habilitan en fases posteriores.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {reportTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </section>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
