"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function AddOccupants(formData: FormData) {
  const occupantsDetails = {
    occupantsname: formData.get("occupantsname") as string,
    occupantsnumber: formData.get("occupantsnumber") as string,
    residentId: formData.get("residentId") as string,
  };

  //   console.log(occupantsDetails);

  try {
    const residents = await prisma.resident.findUnique({
      where: {
        id: occupantsDetails.residentId,
      },

      include: {
        occupants: true,
      },
    });

    if (!residents) {
      return {
        message: "No resident found",
      };
    }

    await prisma.resident.update({
      where: {
        id: residents.id,
      },

      data: {
        occupants: {
          create: {
            occupantsname: occupantsDetails.occupantsname,
            occupantsnumber: occupantsDetails.occupantsnumber,
          },
        },
      },
    });

    revalidateTag("get-all-residents");
    revalidateTag("get-residents");
    revalidateTag("users");

    return {
      message: "Occupant has been added successfully",
    };
  } catch (error) {
    return {
      message: "Failed to add occupants!",
    };
  }
}
