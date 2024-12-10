"use client";

import { ManageResident } from "../admin-dashboard/admin-residents";
import { useContext } from "react";
import { ToggleAdminContext } from "../provider";

export default function AdminResident() {
  const contextValue = useContext(ToggleAdminContext);
  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <section>
      <ManageResident isCollapse={isCollapse} />
    </section>
  );
}
