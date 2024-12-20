import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { SearchBox } from "@/stories/searchbox/search";
import { Button } from "@/stories/Button/Button";
import { FilterIcon } from "@/public/svgIcons/filter";
import { PlusIcon } from "@/public/svgIcons/plusIcon";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { MoreIcon } from "@/public/svgIcons/moreIcon";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { Modal } from "@/stories/modal/modal";
import { useRef, useState } from "react";
import { Inputs } from "@/stories/input/input";

interface AdminDashBoardProp {
  isCollapse: boolean;
}

interface createNewStaffProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: Date;
}

export const ManagedStaff = ({ isCollapse }: AdminDashBoardProp) => {
  const createNewStaffModalRef = useRef<HTMLDialogElement | null>(null);
  const newStaffFormRef = useRef<HTMLFormElement | null>(null);
  const [allStaffs, setAllStaffs] = useState<createNewStaffProps[]>([]);

  console.log(allStaffs, "allstaffs");

  const handleAddNewStaffButton = () => {
    handleOpenAddNewStaff();
  };

  const handleOpenAddNewStaff = () => {
    createNewStaffModalRef.current?.showModal();
  };

  const handleCreateNewStaff = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newStaffFormRef.current) {
      const formData = new FormData(newStaffFormRef.current);

      const newStaffData: createNewStaffProps = {
        firstName: formData.get("firstname") as string,
        lastName: formData.get("lastname") as string,
        phoneNumber: formData.get("phonenumber") as string,
        email: formData.get("email") as string,
        date: new Date(),
      };

      setAllStaffs([...allStaffs, newStaffData]);

      newStaffFormRef.current.reset();

      createNewStaffModalRef?.current?.close();
    }
  };
  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Manage Staffs" />
      <DashBreadcrumbs title="Manage-staffs" />

      {/**Searchbox header */}
      <div className="flex md:flex-row flex-col justify-between p-6 gap-6 md:gap-0">
        <div className="md:w-[30vw]">
          <SearchBox
            bgColor="#EFF0F1"
            placeholder="Search staff name"
            name="SearchResidents"
            color="#b4b4b4"
          />
        </div>
        <div className="flex flex-row justify-between gap-6">
          <Button
            variant="Tertiary"
            iconAlign="before"
            label="filter"
            icon={FilterIcon}
            onClick={() => "hell"}
            color="#139D8F"
          />
          <Button
            variant="Tertiary"
            iconAlign="before"
            label="Add New Staff"
            icon={PlusIcon}
            onClick={handleAddNewStaffButton}
            bgColor=""
            btnbgColor="#139D8F"
            color="#c3f8f2"
          />
        </div>
      </div>

      {/**create staff table */}
      <section className="px-6 bg-[#F8F8F8] ">
        <h3 className="mb-6 text-xl text-buttongray font-semibold">Staffs</h3>
        <div className="overflow-auto">
          <table className="tabler w-full [font-size:_clamp(.7rem,5vw,.9rem)]  rounded-t-[20px] text-left border-collapse overflow-hidden">
            <thead className="sticky top-0">
              <tr className="bg-[#F0F2F5] text-buttongray">
                <th>
                  <input type="checkbox" />
                </th>
                <th className="text-start">Name</th>
                <th className="text-start text-nowrap">Phone number</th>
                <th className="text-start">Date created</th>
                {/* <th className="text-start">Status</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white p-0 w-full">
              {allStaffs && allStaffs.length > 0 ? (
                allStaffs.map((staff, index) => (
                  <tr className="border-b border-[#F0F2F5] w-full p-4" key={index}>
                    <td className="" width={10}>
                      <input type="checkbox" />
                    </td>

                    <td className="flex flex-row items-center gap-4 py-6 ">
                      <span className="flex w-10 h-10 rounded-full justify-center items-center font-bold bg-[#FFECE5] text-[#F56630] uppercase">
                        {staff.firstName.slice(0, 1)}
                      </span>
                      <div>
                        <h4 className="font-bold ">{`${staff.firstName} ${staff.lastName}`}</h4>
                        <p className="text-buttongray">{staff.email}</p>
                      </div>
                    </td>

                    <td className="text-buttongray py-6 text-nowrap">
                      <p>{staff.phoneNumber}</p>
                    </td>
                    <td className="text-buttongray">{staff.date.toDateString()}</td>
                    {/* <td className="text-[12px]  flex">
                        <StatusPill title="Paid" status="success" />
                      </td> */}

                    <td>
                      <span>
                        <MoreIcon />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    <i className="text-buttongray">No staff created</i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {allStaffs.length > 5 && (
          <div className="flex gap-2 justify-center bg-white p-4 text-buttongray rounded-b-[20px]">
            <button className="border py-1 px-3 rounded-md [transform:_scale(-1,1)]">
              <ArrowIcon color="#344054" />
            </button>
            <p className="border py-1 px-3 rounded-md">1</p>
            <p className="border py-1 px-3 rounded-md">2</p>
            <p className="border py-1 px-3 rounded-md">3</p>

            <button className="border py-1 px-3 rounded-md ">
              {" "}
              <ArrowIcon color="#344054" />
            </button>
          </div>
        )}
      </section>

      {/**ModalSection */}
      <Modal
        title="Add New Staff"
        handleOpenModal={handleOpenAddNewStaff}
        ref={createNewStaffModalRef}
      >
        <form className="md:w-[30vw]" ref={newStaffFormRef}>
          <fieldset className="flex flex-col gap-6 mt-6">
            <legend className="font-semibold text-primary">Staff Details</legend>

            <div className="flex flex-col gap-8 mt-12">
              <Inputs
                label="First Name"
                title="firstname"
                placeholder=""
                arialabel="firstname"
                BorderRadius="10px"
                inputtype="text"
                required={false}
                Border="1px solid #E3E5E5"
              />

              <Inputs
                label="Last Name"
                title="lastname"
                placeholder=""
                arialabel="lastname"
                BorderRadius="10px"
                inputtype="text"
                required={false}
                Border="1px solid #E3E5E5"
              />
            </div>
            <div className="flex flex-col gap-8 mt-2">
              <Inputs
                label="Email address"
                title="email"
                placeholder=""
                arialabel="email"
                BorderRadius="10px"
                inputtype="text"
                required={false}
                Border="1px solid #E3E5E5"
              />

              <Inputs
                label="Phone number"
                title="phonenumber"
                placeholder=""
                arialabel="phonenumber"
                BorderRadius="10px"
                inputtype="text"
                required={false}
                Border="1px solid #E3E5E5"
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <Button
                variant="Primary"
                onClick={(event) => handleCreateNewStaff(event)}
                iconAlign="after"
                color="#139D8F"
                label="Create Staff"
              />
            </div>
          </fieldset>
        </form>
      </Modal>
    </section>
  );
};
