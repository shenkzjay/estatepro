// "use client";

import { Roboto } from "next/font/google";
import "../../../app/globals.css";
import { AdminDashboardContent } from "../admin/admin";
import { redirect } from "next/navigation";

import { GetUsers } from "@/app/api/queries/getuser-session";

import { AdminContextProvider } from "../provider";

export const dynamic = "force-dynamic";

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
