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
    badge: "Premium",
    enabled: false,
  },
  {
    id: "functional-verification",
    name: "Verificacion Funcional",
    description:
      "Formato para pruebas funcionales, tolerancias y evidencia de conformidad.",
    href: "/pricing",
    badge: "Premium",
    enabled: false,
  },
];
