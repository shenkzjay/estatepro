"use server";

import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const getMaintenanceDetails = unstable_cache(
  async (id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },

        include: {
          residentData: {
            include: {
              maintenance: {
                select: {
                  id: true,
                  image: true,
                  category: true,
                  description: true,
                  status: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        return {
          message: "No user found",
        };
      }

      return user.residentData?.maintenance;
    } catch (error) {
      return {
        message: `Failed to fetch maintenance data`,
      };
    }
  },
  ["get-maintenance-issues"],
  { revalidate: 3600, tags: ["get-maintenance-issues"] }
);
