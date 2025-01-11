// import { GetUsers } from "@/app/api/queries/getUser";
import SignIn from "@/app/(auth)/signin/page";
// import Admin from "./admin";
import { User } from "@prisma/client";

import { AdminDashBoardNav } from "@/components/navbar/adminnav/admindashnav";
import { SetStateAction } from "react";

export default async function AdminProvider({
  children,
  user,
  isCollapse,
  SetIsCollapse,
}: {
  children: React.ReactNode;
  user: User;
  isCollapse: boolean;
  SetIsCollapse: React.Dispatch<SetStateAction<boolean>>;
}) {
  if (!user) {
    return <SignIn />;
  }

  return (
    <section className="h-full flex">
      <div className=" mt-10">
        <AdminDashBoardNav isCollapse={isCollapse} SetIsCollapse={SetIsCollapse} user={user} />
      </div>
      <div className=" w-full h-screen border bg-[#f5f5f5]">{children}</div>
    </section>
  );
}
