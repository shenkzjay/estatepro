"use client";

import { DashMaintenance } from "../dashboard/dash-maintenace";
import { useContext } from "react";
import { ToggleContext } from "../layout";

export default function Maintenance() {
  const contextValue = useContext(ToggleContext);

  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <div>
      <DashMaintenance isCollapse={isCollapse} />
    </div>
  );
}
