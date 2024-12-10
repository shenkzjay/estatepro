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
import { useRef } from "react";
import { Inputs } from "@/stories/input/input";
import { UploadIcon } from "@/public/svgIcons/uploadIcon";
import { useState } from "react";

interface AdminDashBoardProp {
  isCollapse: boolean;
}

interface prevNewVendorDataProp {
  storeName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface nextNewVendorDataProps {
  bannerImage: string;
  date: Date;
}

interface newVendorDataProps {
  prevVendorData: prevNewVendorDataProp;
  nextVendorData: nextNewVendorDataProps;
}

export const ManageVendors = ({ isCollapse }: AdminDashBoardProp) => {
  const createNewVendorModalRef = useRef<HTMLDialogElement | null>(null);
  const newVendorFormRef = useRef<HTMLFormElement | null>(null);

  //init fileupload
  const [fileUpload, setFileUpload] = useState<string>("");

  const [currentState, setCurrentState] = useState(1);

  const [allVendors, setAllVendors] = useState<newVendorDataProps[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileUpload(e.target.files[0].name);
    }
  };

  const handleOpenModal = () => {
    createNewVendorModalRef.current?.showModal();
  };
  const handleOpenCreateVendorsModal = () => {
    handleOpenModal();
  };

  const handleNext = () => {
    if (currentState < 2) {
      setCurrentState((prev) => prev + 1);
    }

    if (newVendorFormRef.current) {
      const formData = new FormData(newVendorFormRef.current);

      const newVendorData: prevNewVendorDataProp = {
        storeName: formData.get("storename") as string,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phonenumber") as string,
        address: formData.get("address") as string,
      };

      console.log("newdata", newVendorData);

      sessionStorage.setItem("vendor", JSON.stringify(newVendorData));
    }
  };

  const handlePrev = () => {
    setCurrentState((prev) => prev - 1);
  };

  const handleCreateNewVendor = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const getDataFromSessionStorage: prevNewVendorDataProp = JSON.parse(
      sessionStorage.getItem("vendor") as string
    );

    if (getDataFromSessionStorage) {
      const newData: newVendorDataProps = {
        prevVendorData: getDataFromSessionStorage,
        nextVendorData: {
          bannerImage: fileUpload,
          date: new Date(),
        },
      };

      setAllVendors([...allVendors, newData]);
    }

    console.log(allVendors, "allvendors");

    createNewVendorModalRef.current?.close();

    newVendorFormRef.current?.reset();

