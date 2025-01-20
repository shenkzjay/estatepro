"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function DeleteIssues(issueId: string) {
  try {
    const maintenance = await prisma.maintenance.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!maintenance) {
      return {
        message: "No payment found for user",
        success: false,
      };
    }

    await prisma.maintenance.delete({
      where: {
        id: issueId,
      },
    });

    revalidateTag("get-residents");
    revalidateTag("get-all-residents");
    revalidateTag("get-maintenance-issues");
    revalidateTag("users");

    return {
      message: "Maintenance issue successfully deleted!",
      success: true,
    };
  } catch (error) {
    return {
      message: `Failed to delete Maintenance issue: ${error}`,
      success: false,
    };
  }
}
