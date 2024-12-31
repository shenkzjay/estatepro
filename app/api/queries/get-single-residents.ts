"use server";

import { prisma } from "@/utils/prisma";

export async function GetSingleResident(residentId: string) {
  try {
    const resident = await prisma.user.findUnique({
      where: {
        id: residentId,
      },

      include: {
        residentData: {
          include: {
            payment: true,
          },
        },
      },
    });

    return {
      message: "Resident succesfully returned",
      payments: resident?.residentData?.payment,
    };
  } catch (error) {
    return {
      message: `Error getting residents ${error}`,
    };
  }
}
