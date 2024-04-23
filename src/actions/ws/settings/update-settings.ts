"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const generalformSchema = z.object({
  id: z.string().cuid(),
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
  const session = await auth();

  if (!session) {
    throw new Error("You must be connected to update settings");
  }

  if (session.user.role === "admin" || session.user.role === "owner") {
    const { id, ...formDataWithoutId } = formData;
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
  } else {
    throw new Error("You must be admin or owner to update settings");
  }
}
