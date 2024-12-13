"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="border" disabled={pending}>
      {pending ? "Loading.." : "Sign up with magic link"}
    </button>
  );
};
