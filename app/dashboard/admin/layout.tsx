// "use client";

import { Roboto } from "next/font/google";
import "../../../app/globals.css";
import { AdminDashboardContent } from "./admin";
import { redirect } from "next/navigation";

import { GetUsers } from "@/app/api/queries/getuser-session";

import { AdminContextProvider } from "../provider";
import { CheckUserRole } from "@/app/lib/checkrole";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await CheckUserRole(["ADMIN", "SUPERADMIN"]);

  return (
    <AdminContextProvider user={user}>
      <AdminDashboardContent>{children}</AdminDashboardContent>
    </AdminContextProvider>
  );
}
