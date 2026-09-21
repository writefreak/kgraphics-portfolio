import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/Container";
import BackButton from "@/components/ui/back-button";

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
    <article className="pt-24 pb-24 md:pt-28 md:pb-32">
      <Container>
        <BackButton className="mb-8 md:mb-12" />

        {/* Two-column layout: sticky left rail + scrolling right content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16 xl:gap-24">
          {/* Left rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink wrap-break-word sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]">
              {study.title}
            </h1>

            {/* {study.excerpt && (
              <p className="mt-4 text-sm leading-relaxed text-ink/65 md:text-base">
                {study.excerpt}
              </p>
            )} */}

            {sections.length > 0 && (
              <div className="mt-8 hidden border-t border-ink/10 pt-6 lg:block">
                <span className="text-[11px] font-semibold font-display uppercase text-ink/40">
                  Case study highlights
                </span>
                <ol className="mt-3 space-y-2.5">
                  {sections.map(
                    (section, i) =>
                      section.heading && (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--blue)]/10 text-[10px] font-semibold text-[var(--blue)]">
                            {i + 1}
                          </span>
                          <span className="text-sm leading-snug text-ink/70">
                            {section.heading}
                          </span>
                        </li>
                      ),
                  )}
                </ol>
              </div>
            )}
          </div>

          {/* Right content column */}
          <div className="min-w-0">
            {study.coverImageUrl && (
              <div className="w-full max-h-[280px] overflow-hidden rounded-2xl sm:max-h-[360px] md:max-h-[420px] xl:max-h-[480px]">
                <img
                  src={study.coverImageUrl}
                  alt={study.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-14 flex flex-col gap-16 md:mt-16">
              {sections.map((section, i) => (
                <div
                  key={i}
                  className="border-t border-ink/10 pt-10 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-col gap-6 md:gap-10">
                    {/* Number + heading + body */}
                    <div className="flex gap-4 md:w-2/5 md:shrink-0">
                      {/* <span className="font-display text-2xl font-bold text-[var(--blue)]/30 md:text-3xl">
                        {String(i + 1).padStart(2, "0")}
                      </span> */}
                      <div className="min-w-0">
                        {section.heading && (
                          <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                            {section.heading}
                          </h2>
                        )}
                        {section.body && (
                          <p className="text-xs leading-relaxed text-neutral-600 whitespace-pre-line md:text-sm">
                            {section.body}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Image */}
                    {section.image_url && (
                      <div className="overflow-hidden rounded-2xl border border-ink/10 md:flex-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={section.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
