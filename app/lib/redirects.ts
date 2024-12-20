import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function RedirectRoles() {
  const session = await auth();

  if (session?.user.role === "SUPERADMIN") {
    redirect("/dashboard/admin");
  }
}
