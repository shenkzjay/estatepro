"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/formbutton";

import { Toaster, toast } from "sonner";
import { Inputs } from "@/stories/input/input";
import { Logo } from "@/public/svgIcons/logo";

import { handleResendLink } from "@/app/actions/handleResendLink";

export const ResendEmail = () => {
  const initState = {
    message: "",
  };
  const [state, formAction] = useFormState(handleResendLink, initState);

  return (
    <section className="logbg ">
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
          <Toaster />
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
          </div>

          <div className="flex justify-center">
            <SubmitButton ButtonName="Resend link" />
          </div>
          <p>{state?.message}</p>
          {/* <div className="flex justify-center mt-8">
            <button className="text-sm text-center text-red-600">Forgot password?</button>
          </div> */}
        </form>
      </div>
    </section>
  );
};
