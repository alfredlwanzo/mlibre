"use server";
// import { newTagformSchema } from "@/app/ws/tags/new/page";
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
  const newTag = await prisma.tag.create({ data: formData }).catch(() => {
    throw new Error("Failed to create tag");
  });
  revalidatePath("/ws/tags");
  return newTag;
}
