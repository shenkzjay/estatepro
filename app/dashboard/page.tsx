import { DashboardSuspense } from "./dashboard";
import { Suspense } from "react";
import { CircleSpinner } from "@/components/app-modals/spinners/circlespinner";
export default async function HomeAdminDashboard() {
  return (
    <Suspense fallback={<CircleSpinner />}>
      <DashboardSuspense />
    </Suspense>
  );
}
