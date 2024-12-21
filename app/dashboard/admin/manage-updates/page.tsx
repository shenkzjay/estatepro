"use client";

import { ManagedUpdates } from "../admin-dashboard/admin-updates";
import { useContext } from "react";
import { ToggleAdminContext } from "../../provider";

export default function AdminEstateUpdate() {
  const contextValue = useContext(ToggleAdminContext);
  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <section>
      <ManagedUpdates isCollapse={isCollapse} />
    </section>
  );
}
