"use server";

import { prisma } from "@/utils/prisma";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const confirmDeleteSchema = z.string().min(1, "Please enter the text 'DELETE' in the box ");

export async function DeleleStaffAction(formData: FormData, staffId: string) {
  const confirmDelete = formData.get("Confirm delete") as string;

  console.log(confirmDelete);

  const validation = confirmDeleteSchema.safeParse(confirmDelete);

  if (confirmDelete.toLowerCase() !== "" && confirmDelete.toLowerCase() !== "delete") {
    return {
      success: false,
      message: "Typo in inputted text. Please retype again",
      error: null,
    };
  }

  if (!validation.success) {
    return {
      success: false,
      message: "Please enter the text 'DELETE' in the box",
      error: validation.error.errors.map((error) => error.message),
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: staffId,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Delete operation failed because no user was found",
        error: null,
      };
    }

    await prisma.user.delete({
      where: {
        id: staffId,
      },
    });

    revalidateTag("get-staff-details");
    revalidateTag("get-staff");

    //   return {
    //     success: true,
    //     message: "Resident successfully deleted",
    //   };
  } catch (error) {
    return {
      success: false,
      message: "Server error! Delete operation failed",
      error: error,
    };
  }

  redirect("/dashboard/admin/manage-staffs/");
}
