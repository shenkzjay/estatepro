"use client";
import { useAdminContext } from "../provider";
import { DashBoardNav } from "@/components/navbar/residentnav/dashboardnav";

export const ResidentDashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { isCollapse, SetIsCollapse, user } = useAdminContext();

  if (!user) return;
  return (
    <section className="h-full flex">
      <div className=" mt-10">
        <DashBoardNav isCollapse={isCollapse} SetIsCollapse={SetIsCollapse} user={user} />
        <main className={`w-full h-screen border bg-[#f5f5f5]`}>{children}</main>
      </div>
    </section>
  );
};
