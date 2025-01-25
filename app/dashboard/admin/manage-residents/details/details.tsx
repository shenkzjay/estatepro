"use client";

import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { useAdminContext } from "../../../provider";
import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { residentShit } from "../../admin-dashboard/admin-residents";
import Image from "next/image";
import { MaintenanceStatus } from "@prisma/client";
import { CarIcon } from "@/public/svgIcons/carIcon";

// import { PaymentStatus } from "@/utils/roles";

import { PaymentStatus } from "@prisma/client";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { Button } from "@/stories/Button/Button";
import { Inputs } from "@/stories/input/input";
import { useRef, useState } from "react";
import { DeleleResidentAction } from "../../actions/deleteresident";
import { toast, Toaster } from "sonner";
import Car from "@/public/img/car.png";
import { DeleteIcon } from "@/public/svgIcons/deleteIcon";

interface ViewResidentProps {
  resident: residentShit;
}

export const SingleResdientDetails = ({ resident }: ViewResidentProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteResidentRef = useRef<HTMLFormElement | null>(null);

  const getStatusPillType = (paymentStatus: PaymentStatus, dueDate: string) => {
    const isOverdue = Date.now() > new Date(dueDate).getTime();
    if (paymentStatus === PaymentStatus.PAID && isOverdue) return "success";
    if (isOverdue) return "danger";
    if (paymentStatus === PaymentStatus.PAID) return "success";
    if (isOverdue) return "success";
    return "warning";
  };

  const handleDeleteResident = async (
    residentId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (deleteResidentRef.current) {
      const formData = new FormData(deleteResidentRef.current);
      setIsLoading(true);

      const result = await DeleleResidentAction(formData, residentId);

      if (result?.success === true) {
        toast.success(result?.message);
        setIsLoading(true);
      } else {
        toast.error(result?.message);
        setIsLoading(false);
      }

      setIsLoading(false);
    }

    deleteResidentRef.current?.reset();
  };

  const { isCollapse } = useAdminContext();

  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-300",
            success: "text-green-200",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
        offset={16}
      />
      <DashBoardHeader title="Resident" />
      <DashBreadcrumbs title="Resident" />

      <div className="flex md:flex-row flex-col">
        <div className="md:w-[50%] m-6  h-full flex flex-col  gap-6 ">
          <figure className="bg-white p-6 rounded-xl ">
            <figcaption>Personal details</figcaption>
            <div className="flex md:flex-row flex-col gap-6 md:gap-0 justify-between mt-6">
              <div>
                <p className="text-sm text-buttongray">Name</p>
                <p>{resident?.name}</p>
              </div>

              <div>
                <p className="text-sm text-buttongray">Email</p>
                <p>{resident?.email}</p>
              </div>

              <div>
                <p className="text-sm text-buttongray">Phone number</p>
                <p>{resident?.residentData?.phonenumber}</p>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl bg-white p-6">
            <figcaption>Residence details</figcaption>
            <div className="flex md:flex-row flex-col gap-6 md:gap-0 justify-between mt-6">
              <div>
                <p className="text-sm text-buttongray">Address</p>
                <p>
                  {resident?.residentData?.housenumber} {resident.residentData?.streetaddress}
                </p>
              </div>

              <div>
                <p className="text-sm text-buttongray">House type</p>
                <p>{resident.residentData?.housetype}</p>
              </div>

              <div>
                <p className="text-sm text-buttongray">Move-in-date</p>
                <p>{new Date(resident?.residentData?.moveindate || "").toDateString()}</p>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl bg-white p-6">
            <figcaption>Payments</figcaption>
            <div className="flex flex-row justify-between mt-6">
              <div className="w-full">
                <div className="grid grid-cols-4 text-sm text-buttongray">
                  <p>Name</p>
                  <p>Amount</p>
                  <p>Status</p>
                  <p>Due date</p>
                </div>
                <div className="w-full mt-2">
                  {resident.residentData?.payment && resident.residentData.payment.length > 0 ? (
                    resident.residentData?.payment.map((pay, index) => {
                      return (
                        <div
                          key={pay.id}
                          className="grid grid-cols-4 items-center justify-center space-y-2  w-full text-sm"
                        >
                          <div>
                            <p>{pay.paymenttype}</p>
                          </div>
                          <div>
                            <p>{pay.paymentamount}</p>
                          </div>
                          <div className="text-sm text-orange-400">
                            <StatusPill
                              status={getStatusPillType(
                                pay?.paymentstatus as PaymentStatus,
                                pay.duedate
                              )}
                              title={
                                Date.now() > new Date(pay.duedate).getTime() &&
                                pay.paymentstatus === "PAID"
                                  ? (pay.paymentstatus as string)
                                  : Date.now() > new Date(pay.duedate).getTime()
                                    ? "Overdue"
                                    : (pay.paymentstatus as string)
                              }
                            />
                          </div>
                          <div className="text-sm">
                            <p>{new Date(pay.duedate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex justify-center mt-6">
                      <p>No Payments</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl bg-white p-6 ">
            <figcaption className="font-semibold text-buttongray">Occupants</figcaption>
            <div className="flex flex-row justify-between mt-6 text-sm ">
              <div className="w-full">
                <div className="grid grid-cols-2 text-sm text-buttongray">
                  <p>Name</p>
                  <p>Phone number</p>
                </div>
                <ul className="w-full mt-2 ">
                  {resident.residentData?.occupants &&
                  resident.residentData?.occupants?.length > 0 ? (
                    resident.residentData?.occupants.map((occupants, index) => {
                      return (
                        <li
                          key={index}
                          className="odd:bg-slate-100 p-2 rounded-xl grid grid-cols-2 items-center justify-center space-y-2   w-full"
                        >
                          <div>
                            <p>{occupants.occupantsname}</p>
                          </div>
                          <div>
                            <p>{occupants.occupantsnumber}</p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <div className="flex justify-center mt-6">
                      <p>No occupants</p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl bg-white p-6">
            <figcaption className="font-semibold text-buttongray">Vehicles</figcaption>
            <div className="flex flex-row justify-between mt-4 h-[20rem] overflow-auto">
              <div className="w-full">
                <div className="w-full mt-2 flex flex-col gap-6">
                  {resident.residentData?.vehicle && resident.residentData?.vehicle?.length > 0 ? (
                    resident.residentData?.vehicle.map((cars, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row gap-2 items-center bg-[#f4f4f4] p-2 rounded-xl  "
                        >
                          <div className="w-1/3">
                            <Image
                              src={Car}
                              width={150}
                              height={50}
                              alt="car Icon"
                              className="object-cover h-[50px] w-[150px]"
                            />
                          </div>

                          <div className="w-2/3 flex flex-row justify-center gap-6 text-[8px] flex-nowrap ">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-row gap-6">
                                <div className="text-xs">
                                  <p className="text-buttongray">Vehicle make</p>
                                  <p className="font-bold uppercase">{cars.vehiclemake}</p>
                                </div>
                              </div>
                              <div className="text-xs">
                                <p className="text-buttongray">Vehicle model</p>
                                <p className="font-bold uppercase">{cars.vehiclemodel}</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="text-xs">
                                <p className="text-buttongray">Vehicle number</p>
                                <p className="font-bold uppercase">{cars.vehiclenumber}</p>
                              </div>
                              <div className="text-xs">
                                <p className="text-buttongray">Vehicle color</p>
                                <p className="font-bold uppercase">{cars.vehiclecolor}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex justify-center mt-6">
                      <p>No vehicle</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl bg-white p-6">
            <figcaption className="text-red-600">
              To delete <i>{resident.name}</i> , type <b>DELETE</b> in the box below
            </figcaption>

            <form className="mt-12" ref={deleteResidentRef}>
              <Inputs
                label="Confirm delete"
                title="Confirm delete"
                placeholder=""
                arialabel="Confirm delete"
                BorderRadius="10px"
                inputtype="text"
                required={true}
                Border="1px solid red"
                inputBg=""
              />

              <Button
                label={isLoading ? "Loading" : "Delete"}
                onClick={(e) => handleDeleteResident(resident.id, e)}
                iconAlign="none"
                variant="Tertiary"
                color="#139D8F"
                textcolor="red"
                type="submit"
                diasbled={isLoading}
                btnbgColor={isLoading ? "#c4c4c4" : "#FFC9CF"}
              />
            </form>
          </figure>
        </div>
        <div className="md:w-[50%] md:m-6 grid gap-6">
          <figure className="rounded-xl bg-white md:p-6">
            <figcaption>Maintenance</figcaption>
            <div className="flex flex-row justify-between mt-6">
              <div className="w-full">
                <div className="w-full mt-2 grid gap-6">
                  {resident.residentData?.maintenance &&
                  resident.residentData?.maintenance?.length > 0 ? (
                    resident.residentData?.maintenance.map((issues, index) => {
                      return (
                        <div
                          key={index}
                          className="grid md:grid-cols-[auto,1fr] gap-6 items-center bg-[#f4f4f4] mx-6 md:mx-0 md:p-2 rounded-xl "
                        >
                          {issues.image ? (
                            <div>
                              <Image
                                src={issues.image}
                                width={100}
                                height={100}
                                className="rounded-xl"
                                alt="maintenance image"
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          <div>
                            <div className="flex flex-row gap-6">
                              <div className="text-xs py-1 px-2 bg-slate-200 text-buttongray rounded-xl">
                                <p>{issues.category}</p>
                              </div>
                              <div
                                className={`text-xs py-1 px-2 ${issues.status === "OPEN" ? "text-[#9e0a05] bg-[#fbeae9]" : issues.status === "INPROGRESS" ? "text-[#865503] bg-[#fef6e7]" : "text-[#139d8f] bg-[#e7f6ec]"} rounded-xl`}
                              >
                                <p>{issues.status}</p>
                              </div>
                              <div>
                                <select>
                                  <option>update fault status</option>
                                  <option>{MaintenanceStatus.CLOSED}</option>
                                  <option>{MaintenanceStatus.INPROGRESS}</option>
                                  <option>{MaintenanceStatus.OPEN}</option>
                                </select>
                              </div>
                            </div>
                            <div className="text-sm mt-4">
                              <p>{issues.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex justify-center mt-6">
                      <p>No maintenance</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl bg-white md:p-6 mx-6 md:mx-0 mt-6 md:mt-0">
            <figcaption>Visitor&apos;s code history</figcaption>
            <div className=" mt-6">
              <div className="grid grid-cols-6 text-sm overflow-auto">
                <p>Name</p>
                <p>Phone No</p>
                <p className="col-span-2">Email</p>
                <p>Code</p>
                <p>Status</p>
              </div>
              <div className="w-full mt-2 gap-6 ">
                {resident.residentData?.visitorcode &&
                resident.residentData?.visitorcode?.length > 0 ? (
                  resident.residentData?.visitorcode.map((code, index) => {
                    return (
                      <div key={index} className="bg-[#f4f4f4] rounded-xl grid gap-6 mt-6 p-4">
                        <div className="grid md:grid-cols-6 w-full md:items-center md:justify-center gap-6">
                          <div className="text-xs">
                            <p>{code.visitorname}</p>
                          </div>

                          <div className="text-xs ">
                            <p>{code.visitornumber}</p>
                          </div>
                          <div className="text-xs col-span-2 text-left ">
                            <p className="">
                              {`${code.visitoremail?.split(".").slice(0, -1).join("")}..`}
                            </p>
                          </div>
                          <div className="text-xs">
                            <p>{code.code}</p>
                          </div>
                          <div className="text-xs text-[#9e0a05]">
                            <p>{code.status}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-center mt-6">
                    <p>No Visitor&apos;s code history</p>
                  </div>
                )}
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};
