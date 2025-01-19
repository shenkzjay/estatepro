"use server";

import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const getStaffDetails = unstable_cache(
  async (id: string) => {
    try {
      const staff = await prisma.user.findUnique({
        where: {
          id: id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          staffData: {
            select: {
              id: true,
              phonenumber: true,
              position: true,
              createdAt: true,
            },
          },
        },
      });

      return staff;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  ["get-staff-details"],
  { revalidate: 3600, tags: ["get-staff-details"] }
);
