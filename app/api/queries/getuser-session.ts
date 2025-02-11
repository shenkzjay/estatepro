"use server";

import { getSession } from "@/app/lib/session";
import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const GetUsers = unstable_cache(
  async () => {
    try {
      const usersession = await getSession();

      console.log({ usersession });

      if (!usersession) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: { id: usersession?.user.id },
      });

      return user;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  ["users"],
  { revalidate: 3600, tags: ["users"] }
);
