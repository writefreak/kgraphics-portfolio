import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/Container";
import { CaseStudyCard } from "@/components/case-study-card";

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
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Case Studies
          </h1>
          <p className="mt-4 text-sm text-ink/65 md:text-base">
            A closer look at the thinking, decisions and details behind selected
            projects.
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <p className="mt-16 text-sm text-ink/50">
            No case studies published yet. Check back soon.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
