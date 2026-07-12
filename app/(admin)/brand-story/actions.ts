"use server";

import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import type { BrandStory } from "@/lib/types";

export async function getBrandStory(): Promise<BrandStory | null> {
  const row = await prisma.brandStory.findFirst({
    orderBy: { uploadedAt: "desc" },
  });

  if (!row) return null;

  const { data } = supabaseAdmin.storage
    .from("brand-story")
    .getPublicUrl(row.filePath);

  return {
    id: row.id,
    fileName: row.fileName,
    fileUrl: data.publicUrl,
    fileSize: row.fileSize,
    uploadedAt: row.uploadedAt,
    downloadCount: row.downloadCount,
  };
}

export async function uploadBrandStory(formData: FormData) {
  //   const { userId } = await auth();
  //   if (!userId) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("No file provided");
  if (file.type !== "application/pdf") throw new Error("File must be a PDF");

  // Only one brand story PDF ever exists — remove the old one first
  const existing = await prisma.brandStory.findFirst();
  if (existing) {
    await supabaseAdmin.storage.from("brand-story").remove([existing.filePath]);
    await prisma.brandStory.delete({ where: { id: existing.id } });
  }

  const filePath = `${crypto.randomUUID()}.pdf`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from("brand-story")
    .upload(filePath, file);
  if (uploadError) throw new Error(uploadError.message);

  await prisma.brandStory.create({
    data: {
      fileName: file.name,
      filePath,
      fileSize: file.size,
    },
  });

  revalidatePath("/brand-story");
}

export async function deleteBrandStory() {
  //   const { userId } = await auth();
  //   if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.brandStory.findFirst();
  if (!existing) return;

  await supabaseAdmin.storage.from("brand-story").remove([existing.filePath]);
  await prisma.brandStory.delete({ where: { id: existing.id } });

  revalidatePath("/brand-story");
}

export async function incrementBrandStoryDownload() {
  const existing = await prisma.brandStory.findFirst();
  if (!existing) return;

  await prisma.brandStory.update({
    where: { id: existing.id },
    data: { downloadCount: { increment: 1 } },
  });
}
