"use client";
import { FilterIcon } from "@/public/svgIcons/filter";
import { PlusIcon } from "@/public/svgIcons/plusIcon";
import { Button } from "@/stories/Button/Button";
import { SearchBox } from "@/stories/searchbox/search";
import { MoreIcon } from "@/public/svgIcons/moreIcon";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { Modal } from "@/stories/modal/modal";
import { useRef, useState, useEffect, SetStateAction } from "react";
import { Inputs } from "@/stories/input/input";
import { Select } from "@/stories/select/select";
import { CreateResident } from "@/app/dashboard/admin/actions/createresident";
import { StatusPill } from "@/stories/statuspills/statuspill";
import Link from "next/link";
import { Toaster, toast } from "sonner";

import { nameInitials } from "@/utils/nameInitials";
import { residentShit } from "@/app/dashboard/admin/admin-dashboard/admin-residents";

import { usePagination } from "@/hooks/usePagination";
import { SearchBoxArea } from "../search-box";

interface residentDataProps {
  residents: residentShit[];
}

export const ManageCreateResidentTable = ({ residents }: residentDataProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const prevFormRef = useRef<HTMLFormElement | null>(null);

  const createPaymentRef = useRef<HTMLDialogElement | null>(null);

  const [currentState, setCurrentState] = useState(1);
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  const [isHouseType, setIsHouseType] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);

  const [residentDatas, setResidentDatas] = useState<residentShit[]>([]);

  const houseTypeData = [
    "3 bedroom-bungalow",
    "4 bedroom-duplex",
    "2 bedroom-terrace",
    "3 bedroom-detached-duplex",
  ];

  //handles move to next form
  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setErrors([]);

    if (prevFormRef.current) {
      const formData = new FormData(prevFormRef.current);

      const residentFormData = {
        fullname: formData.get("fullname") as string,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phonenumber") as string,
        houseNumber: formData.get("housenumber") as string,
        houseType: isHouseType,
        streetAddress: formData.get("streetaddress") as string,
        moveInDate: formData.get("moveindate") as string,
      };
      formData.append("houseType", isHouseType);

      const emptyFields = Object.entries(residentFormData).filter(([key, value]) => !value);

      if (emptyFields.length > 0) {
        toast.error(
          `Please fill out the following fields: ${emptyFields.map(([key]) => [key].join(", "))}`
        );

        setErrors(emptyFields.map(([key]) => [key].join(", ")));

        return;
      }

      sessionStorage.setItem("resident", JSON.stringify(residentFormData));

      if (currentState <= 2) {
        setCurrentState((prev) => prev + 1);
      }
    }
  };

  const handleAddNewResident = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //get the resident details from session
    setIsLoading(true);
    const prevResidentData = JSON.parse(sessionStorage.getItem("resident") as string);

    if (prevFormRef.current) {
      const formData = new FormData(prevFormRef.current);

      formData.append("fullname", prevResidentData.fullname);
      formData.append("email", prevResidentData.email);
      formData.append("phonenumber", prevResidentData.phoneNumber);
      formData.append("housenumber", prevResidentData.houseNumber);
      formData.append("houseType", prevResidentData.houseType);
      formData.append("streetaddress", prevResidentData.streetAddress);
      formData.append("moveindate", prevResidentData.moveInDate);

      const newRes = await CreateResident(formData);

      console.log(newRes);

      if (newRes.success === true) {
        toast.success(newRes.message);
        setShowSuccessMessage(true);
      } else {
        toast.error(newRes.error);
      }

      //set resident data to state
      // setResidentData((prevResidentData) => [...prevResidentData, newRes.newResident]);

      //close modal
      modalRef.current?.close();

      //rest form values
      // nextFormRef.current.reset();
      prevFormRef.current?.reset();

      //clear session storage
      sessionStorage.removeItem("resident");

      //reset form state
      setCurrentState(1);

      //reset dropdown item
      setSelectedItem("");

      setIsLoading(false);

      console.log("resident", residentDatas);
    }
  };

  //opens payment modal
  const handleOpenCreatePaymentModal = () => {
    handleOpenModal();
  };

  //init resident modal
  const handleOpenModal = () => {
    modalRef.current?.showModal();
  };

  //handles move to previous form
  const handlePrev = () => {
    setCurrentState((prev) => prev - 1);
  };

  //init payment modal
  const handleOpenPaymentModal = () => {
    createPaymentRef?.current?.showModal();
  };

  const handleCreateResident = () => {
    handleOpenPaymentModal();
  };

  const handleSelectResidentCheckbox = (index: number) => {
    setSelectedCheckbox((prevSelectedRows) => {
      return prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((row) => row != index)
        : [...prevSelectedRows, index];
    });
  };

  const handleSelectAllResident = () => {
    if (selectAll) {
      setSelectedCheckbox([]);
    } else {
      setSelectedCheckbox(residentDatas.map((_, index) => index));
    }

    setSelectAll(!selectAll);
  };

  const handleDeleteResidentRow = () => {
    const deleteSelectedRows = residentDatas.filter(
      (_, index) => !selectedCheckbox.includes(index)
    );
    setResidentDatas(deleteSelectedRows);
  };

  const handleMoreIconButton = (index: number) => {};

  const { currentPage, setItemsPerPage, currentPageData, setCurrentPage, totalPage, paginate } =
    usePagination(residents, 3);

  return (
    <section>
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-300",
            success: "text-green-600",
            warning: "text-yellow-600",
            info: "bg-blue-500",
          },
        }}
        offset={16}
      />
      {/**Searchbox header */}
      <div className="flex md:flex-row flex-col justify-between p-6 gap-6 md:gap-0">
        <div className="md:w-[30vw]">
          {/* <SearchBox
            bgColor="#EFF0F1"
            placeholder="Search house number or name"
            name="SearchResidents"
            color="#b4b4b4"
          /> */}
          <SearchBoxArea />
        </div>
        <div className="flex flex-row gap-6 flex-wrap">
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
            label="Add New Resident"
            icon={PlusIcon}
            onClick={handleOpenCreatePaymentModal}
            bgColor=""
            btnbgColor="#139D8F"
            color="#c3f8f2"
          />
        </div>
      </div>

      {/**create resident table */}
      <section className="px-6 bg-[#F8F8F8] ">
        <h3 className="mb-6 text-xl text-buttongray font-semibold ">Residents</h3>
        {showSuccessMessage && (
          <div className="p-6 bg-secondary rounded-xl text-black mb-6  flex w-full">
            <div className="w-full">
              <p>A link has been sent to your email address</p>
              <p className="">
                Please check your inbox or spam message for the link to complete your account setup
              </p>
            </div>
            <button onClick={() => setShowSuccessMessage(false)} className=" flex justify-end">
              close
            </button>
          </div>
        )}

        {selectedCheckbox.length > 0 && residentDatas.length > 0 && (
          <div>
            <button
              onClick={handleDeleteResidentRow}
              className="text-primary text-xs font-semibold mb-4 py-2 px-4 rounded-[100px] hover:bg-primary hover:text-white border border-primary"
            >
              Delete selected
            </button>
          </div>
        )}

        {/**resident table */}
        <div className="rounded-t-[20px] overflow-auto  h-full">
          <table className="tabler w-full  h-full overflow-auto [font-size:_clamp(.7rem,5vw,.9rem)] rounded-t-[20px] text-left border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-[#F0F2F5] text-buttongray">
                <th>
                  {" "}
                  <input
                    type="checkbox"
                    name="selectall"
                    id="selectall"
                    aria-label="resident-table-selectall"
                    checked={selectAll}
                    onChange={handleSelectAllResident}
                  />
                </th>
                <th className="text-start">Name</th>
                <th className="text-start">House number</th>
                <th className="text-start text-nowrap">Phone number</th>
                <th className="text-start">Date created</th>
                <th className="text-start">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white p-0 w-full">
              {currentPageData && currentPageData.length > 0 ? (
                currentPageData.map((resident, index) => (
                  <tr
                    key={index}
                    className={`border-b  border-[#F0F2F5] w-full p-4 ${selectedCheckbox.includes(index) ? "bg-secondary/30" : ""}`}
                  >
                    <td className="" width={10}>
                      <input
                        type="checkbox"
                        name="residentSelect"
                        id="residentSelect"
                        checked={selectedCheckbox?.includes(index)}
                        onChange={() => handleSelectResidentCheckbox(index)}
                      />
                    </td>

                    <td className="flex flex-row items-center gap-4 py-6 ">
                      <span className="flex w-10 h-10 rounded-full justify-center items-center font-bold bg-[#FFECE5] text-[#F56630] uppercase">
                        {nameInitials(resident.name || "")}
                      </span>
                      <div>
                        <h4 className="font-bold ">{resident?.name}</h4>
                        <p className="text-buttongray">{resident?.email}</p>
                      </div>
                    </td>

                    <td className="text-buttongray py-6 text-nowrap">
                      <p>
                        {`${resident.residentData?.housenumber},
                          ${resident?.residentData?.streetaddress}`}
                      </p>
                    </td>

                    <td className="text-buttongray py-6 text-nowrap">
                      <p>{resident?.residentData?.phonenumber}</p>
                    </td>
                    <td className="text-buttongray">
                      {new Date(resident?.createdAt).toDateString()}
                    </td>
                    <td className="text-[12px]  flex">
                      {/* <StatusPill title="Residing" status="success" /> */}
                      <Link
                        href={`/dashboard/admin/manage-residents/details/${resident.id}`}
                        className="text-green-500"
                        prefetch={false}
                      >
                        View →
                      </Link>
                    </td>

                    <td className="relative">
                      <button onClick={() => handleMoreIconButton(index)}>
                        <MoreIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-buttongray italic">
                    No resident created
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* {currentPageData && currentPageData.length > 5 && ( */}
        <div className="flex bg-white rounded-b-[20px] justify-between p-4">
          <div>
            <select
              // value={Number(inputValue)}
              className="border p-1 rounded-xl"
              onChange={(e) => {
                const selectedValue = Number(e.target.value);
                setItemsPerPage(selectedValue);
                setCurrentPage(1);
              }}
            >
              <option value="" disabled>
                Select
              </option>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => paginate(currentPage - 1)}
              className="border cursor-pointer py-1 px-3 rounded-md [transform:_scale(-1,1)]"
              disabled={currentPage === 1}
            >
              <ArrowIcon color="#344054" />
            </button>
            <p>
              Page {currentPage} of {totalPage}
            </p>

            <button
              onClick={() => paginate(currentPage + 1)}
              type="button"
              className="border py-1 px-3 rounded-md cursor-pointer"
              disabled={currentPage === totalPage}
            >
              {" "}
              <ArrowIcon color="#344054" />
            </button>
          </div>
        </div>
        {/* )} */}
      </section>
      {/**create resident modal */}
      <Modal title="Add new Resident" handleOpenModal={handleOpenModal} ref={modalRef}>
        <div className="">
          <span className="my-6 flex gap-1">
            <b className="text-primary">{currentState}</b> of <b className="text-primary">2</b>
          </span>

          {/**Form ! */}

          <form ref={prevFormRef}>
            {currentState === 1 && (
              <div>
                <fieldset className="flex flex-col gap-8">
                  <legend className="font-semibold text-primary mb-6">
                    Resident Information (Compulsory)
                  </legend>
                  <div className="flex flex-row gap-6 mt-6">
                    <Inputs
                      label="Full Name"
                      title="fullname"
                      placeholder=""
                      arialabel="fullname"
                      BorderRadius="10px"
                      inputtype="text"
                      required={true}
                      Border="1px solid #E3E5E5"
                    />
                  </div>

                  <div className="flex flex-row gap-6">
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

                  <legend className=" font-semibold text-primary">Residential information</legend>
                  <div className="flex flex-col gap-8 mt-12">
                    <Inputs
                      label="Unit/House number"
                      title="housenumber"
                      placeholder=""
                      arialabel="phonenumber"
                      BorderRadius="10px"
                      inputtype="text"
                      required={false}
                      Border="1px solid #E3E5E5"
                    />
                    <Inputs
                      label="Street address"
                      title="streetaddress"
                      placeholder=""
                      arialabel="Street address"
                      BorderRadius="10px"
                      inputtype="text"
                      required={false}
                      Border="1px solid #E3E5E5"
                    />
                    {/* <Inputs
                    label="Unit/House type"
                    title="House_type"
                    placeholder=""
                    arialabel="House_type"
                    BorderRadius="10px"
                    inputtype="text"
                    required={false}
                    Border="1px solid #E3E5E5"
                  /> */}
                    <div className="text-sm text-buttongray mb-6 mt-[-2rem]">
                      <Select
                        selectData={houseTypeData}
                        setSelectedItem={setIsHouseType}
                        selectedItem={isHouseType}
                        title="Unit/House type"
                        setIndex={setIndex}
                      />
                    </div>
                    <Inputs
                      label="Move-in Date"
                      title="moveindate"
                      placeholder=""
                      arialabel="moveindate"
                      BorderRadius="10px"
                      inputtype="date"
                      required={false}
                      Border="1px solid #E3E5E5"
                    />
                  </div>

                  <div className="w-full flex justify-center mt-6 mb-2">
                    <Button
                      label="Next"
                      onClick={handleNext}
                      iconAlign="after"
                      variant="Primary"
                      color="#139D8F"
                    />
                  </div>
                </fieldset>
              </div>
            )}

            {/**Form 2 */}
            {currentState === 2 && (
              <fieldset className="flex flex-col gap-8">
                <legend className="font-semibold text-primary">Vehicle info</legend>
                <div className="flex flex-row gap-6 mt-12">
                  <Inputs
                    label="Vehicle Make"
                    title="vehiclemake"
                    placeholder=""
                    arialabel="vehiclemake"
                    BorderRadius="10px"
                    inputtype="text"
                    required={false}
                    Border="1px solid #E3E5E5"
                  />

                  <Inputs
                    label="Vehicle Model"
                    title="vehiclemodel"
                    placeholder=""
                    arialabel="vehiclemodel"
                    BorderRadius="10px"
                    inputtype="text"
                    required={false}
                    Border="1px solid #E3E5E5"
                  />
                </div>

                <div className="flex flex-row gap-6">
                  <Inputs
                    label="Vehicle Number"
                    title="vehiclenumber"
                    placeholder=""
                    arialabel="vehiclenumber"
                    BorderRadius="10px"
                    inputtype="text"
                    required={false}
                    Border="1px solid #E3E5E5"
                  />
                  <Inputs
                    label="Vehicle Color"
                    title="vehiclecolor"
                    placeholder=""
                    arialabel="vehiclecolor"
                    BorderRadius="10px"
                    inputtype="text"
                    required={false}
                    Border="1px solid #E3E5E5"
                  />
                </div>
                <div className="mt-6 flex flex-row justify-between">
                  <Button
                    label="Back"
                    onClick={handlePrev}
                    iconAlign="none"
                    variant="Secondary"
                    color="#139D8F"
                  />
                  <Button
                    label={isLoading ? "Loading" : "Create resident"}
                    onClick={handleAddNewResident}
                    iconAlign="after"
                    variant="Primary"
                    color="#139D8F"
                    // bgColor={isLoading ? "#f4f4f4" : "#1AD9C5"}
                    btnbgColor={isLoading ? "#c4c4c4" : "#139D8F"}
                    diasbled={isLoading}
                  />
                </div>
              </fieldset>
            )}
          </form>
        </div>
      </Modal>
    </section>
  );
};
