"use client";

import { ManageVendors } from "../admin-dashboard/admin-vendors";
import { useAdminContext } from "../../provider";

export default function AdminVendors() {
  const { isCollapse } = useAdminContext();

  return (
    <div>
      <ManageVendors isCollapse={isCollapse} />
    </div>
  );
}
