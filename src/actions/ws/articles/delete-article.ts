"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  articleId: z.number(),
  redirectToArticles: z.boolean().optional(),
});

export async function deleteArticle(formData: z.infer<typeof formSchema>) {
  const deletedArticle = await prisma.article
    .delete({ where: { id: formData.articleId } })
    .catch(() => {
      throw new Error("Failed to delete article");
    });
  if (formData.redirectToArticles) {
    redirect("/ws/articles");
  } else {
    revalidatePath("/ws/articles");
    return deletedArticle;
  }
}
