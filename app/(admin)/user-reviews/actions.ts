// app/(admin)/user-reviews/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateReviewStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.review.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/");
    revalidatePath("/userReviews");
    return { success: true };
  } catch (err) {
    console.error("Failed to update review status:", err);
    return { success: false, error: "Could not update review status." };
  }
}

export async function toggleReviewFeatured(id: string, featured: boolean) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.review.update({
      where: { id },
      data: { featured },
    });

    revalidatePath("/");
    revalidatePath("/user-reviews");
    return { success: true };
  } catch (err) {
    console.error("Failed to update featured status:", err);
    return { success: false, error: "Could not update featured status." };
  }
}

export async function deleteReview(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.review.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/user-reviews");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete review:", err);
    return { success: false, error: "Could not delete review." };
  }
}

interface SubmitReviewInput {
  name: string;
  rating: number;
  comment: string;
  designId?: string | null;
}

// Public — no auth() check, anyone can submit a review for moderation.
export async function submitReview(input: SubmitReviewInput) {
  const { name, rating, comment, designId } = input;

  if (!name?.trim() || !comment?.trim()) {
    return { success: false, error: "Name and comment are required." };
  }
  if (rating < 1 || rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5." };
  }

  try {
    await prisma.review.create({
      data: {
        clientName: name.trim(),
        rating,
        comment: comment.trim(),
        status: "pending",
        designId: designId ?? null,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Failed to submit review:", err);
    return { success: false, error: "Could not submit review." };
  }
}
