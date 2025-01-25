"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function AddVehicle(formData: FormData) {
  const vehicleDetails = {
    vehiclemodel: formData.get("vehiclemodel") as string,
    vehiclemake: formData.get("vehiclemake") as string,
    vehiclecolor: formData.get("vehiclecolor") as string,
    vehiclenumber: formData.get("vehiclenumber") as string,
    residentId: formData.get("residentId") as string,
  };

  try {
    const resident = await prisma.resident.findUnique({
      where: {
        id: vehicleDetails.residentId,
      },
      include: {
        vehicle: true,
      },
    });

    if (!resident) {
      return {
        message: "No resident found",
      };
    }

    await prisma.resident.update({
      where: {
        id: resident?.id,
      },

      data: {
        vehicle: {
          create: {
            vehiclecolor: vehicleDetails.vehiclecolor,
            vehiclemake: vehicleDetails.vehiclemake,
            vehiclemodel: vehicleDetails.vehiclemodel,
            vehiclenumber: vehicleDetails.vehiclenumber,
          },
        },
      },
    });

    revalidateTag("get-all-residents");

    revalidateTag("get-residents");
    revalidateTag("users");

    return {
      message: "Your vehicle has been successfully added!",
    };
  } catch (error) {
    return {
      message: `Failed to add vehicle!`,
    };
  }
}
