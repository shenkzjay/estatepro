"use server";

import { prisma } from "@/utils/prisma";
import { MaintenanceStatus } from "@prisma/client";
import ImageKit from "imagekit";
import { revalidateTag } from "next/cache";

export async function CreateMaintenanceIssues(formData: FormData) {
  const image = formData.get("uploadfile") as File;
  const description = formData.get("description") as string;
  const category = formData.get("selectedItem") as string;
  const residentId = formData.get("residentId") as string;

  const publickey = process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!;
  const privatekey = process.env.IMAGE_KIT_PRIVATE_KEY!;
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_END_POINT!;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: residentId,
      },
      include: {
        residentData: {
          include: {
            maintenance: true,
          },
        },
      },
    });

    if (!user) {
      return {
        message: "No user found",
      };
    }

    const resident_Id = user.residentData?.id;

    console.log(user);

    const imagekit = new ImageKit({
      publicKey: publickey,
      privateKey: privatekey,
      urlEndpoint: urlEndpoint,
    });

    // Convert file to base64
    const buffer = await image.arrayBuffer();
    const base64File = Buffer.from(buffer).toString("base64");

    const uploadResponse = await imagekit.upload({
      file: base64File,
      fileName: image.name,
    });

    if (!uploadResponse)
      return {
        message: "No image uploaded",
      };

    await prisma.resident.update({
      where: {
        id: resident_Id,
      },
      data: {
        maintenance: {
          create: {
            image: uploadResponse.url,
            description: description,
            category: category,
            status: MaintenanceStatus.OPEN,
          },
        },
      },
    });

    // console.log(uploadResponse);

    revalidateTag("get-all-residents");

    revalidateTag("get-residents");

    revalidateTag("users");

    revalidateTag("get-maintenance-issues");

    return {
      message: "issues Successfully created",
    };
  } catch (error) {
    return {
      message: `failed to upload image ${error}`,
    };
  }
}
