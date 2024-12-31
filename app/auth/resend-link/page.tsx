import { GetUsers } from "@/app/api/queries/getuser-session";
import { ResendEmailLink } from "./resendlink";

export default async function ResendLink() {
  const user = await GetUsers();

  console.log(user);

  return (
    <div>
      <ResendEmailLink />
    </div>
  );
}
