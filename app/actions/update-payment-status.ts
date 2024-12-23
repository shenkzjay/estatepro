"use server";

import { prisma } from "@/utils/prisma";
import { PaymentStatus } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function UpdatePaymentStatus(status: string, paymentId: string) {
  console.log(status, paymentId);

  const user = await prisma.paymentData.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      resident: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!user) {
    return {
      message: "No payment found",
    };
  }

  await prisma.paymentData.update({
    where: {
      id: user.id,
    },
    data: {
      paymentstatus: status as PaymentStatus,
    },
  });

  revalidateTag("get-residents");

  return {
    message: "Payment status succesffully updated",
  };
}
