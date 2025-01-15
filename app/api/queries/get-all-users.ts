"use server";

import { prisma } from "@/utils/prisma";
import { Role } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const getAllUsers = unstable_cache(
  async () => {
    try {
      const allusers = await prisma.user.findMany({
        include: {
          residentData: true,
          staffData: true,
          estateUpdates: true,
        },
      });

      return allusers;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  ["get-all-users"],
  { revalidate: 3600, tags: ["get-all-users"] }
);
