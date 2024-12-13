"use server";
import { prisma } from "@/utils/prisma";
// import { randomBytes } from "crypto";
import { Role } from "@prisma/client";
import nodemailer from "nodemailer";

export async function getMagiclink(prevState: any, formData: FormData) {
  const rawData = {
    fullname: formData.get("fullname") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as Role,
  };

  const token = window.crypto.randomUUID();

  console.log({ token });

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const validRole = Object.values(Role);

  const roles = validRole.includes(rawData.role) ? rawData.role : Role.RESIDENT;

  //   const user = await prisma.user.create({
  //     data: {
  //       name: rawData.fullname,
  //       email: rawData.fullname,
  //       role: roles,
  //       magicToken: token,
  //       expiresAt,
  //     },
  //   });

  const magiclink = `http://localhost:3000/auth/signup?token=${token}`;

  try {
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
      to: rawData.email,
      subject: "Set up your account",
      html: `
        <p>Hello ${rawData.fullname},</p>
        <p>You've been invited to set up your account. Click the link below to complete your account setup:</p>
        <a href="${magiclink}">Set up your account</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    // If the email sends successfully, create the user
    await prisma.user.create({
      data: {
        name: rawData.fullname,
        email: rawData.email,
        role: roles,
        magicToken: token,
        expiresAt,
      },
    });

    return {
      message: "Magic link sent successfully",
    };
  } catch (error) {
    // Handle email sending errors
    console.error("Failed to send magic link:", error);
    return {
      message: "Failed to send magic link. Please try again later.",
    };
  }
}
