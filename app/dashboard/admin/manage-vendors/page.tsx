"use client";

import { ManageVendors } from "../admin-dashboard/admin-vendors";
import { useContext } from "react";
import { ToggleAdminContext } from "../../provider";

export default function AdminVendors() {
  const contextValue = useContext(ToggleAdminContext);
  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <div>
      <ManageVendors isCollapse={isCollapse} />
    </div>
  );
}
