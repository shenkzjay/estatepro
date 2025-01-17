"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const PaymentSchema = z.object({
  residentName: z.string().min(1, "Please provide resident name"),
  email: z.string().email().min(1),
  phoneNumber: z.string().min(1, "Please provide Phone number"),
  paymentType: z.string().min(1, "Please provide Payment type"),
  dueDate: z.string().date(),
  paymentAmount: z.number().min(1, "Please provide Payment amount"),
});

export async function ResidentPayment(formData: FormData) {
  const paymentFormData = {
    residentName: formData.get("residentname") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phonenumber") as string,
    paymentType: formData.get("paymenttype") as string,
    dueDate: formData.get("duedate") as string,
    paymentAmount: Number(formData.get("paymentamount")),
  };

  const validation = PaymentSchema.safeParse(paymentFormData);

  if (!validation.success) {
    const formattedErrors = validation.error.flatten().fieldErrors;

    return {
      data: null,
      success: false,
      message: "Validation error",
      error: formattedErrors,
    };
  }

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
    revalidateTag("get-all-users");
    revalidateTag("users");

    return {
      data: resident,
      success: true,
      message: "Payment successfully created",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: `Error trying to create payment`,
      error: "Error trying to create payment",
    };
  }
}
