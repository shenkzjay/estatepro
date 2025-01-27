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
          estateUpdates: true,
          createdAt: true,
          residentData: {
            select: {
              id: true,
              housenumber: true,
              streetaddress: true,
              housetype: true,
              phonenumber: true,
              residentcode: true,
              moveindate: true,
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
                select: {
                  id: true,
                  description: true,
                  category: true,
                  createdAt: true,
                  status: true,
                  image: true,
                },
              },
              visitorcode: {
                select: {
                  id: true,
                  visitorname: true,
                  visitoremail: true,
                  visitornumber: true,
                  code: true,
                  status: true,
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
  ["get-all-residents"],
  { revalidate: 3600, tags: ["get-all-residents"] }
);
