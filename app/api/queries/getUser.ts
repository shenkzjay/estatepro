import { getSession } from "@/app/lib/session";
import { prisma } from "@/utils/prisma";
import { unstable_cache } from "next/cache";

// export async function () {
//   const usersession = await getSession();

//   if (!usersession) {
//     throw new Error("you are not authorized to access this page");
//   }

//   const user = await prisma.user.findUnique({
//     where: { id: usersession.user.id },
//   });

//   return user;
// }

export const GetUsers = unstable_cache(
  async () => {
    try {
      const usersession = await getSession();

      console.log({ usersession });

      if (!usersession) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: { id: usersession?.user.id },
      });

      return user;
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  },
  ["users"],
  { tags: ["users"], revalidate: 3600 }
);
