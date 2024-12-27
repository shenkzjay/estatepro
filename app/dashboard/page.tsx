import { redirect } from "next/navigation";
import { GetUsers } from "../api/queries/getuser-session";

export const dynamic = "force-dynamic";

export default async function HomeAdminDashboard() {
  const user = await GetUsers();

  if (!user) {
    redirect("/auth/signin");
    // return (
    //   <div>
    //     <span>Oops Error</span>
    //     <p>You don&apos;t have sufficient clearance to view this page</p>
    //     <Link href="/auth/signin">Please login to continue</Link>
    //   </div>
    // );
  }

  if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
    return redirect("/dashboard/admin");
  } else if (user.role === "RESIDENT") {
    redirect("/dashboard/resident");
  } else if (user.role === "STAFF") {
    redirect("/dashboard/staff");
  } else {
    redirect("/auth/signin");
  }
}
