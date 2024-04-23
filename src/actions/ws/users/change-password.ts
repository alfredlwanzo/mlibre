"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

const formSchema = z
  .object({
    userId: z.string().cuid(),
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
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to change password");
  }
  if (session.user.role === "admin" || session.user.role === "owner") {
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
  } else {
    throw new Error("You must be admin or owner to change password");
  }
}
