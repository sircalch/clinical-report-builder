import Image from "next/image";

import { StatusBadge } from "@/components/StatusBadge";
import { REPORT_STATUS_OPTIONS, ReportFormValues } from "@/types/report";

type ReportPreviewProps = {
  values: ReportFormValues;
};

type PreviewField = {
  label: string;
  value: string;
};

function safeValue(value: string) {
  return value.trim() || "-";
}

function getStatusLabel(status: ReportFormValues["estadoFinal"]) {
  return REPORT_STATUS_OPTIONS.find((item) => item.value === status)?.label ?? status;
}

function buildFolio(values: ReportFormValues) {
  const source = [
    values.fecha || new Date().toISOString().slice(0, 10),
    values.equipo,
    values.inventario,
  ]
    .join("-")
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 10)
    .toUpperCase();

  return `BMT-${source || "REPORTE"}`;
}

export function ReportPreview({ values }: ReportPreviewProps) {
  const metaFields: PreviewField[] = [
    { label: "Institucion", value: values.institucion },
    { label: "Area", value: values.area },
    { label: "Equipo", value: values.equipo },
    { label: "Marca / Modelo", value: values.marcaModelo },
    { label: "No. serie", value: values.numeroSerie },
    { label: "Inventario", value: values.inventario },
    { label: "Fecha", value: values.fecha },
    { label: "Responsable", value: values.responsable },
  ];

  const narrativeFields: PreviewField[] = [
    { label: "Descripcion de la falla", value: values.fallaReportada },
    { label: "Diagnostico tecnico", value: values.diagnostico },
    { label: "Acciones realizadas", value: values.accionRealizada },
    { label: "Pruebas funcionales", value: values.pruebasFuncionales },
    { label: "Recomendaciones", value: values.recomendaciones },
    { label: "Observaciones", value: values.observaciones },
  ];

  const folio = buildFolio(values);

  return (
    <section className="rounded-lg border border-slate-200 bg-slate-100 p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-950">
            Vista previa del reporte
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Formato profesional para evidencia academica.
          </p>
        </div>
        <StatusBadge status={values.estadoFinal} />
      </div>

      <article className="mx-auto min-h-[42rem] max-w-[36rem] overflow-hidden rounded-sm border border-slate-200 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.18)]">
        <header className="border-b border-blue-900 bg-blue-950 px-7 py-6 text-white">
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-center gap-3">
              <Image
                src="/topic-tales-biomedica-logo.png"
                alt="Topic Tales Biomedica"
                width={90}
                height={64}
                className="h-12 w-auto rounded bg-white object-contain p-1"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                  Topic Tales Biomedica
                </p>
                <h3 className="mt-1 text-base font-semibold">
                  Reporte tecnico biomedico
                </h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-200">
                Folio
              </p>
              <p className="mt-1 font-mono text-xs text-white">{folio}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-2 text-xs sm:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2">
              <p className="text-blue-200">Tipo</p>
              <p className="mt-1 font-semibold">Correctivo</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2">
              <p className="text-blue-200">Estado</p>
              <p className="mt-1 font-semibold">
                {getStatusLabel(values.estadoFinal)}
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.08] px-3 py-2">
              <p className="text-blue-200">Salida</p>
              <p className="mt-1 font-semibold">PDF / Evidencia</p>
            </div>
          </div>
        </header>

        <div className="px-7 py-6">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              1. Datos generales
            </h4>
            <dl className="mt-3 grid gap-x-4 gap-y-2 text-xs sm:grid-cols-2">
              {metaFields.map((field) => (
                <div
                  key={field.label}
                  className="grid grid-cols-[6.5rem_1fr] gap-2 border-b border-slate-100 pb-2"
                >
                  <dt className="font-semibold text-slate-600">{field.label}:</dt>
                  <dd className="text-slate-900">{safeValue(field.value)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-6 space-y-4">
            {narrativeFields.map((field, index) => (
              <section key={field.label}>
                <h4 className="text-xs font-semibold text-slate-950">
                  {index + 2}. {field.label}
                </h4>
                <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-slate-700">
                  {safeValue(field.value)}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-5 text-amber-900">
            Uso educativo. Este reporte no sustituye formatos institucionales,
            normativas aplicables, supervision profesional ni mantenimiento
            biomedico certificado.
          </section>

          <footer className="mt-8 grid gap-5 border-t border-slate-200 pt-5 text-xs text-slate-600 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-slate-950">Responsable</p>
              <p className="mt-1">{safeValue(values.responsable)}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-950">Firma / validacion</p>
              <div className="mt-5 border-t border-slate-300 pt-1">
                Nombre y firma
              </div>
            </div>
          </footer>
        </div>
      </article>

      <div className="mx-auto mt-3 flex max-w-[36rem] items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
        <span>Previsualizacion A4</span>
        <span className="rounded bg-slate-100 px-2 py-1 text-slate-900">
          Folio {folio}
        </span>
      </div>
    </section>
  );
}
