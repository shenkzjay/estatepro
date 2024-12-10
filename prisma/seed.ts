import { prisma } from "@/utils/prisma";
import { hashPassword } from "@/app/lib/session";
import { Role } from "@/utils/roles";

export async function createUser() {
  const hashedPassword = await hashPassword("adminpassword");

  const permission = await prisma.permission.createMany({
    data: [
      {
        name: "CREATE_USER",
        description: "Allows the creation of users",
      },
      {
        name: "DELETE_USER",
        description: "Allows the deletion of users",
      },
      {
        name: "VIEW_REPORTS",
        description: "Allows viewing reports",
      },
    ],
  });

  const user = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "superAdmin@admin.com",
      password: hashedPassword,
      role: "SUPERADMIN",
      permissions: { connect: [{ id: permission.id }] },
    },
  });
}
