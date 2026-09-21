"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase-admin";

const BUCKET = "case-study-images";
const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadCaseStudyImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file provided.");

  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG, WEBP, or GIF image.");
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error(`Image must be under ${MAX_FILE_SIZE_MB}MB.`);
  }

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export type Section = {
  heading: string;
  body: string;
  image_url: string;
};

export type CaseStudyInput = {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string | null;
  sections: Section[];
  published: boolean;
  isFeatured: boolean;
};

export async function listCaseStudies() {
  return prisma.caseStudy.findMany({
    select: {
      id: true,
      excerpt: true,
      title: true,
      slug: true,
      coverImageUrl: true,
      published: true,
      isFeatured: true,
      createdAt: true,
    },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function getCaseStudy(id: string) {
  return prisma.caseStudy.findUnique({ where: { id } });
}

export async function createCaseStudy(input: CaseStudyInput) {
  const created = await prisma.caseStudy.create({
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt || null,
      coverImageUrl: input.coverImageUrl,
      sections: input.sections,
      published: input.published,
      isFeatured: input.isFeatured,
    },
    select: { id: true },
  });
  revalidatePath("/case-studies");
  return created;
}

export async function updateCaseStudy(id: string, input: CaseStudyInput) {
  await prisma.caseStudy.update({
    where: { id },
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt || null,
      coverImageUrl: input.coverImageUrl,
      sections: input.sections,
      published: input.published,
      isFeatured: input.isFeatured,
    },
  });
  revalidatePath("/case-studies");
}

export async function deleteCaseStudy(id: string) {
  await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/case-studies");
}
