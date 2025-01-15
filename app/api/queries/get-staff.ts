// "use server";

import { prisma } from "@/utils/prisma";
import { unstable_cache } from "@/app/lib/unstable-cache";
import { Role } from "@prisma/client";

export const getStaff = unstable_cache(
  async (role?: Role) => {
    try {
      const staff = await prisma.user.findMany({
        where: role ? { role } : {},
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          staffData: {
            select: {
              position: true,
              phonenumber: true,
            },
          },
        },
      });

      return staff;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  ["get-staff"],
  { revalidate: 3600 }
);
