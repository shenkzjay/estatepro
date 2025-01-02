"use client";

import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { SearchBox } from "@/stories/searchbox/search";
import { Button } from "@/stories/Button/Button";
import { DownoadIcon } from "@/public/svgIcons/downloadIcon";
import { FilterIcon } from "@/public/svgIcons/filter";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { MoreIcon } from "@/public/svgIcons/moreIcon";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { Textarea } from "@/stories/textarea/textarea";
import { Select } from "@/stories/select/select";
import { useRef, useState } from "react";
import { UploadIcon } from "@/public/svgIcons/uploadIcon";
import { LinkArrow } from "@/public/svgIcons/linkarrow";
import { Modal } from "@/stories/modal/modal";
import { SucessIcon } from "@/public/svgIcons/successIcon";
import Link from "next/link";

interface DashBoardNavProp {
  isCollapse: boolean;
}

export const DashMaintenance = ({ isCollapse }: DashBoardNavProp) => {
  //select option value array
  const data = ["Plumbing", "Electricity", "Water"];
  const address = ["House 44a", "House 35fa", "House 221"];

  //init selectedItem
  const [selectedItem, setSelectedItem] = useState("");

  //init selectedItem
  const [selectedAddress, setSelectedAddress] = useState("");

  //init textareaInput
  const [textareaInput, setTextareaInput] = useState("");

  //init fileupload
  const [fileUpload, setFileUpload] = useState<string>("");

  //init modal
  const modalRef = useRef<HTMLDialogElement>(null);

  /**
   *
   * @param e
   * @description function that handles file upload
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileUpload(e.target.files[0].name);
    }
  };

  /**
   *
   * @description function that handles modal open
   */
  const handleModalOpen = () => {
    modalRef.current?.showModal();
  };

  /**
   *
   * @description handles submit
   */
  const handleSubmitRequest = () => {
    //check if an item is selected or textareainput is not empty
    if (!selectedItem || !textareaInput) {
      console.log("please slect item or enter description");
      return;
    } else {
      //opens modal
      handleModalOpen();
    }
  };

  /**
   *
   * @description handles handleTextareaInput
   */

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setTextareaInput(e.target.value);
  };

  return (
    <div
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
    >
      <Modal title="" handleOpenModal={handleModalOpen} ref={modalRef}>
        <span className="flex justify-center py-6">
          <SucessIcon />
        </span>
        <p className="flex pb-6 text-buttongray">Your request has been submitted successfully</p>
        <div className="flex flex-col justify-center items-center text-[12px] text-buttongray">
          <span>{textareaInput}</span>
          <span>{selectedItem}</span>
          <span>{fileUpload}</span>
        </div>
      </Modal>
      <DashBoardHeader title="Maintenance & Issues" />
      <DashBreadcrumbs title="Maintenance & Issues" />

      <section className="flex md:flex-row flex-col">
        <div className="md:w-[65%] ">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20ch,1fr))] gap-6 justify-between p-6 ">
            <div className="bg-white rounded-[10px] p-[36px] flex flex-col gap-4 ">
              <h4 className="text-graytext">Open issues</h4>
              <p className="font-semibold text-2xl text-black text-left">10</p>
            </div>
            <div className="bg-white rounded-[10px] p-[36px] flex flex-col gap-4">
              <h4 className="text-graytext">In-progress</h4>
              <p className="font-semibold text-2xl text-black text-left">4</p>
            </div>
            <div className="bg-white rounded-[10px] p-[36px] flex flex-col gap-4">
              <h4 className="text-graytext">Closed</h4>
              <p className="font-semibold text-2xl text-black text-left">7</p>
            </div>
          </div>

          <div className="mt-20 md:mt-0 p-6 bg-[#F8F8F8]">
            <h3 className="text-buttongray font-semibold text-xl mb-6">Maintenance history</h3>
            <div className="flex md:flex-row flex-col justify-between text-buttongray gap-6">
              <div className="flex md:w-1/2">
                <SearchBox
                  name="Searchinvite"
                  placeholder="Search payment"
                  color="#b4b4b4"
                  bgColor="#f1f1f3"
                />
              </div>
              <div className="flex flex-row gap-6  justify-between md:justify-normal">
                <div className="flex text-primary">
                  <Button
                    bgColor=""
                    variant="Tertiary"
                    iconAlign="before"
                    icon={FilterIcon}
                    label="Filter"
                    onClick={() => "hey"}
                    color="#139D8F"
                  />
                </div>

                <div className=" flex flex-row text-white">
                  {/* <Button
                    btnbgColor="#139D8F"
                    bgColor=""
                    variant="Tertiary"
                    iconAlign="before"
                    icon={DownoadIcon}
                    label="Export PDF"
                    onClick={() => "click"}
                  /> */}
                </div>
              </div>
            </div>

            <section className="mt-6">
              <div className="flex flex-col overflow-auto relative ">
                <table className="tabler w-full [font-size:_clamp(.7rem,5vw,.9rem)]  rounded-t-[20px] text-left border-collapse overflow-hidden">
                  <thead className="sticky top-0">
                    <tr className="bg-[#F0F2F5] text-buttongray">
                      <th className="text-start">S/N</th>
                      <th className="text-start">Category</th>
                      <th className="text-start">Description</th>
                      <th className="text-start text-nowrap">Location</th>
                      <th className="text-start">Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white p-0 w-full">
                    <tr className="border-b border-[#F0F2F5] w-full p-4">
                      <td className="" width={10}>
                        1
                      </td>
                      <td className="">
                        <div className="">
                          <p className="text-buttongray">Electricity</p>
                        </div>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap text-[12px] ">
                        <p>My power keeps..</p>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>House 231..</p>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap">
                        <p>Apr 14, 2024</p>
                      </td>
                      <td className="text-[12px]">
                        <StatusPill title="Closed" status="success" />
                      </td>

                      <td>
                        <span className="underline text-blue-500">
                          <Link href={"#"}>Imagelink</Link>
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b border-[#F0F2F5] w-full p-4">
                      <td className="" width={10}>
                        2
                      </td>
                      <td className="">
                        <div className="">
                          <p className="text-buttongray">Electricity</p>
                        </div>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap text-[12px] ">
                        <p>My power keeps..</p>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>House 231..</p>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap">
                        <p>Apr 14, 2024</p>
                      </td>
                      <td className="text-[12px]">
                        <StatusPill title="Open" status="danger" />
                      </td>

                      <td>
                        <span className="underline text-blue-500">
                          <Link href={"#"}>Imagelink</Link>
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b border-[#F0F2F5] w-full p-4">
                      <td className="" width={10}>
                        3
                      </td>
                      <td className="">
                        <div className="">
                          <p className="text-buttongray">Electricity</p>
                        </div>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap text-[12px] ">
                        <p>My power keeps..</p>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>House 231..</p>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap">
                        <p>Apr 14, 2024</p>
                      </td>
                      <td className="text-[12px]">
                        <StatusPill title="Closed" status="success" />
                      </td>

                      <td>
                        <span className="underline text-blue-500">
                          <Link href={"#"}>Imagelink</Link>
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b border-[#F0F2F5] w-full p-4">
                      <td className="" width={10}>
                        4
                      </td>
                      <td className="">
                        <div className="">
                          <p className="text-buttongray">Electricity</p>
                        </div>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap text-[12px] ">
                        <p>My power keeps..</p>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>House 231..</p>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap">
                        <p>Apr 14, 2024</p>
                      </td>
                      <td className="text-[12px]">
                        <StatusPill title="In-progress" status="warning" />
                      </td>

                      <td>
                        <span className="underline text-blue-500">
                          <Link href={"#"}>Imagelink</Link>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex gap-2 justify-center bg-white p-4 text-buttongray">
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
            </section>
          </div>
        </div>
        <div className="md:w-[35%] m-6 p-6 bg-white flex flex-col  gap-6">
          <h3 className="font-semibold text-xl text-buttongray">Report new issue</h3>

          <Select
            title="Services"
            selectData={data}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          {/* <Select
            title="Address"
            selectData={address}
            selectedItem={selectedAddress}
            setSelectedItem={setSelectedAddress}
          /> */}

          <Textarea
            placeholder="Write here"
            name="Short_description"
            title="Short description"
            onChange={(e) => handleTextareaInput(e)}
          />
          <div className=" upload-wrapper w-full relative">
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
                  <b className="text-primary">Click to upload</b> or drag and drop PNG,JPEG (max.
                  10MB)
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

          <div className="flex justify-center w-full mt-6">
            <Button
              label="Submit request"
              variant="Primary"
              iconAlign="after"
              icon={LinkArrow}
              bgColor="#1AD9C5"
              onClick={handleSubmitRequest}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
