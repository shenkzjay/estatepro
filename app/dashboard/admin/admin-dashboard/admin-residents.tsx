import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { FilterIcon } from "@/public/svgIcons/filter";
import { PlusIcon } from "@/public/svgIcons/plusIcon";
import { Button } from "@/stories/Button/Button";
import { SearchBox } from "@/stories/searchbox/search";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { MoreIcon } from "@/public/svgIcons/moreIcon";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { Modal } from "@/stories/modal/modal";
import { useRef, useState } from "react";
import { Inputs } from "@/stories/input/input";
import { Select } from "@/stories/select/select";
import { CreateResident } from "@/app/actions/createresident";

interface AdminDashBoardProp {
  isCollapse: boolean;
}

interface prevFormDataProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  houseNumber: string;
  streetAddress: string;
  houseType: string;
  moveInDate: string;
}

interface nextFormDataProps {
  vehicleMake: string;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleColor: string;
  date: Date;
}

export interface newResidentProps {
  prevResidentData: prevFormDataProps;
  nextResidentData: nextFormDataProps;
}

interface createPaymentProps {
  residentName: string;
  email: string;
  phoneNumber: string;
  paymentType: string;
  houseAddress: string;
  createdAt: Date;
  dueDate: string;
}

export function ManageResident({ isCollapse }: AdminDashBoardProp) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const prevFormRef = useRef<HTMLFormElement | null>(null);
  const nextFormRef = useRef<HTMLFormElement | null>(null);
  const createPaymentRef = useRef<HTMLDialogElement | null>(null);
  const createPaymentFormRef = useRef<HTMLFormElement | null>(null);
  const [currentState, setCurrentState] = useState(1);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [isHouseType, setIsHouseType] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectAllPayments, setSelectAllPayments] = useState<boolean>(false);
  const [toggleDeleteButton, setToggleDeleteButton] = useState<boolean>(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);
  const [selectedPaymentCheckbox, setSelectedPaymentCheckbox] = useState<number[]>([]);
  const [residentData, setResidentData] = useState<newResidentProps[]>([]);
  const [createResidentPayment, setCreateResidentPayment] = useState<createPaymentProps[]>([]);
  const [popoverToggle, setPopoverToggle] = useState<boolean>(false);

  console.log(selectedCheckbox, "indexes");

  const data = ["debris", "shale", "wale", "adle"];
  const houseTypeData = [
    "3 bedroom-bungalow",
    "4 bedroom-duplex",
    "2 bedroom-terrace",
    "3 bedroom-detached-duplex",
  ];

  //init resident modal
  const handleOpenModal = () => {
    modalRef.current?.showModal();
  };

  //init payment modal
  const handleOpenPaymentModal = () => {
    createPaymentRef?.current?.showModal();
  };

  //opens payment modal
  const handleOpenCreatePaymentModal = () => {
    handleOpenModal();
  };

  //handles move to next form
  const handleNext = () => {
    if (currentState <= 2) {
      setCurrentState((prev) => prev + 1);
    }

    if (prevFormRef.current) {
      const formData = new FormData(prevFormRef?.current);

      const residentFormData: prevFormDataProps = {
        firstName: formData.get("firstname") as string,
        lastName: formData.get("lastname") as string,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phonenumber") as string,
        houseNumber: formData.get("housenumber") as string,
        houseType: isHouseType,
        streetAddress: formData.get("streetaddress") as string,
        moveInDate: formData.get("moveindate") as string,
      };

      sessionStorage.setItem("resident", JSON.stringify(residentFormData));
    }
  };

  const handleAddNewResident = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //get the resident details from session
    const prevResidentData: prevFormDataProps = JSON.parse(
      sessionStorage.getItem("resident") as string
    );

    if (nextFormRef.current) {
      const formData = new FormData(nextFormRef?.current);

      const nextFormData: nextFormDataProps = {
        vehicleMake: formData.get("vehiclemake") as string,
        vehicleNumber: formData.get("vehiclenumber") as string,
        vehicleColor: formData.get("vehiclecolor") as string,
        vehicleModel: formData.get("vehiclemodel") as string,
        date: new Date(),
      };

      const newResidentData: newResidentProps = {
        nextResidentData: nextFormData,
        prevResidentData,
      };

      const newRes = await CreateResident(newResidentData);

      console.log(newRes);

      //set resident data to state
      setResidentData((prevResidentData) => [...prevResidentData, newResidentData]);

      //close modal
      modalRef.current?.close();

      //rest form values
      nextFormRef.current.reset();
      prevFormRef.current?.reset();

      //clear session storage
      sessionStorage.removeItem("resident");

      //reset form state
      setCurrentState(1);

      //reset dropdown item
      setSelectedItem("");

      console.log("resident", residentData);
    }
  };

  //handles move to previous form
  const handlePrev = () => {
    setCurrentState((prev) => prev - 1);
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
      setSelectedCheckbox(residentData.map((_, index) => index));
    }

    setSelectAll(!selectAll);
  };

  const handleDeleteResidentRow = () => {
    const deleteSelectedRows = residentData.filter((_, index) => !selectedCheckbox.includes(index));
    setResidentData(deleteSelectedRows);
  };

  const handleCreateNewPayment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (createPaymentFormRef.current) {
      const formData = new FormData(createPaymentFormRef.current);

      const paymentFormData: createPaymentProps = {
        residentName: selectedItem,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phonenumber") as string,
        paymentType: selectedPaymentType,
        dueDate: formData.get("duedate") as string,
        createdAt: new Date(),
        houseAddress: formData.get("houseaddress") as string,
      };

      setCreateResidentPayment([...createResidentPayment, paymentFormData]);

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

  const handleMoreIconButton = (index: number) => {};

  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Manage Residents" />
      <DashBreadcrumbs title="Manage-residents" />

      {/**create resident table */}
      <section>
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

          {selectedCheckbox.length > 0 && residentData.length > 0 && (
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
                {residentData && residentData.length > 0 ? (
                  residentData.map((resident, index) => (
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
                          {resident.prevResidentData.firstName.slice(0, 1)}
                        </span>
                        <div>
                          <h4 className="font-bold ">{resident.prevResidentData.firstName}</h4>
                          <p className="text-buttongray">{resident.prevResidentData.email}</p>
                        </div>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>
                          {resident.prevResidentData.houseNumber}{" "}
                          {resident.prevResidentData.streetAddress}
                        </p>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>{resident.prevResidentData.phoneNumber}</p>
                      </td>
                      <td className="text-buttongray">
                        {resident.nextResidentData.date.toDateString()}
                      </td>
                      <td className="text-[12px]  flex">
                        <StatusPill title="Paid" status="success" />
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
          {residentData && residentData.length > 5 && (
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
      </section>

      {/**create payment table */}
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
                  <th className="text-start">Date created</th>
                  <th className="text-start">Date Due</th>
                  <th className="text-start">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white p-0 w-full">
                {createResidentPayment && createResidentPayment.length > 0 ? (
                  createResidentPayment.map((payment, index) => (
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
                          {payment.residentName.slice(0, 1)}
                        </span>
                        <div>
                          <h4 className="font-bold ">{payment.residentName}</h4>
                          <p className="text-buttongray">{payment.email}</p>
                        </div>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>{payment.houseAddress}</p>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>{payment.paymentType}</p>
                      </td>
                      <td className="text-buttongray">{payment.createdAt.toDateString()}</td>
                      <td className="text-buttongray">{payment.dueDate}</td>
                      <td className="text-[12px]  flex">
                        <StatusPill title="Paid" status="success" />
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
      </section>
      {/**create resident modal */}
      <Modal title="Add new Resident" handleOpenModal={handleOpenModal} ref={modalRef}>
        <div className="">
          <span className="my-6 flex gap-1">
            <b className="text-primary">{currentState}</b> of <b className="text-primary">2</b>
          </span>

          {/**Form ! */}
          {currentState === 1 && (
            <form ref={prevFormRef}>
              <fieldset className="flex flex-col gap-8">
                <legend className="font-semibold text-primary mb-6">
                  Resident Information (Compulsory)
                </legend>
                <div className="flex flex-row gap-6 mt-6">
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
              </fieldset>

              <fieldset className="flex flex-col mt-6">
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
              </fieldset>
              <div className="w-full flex justify-center mt-6 mb-2">
                <Button
                  label="Next"
                  onClick={handleNext}
                  iconAlign="after"
                  variant="Primary"
                  color="#139D8F"
                />
              </div>
            </form>
          )}

          {/**Form 2 */}
          {currentState === 2 && (
            <form ref={nextFormRef}>
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
              </fieldset>
              <div className="mt-6 flex flex-row justify-between">
                <Button
                  label="Back"
                  onClick={handlePrev}
                  iconAlign="none"
                  variant="Secondary"
                  color="#139D8F"
                />
                <Button
                  label="Create"
                  onClick={(event) => handleAddNewResident(event)}
                  iconAlign="after"
                  variant="Primary"
                  color="#139D8F"
                />
              </div>
            </form>
          )}
        </div>
      </Modal>

      {/**Create payment modal */}
      <Modal title="Create payment" handleOpenModal={handleOpenPaymentModal} ref={createPaymentRef}>
        <form ref={createPaymentFormRef}>
          <fieldset className="flex flex-col gap-6 mt-6 text-sm text-buttongray">
            <legend className="mb-6 font-semibold  text-base text-primary">Resident details</legend>

            <Select
              title="Select resident"
              selectData={residentData.map((resident) => resident.prevResidentData.firstName)}
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
                defaultValue={index !== null ? residentData[index]?.prevResidentData.email : ""}
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
                defaultValue={
                  index !== null ? residentData[index]?.prevResidentData.phoneNumber : ""
                }
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
                    ? `${residentData[index]?.prevResidentData?.houseNumber || ""} ${residentData[index]?.prevResidentData?.streetAddress || ""}`
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
                  title="payment_amount"
                  placeholder=""
                  arialabel="payment_amount"
                  BorderRadius="10px"
                  inputtype="text"
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
                onClick={(event) => handleCreateNewPayment(event)}
                iconAlign="after"
                variant="Primary"
                color="#139D8F"
              />
            </div>
          </fieldset>
        </form>
      </Modal>
    </section>
  );
}
