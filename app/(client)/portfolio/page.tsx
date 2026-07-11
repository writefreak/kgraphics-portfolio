import Contact from "@/components/Contact";
import Content from "@/components/portfolio/content";
import BackButton from "@/components/ui/back-button";
import React from "react";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Design } from "@/lib/types";
async function getAllDesigns(): Promise<Design[]> {
  const rows = await prisma.design.findMany({
    orderBy: { displayOrder: "asc" },
    include: { category: true },
  });

  return Promise.all(
    rows.map(async (row) => {
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

const page = async () => {
  const designs = await getAllDesigns();

  return (
    <div>
      <Content designs={designs} />
    </div>
  );
};

export default page;
