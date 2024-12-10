"use client";

import { Roboto } from "next/font/google";
import "../globals.css";
import { AdminDashBoardNav } from "@/components/navbar/adminnav/admindashnav";
import { useState, createContext } from "react";
import { ToggleAdminContext } from "./provider";

const Robotofont = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--robo",
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapse, SetIsCollapse] = useState<boolean>(true);
  return (
    <section>
      <ToggleAdminContext.Provider value={{ isCollapse, SetIsCollapse }}>
        <AdminDashBoardNav isCollapse={isCollapse} SetIsCollapse={SetIsCollapse} />
        <main className={``}>{children}</main>
      </ToggleAdminContext.Provider>
    </section>
  );
}
