"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { revalidatePath } from "next/cache";

interface SubmitContactInput {
  name: string;
  email: string;
  description: string;
}

export async function submitContactForm(input: SubmitContactInput) {
  const { name, email, description } = input;

  if (!name?.trim() || !email?.trim() || !description?.trim()) {
    return { success: false, error: "All fields are required." };
  }

  try {
    await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        description: description.trim(),
      },
    });

    await resend.emails.send({
      from: "K-Graphics <onboarding@resend.dev>", // swap for your verified domain sender
      to: "estheramuleya3@gmail.com",
      replyTo: email.trim(),
      subject: `New inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${description.trim()}`,
    });

    revalidatePath("/userReviews"); // or wherever your dashboard route actually is
    return { success: true };
  } catch (err) {
    console.error("Failed to submit contact form:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
