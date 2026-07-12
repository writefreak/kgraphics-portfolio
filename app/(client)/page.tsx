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
import type { Design, Review } from "@/lib/types";

// Assumption (unspecified): homepage carousel shows featured designs only,
// ordered by displayOrder. Drop the `where` clause if you want all designs.
async function getFeaturedDesigns(): Promise<Design[]> {
  const rows = await prisma.design.findMany({
    where: { isFeatured: true },
    orderBy: { displayOrder: "asc" },
    include: { category: true },
  });

  return rows.map((row) => {
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
  });
}

async function getApprovedReviews(): Promise<Review[]> {
  const rows = await prisma.review.findMany({
    where: { status: "approved" },
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.clientName,
    rating: Number(row.rating),
    comment: row.comment,
    status: row.status as Review["status"],
    featured: row.featured,
    designId: row.designId,
    createdAt: row.createdAt,
  }));
}

export default async function Home() {
  const [designs, reviews] = await Promise.all([
    getFeaturedDesigns(),
    getApprovedReviews(),
  ]);

  return (
    <>
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Portfolio designs={designs} />
        <Reviews reviews={reviews} />
        <BrandStory />
      </main>
    </>
  );
}
