import "../../../app/globals.css";
import { AdminContextProvider } from "../provider";
import { StaffDashboardContent } from "./staff";
import { GetUsers } from "@/app/api/queries/getuser-session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ResidentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await GetUsers();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user.role === "STAFF" || user.role === "ADMIN") {
    return <div>UnAuthorized user</div>;
  }

  return (
    <section>
      <AdminContextProvider user={user}>
        <StaffDashboardContent>{children}</StaffDashboardContent>
      </AdminContextProvider>
    </section>
  );
}
