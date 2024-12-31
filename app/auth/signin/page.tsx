"use server";

import { redirect } from "next/navigation";
import { SignIn } from "./sign-in";

import { GetUsers } from "@/app/api/queries/getuser-session";

export const dynamic = "force-dynamic";

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
