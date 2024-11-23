"use client";

import { DashboardEstateUpdate } from "../dashboard/dash-updates";

import { useContext } from "react";
import { ToggleContext } from "../layout";

export default function EstateUpdates() {
  const contextValue = useContext(ToggleContext);
  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <div>
      <DashboardEstateUpdate isCollapse={isCollapse} />
    </div>
  );
}
