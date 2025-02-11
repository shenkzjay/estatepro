"use server";

import { prisma } from "@/utils/prisma";
import { Role } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const getResidents = unstable_cache(
  async (role?: Role) => {
    try {
      const residents = await prisma.user.findMany({
        where: role ? { role } : {},
        orderBy: {
          createdAt: "asc",
        },
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
                  id: true,
                  vehiclemake: true,
                  vehiclemodel: true,
                  vehiclenumber: true,
                  vehiclecolor: true,
                },
              },
              payment: {
                orderBy: {
                  duedate: "asc",
                },
                select: {
                  id: true,
                  paymentamount: true,
                  paymenttype: true,
                  duedate: true,
                  paymentstatus: true,
                  createdAt: true,
                },
              },
              occupants: {
                select: {
                  id: true,
                  occupantsname: true,
                  occupantsnumber: true,
                },
              },
              maintenance: {
                orderBy: {
                  createdAt: "asc",
                },
                select: {
                  id: true,
                  description: true,
                  image: true,
                  category: true,
                  createdAt: true,
                  status: true,
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
  { revalidate: 3600, tags: ["get-residents"] }
);
