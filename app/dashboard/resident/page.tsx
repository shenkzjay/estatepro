"use client";

import { DashHome } from "./dashboard/dash-home";
import { useAdminContext } from "../provider";

export default function Pages() {
  const user = useAdminContext();
  return (
    <section className="relative w-full">
      <div>
        <DashHome isCollapse={user?.isCollapse} />
      </div>
    </section>
  );
}
