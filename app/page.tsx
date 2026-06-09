import { Clock3, FileCheck2, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toBuilderQuery(params: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      if (value[0]) {
        query.set(key, value[0]);
      }
      continue;
    }
    if (value) {
      query.set(key, value);
    }
  }
  return query.toString();
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  if (params.activity) {
    const query = toBuilderQuery(params);
    redirect(`/builder/corrective${query ? `?${query}` : ""}`);
  }

  const quickLinks = [
    {
      href: "/templates",
      title: "Plantillas",
      description: "Selecciona la plantilla gratuita o revisa las premium.",
    },
    {
      href: "/builder/corrective",
      title: "Builder Correctivo",
      description: "Llena el formulario, valida, previsualiza y exporta PDF.",
    },
    {
      href: "/about",
      title: "Acerca",
      description: "Alcance del MVP y ruta de crecimiento del producto.",
    },
  ];

  const metrics = [
    { label: "Plantillas activas", value: "1", icon: FileText },
    { label: "Formato de salida", value: "PDF", icon: FileCheck2 },
    { label: "Tiempo objetivo", value: "< 5 min", icon: Clock3 },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-md border border-slate-300 bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Clinical Report Builder
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
            Reportes tecnicos de mantenimiento biomedico
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Genera reportes correctivos con formato profesional, valida campos
            clave y exporta PDF en minutos.
          </p>
          <section className="mt-6 grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
            <article className="rounded-md border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Flujo
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Plantilla - Formulario - Vista previa - PDF.
              </p>
            </article>
            <article className="rounded-md border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Control
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Validacion en cada campo antes de exportacion.
              </p>
            </article>
          </section>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/builder/corrective"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              <FileCheck2 className="h-4 w-4" aria-hidden="true" />
              Crear reporte
            </Link>
            <Link
              href="/templates"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Ver plantillas
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {metrics.map((item) => (
              <article
                key={item.label}
                className="rounded-md border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-center gap-2 text-slate-500">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-slate-300 bg-white">
          <header className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Accesos rapidos
            </h2>
          </header>
          <ul className="divide-y divide-slate-200">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-6 py-4 transition hover:bg-slate-50"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <footer className="border-t border-slate-200 px-6 py-3">
            <p className="inline-flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              No envia datos: toda la sesion se mantiene en el navegador.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
