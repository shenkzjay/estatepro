import { GetUsers } from "@/app/api/queries/getuser-session";
import { ResendEmail } from "./resendlink";

export const dynamic = "force-dynamic";
export default async function Page() {
  const user = await GetUsers();

  console.log(user);

  return (
    <div>
      <ResendEmail />
    </div>
  );
}
