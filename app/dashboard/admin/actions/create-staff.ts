"use server";

import { v4 as uuidv4 } from "uuid";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { prisma } from "@/utils/prisma";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function CreateStaff(formData: FormData) {
  const staffDetails = {
    fullname: formData.get("fullname") as string,
    email: formData.get("email") as string,
    phonenumber: formData.get("phonenumber") as string,
    position: formData.get("position") as string,
  };

  const completesignuptoken = uuidv4();

  try {
    const ip = (await headers().get("x-real-ip")) ?? "local";

    console.log({ ip });

    const duplicateUser = await prisma.user.findUnique({
      where: {
        email: staffDetails.email,
      },
    });

    if (duplicateUser) {
      return {
        success: false,
        message: "Duplicate user",
        error: "Duplicate user",
      };
    }

    console.log({ completesignuptoken });

    const magiclink = `http://localhost:3000/completesignup?token=${completesignuptoken}`;

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
      to: staffDetails.email,
      subject: "Set up your account",
      html: `
          <p>Hello ${staffDetails.fullname},</p>
          <p>You've been invited to set up your account. Click the link below to complete your account setup:</p>
          <a href="${magiclink}" style{{padding:12px 16px; border-radius:10px; background-color:blue; color:white}}>Set up your account</a>
          <p>This link will expire in 24 hours.</p>
        `,
    });

    const tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // If the email sends successfully, create the user
    const newStaff = await prisma.user.create({
      data: {
        email: staffDetails.email,
        name: staffDetails.fullname,
        role: Role.STAFF,
        Magiclink: {
          create: {
            token: completesignuptoken,
            expiresAt: tokenExpiration,
          },
        },
        staffData: {
          create: {
            position: staffDetails.position,
            phonenumber: staffDetails.phonenumber,
          },
        },
      },
    });

    console.log({ newStaff });

    revalidateTag("get-staff");

    return {
      error: null,
      message: "new Staff created successfully",
      success: true,
    };
  } catch (error) {
    return {
      message: `Error creating new staff`,
      error: error,
      success: false,
    };
  }
}
