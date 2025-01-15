"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/formbutton";

import { Toaster, toast } from "sonner";
import { Inputs } from "@/stories/input/input";
import { Logo } from "@/public/svgIcons/logo";

import { handleSignInAction } from "@/app/actions/handlesignin-action";

export const SignIn = () => {
  const initState = {
    message: "",
  };
  const [state, formAction] = useFormState(handleSignInAction, initState);

  return (
    <section className="logbg ">
      <Toaster />
      <div className="flex flex-col justify-center items-center mx-6 md:mx-0 h-full">
        <form
          action={formAction}
          className="md:w-1/3 w-full bg-white flex flex-col md:p-12 p-6 justify-center rounded-[32px] drop-shadow-[0px_16px_25px_0px_#00000026]"
        >
          <legend>
            <div className="text-center flex flex-col justify-center items-center gap-2">
              <Logo color="#635F19" />
              <h3 className="text-2xl font-semibold text-[#202223]">Welcome back</h3>
              <p className="text-[#6D7175] text-sm">Log in to continue</p>
            </div>
          </legend>

          <div className="flex flex-col gap-8 pb-2  pt-12">
            <Inputs
              label="Enter your email address"
              title="email"
              placeholder=""
              arialabel="email"
              BorderRadius="10px"
              inputtype="email"
              required={true}
              Border="1px solid #e5e5e5"
            />

            <Inputs
              label="Enter your password"
              title="password"
              placeholder=""
              arialabel="password"
              BorderRadius="10px"
              inputtype="password"
              required={true}
              Border="1px solid #e5e5e5"
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
          <div className="flex justify-center">
            <SubmitButton ButtonName="Log in" />
          </div>
          <p>{state.message}</p>
          <div className="flex justify-center mt-8">
            <button className="text-sm text-center text-red-600">Forgot password?</button>
          </div>
        </form>
      </div>
    </section>
  );
};
