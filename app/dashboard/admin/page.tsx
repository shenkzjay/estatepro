import { getAllUsers } from "@/app/api/queries/get-all-users";
import { AdminHome } from "./admin-dashboard/admin-home";

import { residentShit } from "./admin-dashboard/admin-residents";

export default async function Pages() {
  const users = await getAllUsers();

  return (
    <section className="relative w-full">
      <div>
        <AdminHome users={users as residentShit[]} />
      </div>
    </section>
  );
}
