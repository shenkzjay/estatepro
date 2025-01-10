"use server";

import { prisma } from "@/utils/prisma";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { revalidateTag } from "next/cache";

export const handleResendLink = async (prev: any, formData: FormData) => {
  const email = formData.get("email") as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        Magiclink: true,
      },
    });

    if (!user) {
      return {
        message: "No user found",
      };
    }

    let magicLinkId = null;

    if (user.Magiclink.length > 0) {
      magicLinkId = user.Magiclink[0].id; // Existing magic link ID
    }

    const resendtoken = uuidv4();
    const newExpiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24);

    if (magicLinkId) {
      await prisma.magiclink.update({
        where: { id: magicLinkId },
        data: {
          token: resendtoken,
          expiresAt: newExpiryDate,
        },
      });
    } else {
      await prisma.magiclink.create({
        data: {
          token: resendtoken,
          expiresAt: newExpiryDate,
          userId: user.id,
        },
      });
    }

    const magiclink = `http://localhost:3000/completesignup?token=${resendtoken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Send the email first
    await transporter.sendMail({
      from: `"Your email" <${process.env.EMAIL_SERVER_USER}>`,
      to: user.email,
      subject: "Set up your account",
      html: `
              <p>Hello ${user.name},</p>
              <p>You've been invited to set up your account. Click the link below to complete your account setup:</p>
              <a href="${magiclink}" style{{padding:12px 16px; border-radius:10px; background-color:blue; color:white}}>Set up your account</a>
              <p>This link will expire in 24 hours.</p>
            `,
    });

    revalidateTag("users");
    revalidateTag("get-residents");
    revalidateTag("get-all-residents");
    revalidateTag("get-all-users");

    return {
      message: "Resend link sent successfully",
      user,
    };
  } catch (error) {
    return {
      message: `Error sending link ${error}`,
    };
  }
};
