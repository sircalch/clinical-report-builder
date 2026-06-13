"use client";

type PDFDownloadButtonProps = {
  onDownload: () => void;
};

export function PDFDownloadButton({ onDownload }: PDFDownloadButtonProps) {
  return (
    <button
      type="button"
      onClick={onDownload}
      className="inline-flex w-full min-h-11 items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800"
    >
      Descargar PDF
    </button>
  );
}
