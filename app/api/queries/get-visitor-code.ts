"use server";

import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const GetVisitorsCode = unstable_cache(
  async (residentId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: residentId,
        },

        include: {
          residentData: {
            include: {
              visitorcode: true,
            },
          },
        },
      });

      const residentDataId = user?.residentData?.id;

      const visitor = await prisma.resident.findUnique({
        where: {
          id: residentDataId,
        },
        select: {
          visitorcode: {
            select: {
              id: true,
              visitoremail: true,
              visitorname: true,
              visitornumber: true,
              code: true,
              status: true,
              Dateofvisit: true,
            },
          },
        },
      });

      return visitor?.visitorcode;
    } catch (error) {
      return {
        message: `failed to fetch visitors ${error}`,
      };
    }
  },
  ["get-visitors"],
  { revalidate: 60, tags: ["get-visitors"] }
);
