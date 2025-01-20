"use client";

import { useAdminContext } from "@/app/dashboard/provider";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { StaffType } from "./[id]/page";
import { Button } from "@/stories/Button/Button";
import { Inputs } from "@/stories/input/input";
import { useRef, useState } from "react";
import { DeleleStaffAction } from "../../actions/deletestaff";
import { toast, Toaster } from "sonner";

export const StaffDetails = ({ staff }: { staff: StaffType }) => {
  const { isCollapse } = useAdminContext();

  const [isLoading, setIsLoading] = useState(false);

  const deleteStaffRef = useRef<HTMLFormElement | null>(null);

  const handleDeleteStaff = async (e: React.MouseEvent<HTMLButtonElement>, staffId: string) => {
    e.preventDefault();
    console.log(staffId);

    if (deleteStaffRef.current) {
      const formData = new FormData(deleteStaffRef.current);

      setIsLoading(true);

      const result = await DeleleStaffAction(formData, staffId);

      if (result?.success === true) {
        toast.success(result?.message);
        setIsLoading(true);
      } else {
        toast.error(result?.message);
        setIsLoading(false);
      }

      setIsLoading(false);
    }

    deleteStaffRef.current?.reset();
  };

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

      <DashBoardHeader title="Staff details" />
      <DashBreadcrumbs title="Staff details" />

      <div className="flex flex-row m-6">
        <div className="w-1/2 flex flex-col gap-6">
          <figure className="bg-white p-6 rounded-xl ">
            <figcaption>Personal details</figcaption>
            <div className="flex md:flex-col flex-col gap-6 justify-between mt-6">
              <div>
                <p className="text-sm text-buttongray">Name</p>
                <p>{staff?.name}</p>
              </div>

              <div>
                <p className="text-sm text-buttongray">Email</p>
                <p>{staff?.email}</p>
              </div>

              <div>
                <p className="text-sm text-buttongray">Phone number</p>
                <p>{staff?.staffData?.phonenumber}</p>
              </div>
              <div>
                <p className="text-sm text-buttongray">Position</p>
                <p>{staff?.staffData?.position}</p>
              </div>
            </div>
          </figure>

          <figure className="rounded-xl bg-white p-6">
            <figcaption className="text-red-600">
              To delete <i>{staff?.name}</i> , type <b>DELETE</b> in the box below
            </figcaption>

            <form className="mt-12" ref={deleteStaffRef}>
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
                onClick={(e) => handleDeleteStaff(e, staff.id)}
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
        <div className="w-1/2"></div>
      </div>
    </section>
  );
};
