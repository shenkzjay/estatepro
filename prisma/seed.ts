import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = "superadmin"; // Replace with your desired password
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.upsert({
    where: { email: "senksjay@admin.com" },
    update: {},
    create: {
      email: "senksjay@admin.com",
      name: "superadmin",
      password: hashedPassword,
      role: Role.SUPERADMIN,
    },
  });

  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
