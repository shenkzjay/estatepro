"use server";

import { prisma } from "@/utils/prisma";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { comparePassword, setSession } from "../lib/session";
import { revalidateTag } from "next/cache";

export async function handleSignInAction(prev: any, formData: FormData) {
  const signinData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as string,
  };

  try {
    const ip = (await headers().get("x-real-ip")) ?? "local";

    console.log({ ip });

    const user = await prisma.user.findUnique({
      where: { email: signinData.email },
    });

    console.log({ user });

    if (!user) {
      return {
        message: "No user found. Please contact the administrator",
      };
    }

    if (!user?.password || !user.email) {
      return {
        message: "Invalid username and password",
      };
    }

    const isPasswordValid = await comparePassword(signinData.password, user?.password);

    if (!isPasswordValid) {
      return {
        message: "Invalid username and password",
      };
    }

    await setSession(user);

    revalidateTag("users");
    revalidateTag("get-residents");
    revalidateTag("get-all-residents");
    revalidateTag("get-all-users");

    // return {
    //   message: `User ${user.name} successfully logged in`,
    // };
  } catch (error) {
    return {
      message: `Server Error! Failed to sign in user`,
    };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const clear = await cookies();

  clear.getAll().forEach((cookie) => clear.delete(cookie.name));
  revalidateTag("users");

  redirect("/signin");
}
