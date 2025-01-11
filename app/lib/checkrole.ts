import { redirect } from "next/navigation";
import { GetUsers } from "../api/queries/getuser-session";
import { Role } from "@prisma/client";

export const CheckUserRole = async (allowedRoles: Role[]) => {
  const user = await GetUsers();

  if (!user) {
    redirect("/signin");
  }

  if (!allowedRoles.includes(user?.role as Role)) {
    redirect("/dashboard");
  }

  return user;
};
