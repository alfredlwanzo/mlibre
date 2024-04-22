"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { phoneRegex, usernameRegex } from "@/lib/utils";

const formSchema = z
  .object({
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
      }),
    email: z
      .string()
      .email({ message: "Le format de l'adresse mail n'est pas valide" }),
    password: z.string().min(6, {
      message: "Le mot de passe doit comporter au moins 6 caractères.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Le mot de passe doit comporter au moins 6 caractères.",
    }),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export async function createUser(formData: z.infer<typeof formSchema>) {
  const { password, confirmPassword, ...dataWithoutPasswords } = formData;
  const hashedPWD = await bcrypt.hash(password, 10);
  await prisma.user
    .create({ data: { ...dataWithoutPasswords, password: hashedPWD } })
    .catch(() => {
      throw new Error("Failed to create user");
    });
  redirect("/ws/users");
}
