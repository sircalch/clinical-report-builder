import { redirect } from "next/navigation";

export default function PreventiveBuilderPage() {
  redirect("/builder/corrective?template=preventive");
}
