"use client";

import { DashHome } from "./dashboard/dash-home";
import { useContext } from "react";
import { ToggleContext } from "./layout";

export default function Pages() {
  const contextValue = useContext(ToggleContext);
  const isCollapse = contextValue?.isCollapse ?? false;
  return (
    <section className="relative w-full">
      <div>
        <DashHome isCollapse={isCollapse} />
      </div>
    </section>
  );
}
