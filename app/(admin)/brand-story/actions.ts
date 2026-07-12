"use server";

import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import type { BrandStory } from "@/lib/types";

function toBrandStory(row: {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  downloadCount: number;
  uploadedAt: Date;
}): BrandStory {
  const { data } = supabaseAdmin.storage
    .from("brand-story")
    .getPublicUrl(row.filePath);

  return {
    id: row.id,
    fileName: row.fileName,
    fileUrl: data.publicUrl,
    fileSize: row.fileSize,
    downloadCount: row.downloadCount,
    uploadedAt: row.uploadedAt,
  };
}

export async function getBrandStories(): Promise<BrandStory[]> {
  const rows = await prisma.brandStory.findMany({
    orderBy: { uploadedAt: "desc" },
  });
  return rows.map(toBrandStory);
}

// Used by the public homepage — always the most recently uploaded PDF
export async function getLatestBrandStory(): Promise<BrandStory | null> {
  const row = await prisma.brandStory.findFirst({
    orderBy: { uploadedAt: "desc" },
  });
  return row ? toBrandStory(row) : null;
}

export async function uploadBrandStory(formData: FormData) {
  //   const { userId } = await auth();
  //   if (!userId) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("No file provided");
  if (file.type !== "application/pdf") throw new Error("File must be a PDF");

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

export async function deleteBrandStory(id: string) {
  //   const { userId } = await auth();
  //   if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.brandStory.findUniqueOrThrow({
    where: { id },
  });

  await supabaseAdmin.storage.from("brand-story").remove([existing.filePath]);
  await prisma.brandStory.delete({ where: { id } });

  revalidatePath("/brand-story");
}

export async function incrementBrandStoryDownload(id: string) {
  await prisma.brandStory.update({
    where: { id },
    data: { downloadCount: { increment: 1 } },
  });
}
