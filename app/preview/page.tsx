import Link from "next/link";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-8">
          <h1 className="text-3xl font-semibold text-slate-900">Vista previa</h1>
          <p className="mt-3 text-slate-600">
            En el MVP, la vista previa vive dentro del generador correctivo para
            mantener el flujo rapido en una sola pantalla.
          </p>
          <div className="mt-6">
            <Link
              href="/builder/corrective"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Abrir generador
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
