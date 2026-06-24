"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Download, FileCheck2, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { PDFDownloadButton } from "@/components/PDFDownloadButton";
import { ReportForm } from "@/components/ReportForm";
import { ReportPreview } from "@/components/ReportPreview";
import { generateReportPdf } from "@/lib/pdf";
import { reportDefaultValues, reportSchema } from "@/lib/schemas";
import { clearDraft, loadDraft, saveDraft } from "@/lib/storage";
import { ReportFormValues } from "@/types/report";

type ReportBuilderClientProps = {
  prefill?: Partial<ReportFormValues>;
  prefillMessage?: string | null;
};

export function ReportBuilderClient({
  prefill,
  prefillMessage,
}: ReportBuilderClientProps) {
  const initialState = useMemo(() => {
    const draft = loadDraft();
    const values = {
      ...reportDefaultValues,
      ...(draft ?? {}),
      ...(prefill ?? {}),
    };

    return {
      values,
      helperMessage:
        prefillMessage ??
        (draft ? "Borrador cargado desde localStorage." : null),
    };
  }, [prefill, prefillMessage]);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: initialState.values,
    mode: "onBlur",
  });

  const [previewValues, setPreviewValues] = useState<ReportFormValues>(
    initialState.values,
  );
  const [helperMessage, setHelperMessage] = useState<string | null>(
    initialState.helperMessage,
  );
  const [autoSaveState, setAutoSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [lastAutoSaveAt, setLastAutoSaveAt] = useState<string | null>(null);
  const hasMountedRef = useRef(false);
  const watchedValues = useWatch({
    control: form.control,
    defaultValue: initialState.values,
  }) as ReportFormValues;
  const requiredValues = [
    watchedValues.institucion,
    watchedValues.area,
    watchedValues.equipo,
    watchedValues.marcaModelo,
    watchedValues.numeroSerie,
    watchedValues.inventario,
    watchedValues.fecha,
    watchedValues.fallaReportada,
    watchedValues.diagnostico,
    watchedValues.accionRealizada,
    watchedValues.pruebasFuncionales,
    watchedValues.recomendaciones,
    watchedValues.responsable,
  ];
  const completedRequired = requiredValues.filter(
    (value) => typeof value === "string" && value.trim().length > 0,
  ).length;
  const qualityPercent = Math.round(
    (completedRequired / requiredValues.length) * 100,
  );
  const qualityItems = [
    {
      label: "Datos del equipo",
      complete:
        Boolean(watchedValues.equipo.trim()) &&
        Boolean(watchedValues.inventario.trim()),
    },
    {
      label: "Diagnostico y accion",
      complete:
        watchedValues.diagnostico.trim().length >= 6 &&
        watchedValues.accionRealizada.trim().length >= 6,
    },
    {
      label: "Pruebas y recomendacion",
      complete:
        watchedValues.pruebasFuncionales.trim().length >= 6 &&
        watchedValues.recomendaciones.trim().length >= 6,
    },
  ];

  const handlePreviewSubmit = (values: ReportFormValues) => {
    setPreviewValues(values);
    setHelperMessage("Vista previa actualizada.");
  };

  const handleSaveDraft = () => {
    const values = form.getValues();
    saveDraft(values);
    setHelperMessage("Borrador guardado en localStorage.");
  };

  const handleLoadDraft = () => {
    const draft = loadDraft();
    if (!draft) {
      setHelperMessage("No se encontro un borrador guardado.");
      return;
    }

    form.reset(draft);
    setPreviewValues(draft);
    setHelperMessage("Borrador cargado.");
  };

  const handleClearAll = () => {
    form.reset(reportDefaultValues);
    setPreviewValues(reportDefaultValues);
    clearDraft();
    setHelperMessage("Formulario y borrador limpiados.");
  };

  const handleDownloadPdf = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      setHelperMessage(
        "Completa los campos requeridos antes de generar el PDF.",
      );
      return;
    }

    const values = form.getValues();
    setPreviewValues(values);
    generateReportPdf(values);
    setHelperMessage("PDF generado.");
  };

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    setAutoSaveState("saving");
    const timer = window.setTimeout(() => {
      saveDraft(watchedValues);
      setAutoSaveState("saved");
      setLastAutoSaveAt(
        new Intl.DateTimeFormat("es-MX", {
          timeStyle: "short",
        }).format(new Date()),
      );
    }, 700);

    return () => window.clearTimeout(timer);
  }, [watchedValues]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
      <ReportForm
        form={form}
        onPreviewSubmit={handlePreviewSubmit}
        onSaveDraft={handleSaveDraft}
        onLoadDraft={handleLoadDraft}
        onClearAll={handleClearAll}
        helperMessage={helperMessage}
      />
      <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-teal-700">
              <Download className="h-4 w-4" aria-hidden="true" />
              <h2 className="text-sm font-semibold uppercase tracking-wide">
                Acciones
              </h2>
            </div>
            <span className="rounded-md border border-teal-200 bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800">
              PDF
            </span>
          </div>
          <div className="mt-3">
            <PDFDownloadButton onDownload={handleDownloadPdf} />
          </div>
          <section className="mt-4 rounded-md border border-teal-100 bg-teal-50/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-800">
                <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                Calidad del reporte
              </p>
              <span className="text-sm font-semibold text-teal-900">
                {qualityPercent}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-teal-100">
              <div
                className="h-full rounded-full bg-teal-700 transition-all"
                style={{ width: `${qualityPercent}%` }}
              />
            </div>
            <div className="mt-3 space-y-2">
              {qualityItems.map((item) => (
                <p
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-slate-700"
                >
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      item.complete ? "text-teal-700" : "text-slate-300"
                    }`}
                    aria-hidden="true"
                  />
                  {item.label}
                </p>
              ))}
            </div>
          </section>
          <p className="mt-3 text-xs text-slate-600">
            Autoguardado:{" "}
            <span className="font-medium text-slate-900">
              {autoSaveState === "saving"
                ? "guardando..."
                : autoSaveState === "saved"
                  ? `activo (${lastAutoSaveAt ?? "reciente"})`
                  : "en espera"}
            </span>
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Se valida el formulario antes de generar el archivo.
          </p>
        </section>
        <ReportPreview values={previewValues} />
      </div>
    </div>
  );
}
