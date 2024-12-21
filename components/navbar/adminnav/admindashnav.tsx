import { AdminMobileMenuNavbar } from "@/components/navbar/adminnav/adminmobilenavbar";
import { SetStateAction, Dispatch } from "react";
import { AdminSideMenuNav } from "./adminsidemenunav";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { User } from "@prisma/client";
import { useAdminContext } from "@/app/dashboard/provider";

interface DashBoardNavProp {
  isCollapse: boolean;
  SetIsCollapse: Dispatch<React.SetStateAction<boolean>>;
  user: User;
}
export const AdminDashBoardNav = ({ isCollapse, SetIsCollapse, user }: DashBoardNavProp) => {
  console.log("admindash", isCollapse);

  //useMatch media hook to check for viewport size
  const mobileView = useMatchMedia("(max-width:840px)");
  return (
    <div>
      {!mobileView ? (
        <div>
          <div className="">
            <AdminSideMenuNav />

            <div
              className="flex text-white z-[9999] relative"
              role="button"
              onClick={() => SetIsCollapse(!isCollapse)}
            >
              <span
                className={`ml-4 fixed ${isCollapse ? "md:top-[5vw] top-[10vh] md:left-[15.5vw] left-4" : "md:top-[5vw] top-[10vh] md:left-[1.5vw] left-4"}  bg-primary p-2 rounded-full [transition:_top_.2s_linear,left_.2s_linear]`}
              >
                {isCollapse ? (
                  <span className="flex [transform:_scale(-1,1)] ">
                    <ArrowIcon color="white" />
                  </span>
                ) : (
                  <span className="[transform:_scale(-1,1)]">
                    {" "}
                    <ArrowIcon color="white" />{" "}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <AdminMobileMenuNavbar />
      )}
    </div>
  );
};
