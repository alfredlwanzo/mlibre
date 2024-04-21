"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  tagId: z.string().cuid(),
  redirectToTags: z.boolean().optional(),
});

export async function deleteTag(formData: z.infer<typeof formSchema>) {
  const deletedTag = await prisma.tag
    .delete({ where: { id: formData.tagId } })
    .catch(() => {
      throw new Error("Failed to delete tag");
    });
  if (formData.redirectToTags) {
    redirect("/ws/tags");
  } else {
    revalidatePath("/ws/tags");
    return deletedTag;
  }
}
