import { reportSchema } from "@/lib/schemas";
import { ReportFormValues } from "@/types/report";

const DRAFT_KEY = "clinical-report-builder:corrective-draft";

export function saveDraft(values: ReportFormValues): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
}

export function loadDraft(): ReportFormValues | null {
  if (typeof window === "undefined") {
    return null;
  }

  const draftRaw = window.localStorage.getItem(DRAFT_KEY);
  if (!draftRaw) {
    return null;
  }

  try {
    const parsed = JSON.parse(draftRaw);
    const validated = reportSchema.safeParse(parsed);
    return validated.success ? validated.data : null;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(DRAFT_KEY);
}
