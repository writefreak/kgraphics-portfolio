import { DesignsPageClient } from "@/components/admin/design/design-page-client";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Design } from "@/lib/types";

export default async function DesignsPage() {
  const rows = await prisma.design.findMany({
    include: { category: true },
    orderBy: { displayOrder: "asc" },
  });

  const designs: Design[] = rows.map((d) => {
    const { data } = supabaseAdmin.storage
      .from("design-images")
      .getPublicUrl(d.imagePath);

    return {
      id: d.id,
      title: d.title,
      category: d.category?.name ?? "Uncategorized",
      imageUrl: data.publicUrl,
      imageAlt: d.imageAlt,
      caption: d.caption,
      clientName: d.clientName,
      behanceUrl: d.behanceUrl,
      featured: d.isFeatured,
      displayOrder: d.displayOrder,
      createdAt: d.createdAt,
    };
  });

  return <DesignsPageClient initialDesigns={designs} />;
}
