import Link from "next/link";
import { FileText, LockKeyhole } from "lucide-react";

import { ReportTemplate } from "@/types/report";

type TemplateCardProps = {
  template: ReportTemplate;
};

export function TemplateCard({ template }: TemplateCardProps) {
  const badgeClass =
    template.badge === "Gratis"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-slate-100 text-slate-600 border-slate-200";

  if (!template.enabled) {
    return (
      <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              {template.name}
            </h3>
          </div>
          <span
            className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${badgeClass}`}
          >
            {template.badge}
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-600">{template.description}</p>
        <p className="mt-4 text-sm font-medium text-slate-500">Proximamente</p>
      </article>
    );
  }

  return (
      <article className="rounded-lg border border-teal-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-teal-700">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
        </div>
        <span
          className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${badgeClass}`}
        >
          {template.badge}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600">{template.description}</p>
      <Link
        href={template.href}
        className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-teal-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-800"
      >
        Usar plantilla
      </Link>
    </article>
  );
}
