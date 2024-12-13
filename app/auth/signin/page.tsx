"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/formbutton";
// import { Toaster, toast } from "sonner";

import { useRef } from "react";
import { handleSignInAction } from "@/app/actions/handlesignin-action";

import { Role } from "@prisma/client";

export default function SignIn() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const initState = {
    message: "",
  };
  const [state, formAction] = useFormState(handleSignInAction, initState);

  return (
    <form action={formAction} ref={formRef}>
      <div>
        <input type="email" id="email" name="email" />
      </div>
      <div className="flex gap-6">
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
        <SubmitButton />
      </div>
      <p>{state.message}</p>
    </form>
  );
}
