"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { PDFDownloadButton } from "@/components/PDFDownloadButton";
import { ReportForm } from "@/components/ReportForm";
import { ReportPreview } from "@/components/ReportPreview";
import { generateReportPdf } from "@/lib/pdf";
import { reportDefaultValues, reportSchema } from "@/lib/schemas";
import { clearDraft, loadDraft, saveDraft } from "@/lib/storage";
import { ReportFormValues } from "@/types/report";

export function ReportBuilderClient() {
  const initialState = useMemo(() => {
    const draft = loadDraft();
    return {
      values: draft ?? reportDefaultValues,
      helperMessage: draft ? "Borrador cargado desde localStorage." : null,
    };
  }, []);

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
  const watchedValues = form.watch();

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
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <ReportForm
        form={form}
        onPreviewSubmit={handlePreviewSubmit}
        onSaveDraft={handleSaveDraft}
        onLoadDraft={handleLoadDraft}
        onClearAll={handleClearAll}
        helperMessage={helperMessage}
      />
      <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
        <section className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Download className="h-4 w-4" aria-hidden="true" />
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Acciones
            </h2>
          </div>
          <div className="mt-3">
            <PDFDownloadButton onDownload={handleDownloadPdf} />
          </div>
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
