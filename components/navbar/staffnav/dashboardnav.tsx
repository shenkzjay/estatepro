import { StaffMobileMenuNavbar } from "@/components/navbar/staffnav/mobilenavbar";
import { SetStateAction, Dispatch } from "react";
import { StaffSideMenuNav } from "./sidemenunav";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { User } from "@prisma/client";

interface DashBoardNavProp {
  isCollapse: boolean;
  SetIsCollapse: Dispatch<SetStateAction<boolean>>;
  user: User;
}
export const StaffDashBoardNav = ({ isCollapse, SetIsCollapse, user }: DashBoardNavProp) => {
  //useMatch media hook to check for viewport size
  const mobileView = useMatchMedia("(max-width:840px)");
  return (
    <div>
      {!mobileView ? (
        <div>
          <div className="">
            <StaffSideMenuNav isCollapse={isCollapse} SetIsCollapse={SetIsCollapse} user={user} />

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
        <StaffMobileMenuNavbar />
      )}
    </div>
  );
};
