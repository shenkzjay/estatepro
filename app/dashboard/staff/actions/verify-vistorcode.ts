"use server";

import { prisma } from "@/utils/prisma";

export async function VerifyVisitorCode(formdata: FormData) {
  const visitorCode = formdata.get("visitorcode") as string;

  const residentCode = await prisma.visitorCode.findFirst({
    where: {
      code: visitorCode,
    },
    include: {
      resident: {
        include: {
          visitorcode: true,
        },
      },
    },
  });

  if (!residentCode) {
    return {
      success: false,
      message: "No resident with this code found",
      data: null,
    };
  }

  if (residentCode.resident.residentcode === visitorCode) {
    return {
      success: true,
      message: "Resident code verified",
      data: residentCode,
    };
  }

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
            residentcode: true,
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
      data: visitor,
      success: true,
    };
  } catch (error) {
    return {
      message: `Failed to verify code ${error}`,
      data: null,
      success: false,
    };
  }
}
