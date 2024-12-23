"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function ResidentPayment(formData: FormData) {
  const paymentFormData = {
    residentName: formData.get("residentname") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phonenumber") as string,
    paymentType: formData.get("paymenttype") as string,
    dueDate: formData.get("duedate") as string,
    paymentAmount: Number(formData.get("paymentamount")),
  };

  try {
    const resident = await prisma.user.findUnique({
      where: {
        email: paymentFormData.email,
      },
      include: {
        residentData: true,
      },
    });

    const res = resident?.residentData?.id;

    await prisma.resident.update({
      where: { id: res },
      data: {
        payment: {
          create: {
            paymenttype: paymentFormData.paymentType,
            paymentamount: paymentFormData.paymentAmount,
            duedate: new Date(paymentFormData.dueDate).toISOString(),
          },
        },
      },
    });

    revalidateTag("get-residents");

    return {
      message: "Payment successfully created",
      resident,
    };
  } catch (error) {
    return {
      message: `Error creating resident payment: ${error}`,
    };
  }
}
