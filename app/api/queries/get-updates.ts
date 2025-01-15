// "use server";

import { prisma } from "@/utils/prisma";
import { unstable_cache } from "@/app/lib/unstable-cache";

export const GetUpdates = unstable_cache(
  async (id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        return {
          message: "No user found",
        };
      }

      const updates = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          estateUpdates: {
            select: {
              id: true,
              title: true,
              description: true,
              tags: true,
              createdAt: true,
              updatedAt: true,
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
  { revalidate: 3600 }
);
