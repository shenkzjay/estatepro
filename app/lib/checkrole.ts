import { redirect } from "next/navigation";
import { GetUsers } from "../api/queries/getuser-session";
import { Role } from "@prisma/client";

export const CheckUserRole = async (allowedRoles: Role[]) => {
  const user = await GetUsers();

  if (!user) {
    return redirect("/signin");
  }

  if (!allowedRoles.includes(user?.role as Role)) {
    return redirect("/dashboard");
  }

  return user;
};
