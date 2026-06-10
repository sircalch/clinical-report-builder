import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6">
        <header className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Roadmap
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Roadmap de plantillas futuras
          </h1>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Gratis</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Plantilla correctiva</li>
              <li>Vista previa integrada</li>
              <li>PDF descargable</li>
              <li>Borrador local</li>
            </ul>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Proximamente</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Plantillas preventivo y recepcion</li>
              <li>Marca personalizada</li>
              <li>Historial y exportes avanzados</li>
              <li>Campos y checklist custom</li>
            </ul>
          </article>
        </section>

        <div className="mt-8">
          <Link
            href="/templates"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Volver a plantillas
          </Link>
        </div>
      </main>
    </div>
  );
}
