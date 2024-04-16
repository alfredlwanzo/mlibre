"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Le format de l'adresse mail n'est pas valide" }),
  password: z.string().min(6, {
    message: "Le mot de passe doit comporter au moins 6 caractères.",
  }),
  avatar: z.string().nullable().optional(),
  name: z
    .string()
    .min(4, {
      message: "Le nom doit comporter au moins 4 caractères.",
    })
    .trim(),
  bio: z
    .string()
    .max(255, {
      message: "La description doit comporter au max 255 caractères.",
    })
    .optional(),
  role: z.enum(["subscriber", "author", "editor", "admin", "owner"]),
  blocked: z.boolean().optional(),
  verified: z.boolean().optional(),
});

export async function createUser(formData: z.infer<typeof formSchema>) {
  await prisma.user.create({ data: formData }).catch(() => {
    throw new Error("Failed to create user");
  });
  redirect("/ws/users")
}
