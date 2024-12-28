"use client";

import { DashPayment } from "../dashboard/dash-payment";
import { useAdminContext } from "../../provider";

export default function Payment() {
  const { isCollapse } = useAdminContext();

  return (
    <div>
      <DashPayment isCollapse={isCollapse} />
    </div>
  );
}
