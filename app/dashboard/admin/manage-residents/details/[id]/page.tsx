"use server";

import { getAllResidentDetails } from "@/app/api/queries/get-all-residentdetails";
import { SingleResdientDetails } from "../details";
// import { residentShit } from "../../../admin-dashboard/admin-residents";
import { Suspense } from "react";
import { CircleSpinner } from "@/components/app-modals/spinners/circlespinner";

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
      <Suspense fallback={<CircleSpinner />}>
        <SingleResdientDetails resident={resident as any} />
      </Suspense>
    </div>
  );
}
