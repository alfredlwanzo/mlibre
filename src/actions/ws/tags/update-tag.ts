"use server";
// import { newTagformSchema } from "@/app/ws/tags/new/page";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editTagformSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: "Le titre doit comporter au moins 2 caractères.",
    })
    .trim(),
  slug: z.string(),
  description: z
    .string()
    .max(255, {
      message: "La description doit comporter au max 255 caractères.",
    })
    .nullable(),
  imageUrl: z.string().nullable(),
  published: z.boolean(),
  verified: z.boolean(),
});

export async function updateTag(formData: z.infer<typeof editTagformSchema>) {
  const updatedTag = await prisma.tag
    .update({ where: { id: formData.id }, data: formData })
    .catch(() => {
      throw new Error("Failed to update tag");
    });
  revalidatePath("/ws/tags");
  return updatedTag;
}
