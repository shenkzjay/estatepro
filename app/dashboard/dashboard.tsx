import { redirect } from "next/navigation";
import { GetUsers } from "../api/queries/getuser-session";

export const dynamic = "force-dynamic";

export async function DashboardSuspense() {
  const user = await GetUsers();

  if (!user) {
    redirect("/signin");
  }

  if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
    return redirect("/dashboard/admin");
  } else if (user.role === "RESIDENT") {
    return redirect("/dashboard/resident");
  } else if (user.role === "STAFF") {
    return redirect("/dashboard/staff");
  } else {
    return redirect("/signin");
  }
}
