"use server";

import prisma from "@/lib/prisma";
import { formatSlug, tagOptionSchema } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(2, {
      message: "Le titre doit comporter au moins 2 caractères.",
    })
    .trim(),
  description: z.string().max(255, {
    message: "La description doit comporter au max 255 caractères.",
  }),
  content: z.string(),
  markdown: z.string(),
  imageUrl: z.string(),
  tags: z.array(tagOptionSchema),
  customTags: z.array(tagOptionSchema),
  authorId: z.string().cuid(),
  published: z.boolean(),
  commentable: z.boolean(),
  verified: z.boolean(),
  blocked: z.boolean(),
});

export async function updateArticle(formData: z.infer<typeof formSchema>) {
  const { tags, customTags, ...formDataWithoutTags } = formData;

  const slug = formatSlug(formData.title);
  const year = new Date().getFullYear();

  const newTagIds = tags.map((tag) => {
    return { tagId: tag.value };
  });

  const updatedArticle = await prisma.article
    .update({
      where: { id: formData.id },
      data: {
        year,
        slug,
        ...formDataWithoutTags,
        tags: { deleteMany: {}, create: newTagIds },
      },
    })
    .catch(() => {
      throw new Error("Failed to update article");
    });

  revalidatePath(`/ws/articles`);
  return updatedArticle;
}
