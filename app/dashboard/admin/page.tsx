"use client";

import { AdminHome } from "./admin-dashboard/admin-home";
import { useContext } from "react";
import { ToggleAdminContext } from "./provider";

export default function Pages() {
  const contextValue = useContext(ToggleAdminContext);
  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <section className="relative w-full">
      <div>
        <AdminHome isCollapse={isCollapse} />
      </div>
    </section>
  );
}
