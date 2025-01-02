"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function DeleteVisitorCode(visitorId: string) {
  try {
    const visitor = await prisma.visitorCode.findUnique({
      where: {
        id: visitorId,
      },
    });

    if (!visitor) {
      return {
        message: "No visitor found",
      };
    }

    await prisma.visitorCode.delete({
      where: {
        id: visitorId,
      },
    });

    revalidateTag("get-visitors");

    return {
      message: "Visitor's code successfully deleted!",
    };
  } catch (error) {
    return {
      message: `Failed to delete visitor's code: ${error}`,
    };
  }
}
