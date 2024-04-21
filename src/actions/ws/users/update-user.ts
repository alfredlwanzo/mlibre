"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { phoneRegex, usernameRegex } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  id: z.string().cuid(),
  username: z
    .string()
    .min(3, {
      message: "L'identifiant doit comporter au moins 3 caractères.",
    })
    .max(15, {
      message: "L'identifiant doit comporter au max 15 caractères.",
    })
    .regex(usernameRegex, {
      message:
        "L'identifiant doit contenir uniquement des lettres miniscules et des chiffres sans espace. Évitez les caractères spéciaux",
    })
    .optional(),
  email: z
    .string()
    .email({ message: "Le format de l'adresse mail n'est pas valide" })
    .optional(),
  avatar: z.string().nullable().optional(),
  phone: z
    .string()
    .min(10, {
      message: "Le numéro de téléphone doit comporter au moins 10 chiffres.",
    })
    .max(14, {
      message: "Le numéro de téléphone doit comporter au max 14 chiffres.",
    })
    .regex(phoneRegex, { message: "Le numéro de téléphone n'est valide" })
    .trim()
    .optional(),
  name: z
    .string()
    .min(4, {
      message: "Le nom doit comporter au moins 4 caractères.",
    })
    .trim()
    .optional(),
  bio: z
    .string()
    .max(255, {
      message: "La description doit comporter au max 255 caractères.",
    })
    .optional(),
  role: z.enum(["subscriber", "author", "editor", "admin", "owner"]).optional(),
  blocked: z.boolean().optional(),
  verified: z.boolean().optional(),
});

export async function updateUser(formData: z.infer<typeof formSchema>) {
  const { id, ...dataWithoutId } = formData;
  const updatedUser = await prisma.user
    .update({ where: { id }, data: dataWithoutId })
    .catch(() => {
      throw new Error("Failed to update user");
    });
  revalidatePath("/ws/users");
  return updatedUser;
}
