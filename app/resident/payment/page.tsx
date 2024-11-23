"use client";

import { DashPayment } from "../dashboard/dash-payment";
import { useContext } from "react";
import { ToggleContext } from "../layout";

export default function Payment() {
  const contextValue = useContext(ToggleContext);
  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <div>
      <DashPayment isCollapse={isCollapse} />
    </div>
  );
}
