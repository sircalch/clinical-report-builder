import {
  ArrowRight,
  FileCheck2,
  FileText,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-teal-700">
                  <FileCheck2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                    BioMedTools MX Core
                  </p>
                  <h1 className="text-3xl font-semibold text-slate-950">
                    Clinical Report Builder
                  </h1>
                </div>
              </div>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
                Herramienta educativa para crear reportes tecnicos biomedicos
                con estructura clara, vista previa y exportacion PDF para
                practicas, mantenimiento y evidencia academica.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/builder/corrective"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  Crear reporte
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Ver plantillas
                </Link>
              </div>
            </div>

            <aside className="border-t border-slate-200 bg-blue-950 p-5 text-white lg:border-l lg:border-t-0 md:p-7">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-100">
                Uso educativo
              </h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                La documentacion generada apoya actividades academicas y
                entrenamiento tecnico. No reemplaza formatos institucionales,
                normativas aplicables ni supervision profesional.
              </p>

              <div className="mt-5 grid gap-3">
                {[
                  {
                    title: "Plantillas",
                    body: "Formatos estructurados para documentacion tecnica.",
                    icon: LayoutTemplate,
                  },
                  {
                    title: "Vista previa",
                    body: "Revision del contenido antes de exportar evidencia.",
                    icon: FileText,
                  },
                  {
                    title: "Privacidad",
                    body: "El flujo evita solicitar datos clinicos sensibles.",
                    icon: ShieldCheck,
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-md border border-white/10 bg-white/[0.05] p-3"
                  >
                    <item.icon className="h-4 w-4 text-teal-100" aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-blue-100">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
