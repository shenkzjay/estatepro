import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./utils/prisma";

export function CustomPrismaAdapter(prismaClient) {
  const adapter = PrismaAdapter(prismaClient);

  return {
    ...adapter,
    async createUser(user) {
      const { roles = [], ...rest } = user;
      return prismaClient.user.create({
        data: {
          ...rest,
          roles: { set: roles }, // Assuming `roles` is a relation or array in your Prisma schema
        },
      });
    },
  };
}
