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
    href: "/builder/corrective?template=preventive",
    badge: "Gratis",
    enabled: true,
  },
  {
    id: "functional-verification",
    name: "Verificacion Funcional",
    description:
      "Formato para pruebas funcionales, tolerancias y evidencia de conformidad.",
    href: "/builder/corrective?template=functional-verification",
    badge: "Gratis",
    enabled: true,
  },
  {
    id: "equipment-reception",
    name: "Recepcion de Equipo",
    description:
      "Registro de ingreso, accesorios, condicion inicial y observaciones para laboratorio o area tecnica.",
    href: "/builder/corrective?template=equipment-reception",
    badge: "Gratis",
    enabled: true,
  },
  {
    id: "equipment-retirement",
    name: "Baja Tecnica",
    description:
      "Documento educativo para justificar retiro, no conformidad o envio a evaluacion especializada.",
    href: "/builder/corrective?template=equipment-retirement",
    badge: "Gratis",
    enabled: true,
  },
  {
    id: "practice-evidence",
    name: "Evidencia de Practica",
    description:
      "Resumen academico para anexar resultado de quiz, caso simulado y aprendizaje documentado.",
    href: "/builder/corrective?template=practice-evidence",
    badge: "Gratis",
    enabled: true,
  },
];
