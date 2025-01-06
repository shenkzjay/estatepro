import { getMaintenanceDetails } from "@/app/api/queries/get-maintainance";
import { ResidentDashMaintenance } from "../dashboard/dash-maintenace";
import { GetUsers } from "@/app/api/queries/getuser-session";
import { MaintenanceStatus } from "@prisma/client";

export interface MaintenanceProps {
  id: string;
  image: string | null;
  createdAt: Date;
  category: string;
  description: string;
  status: MaintenanceStatus;
}

export default async function Maintenance() {
  const user = await GetUsers();

  const id = user?.id;

  if (!id) return;

  const maintenanceIssues = await getMaintenanceDetails(id);

  return (
    <div>
      <ResidentDashMaintenance maintenance={maintenanceIssues as MaintenanceProps[]} />
    </div>
  );
}
