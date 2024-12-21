import { CompleteSignUp } from "@/components/complete-signup";
import { Suspense } from "react";

export default function CompleteSignIn() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center mt-0">
      <h3 className="text-black font-bold text-4xl w-1/3 text-center">
        Create your password to complete account setup
      </h3>

      <Suspense fallback={<div>Loading...</div>}>
        <CompleteSignUp />
      </Suspense>
    </div>
  );
}
