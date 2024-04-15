"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTag(tagId: number) {
  console.log(tagId)
  const deletedTag = await prisma.tag
    .delete({ where: { id: tagId } })
    .catch(() => {
      throw new Error("Failed to delete tag");
    });
  revalidatePath("/ws/tags");
  return deletedTag;
}
