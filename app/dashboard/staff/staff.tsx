"use client";
import { useAdminContext } from "../provider";
import { StaffDashBoardNav } from "@/components/navbar/staffnav/dashboardnav";

export const StaffDashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { isCollapse, SetIsCollapse, user } = useAdminContext();

  if (!user) return;
  return (
    <section className="h-full flex">
      <div className=" md:mt-10 w-full">
        <StaffDashBoardNav isCollapse={isCollapse} SetIsCollapse={SetIsCollapse} user={user} />
        <main className={`w-full h-screen border bg-[#f5f5f5]`}>{children}</main>
      </div>
    </section>
  );
};
