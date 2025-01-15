"use server";

import { VisitorsCodeTable } from "@/components/tables/visitors-table";
import { GetVisitorsCode } from "@/app/api/queries/get-visitor-code";
import { GetUsers } from "@/app/api/queries/getuser-session";
import { redirect } from "next/navigation";
import { VisitorCodeStatus } from "@prisma/client";

export interface VisitorProp {
  id: string;
  visitorname: string;
  visitornumber: string;
  visitoremail: string | null;
  code: string;
  Dateofvisit: Date;
  status: VisitorCodeStatus | null;
}

// export const dynamic = "force-dynamic";

export const DashHome = async () => {
  const user = await GetUsers();

  const residentid = user?.id;

  if (!residentid) return redirect("/signin");

  const visitors = await GetVisitorsCode(residentid);

  console.log(visitors);

  return (
    <div>
      <VisitorsCodeTable visitors={visitors as VisitorProp[]} />
    </div>
  );
};
