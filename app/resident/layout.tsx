"use client";

import { Roboto } from "next/font/google";
import "../globals.css";
import { DashBoardNav } from "@/components/navbar/residentnav/dashboardnav";
import { useState, createContext } from "react";

const Robotofont = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--robo",
});

export const ToggleContext = createContext<{
  isCollapse: boolean;
  SetIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export default function ResidentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapse, SetIsCollapse] = useState<boolean>(true);
  return (
    <section>
      <ToggleContext.Provider value={{ isCollapse, SetIsCollapse }}>
        <DashBoardNav isCollapse={isCollapse} SetIsCollapse={SetIsCollapse} />
        <main className={``}>{children}</main>
      </ToggleContext.Provider>
    </section>
  );
}
