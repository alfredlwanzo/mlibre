"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const newTagformSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le titre doit comporter au moins 2 caractères.",
    })
    .trim(),
  slug: z.string(),
  description: z.string().max(255, {
    message: "La description doit comporter au max 255 caractères.",
  }),
  imageUrl: z.string().optional(),
  published: z.boolean(),
  verified: z.boolean(),
});

export async function createTag(formData: z.infer<typeof newTagformSchema>) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to create a tag");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
    const newTag = await prisma.tag.create({ data: formData }).catch(() => {
      throw new Error("Failed to create tag");
    });
    revalidatePath("/ws/tags");
    return newTag;
  } else {
    throw new Error("You must be admin or owner to create a tag");
  }
}
