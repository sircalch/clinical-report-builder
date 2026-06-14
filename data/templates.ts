import { ReportTemplate } from "@/types/report";

export const reportTemplates: ReportTemplate[] = [
  {
    id: "corrective",
    name: "Mantenimiento Correctivo",
    description:
      "Plantilla gratuita para reportar fallas, diagnostico, acciones y estado final del equipo.",
    href: "/builder/corrective",
    badge: "Gratis",
    enabled: true,
  },
  {
    id: "preventive",
    name: "Mantenimiento Preventivo",
    description:
      "Checklist preventivo con tareas periodicas, tiempos y control de cumplimiento.",
    href: "/builder/preventive",
    badge: "Proximamente",
    enabled: false,
  },
  {
    id: "functional-verification",
    name: "Verificacion Funcional",
    description:
      "Formato para pruebas funcionales, tolerancias y evidencia de conformidad.",
    href: "/pricing",
    badge: "Proximamente",
    enabled: false,
  },
  {
    id: "equipment-reception",
    name: "Recepcion de Equipo",
    description:
      "Registro de ingreso, accesorios, condicion inicial y observaciones para laboratorio o area tecnica.",
    href: "/pricing",
    badge: "Proximamente",
    enabled: false,
  },
  {
    id: "equipment-retirement",
    name: "Baja Tecnica",
    description:
      "Documento educativo para justificar retiro, no conformidad o envio a evaluacion especializada.",
    href: "/pricing",
    badge: "Proximamente",
    enabled: false,
  },
  {
    id: "practice-evidence",
    name: "Evidencia de Practica",
    description:
      "Resumen academico para anexar resultado de quiz, caso simulado y aprendizaje documentado.",
    href: "/pricing",
    badge: "Proximamente",
    enabled: false,
  },
];
