import { getResidents } from "@/app/api/queries/get-residents";

import { ManageResident } from "../admin-dashboard/admin-residents";
import { Role } from "@prisma/client";

export default async function AdminResident() {
  const responses = await getResidents(Role.RESIDENT);

  const residentDatas = responses?.map((res) => res);

  console.log(residentDatas);

  if (!residentDatas) null;

  // console.log({ residentDatas });

  const residentPayments = residentDatas?.filter(
    (res) => res.residentData && res.residentData?.payment?.length > 0
  );

  return (
    <section>
      {/* too lazy, i will comeback to make it typesafe */}
      <ManageResident resident={residentDatas as any} residentPayments={residentPayments as any} />
    </section>
  );
}
