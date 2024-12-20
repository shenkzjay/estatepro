"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/formbutton";
import { auth } from "@/auth";
import { redirect, useRouter } from "next/navigation";
// import { Toaster, toast } from "sonner";
import { RedirectRoles } from "@/app/lib/redirects";

import { useEffect, useRef } from "react";
import { handleSignInAction } from "@/app/actions/handlesignin-action";

//import { Role } from "@prisma/client";

export default function SignIn() {
  // const formRef = useRef<HTMLFormElement | null>(null);
  const initState = {
    message: "",
  };
  const [state, formAction] = useFormState(handleSignInAction, initState);

  return (
    <form action={formAction}>
      <div className="flex flex-col p-6 gap-6 w-1/3">
        <input type="email" id="email" name="email" placeholder="email" className="border" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          className="border"
        />
      </div>
      {/* <div className="flex gap-6">
        <div className="">
          <input type="radio" id="adminrole" name="role" value={Role.ADMIN} hidden />
          <label htmlFor="adminrole" className="py-2 px-4">
            Admin
          </label>
        </div>

        <div>
          <input type="radio" id="staffrole" name="role" value={Role.STAFF} hidden />
          <label htmlFor="staffrole" className="py-2 px-4 ">
            Staff
          </label>
        </div>

        <div>
          <input type="radio" id="residentrole" name="role" value={Role.RESIDENT} hidden />

          <label
            htmlFor="residentrole"
            className="py-2 px-4  checked:bg-teal-600 checked:text-white"
          >
            Resident
          </label>
        </div>
      </div> */}
      <SubmitButton />
      <p>{state?.message}</p>
    </form>
  );
}
