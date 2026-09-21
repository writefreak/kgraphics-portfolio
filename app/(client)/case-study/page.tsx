import { prisma } from "@/lib/prisma";
import { Container } from "@/components/Container";
import { CaseStudyCard } from "@/components/case-study-card";
import { CaseStudyHeroBanner } from "@/components/case-study-banner";
import BackButton from "@/components/ui/back-button";

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

  // Pick featured items for the carousel (or default to all if none are flagged as featured)
  const bannerStudies =
    caseStudies.filter((s) => s.isFeatured).length > 0
      ? caseStudies.filter((s) => s.isFeatured)
      : caseStudies;

  return (
    <section className="pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <BackButton className="mb-6" />
        {/* Header Section */}
        <div className="max-w-2xl">
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-ink break-words">
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
          <>
            {/* Case Study Hero Carousel */}
            <div className="mt-8">
              <CaseStudyHeroBanner caseStudies={bannerStudies} />
            </div>

            {/* Case Study Cards Section Below */}
            <div className="mt-16">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">
                All Project Highlights
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {caseStudies.map((study) => (
                  <CaseStudyCard key={study.id} study={study} />
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
