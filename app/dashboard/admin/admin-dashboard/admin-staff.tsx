"use client";

import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { ManageCreateStaff } from "@/components/tables/manage-create-staff";
import { useAdminContext } from "../../provider";
// import { User } from "@prisma/client";

interface AdminDashBoardProp {
  isCollapse: boolean;
}

export interface createNewStaffProps {
  fullname: string;
  email: string;
  phoneNumber: string;
}

interface ManagedStaffProps {
  staff: StaffProps[];
}

import { StaffProps } from "../manage-staffs/page";

export const ManagedStaff = ({ staff }: ManagedStaffProps) => {
  console.log(staff, "managedStaff");

  const { isCollapse } = useAdminContext();

  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Manage Staffs" />
      <DashBreadcrumbs title="Manage-staffs" />
      <ManageCreateStaff staff={staff} />
    </section>
  );
};
