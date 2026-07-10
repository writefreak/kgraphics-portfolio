"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteDesign(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.design.delete({ where: { id } });
  revalidatePath("/designs");
}

export async function toggleFeatured(id: string, featured: boolean) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.design.update({
    where: { id },
    data: { isFeatured: featured },
  });
  revalidatePath("/designs");
}
