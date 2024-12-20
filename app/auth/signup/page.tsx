"use client";

import { useFormState } from "react-dom";
import { getMagiclink } from "@/app/actions/createadmin";
import { Role } from "@prisma/client";
import { Toaster, toast } from "sonner";

export default function SignUp() {
  const initState = {
    message: "",
  };

  const [state, formAction] = useFormState(getMagiclink, initState);

  return (
    <section>
      <Toaster />
      <form
        action={formAction}
        className="mx-auto w-[80vw] flex flex-col justify-center h-full items-center pt-40"
      >
        <fieldset className="flex flex-col gap-6">
          <legend></legend>
          <div className="flex flex-col gap-6">
            <div>
              <label htmlFor="fullname" className="sr-only">
                fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="border w-full"
                placeholder="fullname"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="border w-full"
                placeholder="email"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="">
              <input type="radio" id="adminrole" name="role" value={Role.ADMIN} hidden />
              <label htmlFor="adminrole" className="py-2 px-4 ">
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
          </div>

          <button type="submit">Get magic link</button>
          <p>{toast(state?.message)}</p>
        </fieldset>
      </form>
    </section>
  );
}
