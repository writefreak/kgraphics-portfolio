import Header from "@/components/shared/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
import BrandStory from "@/components/BrandStory";
import Contact from "@/components/Contact";
import { Footer } from "@/components/shared/Footer";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Design } from "@/lib/types";

// Assumption (unspecified): homepage carousel shows featured designs only,
// ordered by displayOrder. Drop the `where` clause if you want all designs.
async function getFeaturedDesigns(): Promise<Design[]> {
  const rows = await prisma.design.findMany({
    where: { isFeatured: true },
    orderBy: { displayOrder: "asc" },
    include: { category: true },
  });

  return Promise.all(
    rows.map(async (row) => {
      // imagePath is a storage path, not a URL — bucket isn't public, so
      // resolve a signed URL on read (per project convention, never store
      // the signed URL itself).
      const { data } = await supabaseAdmin.storage
        .from("design-images")
        .createSignedUrl(row.imagePath, 60 * 60);

      return {
        id: row.id,
        title: row.title,
        category: row.category?.name ?? "Uncategorized",
        imageUrl: data?.signedUrl ?? "",
        imageAlt: row.imageAlt,
        caption: row.caption,
        clientName: row.clientName,
        behanceUrl: row.behanceUrl,
        featured: row.isFeatured,
        displayOrder: row.displayOrder,
        createdAt: row.createdAt,
      };
    }),
  );
}

export default async function Home() {
  const designs = await getFeaturedDesigns();

  return (
    <>
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Portfolio designs={designs} />
        <Reviews />
        <BrandStory />
      </main>
    </>
  );
}
