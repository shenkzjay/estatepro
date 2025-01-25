"use client";

import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";

import { useAdminContext } from "../../provider";
import { residentShit, vehicleData } from "../../admin/admin-dashboard/admin-residents";
import { Button } from "@/stories/Button/Button";
import { FilterIcon } from "@/public/svgIcons/filter";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { LinkArrow } from "@/public/svgIcons/linkarrow";
import { CarIcon } from "@/public/svgIcons/carIcon";
import { Inputs } from "@/stories/input/input";
import { Modal } from "@/stories/modal/modal";
import { useRef, useState } from "react";
import { AddVehicle } from "../actions/addvehicle";
import { ProfileIcon } from "@/public/svgIcons/profileIcon";
import { AddOccupants } from "../actions/addoccupants";
import Image from "next/image";
import Car from "@/public/img/car.png";
import { DeleteIcon } from "@/public/svgIcons/deleteIcon";
import { updateVehicle } from "../actions/updateVehicle";
import { toast, Toaster } from "sonner";
import { deleteVehicle } from "../actions/deleteVehicle";
import { EditIcon } from "@/public/svgIcons/editIcon";
import { updateResidentName } from "../actions/updateName";

interface ResidentDashboardSettingsProp {
  residents: residentShit;
}

export const DashBoardSettings = ({ residents }: ResidentDashboardSettingsProp) => {
  console.log(residents);

  const { isCollapse } = useAdminContext();

  //   const resident = residents.residentData

  const occupantsRef = useRef<HTMLDialogElement | null>(null);

  const vehicleRef = useRef<HTMLDialogElement | null>(null);

  const vehicleFormRef = useRef<HTMLFormElement | null>(null);

  const occupantsFormRef = useRef<HTMLFormElement | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState<boolean>(false);

  const [updatedText, setUpdatedText] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentVehicle, setCurrentVehicle] = useState<vehicleData>();

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
    setIsLoading(true);
    if (vehicleFormRef.current) {
      const formData = new FormData(vehicleFormRef.current);

      const residentId = residents.residentData?.id;

      if (!residentId) return;

      formData.append("residentId", residentId);

      await AddVehicle(formData);
    }

    setIsLoading(false);

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

  const handleUpdateVehicle = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const vehicle = residents.residentData?.vehicle[index];

    setCurrentVehicle(vehicle);

    setIsEditing(true);
    OpenVehicleModal();
  };

  const handleSubmitUpdateVehicle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (vehicleFormRef.current) {
      const formData = new FormData(vehicleFormRef.current);

      formData.append("vehicleId", currentVehicle?.id || "");

      const result = await updateVehicle(formData);

      if (result.success === true) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      setIsLoading(false);
      setIsEditing(false);
      vehicleFormRef.current.reset();
      vehicleRef.current?.close();
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    const result = await deleteVehicle(vehicleId);

    if (result.success === true) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleUpdateResidentName = async (residentId: string) => {
    console.log(updatedText, residentId);

    setIsEditing(true);

    await updateResidentName(residentId, updatedText);

    setIsEditingName(false);

    setIsEditing(false);
  };

  return (
    <div
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-300",
            success: "text-green-500",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
        offset={16}
      />
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
              defaultValue={isEditing ? currentVehicle?.vehiclemake : ""}
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
              defaultValue={isEditing ? currentVehicle?.vehiclemodel : ""}
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
              defaultValue={isEditing ? currentVehicle?.vehiclenumber : ""}
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
              defaultValue={isEditing ? currentVehicle?.vehiclecolor : ""}
            />
          </div>

          {isEditing ? (
            <Button
              variant="Primary"
              iconAlign="after"
              label="Update vehicle"
              icon={LinkArrow}
              onClick={handleSubmitUpdateVehicle}
              color="#139D8F"
              btnbgColor={isLoading ? "#c4c4c4" : "#139D8F"}
              diasbled={isLoading}
            />
          ) : (
            <Button
              variant="Primary"
              iconAlign="after"
              label="Add vehicle"
              icon={LinkArrow}
              onClick={handleAddVehicle}
              color="#139D8F"
              btnbgColor={isLoading ? "#c4c4c4" : "#139D8F"}
              diasbled={isLoading}
            />
          )}
        </form>
      </Modal>

      <div className="flex md:flex-row flex-col gap-6 m-6">
        <div className="h-full md:w-1/2 bg-white p-6 rounded-xl flex flex-col gap-8">
          <h3 className="text-xl font-semibold text-buttongray">Resident details</h3>
          <div className="flex flex-row j">
            <div className="w-1/2 flex flex-col gap-6">
              {/* edit resident name */}
              <div className="">
                <p className="text-buttongray">Resident name</p>
                <div className="flex flex-row gap-6 item-center mt-0">
                  {isEditingName ? (
                    <div>
                      <input
                        type="text"
                        className="w-[10rem] border px-4 py-2 rounded-[8px]"
                        defaultValue={residents.name || ""}
                        autoFocus={isEditingName}
                        onBlur={() => setIsEditingName(false)}
                        // value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                      />
                      <div className="flex gap-6 text-xs mt-2">
                        <button
                          type="button"
                          className="py-1 px-2  rounded-[8px]"
                          onClick={() => setIsEditingName(false)}
                        >
                          cancel
                        </button>
                        <button
                          disabled={isEditing}
                          type="button"
                          onClick={() => handleUpdateResidentName(residents.id)}
                          className={`py-1 px-2 ${isEditing ? "bg-slate-100 cursor-not-allowed" : "bg-secondary"} rounded-[8px]`}
                        >
                          update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      role="button"
                      onClick={() => setIsEditingName(true)}
                      className="flex flex-row gap-6"
                    >
                      <span className=" font-semibold "> {residents?.name}</span>
                      <button className="text-blue-500">
                        <EditIcon />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/**Edit resident phone number */}
              <div>
                <p className="text-buttongray">Resident Phone number</p>
                {isEditingPhoneNumber ? (
                  <div>
                    <input
                      type="text"
                      className="w-[10rem] border px-4 py-2 rounded-[8px] text-sm"
                      defaultValue={residents.residentData?.phonenumber || ""}
                      autoFocus={isEditingPhoneNumber}
                      onBlur={() => setIsEditingPhoneNumber(false)}
                      // value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <div className="flex gap-6 text-xs mt-2">
                      <button
                        type="button"
                        className="py-1 px-2  rounded-[8px]"
                        onClick={() => setIsEditingPhoneNumber(false)}
                      >
                        cancel
                      </button>
                      <button
                        disabled={isEditing}
                        type="button"
                        onClick={() => ""}
                        className={`py-1 px-2 ${isEditing ? "bg-slate-100 cursor-not-allowed" : "bg-secondary"} rounded-[8px]`}
                      >
                        update
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      role="button"
                      onClick={() => setIsEditingPhoneNumber(true)}
                      className="flex flex-row gap-6"
                    >
                      <span className="font-semibold"> {residents?.residentData?.phonenumber}</span>

                      <button className="text-blue-500">
                        <EditIcon />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="text-buttongray">Resident email</p>
                <p className="font-semibold"> {residents?.email}</p>
              </div>
            </div>
            <div>
              <div>
                <p className="text-buttongray">Resident code</p>
                <p className="font-semibold text-2xl"> {residents?.residentData?.residentcode}</p>
              </div>
            </div>
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
                  label="Add"
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
                label="Add"
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
                      <div className="bg-slate-50 flex md:flex-row flex-col justify-between items-center gap-2 rounded-xl">
                        <div className="w-1/4 ">
                          <Image
                            src={Car}
                            width={150}
                            height={150}
                            alt="car Icon"
                            className="object-cover h-[50px] w-[150px]"
                          />
                        </div>

                        <div className="flex flex-row text-xs md:w-2/4 justify-center gap-6 p-4">
                          <div className="flex flex-col gap-2">
                            <div className="">
                              <p className="text-buttongray"> vehicle make</p>
                              <p className="text-black uppercase">
                                <b>{vehicles.vehiclemake}</b>
                              </p>
                            </div>

                            <div>
                              <p className="text-buttongray">vehicle model</p>
                              <p className="text-black uppercase">
                                <b>{vehicles.vehiclemodel}</b>
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div>
                              <p className="text-buttongray"> vehicle number</p>
                              <p className="text-black uppercase">
                                <b>{vehicles.vehiclenumber}</b>
                              </p>
                            </div>
                            <div>
                              <p className="text-buttongray"> vehicle color</p>
                              <p className="text-black uppercase">
                                <b>{vehicles.vehiclecolor}</b>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm flex gap-6 px-2">
                          <button onClick={(e) => handleUpdateVehicle(index, e)}>Edit</button>
                          <button
                            className="text-red-500"
                            onClick={() => handleDeleteVehicle(vehicles.id)}
                          >
                            <DeleteIcon />
                          </button>
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
        <div className="md:w-1/2 flex flex-col p-6 h-fit bg-white rounded-xl">
          <h3 className="text-xl font-semibold text-buttongray">Change password</h3>
          <p className="mb-14 mt-4">
            Input your current password and new password to change password
          </p>
          <form className="flex flex-col gap-6 justify-center items-center">
            <Inputs
              label="New password"
              title="newpassword"
              placeholder=""
              arialabel="new password"
              BorderRadius="10px"
              inputtype="text"
              required={true}
              Border="1px solid #E3E5E5"
            />

            <Inputs
              label="Confirm new password"
              title="confirm newpwd"
              placeholder=""
              arialabel="confirm newpwd"
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
