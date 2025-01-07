"use server";

import { prisma } from "@/utils/prisma";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { Role, User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { revalidateTag } from "next/cache";
import { generateRandomCodes } from "@/utils/randomcodes";

export async function CreateResident(formData: FormData) {
  const residentData = {
    fullname: formData.get("fullname") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phonenumber") as string,
    houseNumber: formData.get("housenumber") as string,
    houseType: formData.get("houseType") as string,
    streetAddress: formData.get("streetaddress") as string,
    moveInDate: formData.get("moveindate") as string,
    vehicleMake: formData.get("vehiclemake") as string,
    vehicleNumber: formData.get("vehiclenumber") as string,
    vehicleColor: formData.get("vehiclecolor") as string,
    vehicleModel: formData.get("vehiclemodel") as string,
  };

  console.log({ residentData });

  try {
    const ip = (await headers().get("x-real-ip")) ?? "local";

    console.log({ ip });

    const completesignuptoken = uuidv4();

    console.log({ completesignuptoken });

    const magiclink = `http://localhost:3000/auth/completesignup?token=${completesignuptoken}`;

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
      to: residentData.email,
      subject: "Set up your account",
      html: `
          <p>Hello ${residentData.fullname},</p>
          <p>You've been invited to set up your account. Click the link below to complete your account setup:</p>
          <a href="${magiclink}" style{{padding:12px 16px; border-radius:10px; background-color:blue; color:white}}>Set up your account</a>
          <p>This link will expire in 24 hours.</p>
        `,
    });

    const tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const residentCode = generateRandomCodes(8);

    // If the email sends successfully, create the user
    const newResident = await prisma.user.create({
      data: {
        name: residentData.fullname,
        email: residentData.email,
        role: Role.RESIDENT,

        Magiclink: {
          create: {
            token: completesignuptoken,
            expiresAt: tokenExpiration,
          },
        },
        residentData: {
          create: {
            housenumber: residentData.houseNumber,
            housetype: residentData.houseType,
            streetaddress: residentData.streetAddress,
            residentcode: residentCode,
            phonenumber: residentData.phoneNumber,
            moveindate: new Date(residentData.moveInDate).toISOString(),
            vehicle: {
              create: [
                {
                  vehiclecolor: residentData.vehicleColor,
                  vehiclemake: residentData.vehicleMake,
                  vehiclemodel: residentData.vehicleModel,
                  vehiclenumber: residentData.vehicleNumber,
                },
              ],
            },
          },
        },
      },
    });

    revalidateTag("get-residents");

    return {
      message: "Magic link sent successfully",
      newResident,
    };
  } catch (error) {
    return {
      message: `Error trying to create resident: ${error}`,
    };
  }
}
