"use client";

import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";

import { useAdminContext } from "../../provider";
import { residentShit } from "../../admin/admin-dashboard/admin-residents";
import { Button } from "@/stories/Button/Button";
import { FilterIcon } from "@/public/svgIcons/filter";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { LinkArrow } from "@/public/svgIcons/linkarrow";
import { CarIcon } from "@/public/svgIcons/carIcon";
import { Inputs } from "@/stories/input/input";

interface ResidentDashboardSettingsProp {
  residents: residentShit;
}

export const DashBoardSettings = ({ residents }: ResidentDashboardSettingsProp) => {
  const { isCollapse } = useAdminContext();

  //   const resident = residents.residentData.

  return (
    <div
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Settings" />
      <DashBreadcrumbs title="Settings" />

      <div className="flex flex-row gap-6 m-6">
        <div className="h-full w-1/2 bg-white p-6 rounded-xl flex flex-col gap-8">
          <h3 className="text-xl font-semibold text-buttongray">Resident details</h3>
          <div>
            <p className="text-buttongray">Resident name</p>
            <p className="font-semibold"> {residents?.name}</p>
          </div>
          <div>
            <p className="text-buttongray">Resident Phone number</p>
            <p className="font-semibold"> {residents?.residentData?.phonenumber}</p>
          </div>
          <div>
            <p className="text-buttongray">Resident email</p>
            <p className="font-semibold"> {residents?.email}</p>
          </div>
          <div>
            <div className="flex justify-between items-center">
              {/* <div className="font-semibold">
                {" "}
                {residents.residentData && residents?.residentData?.occupants?.length > 0
                  ? residents?.residentData?.occupants.map((occupant) => (
                      <div>
                        <p>{occupant.occupantsname}</p>
                        <p>{occupant.occupantsnumber}</p>
                      </div>
                    ))
                  : "No additional occupants"}
              </div> */}
              {/* <Button
                variant="Primary"
                iconAlign="after"
                label="Add occupants"
                icon={LinkArrow}
                onClick={() => "hell"}
                color="#139D8F"
              /> */}
            </div>

            <details className="border rounded-xl">
              <summary className="flex justify-between items-center bg-slate-50 rounded-xl pl-6 cursor-pointer">
                <p className="occupants text-buttongray">Occupants</p>
                <Button
                  variant="Primary"
                  iconAlign="after"
                  label="Add occupants"
                  icon={LinkArrow}
                  onClick={() => "hell"}
                  color="#139D8F"
                />
              </summary>
              {residents.residentData && residents?.residentData?.occupants?.length > 0 ? (
                residents?.residentData?.occupants.map((occupant, index) => (
                  <div className="p-6" key={index}>
                    <p>{occupant.occupantsname}</p>
                    <p>{occupant.occupantsnumber}</p>
                  </div>
                ))
              ) : (
                <div className="p-6">
                  <p>No additional occupants</p>
                </div>
              )}
            </details>
          </div>
          <details className="border rounded-xl">
            <summary className="flex justify-between items-center bg-slate-50 rounded-xl pl-6 cursor-pointer">
              <p className="occupants text-buttongray">Vehicles</p>
              <Button
                variant="Primary"
                iconAlign="after"
                label="Add Vehicles"
                icon={LinkArrow}
                onClick={() => "hell"}
                color="#139D8F"
              />
            </summary>
            {residents.residentData && residents?.residentData?.vehicle?.length > 0 ? (
              residents?.residentData?.vehicle.map((vehicles, index) => {
                return (
                  <div className="p-6" key={index}>
                    <div className="border p-4 flex justify-between gap-6 rounded-xl">
                      <div className=" [transform:scale(-1,1)]">
                        <div className=" ">
                          <CarIcon />
                        </div>
                      </div>
                      <div className="text-sm w-1/2">
                        <p className="text-black">
                          vehicle make: <b>{vehicles.vehiclemake}</b>
                        </p>
                        <p>
                          vehicle model: <b>{vehicles.vehiclemodel}</b>
                        </p>
                        <p>
                          vehicle number: <b>{vehicles.vehiclenumber}</b>
                        </p>
                        <p>
                          vehicle color: <b>{vehicles.vehiclecolor}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6">
                <p>No additional Vehicles</p>
              </div>
            )}
          </details>
        </div>
        <div className="w-1/2 flex flex-col p-6 bg-white">
          <h3 className="text-xl font-semibold text-buttongray">Change password</h3>
          <p className="mb-14 mt-4">
            Input your current password and new password to change password
          </p>
          <form className="flex flex-col gap-6 justify-center items-center">
            <Inputs
              label="Current password"
              title="currentpwd"
              placeholder=""
              arialabel="currentpassword"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />

            <Inputs
              label="New password"
              title="newpwd"
              placeholder=""
              arialabel="newpwd"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />
            <Button
              label="Update password"
              onClick={() => "hi"}
              iconAlign="after"
              variant="Primary"
              color="#139D8F"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
