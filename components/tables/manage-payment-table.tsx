"use client";
import { FilterIcon } from "@/public/svgIcons/filter";
import { PlusIcon } from "@/public/svgIcons/plusIcon";
import { Button } from "@/stories/Button/Button";
import { SearchBox } from "@/stories/searchbox/search";

import { MoreIcon } from "@/public/svgIcons/moreIcon";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { Modal } from "@/stories/modal/modal";
import { useRef, useState, useEffect } from "react";
import { Inputs } from "@/stories/input/input";
import { Select } from "@/stories/select/select";
import { residentShit } from "@/app/dashboard/admin/admin-dashboard/admin-residents";
import { ResidentPayment } from "@/app/actions/create-resident-payment";
import { nameInitials } from "@/utils/nameInitials";
import { ViewPaymentModal } from "@/components/app-modals/viewpayment";

interface residentDataProps {
  residentPayments: residentShit[];
}

export const ManageResidentPaymentTable = ({ residentPayments }: residentDataProps) => {
  const viewPaymentRef = useRef<HTMLDialogElement | null>(null);
  const createPaymentRef = useRef<HTMLDialogElement | null>(null);
  const createPaymentFormRef = useRef<HTMLFormElement | null>(null);

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState("");

  const [index, setIndex] = useState<number | null>(null);

  const [selectAllPayments, setSelectAllPayments] = useState<boolean>(false);

  const [selectedPaymentCheckbox, setSelectedPaymentCheckbox] = useState<number[]>([]);
  const [residentDatas, setResidentDatas] = useState<residentShit[]>([]);
  const [createResidentPayment, setCreateResidentPayment] = useState<residentShit[]>([]);
  const [currentViewPayment, setCurrentViewPayment] = useState<residentShit>();

  const data = ["debris", "shale", "wale", "adle"];

  //init payment modal
  const handleOpenPaymentModal = () => {
    createPaymentRef?.current?.showModal();
  };

  const handleCreateResident = () => {
    handleOpenPaymentModal();
  };

  const handleCreateNewPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (createPaymentFormRef.current) {
      const formData = new FormData(createPaymentFormRef.current);

      formData.append("residentname", selectedItem);
      formData.append("paymenttype", selectedPaymentType);

      await ResidentPayment(formData);

      // setCreateResidentPayment([...createResidentPayment, paymentFormData]);

      createPaymentRef.current?.close();

      console.log(createResidentPayment, "paymentData");

      // sessionStorage.setItem("paymentdata", JSON.stringify(paymentFormData));
    }
  };

  const handleSelectPaymentCheckbox = (index: number) => {
    setSelectedPaymentCheckbox((prevCheckedRow) => {
      return prevCheckedRow.includes(index)
        ? prevCheckedRow.filter((row) => row !== index)
        : [...prevCheckedRow, index];
    });
  };

  const handleSelectAllPaymentRow = () => {
    if (selectAllPayments) {
      setSelectedPaymentCheckbox([]);
    } else {
      setSelectedPaymentCheckbox(createResidentPayment.map((_, index) => index));
    }

    setSelectAllPayments(!selectAllPayments);
  };

  const handleDeletePaymentRow = () => {
    const deleteSelectedPaymentRows = createResidentPayment.filter(
      (_, index) => !selectedPaymentCheckbox.includes(index)
    );
    setCreateResidentPayment(deleteSelectedPaymentRows);
  };

  const OpenViewPaymentModal = () => {
    viewPaymentRef.current?.showModal();
  };

  const handleViewPayment = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentViewPayment(residentPayments[index]);
    OpenViewPaymentModal();
  };

  return (
    <section className="mt-12">
      {/**Searchbox header */}
      <div className="flex md:flex-row flex-col justify-between p-6 gap-6 md:gap-0">
        <div className="md:w-[30vw]">
          <SearchBox
            bgColor="#EFF0F1"
            placeholder="Search house number or name"
            name="SearchResidents"
            color="#b4b4b4"
          />
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
            label="Create payment"
            icon={PlusIcon}
            onClick={handleCreateResident}
            bgColor=""
            btnbgColor="#139D8F"
            color="#c3f8f2"
          />
        </div>
      </div>

      {/**payment table */}
      <section className="px-6 bg-[#F8F8F8] ">
        <h3 className="mb-6 text-xl text-buttongray font-semibold">Payments</h3>

        {selectedPaymentCheckbox.length > 0 && createResidentPayment.length > 0 && (
          <div>
            <button
              onClick={handleDeletePaymentRow}
              className="text-primary text-xs font-semibold mb-4 py-2 px-4 rounded-[100px] hover:bg-primary hover:text-white border border-primary"
            >
              Delete selected
            </button>
          </div>
        )}

        <div className="overflow-auto">
          <table className="tabler w-full [font-size:_clamp(.7rem,5vw,.9rem)]  rounded-t-[20px] text-left border-collapse overflow-hidden">
            <thead className="sticky top-0">
              <tr className="bg-[#F0F2F5] text-buttongray">
                <th>
                  {" "}
                  <input
                    type="checkbox"
                    name="selectallpayment"
                    id="selectallpayment"
                    onChange={handleSelectAllPaymentRow}
                  />
                </th>
                <th className="text-start">Name</th>
                <th className="text-start">House number</th>
                <th className="text-start text-nowrap">Payment Type</th>
                {/* <th className="text-start">Date created</th>
                  <th className="text-start">Date Due</th> */}
                {/* <th className="text-start">Status</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white p-0 w-full">
              {residentPayments && residentPayments.length > 0 ? (
                residentPayments.map((payment, index) => (
                  <tr
                    key={index}
                    className={`border-b  border-[#F0F2F5] w-full p-4 ${selectedPaymentCheckbox.includes(index) ? "bg-secondary/30" : ""}`}
                  >
                    <td className="" width={10}>
                      <input
                        type="checkbox"
                        name="createpayment"
                        id="createpayment"
                        onChange={() => handleSelectPaymentCheckbox(index)}
                      />
                    </td>

                    <td className="flex flex-row items-center gap-4 py-6 ">
                      <span className="flex w-10 h-10 rounded-full justify-center items-center font-bold bg-[#FFECE5] text-[#F56630] uppercase">
                        {nameInitials(payment.name || "")}
                      </span>
                      <div>
                        <h4 className="font-bold ">{payment?.name}</h4>
                        <p className="text-buttongray">{payment.email}</p>
                      </div>
                    </td>

                    <td className="text-buttongray py-6 text-nowrap">
                      <p>{payment?.residentData?.streetaddress}</p>
                    </td>

                    <td className="text-buttongray py-6 text-nowrap">
                      <button
                        className="underline text-blue-600"
                        onClick={(e) => handleViewPayment(index, e)}
                      >{`view payments (${payment.residentData?.payment.length})`}</button>
                    </td>

                    <td>
                      <span>
                        <MoreIcon />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="italic text-center text-buttongray">
                    No payment created
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {createResidentPayment && createResidentPayment.length > 5 && (
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
      {/**Create payment modal */}
      <Modal title="Create payment" handleOpenModal={handleOpenPaymentModal} ref={createPaymentRef}>
        <form ref={createPaymentFormRef} onSubmit={handleCreateNewPayment}>
          <fieldset className="flex flex-col gap-6 mt-6 text-sm text-buttongray">
            <legend className="mb-6 font-semibold  text-base text-primary">Resident details</legend>

            <Select
              title="Select resident"
              selectData={residentDatas.map((resident) => resident?.name || "")}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              setIndex={setIndex}
            />

            <div className="flex flex-row gap-6 mt-8 text-buttongray">
              <Inputs
                label="Email Address"
                title="email"
                placeholder=""
                arialabel="email"
                BorderRadius="10px"
                inputtype="text"
                required={false}
                Border="1px solid #E3E5E5"
                defaultValue={index !== null ? (residentDatas[index]?.email as string) : ""}
                readOnly={true}
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
                defaultValue={index !== null ? residentDatas[index]?.residentData?.phonenumber : ""}
                readOnly={true}
              />

              <Inputs
                label="House address"
                title="houseaddress"
                placeholder=""
                arialabel="houseaddress"
                BorderRadius="10px"
                inputtype="text"
                required={false}
                Border="1px solid #E3E5E5"
                defaultValue={
                  index !== null
                    ? `${residentDatas[index]?.residentData?.housenumber || ""} ${residentDatas[index]?.residentData?.streetaddress || ""}`
                    : ""
                }
                readOnly={true}
              />
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-6 mt-0">
            <legend className="mb-12 font-semibold text-primary">Payment details</legend>
            <div className="flex flex-col gap-6 text-sm">
              <div className=" -mt-6 text-sm text-buttongray">
                <Select
                  title="Payment type"
                  selectData={data}
                  setSelectedItem={setSelectedPaymentType}
                  selectedItem={selectedPaymentType}
                />
              </div>
              <div className="mt-8">
                <Inputs
                  label="Payment amount"
                  title="paymentamount"
                  placeholder=""
                  arialabel="paymentamount"
                  BorderRadius="10px"
                  inputtype="number"
                  required={false}
                  Border="1px solid #E3E5E5"
                />
              </div>
              <div className="mt-8">
                <Inputs
                  label="Due Date"
                  title="duedate"
                  placeholder=""
                  arialabel="duedate"
                  BorderRadius="10px"
                  inputtype="date"
                  required={false}
                  Border="1px solid #E3E5E5"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mb-2">
              <Button
                label="Create payment"
                onClick={() => console.log("hi")}
                iconAlign="after"
                variant="Primary"
                color="#139D8F"
              />
            </div>
          </fieldset>
        </form>
      </Modal>

      {/* view payment modal */}
      <Modal title="View payments" handleOpenModal={OpenViewPaymentModal} ref={viewPaymentRef}>
        <ViewPaymentModal currentViewPayment={currentViewPayment} />
      </Modal>
    </section>
  );
};
