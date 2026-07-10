import { DesignsPageClient } from "@/components/admin/design/design-page-client";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Design } from "@/lib/types";

export default async function DesignsPage() {
  const rows = await prisma.design.findMany({
    include: { category: true },
    orderBy: { displayOrder: "asc" },
  });

  const designs: Design[] = await Promise.all(
    rows.map(async (d) => {
      const { data } = await supabaseAdmin.storage
        .from("design-images")
        .createSignedUrl(d.imagePath, 3600);

      return {
        id: d.id,
        title: d.title,
        category: d.category?.name ?? "Uncategorized",
        imageUrl: data?.signedUrl ?? "",
        imageAlt: d.imageAlt,
        caption: d.caption,
        clientName: d.clientName,
        behanceUrl: d.behanceUrl,
        featured: d.isFeatured,
        displayOrder: d.displayOrder,
        createdAt: d.createdAt,
      };
    }),
  );

  return <DesignsPageClient initialDesigns={designs} />;
}
