"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

const formSchema = z
  .object({
    userId: z.number(),
    newPassword: z.string().min(6, {
      message: "Le mot de passe doit comporter au moins 6 caractères.",
    }),
    confirmNewPassword: z.string().min(6, {
      message: "Le mot de passe doit comporter au moins 6 caractères.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export async function changeUserPassword(formData: z.infer<typeof formSchema>) {
  const { newPassword, userId } = formData;
  const hashedPWD = await bcrypt.hash(newPassword, 10);
  const updatedUser = await prisma.user
    .update({ where: { id: userId }, data: { password: hashedPWD } })
    .catch(() => {
      throw new Error("Failed to update password");
    });
  const { password, ...userWithouPassword } = updatedUser;
  revalidatePath("/ws/users");
  return userWithouPassword;
}
