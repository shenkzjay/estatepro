"use server";

import { prisma } from "@/utils/prisma";
import { VisitorCodeStatus } from "@prisma/client";

export const GenerateCodeFormAction = async (formdata: FormData) => {
  const randomCode = Math.random().toString(36).slice(6);
  const data = {
    visitorname: formdata.get("visitorname") as string,
    visitoremail: formdata.get("Email address") as string,
    Date_of_visit: formdata.get("Date of visitation") as string,
    phone_number: formdata.get("Phone number") as string,
    email: formdata.get("email") as string,
    visitorscode: randomCode,
  };

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        residentData: true,
      },
    });

    if (!user) {
      return {
        message: "No user found",
      };
    }

    const resident_Id = user.residentData?.id;

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const response = await prisma.resident.update({
      where: {
        id: resident_Id,
      },
      data: {
        visitorcode: {
          create: {
            visitorname: data?.visitorname,
            visitornumber: data?.phone_number,
            visitoremail: data?.visitoremail,
            code: data?.visitorscode,
            expiresAt: expiresAt,
            status: VisitorCodeStatus.ACTIVE,
            Dateofvisit: data.Date_of_visit,
          },
        },
      },
    });

    console.log(data, "data");

    return {
      message: "visitor's code successfullly created",
      code: data.visitorscode,
    };
  } catch (error) {
    return {
      message: "failed to create visitor's code",
    };
  }
};
