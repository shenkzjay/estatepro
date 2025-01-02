"use client";

import { useSearchParams } from "next/navigation";
import { useAdminContext } from "../../provider";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";

export default function Page() {
  const search = useSearchParams();

  const { isCollapse } = useAdminContext();

  const query = search.get("value");

  if (!query) {
    return <div>No Visitor details found</div>;
  }

  const parseQuery = JSON.parse(query || "");

  console.log(parseQuery);

  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="QR Scan details" />
      <DashBreadcrumbs title="QR Scan details" />

      <div className="m-6 p-6 bg-white flex flex-col gap-6">
        <h3 className="text-2xl text-buttongray font-semibold">Visitor&apos;s details</h3>
        <div>
          <p className="text-buttongray text-sm">NAME</p>
          <p className="font-semibold">{parseQuery.visitorname}</p>
        </div>

        <div>
          <p className="text-buttongray text-sm">NUMBER</p>
          <p className="font-semibold">{parseQuery.visitornumber}</p>
        </div>
        <div>
          <p className="text-buttongray text-sm">EMAIL</p>
          <p className="font-semibold">{parseQuery.visitoremail}</p>
        </div>
        <div>
          <p className="text-buttongray text-sm">DATE OF VISIT</p>
          <p className="font-semibold">{new Date(parseQuery.Dateofvisit).toDateString()}</p>
        </div>
        <div>
          <p className="text-buttongray text-sm">CODE STATUS</p>
          <p
            className={`font-semibold ${parseQuery.status === "ACTIVE" ? "bg-[#e7f6ec] text-[#139d8f]" : parseQuery.status === "EXPIRED" ? "bg-[#fef6e7] text-[#865503]" : "bg-[#fbeae9] text-[#9e0a05]"} flex w-fit px-4 py-2 rounded-xl`}
          >
            {parseQuery.status}
          </p>
        </div>
      </div>
    </section>
  );
}
