"use server";

import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";

export async function DeletePayment(paymentId: string) {
  try {
    const payment = await prisma.paymentData.findUnique({
      where: {
        id: paymentId,
      },
    });

    if (!payment) {
      return {
        message: "No payment found for user",
        success: false,
      };
    }

    await prisma.paymentData.delete({
      where: {
        id: paymentId,
      },
    });

    revalidateTag("get-residents");
    revalidateTag("get-residents");
    revalidateTag("get-all-users");
    revalidateTag("users");

    return {
      message: "Payment successfully deleted!",
      success: true,
    };
  } catch (error) {
    return {
      message: `Failed to delete Payment: ${error}`,
      success: false,
    };
  }
}
