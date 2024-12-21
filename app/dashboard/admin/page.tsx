"use client";

import { AdminHome } from "./admin-dashboard/admin-home";
import { useAdminContext } from "../provider";

export default function Pages() {
  const user = useAdminContext();

  return (
    <section className="relative w-full">
      <div>
        <AdminHome isCollapse={user.isCollapse} />
      </div>
    </section>
  );
}
