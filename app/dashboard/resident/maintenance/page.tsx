"use client";

import { DashMaintenance } from "../dashboard/dash-maintenace";
import { useAdminContext } from "../../provider";

export default function Maintenance() {
  const { isCollapse } = useAdminContext();

  return (
    <div>
      <DashMaintenance isCollapse={isCollapse} />
    </div>
  );
}
