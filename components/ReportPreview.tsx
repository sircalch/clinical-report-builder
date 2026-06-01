import { StatusBadge } from "@/components/StatusBadge";
import { ReportFormValues } from "@/types/report";

type ReportPreviewProps = {
  values: ReportFormValues;
};

type PreviewField = {
  label: string;
  value: string;
};

export function ReportPreview({ values }: ReportPreviewProps) {
  const metaFields: PreviewField[] = [
    { label: "Institucion", value: values.institucion },
    { label: "Area", value: values.area },
    { label: "Equipo", value: values.equipo },
    { label: "Marca y modelo", value: values.marcaModelo },
    { label: "Numero de serie", value: values.numeroSerie },
    { label: "Inventario", value: values.inventario },
    { label: "Fecha", value: values.fecha },
    { label: "Responsable", value: values.responsable },
  ];

  const narrativeFields: PreviewField[] = [
    { label: "Falla reportada", value: values.fallaReportada },
    { label: "Diagnostico", value: values.diagnostico },
    { label: "Accion realizada", value: values.accionRealizada },
    { label: "Pruebas funcionales", value: values.pruebasFuncionales },
    { label: "Recomendaciones", value: values.recomendaciones },
    { label: "Observaciones", value: values.observaciones },
  ];

  return (
    <section className="rounded-md border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Vista previa
        </h2>
        <StatusBadge status={values.estadoFinal} />
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {metaFields.map((field) => (
          <div key={field.label} className="rounded-md border border-slate-200 p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {field.label}
            </dt>
            <dd className="mt-1 text-sm text-slate-800">
              {field.value.trim() || "-"}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 space-y-3">
        {narrativeFields.map((field) => (
          <div key={field.label} className="rounded-md border border-slate-200 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {field.label}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
              {field.value.trim() || "-"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
