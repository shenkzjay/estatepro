"use client";

import { StaffHome } from "./dashboard/dash-home";
import { useAdminContext } from "../provider";

export default function Pages() {
  const user = useAdminContext();
  return (
    <section className="relative w-full">
      <div>
        <StaffHome isCollapse={user?.isCollapse} />
      </div>
    </section>
  );
}
