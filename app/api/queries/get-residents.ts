"use server";

import { prisma } from "@/utils/prisma";
import { Role } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const getResidents = unstable_cache(
  async (role?: Role) => {
    try {
      const residents = await prisma.user.findMany({
        where: role ? { role } : {},
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          residentData: {
            select: {
              id: true,
              housenumber: true,
              streetaddress: true,
              housetype: true,
              phonenumber: true,
              vehicle: {
                select: {
                  vehiclemake: true,
                  vehiclemodel: true,
                  vehiclenumber: true,
                },
              },
              payment: {
                select: {
                  id: true,
                  paymentamount: true,
                  paymenttype: true,
                  duedate: true,
                  paymentstatus: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      });

      return residents;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  ["get-residents"],
  { tags: ["get-residents"] }
);
