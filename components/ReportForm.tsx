"use client";

import { ChartNoAxesColumn, CircleCheckBig } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { REPORT_STATUS_OPTIONS, ReportFormValues } from "@/types/report";

type ReportFormProps = {
  form: UseFormReturn<ReportFormValues>;
  reportLabel: string;
  onPreviewSubmit: (values: ReportFormValues) => void;
  onSaveDraft: () => void;
  onLoadDraft: () => void;
  onClearAll: () => void;
  helperMessage: string | null;
};

type InputFieldName =
  | "institucion"
  | "area"
  | "equipo"
  | "marcaModelo"
  | "numeroSerie"
  | "inventario"
  | "fecha"
  | "responsable";

type TextAreaFieldName =
  | "fallaReportada"
  | "diagnostico"
  | "accionRealizada"
  | "pruebasFuncionales"
  | "recomendaciones"
  | "observaciones";

type InputField = {
  name: InputFieldName;
  label: string;
  placeholder: string;
  type?: "text" | "date";
};

type TextAreaField = {
  name: TextAreaFieldName;
  label: string;
  placeholder: string;
  rows: number;
};

const INPUT_FIELDS: InputField[] = [
  {
    name: "institucion",
    label: "Institucion",
    placeholder: "Hospital General de Hermosillo",
  },
  { name: "area", label: "Area", placeholder: "Quirofano 2" },
  { name: "equipo", label: "Equipo", placeholder: "Monitor multiparametrico" },
  {
    name: "marcaModelo",
    label: "Marca y modelo",
    placeholder: "Mindray iMEC 12",
  },
  { name: "numeroSerie", label: "Numero de serie", placeholder: "SN-00012345" },
  { name: "inventario", label: "Inventario", placeholder: "INV-BME-2044" },
  { name: "fecha", label: "Fecha", placeholder: "", type: "date" },
  {
    name: "responsable",
    label: "Responsable",
    placeholder: "Nombre del tecnico o ingeniero",
  },
];

const TEXTAREA_FIELDS: TextAreaField[] = [
  {
    name: "fallaReportada",
    label: "Falla reportada",
    placeholder: "Descripcion del incidente recibido.",
    rows: 3,
  },
  {
    name: "diagnostico",
    label: "Diagnostico",
    placeholder: "Causa encontrada durante revision tecnica.",
    rows: 3,
  },
  {
    name: "accionRealizada",
    label: "Accion realizada",
    placeholder: "Ajustes, reparaciones o reemplazos ejecutados.",
    rows: 3,
  },
  {
    name: "pruebasFuncionales",
    label: "Pruebas funcionales",
    placeholder: "Pruebas aplicadas y resultado.",
    rows: 3,
  },
  {
    name: "recomendaciones",
    label: "Recomendaciones",
    placeholder: "Sugerencias para seguimiento o prevencion.",
    rows: 3,
  },
  {
    name: "observaciones",
    label: "Observaciones",
    placeholder: "Notas adicionales (opcional).",
    rows: 3,
  },
];

const REQUIRED_FIELD_NAMES: Array<keyof ReportFormValues> = [
  "institucion",
  "area",
  "equipo",
  "marcaModelo",
  "numeroSerie",
  "inventario",
  "fecha",
  "fallaReportada",
  "diagnostico",
  "accionRealizada",
  "pruebasFuncionales",
  "estadoFinal",
  "recomendaciones",
  "responsable",
];

function FieldError({
  message,
}: Readonly<{
  message?: string;
}>) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs text-rose-700">{message}</p>;
}

export function ReportForm({
  form,
  reportLabel,
  onPreviewSubmit,
  onSaveDraft,
  onLoadDraft,
  onClearAll,
  helperMessage,
}: ReportFormProps) {
  const equipmentFields = INPUT_FIELDS.slice(0, 6);
  const controlFields = INPUT_FIELDS.slice(6);
  const watchedValues = form.watch();
  const completedRequiredFields = REQUIRED_FIELD_NAMES.filter((fieldName) => {
    const value = watchedValues[fieldName];
    return typeof value === "string" && value.trim().length > 0;
  }).length;
  const completionPercent = Math.round(
    (completedRequiredFields / REQUIRED_FIELD_NAMES.length) * 100,
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white/95 p-6 shadow-sm">
      <h2 className="text-base font-semibold uppercase tracking-wide text-teal-700">
        Formulario {reportLabel}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Completa campos tecnicos y actualiza la vista previa.
      </p>
      <section className="mt-4 rounded-md border border-teal-100 bg-teal-50/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
            <ChartNoAxesColumn className="h-4 w-4 text-teal-700" aria-hidden="true" />
            Avance de captura
          </p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
            <CircleCheckBig className="h-4 w-4 text-teal-700" aria-hidden="true" />
            {completedRequiredFields}/{REQUIRED_FIELD_NAMES.length} campos clave
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-teal-100">
          <div
            className="h-full rounded-full bg-teal-700 transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          {completionPercent}% completado
        </p>
      </section>

      <form onSubmit={form.handleSubmit(onPreviewSubmit)} className="mt-5 space-y-5">
        <section className="rounded-md border border-slate-200 bg-slate-50/80 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Datos del equipo
          </h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {equipmentFields.map((field) => {
              const error = form.formState.errors[field.name];
              const message =
                typeof error?.message === "string" ? error.message : undefined;

              return (
                <label key={field.name} className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">
                    {field.label}
                  </span>
                  <input
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    {...form.register(field.name)}
                    className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-slate-300 ${
                      message ? "border-rose-300" : "border-slate-300"
                    }`}
                  />
                  <FieldError message={message} />
                </label>
              );
            })}
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Control del reporte
          </h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {controlFields.map((field) => {
              const error = form.formState.errors[field.name];
              const message =
                typeof error?.message === "string" ? error.message : undefined;

              return (
                <label key={field.name} className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">
                    {field.label}
                  </span>
                  <input
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    {...form.register(field.name)}
                    className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-slate-300 ${
                      message ? "border-rose-300" : "border-slate-300"
                    }`}
                  />
                  <FieldError message={message} />
                </label>
              );
            })}

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Estado final
              </span>
              <select
                {...form.register("estadoFinal")}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-slate-300"
              >
                {REPORT_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Diagnostico tecnico
          </h3>
          <div className="mt-3 grid gap-4">
            {TEXTAREA_FIELDS.map((field) => {
              const error = form.formState.errors[field.name];
              const message =
                typeof error?.message === "string" ? error.message : undefined;

              return (
                <label key={field.name} className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">
                    {field.label}
                  </span>
                  <textarea
                    rows={field.rows}
                    placeholder={field.placeholder}
                    {...form.register(field.name)}
                    className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-slate-300 ${
                      message ? "border-rose-300" : "border-slate-300"
                    }`}
                  />
                  <FieldError message={message} />
                </label>
              );
            })}
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            Actualizar vista previa
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Guardar borrador
          </button>
          <button
            type="button"
            onClick={onLoadDraft}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cargar borrador
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
          >
            Limpiar
          </button>
        </div>

        {helperMessage ? (
          <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {helperMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}
