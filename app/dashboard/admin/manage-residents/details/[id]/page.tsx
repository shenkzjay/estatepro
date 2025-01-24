"use server";

import { getAllResidentDetails } from "@/app/api/queries/get-all-residentdetails";
import { SingleResdientDetails } from "../details";
// import { residentShit } from "../../../admin-dashboard/admin-residents";

interface Pageprops {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Pageprops) {
  console.log(params.id);

  const resident = await getAllResidentDetails(params.id);

  if (!resident) return;

  return (
    <div>
      <SingleResdientDetails resident={resident as any} />
    </div>
  );
}
