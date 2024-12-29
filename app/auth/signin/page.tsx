import { redirect } from "next/navigation";
import { SignIn } from "./signin";

import { GetUsers } from "@/app/api/queries/getuser-session";

export default async function Page() {
  const user = await GetUsers();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <section>
      <SignIn />
    </section>
  );
}
