"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function updateVehicle(formData: FormData) {
  const vehiclemake = formData.get("vehiclemake") || "";
  const vehiclenumber = formData.get("vehiclenumber") || "";
  const vehiclemodel = formData.get("vehiclemodel") || "";
  const vehiclecolor = formData.get("vehiclecolor") || "";
  const vehicleId = (formData.get("vehicleId") as string) || "";

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      return {
        success: false,
        message: "No vehicle found",
      };
    }

    const res = await prisma.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: {
        vehiclecolor: vehiclecolor as string,
        vehiclemake: vehiclemake as string,
        vehiclemodel: vehiclemodel as string,
        vehiclenumber: vehiclenumber as string,
      },
    });

    revalidateTag("get-all-residents");
    revalidateTag("get-residents");
    revalidateTag("users");

    return {
      success: true,
      message: "Successfully updated vehicle details",
    };
  } catch (error) {
    console.error("Failed to update vehicle details:", error);
    return {
      success: false,
      message: `Failed to update resident vehicle details}`,
    };
  }
}
