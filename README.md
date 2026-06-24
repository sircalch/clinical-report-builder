## Clinical Report Builder

Aplicacion web para generar reportes tecnicos de mantenimiento biomedico con flujo rapido:

- seleccion de plantilla
- formulario validado
- vista previa
- descarga PDF
- guardado local de borrador

### Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- jsPDF
- localStorage

### Estructura principal

```txt
app/
  page.tsx
  templates/page.tsx
  builder/corrective/page.tsx
  builder/preventive/page.tsx
  pricing/page.tsx
  preview/page.tsx
  about/page.tsx
components/
  ReportBuilderClient.tsx
  ReportForm.tsx
  ReportPreview.tsx
  PDFDownloadButton.tsx
  TemplateCard.tsx
  StatusBadge.tsx
data/
  templates.ts
lib/
  schemas.ts
  pdf.ts
  storage.ts
types/
  report.ts
```

### Como correr localmente

1. Instala dependencias:

```bash
npm install
```

2. Levanta desarrollo:

```bash
npm run dev
```

3. Abre:

```txt
http://localhost:3000
```

### Flujo principal

1. Ir a `/templates`.
2. Seleccionar plantilla: correctivo, preventivo, verificacion funcional, recepcion, baja tecnica o evidencia de practica.
3. Llenar formulario.
4. Click en `Actualizar vista previa`.
5. Descargar PDF.
6. Guardar/Cargar/Limpiar borrador local.

### Integracion BioMedTools MX Core

La raiz redirige automaticamente a `/builder/corrective` cuando recibe parametros de actividad:

```txt
/?activity=quiz&category=<categoria>&score=<puntaje>
/?activity=case&caseId=<id>&equipment=<equipo>&score=<puntaje>
```

El generador prellena campos educativos para generar evidencia desde Quiz Arena o Case Simulator. El alumno/docente puede ajustar los campos antes de exportar el PDF.

### Plantillas activas

Todas usan el mismo motor de formulario, vista previa, autoguardado y PDF:

- `Mantenimiento Correctivo`: falla, diagnostico, accion y cierre.
- `Mantenimiento Preventivo`: checklist preventivo y verificacion programada.
- `Verificacion Funcional`: pruebas funcionales y conformidad educativa.
- `Recepcion de Equipo`: ingreso, accesorios y condicion inicial.
- `Baja Tecnica`: retiro educativo o evaluacion especializada.
- `Evidencia de Practica`: resumen academico de actividad Quiz - Caso - Reporte.

### Roadmap premium

- branding personalizado
- historial de reportes
- exportaciones avanzadas
- modo docente/taller

### Seguridad de rutas internas

La ruta `/about` esta protegida con HTTP Basic Auth en `proxy.ts`.

- `INTERNAL_ROUTE_USER`
- `INTERNAL_ROUTE_PASSWORD`
- `NEXT_PUBLIC_SHOW_INTERNAL_NAV` (opcional, `true` para mostrar link interno en el menu)

### Scripts

- `npm run dev` inicia entorno local
- `npm run lint` ejecuta ESLint
- `npm run build` compila produccion

### Deploy

Recomendado en Vercel con build command `npm run build`.

## Licencia

Uso academico y prototipo inicial.
