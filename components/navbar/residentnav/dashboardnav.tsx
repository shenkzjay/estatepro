import { MobileMenuNavbar } from "@/components/navbar/residentnav/mobilenavbar";
import { SetStateAction, Dispatch } from "react";
import { SideMenuNav } from "./sidemenunav";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";

interface DashBoardNavProp {
  isCollapse: boolean;
  SetIsCollapse: Dispatch<SetStateAction<boolean>>;
}
export const DashBoardNav = ({ isCollapse, SetIsCollapse }: DashBoardNavProp) => {
  //useMatch media hook to check for viewport size
  const mobileView = useMatchMedia("(max-width:840px)");
  return (
    <div>
      {!mobileView ? (
        <div>
          <div className="">
            <SideMenuNav isCollapse={isCollapse} SetIsCollapse={SetIsCollapse} />

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
        <MobileMenuNavbar />
      )}
    </div>
  );
};
