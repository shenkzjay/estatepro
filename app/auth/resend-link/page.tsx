import { GetUsers } from "@/app/api/queries/getuser-session";
import { ResendEmailLink } from "./resendlink";

export const dynamic = "force-dynamic";
export default async function Page() {
  const user = await GetUsers();

  console.log(user);

  return (
    <div>
      <ResendEmailLink />
    </div>
  );
}
