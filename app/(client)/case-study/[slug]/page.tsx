import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/Container";

export const revalidate = 60;

type Section = {
  heading: string;
  body: string;
  image_url: string;
};

export async function generateStaticParams() {
  const studies = await prisma.caseStudy.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return studies.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const study = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  if (!study || !study.published) notFound();

  const sections = (study.sections as Section[]) ?? [];

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {study.title}
          </h1>
          {study.excerpt && (
            <p className="mt-4 text-base text-ink/65 md:text-lg">
              {study.excerpt}
            </p>
          )}
        </div>

        {study.coverImageUrl && (
          <div className="mt-10 md:mt-14 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-mist">
            <img
              src={study.coverImageUrl}
              alt={study.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto mt-14 flex flex-col gap-14">
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-4">
              {section.heading && (
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  {section.heading}
                </h2>
              )}
              {section.body && (
                <p className="text-sm leading-relaxed text-ink/70 md:text-base whitespace-pre-line">
                  {section.body}
                </p>
              )}
              {section.image_url && (
                <div className="mt-2 overflow-hidden rounded-2xl border border-ink/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.image_url}
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </article>
  );
}
