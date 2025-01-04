"use server";

import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const getAllResidentDetails = unstable_cache(
  async (id: string) => {
    try {
      const residents = await prisma.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
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
              occupants: {
                select: {
                  id: true,
                  occupantsname: true,
                  occupantsnumber: true,
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
  ["get-all-residents"],
  { tags: ["get-all-residents"], revalidate: 60 }
);
