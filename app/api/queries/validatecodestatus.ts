"use server";

import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const ValidateCodeStatus = unstable_cache(
  async () => {
    try {
      const visitors = await prisma.visitorCode.findMany();

      if (!visitors) {
        return {
          message: "No visitor found",
        };
      }

      const expiredVisitors = visitors.filter(
        (visitor) =>
          (visitor.status === "REVOKED" && visitor.expiresAt === null) ||
          new Date() > new Date(visitor.expiresAt)
      );

      await Promise.all(
        expiredVisitors.map((visitor) =>
          prisma.visitorCode.update({
            where: { id: visitor.id },
            data: { status: "EXPIRED" },
          })
        )
      );

      return {
        message: "Code status checked successfully",
        expiredCount: expiredVisitors.length,
      };
    } catch (error) {
      return {
        message: `Error checking code status: ${error}`,
      };
    }
  },
  ["validatestatus"],
  { revalidate: 3600, tags: ["validatestatus"] }
);
