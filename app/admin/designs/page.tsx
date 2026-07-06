// app/(admin)/designs/page.tsx
import { DESIGNS } from "@/lib/mock-data";
import { DesignsPageClient } from "../../../components/admin/design/design-page-client";

export default async function DesignsPage() {
  // Swap this for a real DB/fetch call later — keeping the shape the same
  // means DesignsPageClient doesn't need to change.
  const designs = DESIGNS;

  return <DesignsPageClient initialDesigns={designs} />;
}
