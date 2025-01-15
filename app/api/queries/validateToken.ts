"use server";

import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

export const ValidateToken = unstable_cache(
  async (token: string) => {
    try {
      const magicLink = await prisma.magiclink.findUnique({
        where: { token: token },
      });

      if (!magicLink) {
        throw new Error("Invalid token");
      }

      if (magicLink.expiresAt === null || new Date() > magicLink.expiresAt) {
        redirect("/auth/resend-token");
      }

      return {
        message: "Token legit",
      };
    } catch (error) {
      return {
        message: `Error validating user token: ${error}`,
      };
    }
  },
  ["validatetoken"],
  { revalidate: 3600, tags: ["validatetoken"] }
);
