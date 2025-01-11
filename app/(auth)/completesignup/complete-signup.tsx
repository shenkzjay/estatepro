"use client";

import { ValidateToken } from "@/app/api/queries/validateToken";
import { Button } from "@/stories/Button/Button";
import { Inputs } from "@/stories/input/input";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CompleteResidentSignUp } from "@/app/actions/complete-resident-signup";
import { Logo } from "@/public/svgIcons/logo";
import { useRouter } from "next/navigation";

export const CompleteSignUp = () => {
  const search = useSearchParams();

  const router = useRouter();

  const searchquery = search.get("token");

  useEffect(() => {
    const handleTokenValidation = async () => {
      if (searchquery) {
        const res = await ValidateToken(searchquery);

        if (!res) {
          return null;
        }
      }
    };

    handleTokenValidation();
  }, []);

  if (!searchquery) {
    return (
      <div className="text-center flex flex-col gap-8 justify-center items-center">
        <h3 className="text-5xl font-bold">Opps!</h3>
        <p className="text-gray-400">Invalid link! Click to reset link</p>
        <Button
          variant="Primary"
          label="Reset link"
          iconAlign="after"
          onClick={() => router.push("/resend-link")}
          bgColor="#1AD9C5"
        />
      </div>
    );
  }

  console.log({ searchquery });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("token", searchquery as string);

    await CompleteResidentSignUp(formData);

    console.log(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-full justify-center items-center"
    >
      <legend>
        <div className="text-center flex flex-col justify-center items-center gap-2 mb-6">
          <Logo color="#635F19" />
          <h3 className="text-2xl font-semibold text-[#202223]">Complete account setup</h3>
          <p className="text-[#6D7175] text-sm">Set password to complete your account setup</p>
        </div>
      </legend>
      <Inputs
        label="Enter password"
        title="password"
        placeholder=""
        arialabel="password"
        BorderRadius="10px"
        inputtype="password"
        required={true}
        Border="1px solid #E3E5E5"
      />
      <Inputs
        label="Confirm password"
        title="confirmpassword"
        placeholder=""
        arialabel="confirmpassword"
        BorderRadius="10px"
        inputtype="password"
        required={true}
        Border="1px solid #E3E5E5"
      />
      <Button
        label="create password"
        variant="Primary"
        iconAlign="after"
        size="Large"
        onClick={() => console.log("hi")}
      />
    </form>
  );
};
