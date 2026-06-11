import { ExternalLink, Wrench } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Informacion interna
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Clinical Report Builder
          </h1>
          <p className="mt-4 text-slate-600">
            Esta version inicial se enfoca en una necesidad puntual: generar
            reportes de mantenimiento correctivo con estructura consistente y
            salida en PDF.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-slate-900">
            Alcance actual
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Plantilla gratuita de mantenimiento correctivo.</li>
            <li>Validacion con Zod y React Hook Form.</li>
            <li>Vista previa integrada.</li>
            <li>Borrador local con localStorage.</li>
            <li>Exportacion PDF con jsPDF.</li>
          </ul>

          <div className="mt-8">
            <Link
              href="/builder/corrective"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Probar generador
            </Link>
          </div>

          <section className="mt-8 rounded-md border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Referencias de interfaz
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <a
                  href="https://linear.app/docs/search"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-slate-800 underline"
                >
                  Patron de busqueda y comando rapido (Linear)
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://m1.material.io/components/data-tables.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-slate-800 underline"
                >
                  Jerarquia de datos en superficies densas (Material)
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}
