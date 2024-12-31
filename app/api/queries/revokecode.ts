"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function RevokeCode(visitorId: string) {
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

    await prisma.visitorCode.update({
      where: {
        id: visitorId,
      },
      data: {
        status: "REVOKED",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      },
    });

    revalidateTag("get-visitors");

    return {
      message: "Code successfully revoked",
    };
  } catch (error: any) {
    return {
      message: `Error revoking visitor code ${error.message}`,
    };
  }
}
