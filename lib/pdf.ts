import jsPDF from "jspdf";

import { REPORT_STATUS_OPTIONS, ReportFormValues } from "@/types/report";

type PdfField = {
  label: string;
  value: string;
};

const PAGE = {
  width: 595,
  height: 842,
  marginX: 42,
  footerY: 804,
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

function addHeader(doc: jsPDF, values: ReportFormValues, folio: string) {
  doc.setFillColor(13, 71, 161);
  doc.rect(0, 0, PAGE.width, 96, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("Reporte tecnico biomedico", PAGE.marginX, 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Topic Tales Biomedica / BioMedTools MX Core", PAGE.marginX, 58);
  doc.text("Mantenimiento correctivo / evidencia academica", PAGE.marginX, 74);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("FOLIO", 430, 36);
  doc.setFont("courier", "bold");
  doc.setFontSize(10);
  doc.text(folio, 430, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Estado: ${getStatusLabel(values.estadoFinal)}`, 430, 70);
}

function addFooter(doc: jsPDF, pageNumber: number, totalPages: number) {
  doc.setDrawColor(226, 232, 240);
  doc.line(PAGE.marginX, PAGE.footerY - 16, PAGE.width - PAGE.marginX, PAGE.footerY - 16);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text(
    "Uso educativo. No sustituye protocolos institucionales ni mantenimiento certificado.",
    PAGE.marginX,
    PAGE.footerY,
  );
  doc.text(
    `Pagina ${pageNumber} de ${totalPages}`,
    PAGE.width - PAGE.marginX - 62,
    PAGE.footerY,
  );
}

function addSectionTitle(doc: jsPDF, title: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.text(title, PAGE.marginX, y);
}

function addFieldBlock(doc: jsPDF, field: PdfField, y: number, maxWidth = 510) {
  const wrapped = doc.splitTextToSize(safeValue(field.value), maxWidth);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.text(field.label, PAGE.marginX, y);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text(wrapped, PAGE.marginX, y + 15);

  return y + wrapped.length * 13 + 28;
}

export function generateReportPdf(values: ReportFormValues): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const folio = buildFolio(values);
  const pageBottom = 760;
  let y = 124;

  addHeader(doc, values, folio);

  const metaFields: PdfField[] = [
    { label: "Institucion", value: values.institucion },
    { label: "Area", value: values.area },
    { label: "Equipo", value: values.equipo },
    { label: "Marca / Modelo", value: values.marcaModelo },
    { label: "Numero de Serie", value: values.numeroSerie },
    { label: "Inventario", value: values.inventario },
    { label: "Fecha", value: values.fecha },
    { label: "Responsable", value: values.responsable },
  ];

  addSectionTitle(doc, "1. Datos generales", y);
  y += 18;

  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(PAGE.marginX, y - 8, 510, 116, 4, 4, "FD");

  metaFields.forEach((field, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = PAGE.marginX + col * 255 + 12;
    const fieldY = y + row * 27 + 10;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(8);
    doc.text(`${field.label}:`, x, fieldY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    const text = doc.splitTextToSize(safeValue(field.value), 145);
    doc.text(text.slice(0, 2), x + 74, fieldY);
  });

  y += 132;

  const narrativeFields: PdfField[] = [
    { label: "2. Descripcion de la falla", value: values.fallaReportada },
    { label: "3. Diagnostico tecnico", value: values.diagnostico },
    { label: "4. Acciones realizadas", value: values.accionRealizada },
    { label: "5. Pruebas funcionales", value: values.pruebasFuncionales },
    { label: "6. Recomendaciones", value: values.recomendaciones },
    { label: "7. Observaciones", value: values.observaciones },
  ];

  narrativeFields.forEach((field) => {
    const value = safeValue(field.value);
    const lines = doc.splitTextToSize(value, 510);
    const needed = lines.length * 13 + 44;

    if (y + needed > pageBottom) {
      doc.addPage();
      addHeader(doc, values, folio);
      y = 124;
    }

    y = addFieldBlock(doc, field, y);
  });

  if (y + 116 > pageBottom) {
    doc.addPage();
    addHeader(doc, values, folio);
    y = 124;
  }

  doc.setDrawColor(253, 230, 138);
  doc.setFillColor(255, 251, 235);
  doc.roundedRect(PAGE.marginX, y, 510, 44, 4, 4, "FD");
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 53, 15);
  doc.setFontSize(8.5);
  doc.text(
    doc.splitTextToSize(
      "Uso educativo. Este reporte no sustituye formatos institucionales, normativas aplicables, supervision profesional ni mantenimiento biomedico certificado.",
      486,
    ),
    PAGE.marginX + 12,
    y + 17,
  );

  y += 78;
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Responsable", PAGE.marginX, y);
  doc.text("Firma / validacion", 330, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(safeValue(values.responsable), PAGE.marginX, y + 18);
  doc.line(330, y + 32, 552, y + 32);
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text("Nombre y firma", 330, y + 45);

  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    addFooter(doc, page, totalPages);
  }

  const safeDate = values.fecha || new Date().toISOString().slice(0, 10);
  doc.save(`reporte-correctivo-${safeDate}.pdf`);
}
