"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: number) {
  const deletedUser = await prisma.user
    .delete({ where: { id: userId } })
    .catch(() => {
      throw new Error("Failed to delete user");
    });
  revalidatePath("/ws/users");
  return deletedUser;
}
