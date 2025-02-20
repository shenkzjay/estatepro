"use server";

import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const GetUpdates = unstable_cache(
  async () => {
    try {
      const updates = await prisma.user.findMany({
        select: {
          estateUpdates: {
            select: {
              id: true,
              title: true,
              description: true,
              tags: true,
              createdAt: true,
            },
          },
        },
      });
      return {
        message: "Successfully fetched estated updates",
        updates,
      };
    } catch (error) {
      return {
        message: `failed to fetch estated updates ${error}`,
      };
    }
  },
  ["get-updates"],
  { revalidate: 3600, tags: ["get-updates"] }
);
