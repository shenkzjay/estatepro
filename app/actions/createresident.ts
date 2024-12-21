"use server";

import { prisma } from "@/utils/prisma";
import { newResidentProps } from "../dashboard/admin/admin-dashboard/admin-residents";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { Role } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function CreateResident(residentData: newResidentProps) {
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
      to: residentData.prevResidentData.email,
      subject: "Set up your account",
      html: `
          <p>Hello ${residentData.prevResidentData.firstName},</p>
          <p>You've been invited to set up your account. Click the link below to complete your account setup:</p>
          <a href="${magiclink}">Set up your account</a>
          <p>This link will expire in 24 hours.</p>
        `,
    });

    const tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // If the email sends successfully, create the user
    const newResident = await prisma.user.create({
      data: {
        name: `${residentData.prevResidentData.firstName} ${residentData.prevResidentData.lastName}`,
        email: residentData.prevResidentData.email,
        role: Role.RESIDENT,
        Magiclink: {
          create: {
            token: completesignuptoken,
            expiresAt: tokenExpiration,
          },
        },
        residentData: {
          create: {
            housenumber: residentData.prevResidentData.houseNumber,
            housetype: residentData.prevResidentData.houseType,
            streetaddress: residentData.prevResidentData.streetAddress,
            phonenumber: residentData.prevResidentData.phoneNumber,
            moveindata: new Date(residentData.prevResidentData.moveInDate).toISOString(),
            vehicle: {
              create: [
                {
                  vehiclecolor: residentData.nextResidentData.vehicleColor,
                  vehiclemake: residentData.nextResidentData.vehicleMake,
                  vehiclemodel: residentData.nextResidentData.vehicleModel,
                  vehiclenumber: residentData.nextResidentData.vehicleNumber,
                },
              ],
            },
          },
        },
      },
    });

    console.log({ newResident });

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
