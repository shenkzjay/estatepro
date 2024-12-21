"use client";
import { useAdminContext } from "../provider";
import { AdminDashBoardNav } from "@/components/navbar/adminnav/admindashnav";

export const AdminDashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { isCollapse, SetIsCollapse, user } = useAdminContext();

  if (!user) return;

  return (
    <section className="h-full flex">
      <div className=" mt-10">
        <AdminDashBoardNav isCollapse={isCollapse} SetIsCollapse={SetIsCollapse} user={user} />
      </div>
      <div className=" w-full h-screen border bg-[#f5f5f5]">{children}</div>
    </section>
  );
};
