"use client";

import { Button } from "@/stories/Button/Button";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    // <button type="submit" className="border" disabled={pending}>
    //   {pending ? "Loading.." : "Sign up with magic link"}
    // </button>
    <Button
      variant="Primary"
      label={pending ? "Loading" : "Log in"}
      iconAlign="after"
      onClick={() => console.log("hi")}
    />
  );
};
