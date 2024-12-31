"use client";

import { DashboardEstateUpdate } from "../../resident/dashboard/dash-updates";

import { useAdminContext } from "../../provider";

export default function EstateUpdates() {
  const { isCollapse } = useAdminContext();

  return (
    <div>
      <DashboardEstateUpdate isCollapse={isCollapse} />
    </div>
  );
}