    setFileUpload("");
  };

  return (
    <section
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <DashBoardHeader title="Manage Vendors" />
      <DashBreadcrumbs title="Manage Vendors" />

      {/**Searchbox */}
      <div className="flex md:flex-row flex-col justify-between p-6 gap-6 md:gap-0">
        <div className="md:w-[30vw]">
          <SearchBox
            bgColor="#EFF0F1"
            placeholder="Search vendor name"
            name="SearchResidents"
            color="#b4b4b4"
          />
        </div>
        <div className="flex flex-row gap-6 justify-between flex-wrap">
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
            label="Add New Vendor"
            icon={PlusIcon}
            onClick={handleOpenCreateVendorsModal}
            bgColor=""
            btnbgColor="#139D8F"
            color="#c3f8f2"
          />
        </div>
      </div>

      {/**create staff table */}
      <section className="px-6 bg-[#F8F8F8] ">
        <h3 className="mb-6 text-xl text-buttongray font-semibold">Vendors</h3>
        <div className="overflow-auto">
          <table className="tabler w-full [font-size:_clamp(.7rem,5vw,.9rem)]  rounded-t-[20px] text-left border-collapse overflow-hidden">
            <thead className="sticky top-0">
              <tr className="bg-[#F0F2F5] text-buttongray">
                <th>
                  <input type="checkbox" />
                </th>
                <th className="text-start">Name</th>
                <th className="text-start text-nowrap">Store address</th>
                <th className="text-start text-nowrap">Phone number</th>
                <th className="text-start">Date created</th>
                {/* <th className="text-start">Status</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white p-0 w-full">
              {allVendors && allVendors.length > 0 ? (
                allVendors.map((vendor, index) => (
                  <tr key={index} className="border-b border-[#F0F2F5] w-full p-4">
                    <td className="" width={10}>
                      <input type="checkbox" />
                    </td>

                    <td className="flex flex-row items-center gap-4 py-6 ">
                      <span className="flex w-10 h-10 rounded-full justify-center items-center font-bold bg-[#FFECE5] text-[#F56630] uppercase">
                        {vendor.prevVendorData.storeName.slice(0, 1)}
                      </span>
                      <div>
                        <h4 className="font-bold ">{vendor.prevVendorData.storeName}</h4>
                        <p className="text-buttongray">{vendor.prevVendorData.email}</p>
                      </div>
                    </td>

                    <td className="text-buttongray py-6 text-nowrap">
                      <p>{vendor.prevVendorData.address}</p>
                    </td>

                    <td className="text-buttongray py-6 text-nowrap">
                      <p>{vendor.prevVendorData.phoneNumber}</p>
                    </td>
                    <td className="text-buttongray">{vendor.nextVendorData.date.toDateString()}</td>
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
                    <i className="text-buttongray ">No vendor created</i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {allVendors.length > 5 && (
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

      {/**Modals */}

      <Modal title="Add New Vendor" handleOpenModal={handleOpenModal} ref={createNewVendorModalRef}>
        {currentState === 1 && (
          <form className="md:w-[30vw]" ref={newVendorFormRef}>
            <fieldset className="flex flex-col gap-6 mt-6">
              <legend className="font-semibold text-primary">Vendor Details</legend>

              <div className="flex flex-col gap-8 mt-12">
                <Inputs
                  label="Store Name"
                  title="storename"
                  placeholder=""
                  arialabel="storename"
                  BorderRadius="10px"
                  inputtype="text"
                  required={false}
                  Border="1px solid #E3E5E5"
                />

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

                <Inputs
                  label="Address"
                  title="address"
                  placeholder=""
                  arialabel="address"
                  BorderRadius="10px"
                  inputtype="text"
                  required={false}
                  Border="1px solid #E3E5E5"
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <Button
                  variant="Primary"
                  onClick={handleNext}
                  iconAlign="after"
                  color="#139D8F"
                  label="Next"
                />
              </div>
            </fieldset>
          </form>
        )}

        {currentState === 2 && (
          <form>
            <fieldset className="mt-6">
              <legend className="font-semibold text-primary">Upload Vendor banner</legend>
              <div className=" upload-wrapper w-full relative mt-6">
                <label className="sr-only">Upload file</label>
                <input
                  required
                  onChange={(e) => handleFileUpload(e)}
                  type="file"
                  name="uploadfile"
                  id="uploadfile"
                  className=" absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />
                <div className="uploadzone w-full px-[30px] py-[50px] border border-dashed border-[#ccc] text-center bg-[#fff] [transition:_background-color_0.3s_ease-in-out] rounded-[10px]">
                  <div className="default flex flex-col justify-center items-center gap-4">
                    <figure className="w-10 h-10 bg-[#f4f4f4] flex flex-row items-center justify-center rounded-full">
                      <UploadIcon />
                    </figure>
                    <pre className="text-[14px] text-wrap text-buttongray">
                      <b className="text-primary">Click to upload</b> or drag and drop PNG,JPEG
                      (max. 10MB)
                    </pre>
                    <p className="text-buttongray text-[12px]">OR</p>
                    <button
                      type="button"
                      className="px-8 py-2 font-semibold rounded-[10px] border-2 border-primary text-primary"
                    >
                      Browse Files
                    </button>
                  </div>
                  <span className="success text-buttongray flex py-12 min-h-full ">
                    Your file has been uploaded successfully
                    <br />
                    <i className="text-primary">{fileUpload}</i>
                  </span>
                </div>
              </div>
              <div className="mt-6 w-full">
                <label
                  className="px-6 w-full py-2 border border-primary cursor-pointer"
                  htmlFor="camera_upload"
                >
                  Upload file
                </label>
                <input name="camera_upload" id="camera_upload" accept="image/*" capture hidden />
              </div>
              <div className="mt-6 flex flex-row justify-between">
                <Button
                  variant="Secondary"
                  onClick={handlePrev}
                  iconAlign="none"
                  color="#139D8F"
                  label="Back"
                />
                <Button
                  variant="Primary"
                  onClick={(event) => handleCreateNewVendor(event)}
                  iconAlign="after"
                  color="#139D8F"
                  label="Create Staff"
                />
              </div>
            </fieldset>
          </form>
        )}
      </Modal>
    </section>
  );
};
