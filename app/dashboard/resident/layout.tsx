import { CheckUserRole } from "@/app/lib/checkrole";
import "../../../app/globals.css";
import { AdminContextProvider } from "../provider";
import { ResidentDashboardContent } from "./resident";
import { GetUsers } from "@/app/api/queries/getuser-session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ResidentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await CheckUserRole(["ADMIN", "RESIDENT", "SUPERADMIN"]);

  return (
    <section>
      <AdminContextProvider user={user}>
        <ResidentDashboardContent>{children}</ResidentDashboardContent>
      </AdminContextProvider>
    </section>
  );
}
