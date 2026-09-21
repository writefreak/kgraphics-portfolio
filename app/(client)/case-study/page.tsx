import { prisma } from "@/lib/prisma";
import { Container } from "@/components/Container";
import BackButton from "@/components/ui/back-button";
import CaseStudiesSearch from "@/components/case-study-search";

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImageUrl: true,
      isFeatured: true,
      createdAt: true,
    },
    orderBy: [
      { isFeatured: "desc" },
      { displayOrder: "asc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <section className="pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <BackButton className="mb-6" />
        {/* Header Section */}
        <div className="max-w-2xl">
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-ink wrap-break-word">
            Explore Our Project Highlights
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            A closer look at the creative thinking, decisions, and details
            behind selected projects
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <p className="mt-16 text-sm text-neutral-500">
            No case studies published yet. Check back soon.
          </p>
        ) : (
          <div className="mt-10 md:mt-14">
            <CaseStudiesSearch caseStudies={caseStudies} />
          </div>
        )}
      </Container>
    </section>
  );
}
