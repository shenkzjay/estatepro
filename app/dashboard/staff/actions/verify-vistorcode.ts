"use server";

import { prisma } from "@/utils/prisma";

export async function VerifyVisitorCode(formdata: FormData) {
  const visitorCode = formdata.get("visitorcode") as string;

  try {
    const visitor = await prisma.visitorCode.findFirst({
      where: {
        code: visitorCode,
      },
      select: {
        visitornumber: true,
        visitoremail: true,
        visitorname: true,
        Dateofvisit: true,
        createdAt: true,
        expiresAt: true,
        status: true,
        code: true,
        resident: {
          select: {
            housenumber: true,
            streetaddress: true,
            phonenumber: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return {
      message: "Code verification Successfull",
      visitor,
    };
  } catch (error) {
    return {
      message: `Failed to verify code ${error}`,
    };
  }
}
