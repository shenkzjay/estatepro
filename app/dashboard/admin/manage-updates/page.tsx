import { GetUsers } from "@/app/api/queries/getuser-session";
import { ManagedUpdates } from "../admin-dashboard/admin-updates";
import { GetUpdates } from "@/app/api/queries/get-updates";

export interface Updates {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  tags: string[];
}

export default async function AdminEstateUpdate() {
  const updates = await GetUpdates();

  const estate = updates.updates?.[0]?.estateUpdates;

  return (
    <section>
      <ManagedUpdates updates={estate as Updates[]} />
    </section>
  );
}
