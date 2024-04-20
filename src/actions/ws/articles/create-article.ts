"use server";

import prisma from "@/lib/prisma";
import { formatSlug, tagOptionSchema } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { date, z } from "zod";

const formSchema = z.object({
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
  authorId: z.number(),
  published: z.boolean(),
  commentable: z.boolean(),
  verified: z.boolean(),
  blocked: z.boolean(),
});

export async function createArticle(formData: z.infer<typeof formSchema>) {
  const { tags, customTags, ...formDataWithoutTags } = formData;

  const slug = formatSlug(formData.title);
  const year = new Date().getFullYear();

  const tagIds = tags.map((tag) => {
    return { tagId: Number(tag.value) };
  });

  const newArticle = await prisma.article
    .create({
      data: { year, slug, ...formDataWithoutTags, tags: { create: tagIds } },
    })
    .catch(() => {
      throw new Error("Failed to create article");
    });
  redirect(`/ws/articles/${newArticle.id}?new=success`);
}
