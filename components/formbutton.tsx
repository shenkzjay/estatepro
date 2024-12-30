"use client";

import { Button } from "@/stories/Button/Button";
import { useFormStatus } from "react-dom";

interface LabelProp {
  ButtonName: string;
}

export const SubmitButton = ({ ButtonName }: LabelProp) => {
  const { pending } = useFormStatus();
  return (
    // <button type="submit" className="border" disabled={pending}>
    //   {pending ? "Loading.." : "Sign up with magic link"}
    // </button>
    <Button
      variant="Primary"
      label={pending ? "Loading" : ButtonName}
      iconAlign="after"
      onClick={() => console.log("hi")}
      bgColor={pending ? "#f4f4f4" : "#1AD9C5"}
      diasbled={pending}
    />
  );
};
