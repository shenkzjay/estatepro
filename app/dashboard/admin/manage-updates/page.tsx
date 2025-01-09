import { GetUsers } from "@/app/api/queries/getuser-session";
import { ManagedUpdates } from "../admin-dashboard/admin-updates";
import { GetUpdates } from "@/app/api/queries/get-updates";

export interface Updates {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  tags: string[];
}

export default async function AdminEstateUpdate() {
  const user = await GetUsers();

  if (!user) return;

  const userId = user?.id;

  const updates = await GetUpdates(userId);

  const estate = updates.updates?.estateUpdates;
  return (
    <section>
      <ManagedUpdates updates={estate as Updates[]} />
    </section>
  );
}
