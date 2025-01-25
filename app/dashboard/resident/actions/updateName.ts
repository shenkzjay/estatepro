"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export const updateResidentName = async (residentId: string, residentName: string) => {
  try {
    const resident = await prisma.user.findUnique({
      where: {
        id: residentId,
      },
    });

    if (!resident) {
      return {
        message: "No resident found!",
      };
    }

    await prisma.user.update({
      where: {
        id: residentId,
      },
      data: {
        name: residentName,
      },
    });

    revalidateTag("get-all-residents");
    revalidateTag("get-residents");
    revalidateTag("users");

    return {
      success: true,
      message: "Successfully updated resident name",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update resident name",
    };
  }
};
