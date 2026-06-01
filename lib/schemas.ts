import { z } from "zod";

import { ReportFormValues } from "@/types/report";

const requiredText = (field: string, min = 2) =>
  z
    .string()
    .trim()
    .min(min, `${field} es obligatorio`)
    .max(2000, `${field} excede el maximo permitido`);

export const reportSchema = z.object({
  institucion: requiredText("Institucion"),
  area: requiredText("Area"),
  equipo: requiredText("Equipo"),
  marcaModelo: requiredText("Marca y modelo"),
  numeroSerie: requiredText("Numero de serie"),
  inventario: requiredText("Inventario"),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha invalida"),
  fallaReportada: requiredText("Falla reportada", 6),
  diagnostico: requiredText("Diagnostico", 6),
  accionRealizada: requiredText("Accion realizada", 6),
  pruebasFuncionales: requiredText("Pruebas funcionales", 6),
  estadoFinal: z.enum([
    "operativo",
    "operativo-con-observaciones",
    "fuera-de-servicio",
  ]),
  recomendaciones: requiredText("Recomendaciones", 6),
  responsable: requiredText("Responsable"),
  observaciones: z.string().trim().max(2000),
});

export const reportDefaultValues: ReportFormValues = {
  institucion: "",
  area: "",
  equipo: "",
  marcaModelo: "",
  numeroSerie: "",
  inventario: "",
  fecha: new Date().toISOString().slice(0, 10),
  fallaReportada: "",
  diagnostico: "",
  accionRealizada: "",
  pruebasFuncionales: "",
  estadoFinal: "operativo",
  recomendaciones: "",
  responsable: "",
  observaciones: "",
};
