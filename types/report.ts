export const REPORT_STATUS_OPTIONS = [
  { value: "operativo", label: "Operativo" },
  {
    value: "operativo-con-observaciones",
    label: "Operativo con observaciones",
  },
  { value: "fuera-de-servicio", label: "Fuera de servicio" },
] as const;

export type ReportStatus = (typeof REPORT_STATUS_OPTIONS)[number]["value"];

export type ReportFormValues = {
  institucion: string;
  area: string;
  equipo: string;
  marcaModelo: string;
  numeroSerie: string;
  inventario: string;
  fecha: string;
  fallaReportada: string;
  diagnostico: string;
  accionRealizada: string;
  pruebasFuncionales: string;
  estadoFinal: ReportStatus;
  recomendaciones: string;
  responsable: string;
  observaciones: string;
};

export type ReportTemplate = {
  id: string;
  name: string;
  description: string;
  href: string;
  badge: "Gratis" | "Premium";
  enabled: boolean;
};
