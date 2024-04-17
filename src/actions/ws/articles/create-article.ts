'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
    // tags: z.array(tagOptionSchema),
    // customTags: z.array(tagOptionSchema),
    authorId: z.string(),
    published: z.boolean(),
    commentable: z.boolean(),
    verified: z.boolean(),
    blocked: z.boolean(),
  });

export async function createArticle(formData:z.infer<typeof formSchema>) {
    // const newArticle = await prisma.article.create({ data: formData }).catch(() => {
    //     throw new Error("Failed to create article");
    //   });
    //   revalidatePath("/ws/articles");
    //   return newArticle;
}