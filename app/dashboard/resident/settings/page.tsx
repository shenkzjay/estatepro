"use server";

import { getResidents } from "@/app/api/queries/get-residents";
import { DashBoardSettings } from "../dashboard/dash-settings";
import { getAllResidentDetails } from "@/app/api/queries/get-all-residentdetails";
import { GetUsers } from "@/app/api/queries/getuser-session";

export default async function Page() {
  const user = await GetUsers();

  console.log(user);

  const residentId = user?.id;

  const residents = await getAllResidentDetails(residentId ?? "");

  // console.log(residents);

  return (
    <div>
      {/* still too lazy to typesafe this resident data. I'll come back to this, hopefully :\ */}
      <DashBoardSettings residents={residents as any} />
    </div>
  );
}
