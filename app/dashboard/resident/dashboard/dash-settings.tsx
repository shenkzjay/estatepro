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
import { Modal } from "@/stories/modal/modal";
import { useRef } from "react";
import { AddVehicle } from "../actions/addvehicle";
import { ProfileIcon } from "@/public/svgIcons/profileIcon";
import { AddOccupants } from "../actions/addoccupants";

interface ResidentDashboardSettingsProp {
  residents: residentShit;
}

export const DashBoardSettings = ({ residents }: ResidentDashboardSettingsProp) => {
  const { isCollapse } = useAdminContext();

  console.log(residents.residentData?.vehicle);

  //   const resident = residents.residentData

  const occupantsRef = useRef<HTMLDialogElement | null>(null);

  const vehicleRef = useRef<HTMLDialogElement | null>(null);

  const vehicleFormRef = useRef<HTMLFormElement | null>(null);

  const occupantsFormRef = useRef<HTMLFormElement | null>(null);

  const OpenOccupantsModal = () => {
    occupantsRef.current?.showModal();
  };
  const OpenVehicleModal = () => {
    vehicleRef.current?.showModal();
  };

  const handleOpenOccupantsModal = () => {
    OpenOccupantsModal();
  };

  const handleOpenVehicleModal = () => {
    OpenVehicleModal();
  };

  const handleAddVehicle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (vehicleFormRef.current) {
      const formData = new FormData(vehicleFormRef.current);

      const residentId = residents.residentData?.id;

      if (!residentId) return;

      formData.append("residentId", residentId);

      await AddVehicle(formData);
    }

    vehicleFormRef.current?.reset();

    vehicleRef.current?.close();
  };

  const handleAddOccupants = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (occupantsFormRef.current) {
      const formData = new FormData(occupantsFormRef.current);

      const residentId = residents.residentData?.id;

      if (!residentId) return;

      formData.append("residentId", residentId);

      await AddOccupants(formData);
    }

    occupantsFormRef.current?.reset();

    occupantsRef.current?.close();
  };

  return (
    <div
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Settings" />
      <DashBreadcrumbs title="Settings" />

      {/* Occupants modal */}
      <Modal title="Add Occupants" handleOpenModal={OpenOccupantsModal} ref={occupantsRef}>
        <form className="mt-12 w-[25rem]" ref={occupantsFormRef}>
          <div className="flex flex-col gap-6">
            <Inputs
              label="Occupant name"
              title="occupantsname"
              placeholder=""
              arialabel="occupantsname"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />

            <Inputs
              label="Occupant number"
              title="occupantsnumber"
              placeholder=""
              arialabel="occupantsnumber"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />
          </div>

          <Button
            variant="Primary"
            iconAlign="after"
            label="Add occupants"
            icon={LinkArrow}
            onClick={(e) => handleAddOccupants(e)}
            color="#139D8F"
          />
        </form>
      </Modal>

      {/* Occupants vehicle */}
      <Modal title="Add Vehicle" handleOpenModal={OpenVehicleModal} ref={vehicleRef}>
        <form className="mt-12 w-[25rem]" ref={vehicleFormRef}>
          <div className="flex flex-col gap-6">
            <Inputs
              label="Vehicle make"
              title="vehiclemake"
              placeholder=""
              arialabel="vehiclemake"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />

            <Inputs
              label="Vehicle model"
              title="vehiclemodel"
              placeholder=""
              arialabel="vehiclemodel"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />

            <Inputs
              label="Vehicle number"
              title="vehiclenumber"
              placeholder=""
              arialabel="vehiclenumber"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />

            <Inputs
              label="Vehicle color"
              title="vehiclecolor"
              placeholder=""
              arialabel="vehiclecolor"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />
          </div>

          <Button
            variant="Primary"
            iconAlign="after"
            label="Add vehicle"
            icon={LinkArrow}
            onClick={handleAddVehicle}
            color="#139D8F"
          />
        </form>
      </Modal>

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

            <details className="border rounded-xl ">
              <summary className="flex justify-between items-center w-full bg-slate-50 rounded-xl pl-6 cursor-pointer">
                <p className="occupants text-buttongray">Occupants</p>
                <Button
                  variant="Primary"
                  iconAlign="after"
                  label="Add occupants"
                  icon={LinkArrow}
                  onClick={handleOpenOccupantsModal}
                  color="#139D8F"
                />
              </summary>
              <div className="h-[15rem] overflow-y-auto">
                {residents.residentData && residents?.residentData?.occupants?.length > 0 ? (
                  residents?.residentData?.occupants.map((occupant, index) => (
                    <div
                      className="p-4 flex justify-between items-center bg-slate-50 mt-4 rounded-xl m-4"
                      key={index}
                    >
                      <div>
                        <ProfileIcon />
                      </div>

                      <div className="">
                        <p className="text-buttongray text-xs"> Name</p>
                        <b className="text-sm">{occupant.occupantsname}</b>
                      </div>
                      <div>
                        <p className="text-buttongray text-xs"> Occupant number</p>
                        <b className="text-sm">{occupant.occupantsnumber}</b>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4">
                    <p>No additional occupants</p>
                  </div>
                )}
              </div>
            </details>
          </div>
          <details className="border rounded-xl  overflow-y-auto">
            <summary className="flex w-full justify-between items-center bg-slate-50 rounded-xl pl-6 cursor-pointer">
              <p className="occupants text-buttongray">Vehicles</p>
              <Button
                variant="Primary"
                iconAlign="after"
                label="Add Vehicles"
                icon={LinkArrow}
                onClick={handleOpenVehicleModal}
                color="#139D8F"
              />
            </summary>
            <div className="h-[20rem] mt-4 overflow-y-auto">
              {residents.residentData && residents?.residentData?.vehicle?.length > 0 ? (
                residents?.residentData?.vehicle.map((vehicles, index) => {
                  return (
                    <div className="px-3 py-2 " key={index}>
                      <div className="bg-slate-50 flex justify-between items-center gap-2 rounded-xl">
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
                <div className="p-2">
                  <p>No additional Vehicles</p>
                </div>
              )}
            </div>
          </details>
        </div>
        <div className="w-1/2 flex flex-col p-6 h-fit bg-white rounded-xl">
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
