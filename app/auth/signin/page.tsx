import { redirect } from "next/navigation";
import { SignIn } from "./sign-in";

import { GetUsers } from "@/app/api/queries/getuser-session";

export const dynamic = "force-static";

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
