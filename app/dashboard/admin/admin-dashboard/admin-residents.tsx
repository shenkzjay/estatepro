"use client";

import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { ManageCreateResidentTable } from "@/components/tables/manage-resident-table";
import { useAdminContext } from "../../provider";
import { ManageResidentPaymentTable } from "@/components/tables/manage-payment-table";
import { PaymentStatus } from "@prisma/client";

export interface AdminDashBoardProp {
  isCollapse: boolean;
}

export interface residentShit {
  id: string;
  name: string | null;
  email: string | null;
  password: string;
  createdAt: Date;
  residentData?: houseData | null;
}

interface houseData {
  id?: string;
  phonenumber?: string;
  housenumber?: string;
  streetaddress?: string;
  houseType?: string;
  moveindate?: string;
  vehicle: vehicleData[];
  payment: Payment[];
  occupants: Occupants[];
}

interface Payment {
  id: string;
  duedate: string;
  paymenttype: string;
  paymentamount: number;
  paymentstatus?: PaymentStatus;
  createdAt: Date;
}

interface vehicleData {
  vehiclemake?: string;
  vehiclenumber?: string;
  vehiclemodel?: string;
  vehiclecolor?: string;
}

interface Occupants {
  occupantsname: string;
  occupantsnumber: number;
}

interface residentProp {
  resident: residentShit[];
  residentPayments: residentShit[];
}

export function ManageResident({ resident, residentPayments }: residentProp) {
  const { isCollapse } = useAdminContext();

  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Manage Residents" />
      <DashBreadcrumbs title="Manage-residents" />

      <ManageCreateResidentTable residents={resident} />
      <ManageResidentPaymentTable residentPayments={residentPayments} residents={resident} />
    </section>
  );
}
