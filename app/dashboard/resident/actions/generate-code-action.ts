"use server";

import { prisma } from "@/utils/prisma";
import { generateRandomCodes } from "@/utils/randomcodes";
import { VisitorCodeStatus } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const GenerateCodeFormAction = async (formdata: FormData) => {
  const randomCode = generateRandomCodes(8);
  const data = {
    visitorname: formdata.get("visitorname") as string,
    visitoremail: formdata.get("Email address") as string,
    Date_of_visit: formdata.get("Date of visitation") as string,
    phone_number: formdata.get("Phone number") as string,
    email: formdata.get("email") as string,
    visitorscode: randomCode,
  };

  console.log({ data });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data?.email,
      },
      include: {
        residentData: {
          include: {
            visitorcode: true,
          },
        },
      },
    });

    if (!user) {
      return {
        message: "No user found",
      };
    }

    const resident_Id = user.residentData?.id;

    console.log({ user });
    console.log({ resident_Id });

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const visitor = await prisma.resident.update({
      where: {
        id: resident_Id,
      },
      data: {
        visitorcode: {
          create: [
            {
              visitorname: data?.visitorname,
              visitornumber: data?.phone_number,
              visitoremail: data?.visitoremail,
              code: data?.visitorscode,
              expiresAt: expiresAt,
              status: VisitorCodeStatus.ACTIVE,
              Dateofvisit: new Date(data.Date_of_visit).toISOString(),
            },
          ],
        },
      },

      include: {
        visitorcode: {
          where: {
            code: data.visitorscode,
          },
        },
      },
    });

    console.log(data, "data");

    revalidateTag("users");
    revalidateTag("get-visitors");
    revalidateTag("get-all-residents");
    revalidateTag("get-residents");

    return {
      message: "visitor's code successfullly created",
      code: visitor.visitorcode,
    };
  } catch (error) {
    return {
      message: `failed to create visitor's code ${error}`,
    };
  }
};
