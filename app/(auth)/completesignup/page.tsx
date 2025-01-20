import { CompleteSignUp } from "./complete-signup";
import { Suspense } from "react";
import { CircleSpinner } from "@/components/app-modals/spinners/circlespinner";

export default async function Page() {
  return (
    <div className="logbg w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-10 rounded-[32px] md:w-1/3 mx-6 md:mx-0">
        <Suspense fallback={<CircleSpinner />}>
          <CompleteSignUp />
        </Suspense>
      </div>
    </div>
  );
}
