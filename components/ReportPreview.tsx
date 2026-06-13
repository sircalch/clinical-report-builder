import { StatusBadge } from "@/components/StatusBadge";
import { ReportFormValues } from "@/types/report";

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
    { label: "Diagnostico", value: values.diagnostico },
    { label: "Acciones realizadas", value: values.accionRealizada },
    { label: "Pruebas funcionales", value: values.pruebasFuncionales },
    { label: "Recomendaciones", value: values.recomendaciones },
    { label: "Observaciones", value: values.observaciones },
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-slate-100 p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-950">
          Vista previa del reporte
        </h2>
        <StatusBadge status={values.estadoFinal} />
      </div>

      <article className="mx-auto min-h-[38rem] max-w-[34rem] rounded-sm border border-slate-200 bg-white px-7 py-8 shadow-[0_12px_35px_rgba(15,23,42,0.16)]">
        <header className="border-b border-slate-200 pb-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Reporte de mantenimiento correctivo
          </p>
          <h3 className="mt-1 text-base font-semibold text-blue-800">
            BioMedTools MX Core
          </h3>
        </header>

        <section className="mt-5">
          <h4 className="text-xs font-semibold text-slate-950">
            1. Datos generales
          </h4>
          <dl className="mt-3 grid gap-x-4 gap-y-2 text-xs sm:grid-cols-2">
            {metaFields.map((field) => (
              <div key={field.label} className="grid grid-cols-[6.5rem_1fr] gap-2">
                <dt className="font-semibold text-slate-600">{field.label}:</dt>
                <dd className="text-slate-900">{safeValue(field.value)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-5 space-y-4">
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
      </article>

      <div className="mx-auto mt-3 flex max-w-[34rem] items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
        <span>Pagina</span>
        <span className="rounded bg-slate-100 px-2 py-1 text-slate-900">1</span>
        <span>/</span>
        <span>2</span>
        <span className="ml-3 rounded border border-slate-200 px-2 py-1">+</span>
        <span className="rounded border border-slate-200 px-2 py-1">-</span>
      </div>
    </section>
  );
}
