import { ArrowRightLeft, Eye, FileOutput, PenSquare } from "lucide-react";
import Link from "next/link";

import { ReportBuilderClient } from "@/components/ReportBuilderClient";

export default function CorrectiveBuilderPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Builder
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Reporte de Mantenimiento Correctivo
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Completa el formulario, valida los datos clave y descarga el
              reporte en PDF.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
              <span className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1">
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

        <ReportBuilderClient />
      </main>
    </div>
  );
}
