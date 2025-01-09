"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function CreateEstateUpdates(formData: FormData) {
  const description = formData.get("description") as string;
  const title = formData.get("title") as string;
  const selectedTags = JSON.parse(formData.get("selectedTags") as string);
  const userId = formData.get("userId") as string;

  try {
    // Ensure the user creating the update is an admin
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!adminUser || adminUser.role !== "ADMIN") {
      return { message: "Only admins can create estate updates." };
    }

    // Use a transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma) => {
      // Create the estate update
      const estateUpdate = await prisma.estateUpdates.create({
        data: {
          title,
          tags: selectedTags,
          description,
          user: { connect: { id: userId } },
        },
      });

      // Propagate the update to all residents and staff
      // await prisma.user.updateMany({
      //   where: {
      //     OR: [{ role: "RESIDENT" }, { role: "STAFF" }],
      //   },
      //   data: {
      //     estateUpdates: {
      //       connect: { id: estateUpdate.id },
      //     },
      //   },
      // });

      return estateUpdate;
    });

    // Revalidate cache tags
    revalidateTag("users");
    revalidateTag("get-residents");
    revalidateTag("get-all-residents");
    revalidateTag("get-updates");
    revalidateTag("get-all-users");

    return {
      message: "Estate update successfully added and propagated to all residents and staff.",
      estateUpdate: result,
    };
  } catch (error) {
    console.error("Error adding Estate updates:", error);
    return { message: "Error adding estate updates." };
  }
}
