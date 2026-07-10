"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function deleteDesign(id: string) {
  //   const { userId } = await auth();
  //   if (!userId) throw new Error("Unauthorized");

  await prisma.design.delete({ where: { id } });
  revalidatePath("/designs");
}

export async function toggleFeatured(id: string, featured: boolean) {
  //   const { userId } = await auth();
  //   if (!userId) throw new Error("Unauthorized");

  await prisma.design.update({
    where: { id },
    data: { isFeatured: featured },
  });
  revalidatePath("/designs");
}

export async function createDesign(formData: FormData) {
  //   const { userId } = await auth();
  //   if (!userId) throw new Error("Unauthorized");

  const file = formData.get("image") as File;
  const title = formData.get("title") as string;
  const categoryName = formData.get("category") as string;
  const caption = (formData.get("caption") as string) || null;
  const clientName = (formData.get("clientName") as string) || null;
  const behanceUrl = (formData.get("behanceUrl") as string) || null;

  const ext = file.name.split(".").pop();
  const imagePath = `${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from("design-images")
    .upload(imagePath, file);
  if (uploadError) throw new Error(uploadError.message);

  const slug = categoryName.toLowerCase().trim().replace(/\s+/g, "-");
  const category = await prisma.category.upsert({
    where: { slug },
    update: {},
    create: { slug, name: categoryName.trim() },
  });

  const design = await prisma.design.create({
    data: {
      title,
      imagePath,
      imageAlt: title,
      caption,
      clientName,
      behanceUrl,
      categoryId: category.id,
    },
    include: { category: true },
  });

  const { data } = await supabaseAdmin.storage
    .from("design-images")
    .createSignedUrl(imagePath, 3600);

  revalidatePath("/designs");

  return {
    id: design.id,
    title: design.title,
    category: design.category?.name ?? "Uncategorized",
    imageUrl: data?.signedUrl ?? "",
    imageAlt: design.imageAlt,
    caption: design.caption,
    clientName: design.clientName,
    behanceUrl: design.behanceUrl,
    featured: design.isFeatured,
    displayOrder: design.displayOrder,
    createdAt: design.createdAt,
  };
}

export async function updateDesign(id: string, formData: FormData) {
  //   const { userId } = await auth();
  //   if (!userId) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const categoryName = formData.get("category") as string;
  const caption = (formData.get("caption") as string) || null;
  const clientName = (formData.get("clientName") as string) || null;
  const behanceUrl = (formData.get("behanceUrl") as string) || null;
  const file = formData.get("image") as File | null;

  const slug = categoryName.toLowerCase().trim().replace(/\s+/g, "-");
  const category = await prisma.category.upsert({
    where: { slug },
    update: {},
    create: { slug, name: categoryName.trim() },
  });

  let imagePath: string | undefined;

  // Only touch storage if a new file was actually attached
  if (file && file.size > 0) {
    const existing = await prisma.design.findUniqueOrThrow({
      where: { id },
    });

    const ext = file.name.split(".").pop();
    imagePath = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("design-images")
      .upload(imagePath, file);
    if (uploadError) throw new Error(uploadError.message);

    // Clean up the old file so we don't leak orphaned storage objects
    await supabaseAdmin.storage
      .from("design-images")
      .remove([existing.imagePath]);
  }

  const design = await prisma.design.update({
    where: { id },
    data: {
      title,
      caption,
      clientName,
      behanceUrl,
      categoryId: category.id,
      ...(imagePath ? { imagePath } : {}),
    },
    include: { category: true },
  });

  const { data } = await supabaseAdmin.storage
    .from("design-images")
    .createSignedUrl(design.imagePath, 3600);

  revalidatePath("/designs");

  return {
    id: design.id,
    title: design.title,
    category: design.category?.name ?? "Uncategorized",
    imageUrl: data?.signedUrl ?? "",
    imageAlt: design.imageAlt,
    caption: design.caption,
    clientName: design.clientName,
    behanceUrl: design.behanceUrl,
    featured: design.isFeatured,
    displayOrder: design.displayOrder,
    createdAt: design.createdAt,
  };
}
