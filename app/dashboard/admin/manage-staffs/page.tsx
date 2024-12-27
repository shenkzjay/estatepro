import { ManagedStaff } from "../admin-dashboard/admin-staff";
import { getStaff } from "@/app/api/queries/get-staff";
import { Role } from "@prisma/client";

export interface StaffProps {
  name: string;
  email: string;
  id: string;
  createdAt: Date;
  staffData: {
    position: string;
    phonenumber: string;
  };
}

export default async function AdminStaff() {
  const staff = (await getStaff(Role.STAFF)) as StaffProps[];

  if (!staff) {
    return null;
  }

  console.log("staffPage", staff);

  return (
    <div>
      <ManagedStaff staff={staff} />
    </div>
  );
}
