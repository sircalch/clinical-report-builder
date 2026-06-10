import jsPDF from "jspdf";

import { ReportFormValues } from "@/types/report";

type PdfField = {
  label: string;
  key: keyof ReportFormValues;
};

const PDF_FIELDS: PdfField[] = [
  { label: "Institucion", key: "institucion" },
  { label: "Area", key: "area" },
  { label: "Equipo", key: "equipo" },
  { label: "Marca / Modelo", key: "marcaModelo" },
  { label: "Numero de Serie", key: "numeroSerie" },
  { label: "Inventario", key: "inventario" },
  { label: "Fecha", key: "fecha" },
  { label: "Falla Reportada", key: "fallaReportada" },
  { label: "Diagnostico", key: "diagnostico" },
  { label: "Accion Realizada", key: "accionRealizada" },
  { label: "Pruebas Funcionales", key: "pruebasFuncionales" },
  { label: "Estado Final", key: "estadoFinal" },
  { label: "Recomendaciones", key: "recomendaciones" },
  { label: "Responsable", key: "responsable" },
  { label: "Observaciones", key: "observaciones" },
];

export function generateReportPdf(values: ReportFormValues): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const left = 42;
  const maxWidth = 510;
  const pageBottom = 780;
  let y = 48;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Reporte tecnico biomedico", left, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Mantenimiento correctivo / evidencia academica", left, y);
  y += 24;

  PDF_FIELDS.forEach(({ label, key }) => {
    const rawValue = values[key];
    const value = typeof rawValue === "string" && rawValue.trim() ? rawValue : "-";
    const wrapped = doc.splitTextToSize(value, maxWidth);

    if (y + wrapped.length * 14 + 28 > pageBottom) {
      doc.addPage();
      y = 48;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(label, left, y);
    y += 15;

    doc.setFont("helvetica", "normal");
    doc.text(wrapped, left, y);
    y += wrapped.length * 14 + 10;
  });

  const safeDate = values.fecha || new Date().toISOString().slice(0, 10);
  doc.save(`reporte-correctivo-${safeDate}.pdf`);
}
