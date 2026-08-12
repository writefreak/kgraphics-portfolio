import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/Container";
import BackButton from "@/components/ui/back-button";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Design } from "@/lib/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getDesignById(id: string): Promise<Design | null> {
  const row = await prisma.design.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!row) return null;

  const { data } = supabaseAdmin.storage
    .from("design-images")
    .getPublicUrl(row.imagePath);

  return {
    id: row.id,
    title: row.title,
    category: row.category?.name ?? "Uncategorized",
    imageUrl: data.publicUrl,
    imageAlt: row.imageAlt,
    caption: row.caption,
    clientName: row.clientName,
    behanceUrl: row.behanceUrl,
    featured: row.isFeatured,
    displayOrder: row.displayOrder,
    createdAt: row.createdAt,
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const design = await getDesignById(id);
  if (!design) return { title: "Work not found" };

  return {
    title: `${design.title} — K-Graphics`,
    description: design.caption ?? design.title,
    openGraph: { images: [design.imageUrl] },
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const design = await getDesignById(id);
  if (!design) notFound();

  const year = new Date(design.createdAt).getFullYear();

  return (
    <main className="md:pt-40 pt-32 pb-32">
      <Container>
        <BackButton className="mb-6" />

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={design.imageUrl}
              alt={design.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-xs font-medium bg-[#030142]/20 text-ink px-3 py-1 rounded-full w-fit">
              {design.category}
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              {design.title}
            </h1>
            {design.caption && (
              <p className="py-4 pb-6 text-xs text-neutral-700 md:text-sm">
                {design.caption}
              </p>
            )}
            <div className="pt-5 md:pt-8 border-t border-t-gray-200" />
            <div className="">
              {design.behanceUrl && (
                <a
                  href={design.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-mist hover:text-ink hover:border hover:border-ink"
                >
                  View on Behance
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default page;
