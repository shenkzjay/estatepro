import { describe, it, vi, expect, test } from "vitest";

import { DashboardSuspense } from "../app/dashboard/dashboard";
import { redirect } from "next/navigation";
import { GetUsers } from "../app/api/queries/getuser-session";
import { beforeEach } from "vitest";
import type { Mock } from "vitest";
import { CheckUserRole } from "../app/lib/checkrole";
import { Role } from "@prisma/client";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("../app/api/queries/getuser-session", () => ({
  GetUsers: vi.fn(),
}));

describe("DashboardSuspense", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  //redirect ADMIN to dashboard/admin
  test("redirects ADMIN to admin dashboard", async () => {
    (GetUsers as Mock).mockResolvedValue({ role: "ADMIN" });

    await DashboardSuspense();

    expect(redirect).toHaveBeenCalledWith("/dashboard/admin");
  });

  //redirect RESIDENTS to dashboard/resident
  test("redirects RESIDENT to resident dashboard", async () => {
    (GetUsers as Mock).mockResolvedValue({ role: "RESIDENT" });

    await DashboardSuspense();

    expect(redirect).toHaveBeenCalledWith("/dashboard/resident");
  });

  //redirect RESIDENTS to dashboard/resident
  test("redirects STAFF to staff dashboard", async () => {
    (GetUsers as Mock).mockResolvedValue({ role: "STAFF" });

    await DashboardSuspense();

    expect(redirect).toHaveBeenCalledWith("/dashboard/staff");
  });

  //redirect signin page when no user session
  test("redirects NO-USER to signin page", async () => {
    (GetUsers as Mock).mockResolvedValue({ role: null });

    await DashboardSuspense();

    expect(redirect).toHaveBeenCalledWith("/signin");
  });
});

describe("CheckUserRole", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  //allow access if user is admin
  test("should allow access if user is ADMIN", async () => {
    (GetUsers as Mock).mockResolvedValue({ role: Role.ADMIN });

    const user = await CheckUserRole(["ADMIN", "SUPERADMIN"]);

    expect(user).toEqual({ role: "ADMIN" });
    expect(redirect).not.toHaveBeenCalled();
  });

  //redirects to /dashboard if user is not admin or superadmin
  test("should redirect to /dashboard if user is not ADMIN or SUPERADMIN", async () => {
    (GetUsers as Mock).mockResolvedValue({ role: "USER" });

    await CheckUserRole(["ADMIN", "SUPERADMIN"]);

    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  //redirects to /signin if no user is found
  test("should redirect to /signin if no user is found", async () => {
    (GetUsers as Mock).mockResolvedValue(null);

    await CheckUserRole(["ADMIN", "SUPERADMIN"]);

    expect(redirect).toHaveBeenCalledWith("/signin");
  });
});
