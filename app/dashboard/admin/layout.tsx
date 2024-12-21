// "use client";

import { Roboto } from "next/font/google";
import "../../../app/globals.css";
import { AdminDashboardContent } from "../admin/admin";
import { redirect } from "next/navigation";
// import { AdminDashBoardNav } from "@/components/navbar/adminnav/admindashnav";

// import { ToggleAdminContext } from "./provider";

import { GetUsers } from "@/app/api/queries/getUser";

import { AdminContextProvider } from "../provider";

const Robotofont = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--robo",
});

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await GetUsers();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user.role === "STAFF" || user.role === "RESIDENT") {
    return <div>UnAuthorized user</div>;
  }

  return (
    <AdminContextProvider user={user}>
      <AdminDashboardContent>{children}</AdminDashboardContent>
    </AdminContextProvider>
  );
}
