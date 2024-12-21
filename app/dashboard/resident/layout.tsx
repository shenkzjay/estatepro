import "../../../app/globals.css";
import { AdminContextProvider } from "../provider";
import { ResidentDashboardContent } from "./resident";
import { GetUsers } from "@/app/api/queries/getUser";
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
        <ResidentDashboardContent>{children}</ResidentDashboardContent>
      </AdminContextProvider>
    </section>
  );
}
