"use server";

import { StaffDetails } from "../staffdetails";
import { getStaffDetails } from "@/app/api/queries/get-staff-details";

export interface StaffType {
  id: string;
  name: string | null;
  email: string;
  staffData: {
    id: string;
    phonenumber: string | null;
    position: string | null;
    createdAt: Date;
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  console.log(params);

  const staff = (await getStaffDetails(params.id)) as StaffType;

  console.log({ staff });

  return (
    <div>
      <StaffDetails staff={staff} />
    </div>
  );
}
