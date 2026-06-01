import { REPORT_STATUS_OPTIONS, ReportStatus } from "@/types/report";

type StatusBadgeProps = {
  status: ReportStatus;
};

const STATUS_STYLES: Record<ReportStatus, string> = {
  operativo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "operativo-con-observaciones":
    "bg-amber-50 text-amber-700 border-amber-200",
  "fuera-de-servicio": "bg-rose-50 text-rose-700 border-rose-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const option = REPORT_STATUS_OPTIONS.find((item) => item.value === status);
  const label = option ? option.label : status;

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {label}
    </span>
  );
}
