"use server";

import { prisma } from "@/utils/prisma";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: Request) {
  const formData = await request.formData();

  const email = formData.get("email");
  const userId = formData.get("userId") as string;
  const selectedTagsForm = formData.getAll("selectedTags") as string[];
  const description = formData.get("description") as string;
  const title = formData.get("title") as string;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user?.role !== "SUPERADMIN") {
    return Response.json({
      message: "You're not authorized to create estate update",
      success: false,
    });
  }

  //create updates
  const createNewupdate = await prisma.estateUpdates.create({
    data: {
      title: title,
      description: description,
      tags: selectedTagsForm,
      userId: userId,
    },
  });

  // we are getting all the residents here so we can pass the notification
  // to all of them
  const allResident = await prisma.user.findMany({
    where: {
      role: "RESIDENT",
    },
  });

  await prisma.notification.createMany({
    data: allResident.map((resident) => ({
      userId: resident.id,
      updatesId: createNewupdate.id,
      createdAt: new Date(Date.now()),
    })),
  });

  await pusher.trigger("estate-updates", "new-update", {
    update: createNewupdate,
  });

  console.log(createNewupdate);

  return Response.json({ createNewupdate });
}
