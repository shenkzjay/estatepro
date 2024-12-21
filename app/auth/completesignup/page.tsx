"use client";

import { ValidateToken } from "@/app/api/queries/validateToken";
import { Button } from "@/stories/Button/Button";
import { Inputs } from "@/stories/input/input";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CompleteResidentSignUp } from "@/app/actions/complete-resident-signup";

export default function CompleteSignIn() {
  const search = useSearchParams();

  const searchquery = search.get("token");

  console.log({ searchquery });

  useEffect(() => {
    const handleTokenValidation = async () => {
      if (searchquery) {
        const res = await ValidateToken(searchquery);

        console.log(res.message);
      }
    };

    handleTokenValidation();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("token", searchquery as string);

    await CompleteResidentSignUp(formData);

    console.log(formData);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center mt-0">
      <h3 className="text-black font-bold text-4xl w-1/3 text-center">
        Create your password to complete account setup
      </h3>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-1/3 justify-center items-center mt-12"
      >
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
          onClick={() => console.log("ho")}
        />
      </form>
    </div>
  );
}
