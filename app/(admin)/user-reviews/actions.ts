// app/(admin)/user-reviews/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateReviewStatus(
  id: string,
  status: "approved" | "rejected",
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.review.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/dashboard");
  revalidatePath("/user-reviews");
}
