"use client";

import { ManagedStaff } from "../admin-dashboard/admin-staff";
import { useContext } from "react";
import { ToggleAdminContext } from "../provider";

export default function AdminStaff() {
  const contextValue = useContext(ToggleAdminContext);
  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <div>
      <ManagedStaff isCollapse={isCollapse} />
    </div>
  );
}
