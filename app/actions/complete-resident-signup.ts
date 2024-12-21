"use server";

import { revalidateTag } from "next/cache";
import { hashPassword, comparePassword } from "../lib/session";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function CompleteResidentSignUp(formData: FormData) {
  try {
    const pwd = formData.get("password") as string;

    const confirmPwd = formData.get("confirmpassword") as string;

    const token = formData.get("token") as string;

    console.log({ token });

    //we hashed only the confirm password
    //because the password compare function
    //compares a plainstring and hashedstring
    const hashedConfirmPwd = await hashPassword(confirmPwd);

    const isPassWordMatch = await comparePassword(pwd, hashedConfirmPwd);

    if (!isPassWordMatch) {
      return {
        message: "Passwords do not match",
      };
    }

    const magiclink = await prisma.magiclink.findUnique({
      where: { token: token },
      include: {
        user: true,
      },
    });

    if (!magiclink) {
      return {
        message: "Invalid token",
      };
    }

    if (magiclink.expiresAt === null || new Date() > magiclink.expiresAt) {
      redirect("/auth/resend-link");
    }

    await prisma.user.update({
      where: { email: magiclink.user.email },
      data: {
        password: hashedConfirmPwd,
      },
    });

    await prisma.magiclink.delete({
      where: { token },
    });

    console.log({ isPassWordMatch });

    console.log({ pwd, confirmPwd });
    revalidateTag("validatetoken");
  } catch (error) {
    return {
      message: `Error creating user password: ${error}`,
    };
  }

  redirect("/auth/signin");
}
