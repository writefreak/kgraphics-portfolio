import { CaseStudiesPageClient } from "@/components/admin/case-study-client";
import { listCaseStudies } from "./actions";

export default async function CaseStudiesPage() {
  const rows = await listCaseStudies();

  const caseStudies = rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    cover_image_url: row.coverImageUrl,
    published: row.published,
    is_featured: row.isFeatured,
    created_at: row.createdAt.toISOString(),
  }));

  return <CaseStudiesPageClient initialCaseStudies={caseStudies} />;
}
