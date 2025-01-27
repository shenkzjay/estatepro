"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export const deleteVehicle = async (vehicleId: string) => {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      return {
        success: false,
        message: "Vehicle not found",
      };
    }

    await prisma.vehicle.delete({
      where: {
        id: vehicleId,
      },
    });

    revalidateTag("get-all-residents");
    revalidateTag("get-residents");

    return {
      success: true,
      message: "Successfully deleted vehicle",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to delete Vehicle",
    };
  }
};
