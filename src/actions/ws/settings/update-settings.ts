"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const generalformSchema = z.object({
  id:z.string().cuid(),
  title: z
    .string()
    .min(2, {
      message: "Le titre doit comporter au moins 2 caractères.",
    })
    .trim(),
  description: z.string().max(255, {
    message: "La description doit comporter au max 255 caractères.",
  }),
  language: z.enum(["fr", "en"]),
  status: z.enum(["online", "offline", "maintenance"]),
});

export async function upsertGeneralSettings(
  formData: z.infer<typeof generalformSchema>
) {
  const {id,...formDataWithoutId}=formData
  const updatedSettings = await prisma.app
    .update({
      where: { id: id },
      data: { ...formDataWithoutId },
    })
    .catch((e) => {
      throw new Error("Failed to update app settings");
    });
  revalidatePath("/ws");
  return updatedSettings;
}