import Link from "next/link";

export default function PreventiveBuilderPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Premium
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Plantilla Preventiva
          </h1>
          <p className="mt-3 text-slate-600">
            Esta plantilla forma parte del roadmap premium. En el MVP solo esta
            habilitado el flujo correctivo.
          </p>
          <div className="mt-6">
            <Link
              href="/builder/corrective"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Ir al builder correctivo
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
