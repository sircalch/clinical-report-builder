import type { Metadata } from "next";
import { CircleHelp, FileText, LayoutTemplate, Wrench } from "lucide-react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clinical Report Builder",
  description:
    "Genera reportes tecnicos de mantenimiento biomedico de forma rapida y profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
          <div className="bg-teal-50/80">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 border-b border-teal-100 px-4 py-2 md:px-6">
              <p className="text-xs font-medium text-slate-700">
              Flujo inspirado en herramientas de productividad: enfoque en captura
              rapida y salida estandar.
              </p>
              <Link
                href="/builder/corrective"
                className="inline-flex min-h-9 items-center gap-2 rounded-md bg-teal-700 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-teal-600"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Nuevo reporte
              </Link>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                BioMed Tools MX
              </p>
              <Link href="/" className="text-xl font-semibold text-slate-900">
                Clinical Report Builder
              </Link>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <Link
                href="/templates"
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 py-2 font-medium text-slate-700 hover:border-teal-200 hover:bg-teal-50"
              >
                <LayoutTemplate className="h-4 w-4" aria-hidden="true" />
                Plantillas
              </Link>
              <Link
                href="/builder/corrective"
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 py-2 font-medium text-slate-700 hover:border-teal-200 hover:bg-teal-50"
              >
                <Wrench className="h-4 w-4" aria-hidden="true" />
                Builder
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 py-2 font-medium text-slate-700 hover:border-teal-200 hover:bg-teal-50"
              >
                <CircleHelp className="h-4 w-4" aria-hidden="true" />
                Acerca
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
