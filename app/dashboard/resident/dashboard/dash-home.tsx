"use client";

import { SearchBox } from "@/stories/searchbox/search";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { Inputs } from "@/stories/input/input";
import { Button } from "@/stories/Button/Button";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { FilterIcon } from "@/public/svgIcons/filter";
import { GenerateCodeFormAction } from "../actions/generate-code-action";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { MoreIcon } from "@/public/svgIcons/moreIcon";
import { Modal } from "@/stories/modal/modal";
import { useRef, useState } from "react";
import { SucessIcon } from "@/public/svgIcons/successIcon";
import { ClipBoardCopy } from "@/public/svgIcons/clipboardIcon";
import { Popover } from "@/stories/popover/popover";
import { CreateCodeInvites } from "../actions/createinvites";
import { useAdminContext } from "../../provider";

interface DashBoardNavProp {
  isCollapse: boolean;
}

export interface formdataProp {
  visitorname: string;
  visitoremail: string;
  Date_of_visit: string;
  phone_number: number;
  code: string;
}

export const DashHome = ({ isCollapse }: DashBoardNavProp) => {
  //init modal
  const modalRef = useRef<HTMLDialogElement>(null);

  //store formElement ref
  const formEle = useRef<HTMLFormElement>(null);

  //init formdata state
  const [isformData, setIsformdata] = useState<formdataProp>();

  //store state for all formdatas
  const [allformData, setAllFormData] = useState<formdataProp[]>([]);

  //selected state
  const [isSelected, setIsSelected] = useState<number>();

  const [gencode, setGencode] = useState("");

  //popover
  const [popverToggle, setIsPopoverToggle] = useState<boolean>(false);

  //revoke
  const [revokeButton, setRevokeButton] = useState<boolean>(false);

  const { user } = useAdminContext();

  console.log({ user });

  console.log({ gencode });

  /**
   * @description function to open modal
   */
  const handleOpenModal = () => {
    modalRef.current?.showModal();
  };

  /**
   * @description function that handles code generation
   */
  const handleCodeGeneration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    //checks if formElement is present
    if (formEle.current && user) {
      const formData = new FormData(formEle.current);

      //generates random alphanumeric code
      const ramdomCode = Math.random().toString(36).slice(6);

      //get and store formData in object
      // const codeformdata = {
      //   visitorname: formData.get("visitorname") as string,
      //   visitoremail: formData.get("Email address") as string,
      //   Date_of_visit: formData.get("Date of visitation") as string,
      //   phone_number: Number(formData.get("Phone number")),
      // };

      formData.append("email", user?.email);

      const code = await GenerateCodeFormAction(formData);

      const cad = await code?.code;

      if (!cad) return;

      setGencode(cad as string);

      //post data to endpoint here
      //const { response, error } = await CreateCodeInvites(codeformdata);

      //console.log(response, error);

      //updates all formdata
      // setAllFormData([...allformData, codeformdata]);

      //updates formdata state
      // setIsformdata(codeformdata);

      //opens modal
      handleOpenModal();
    }
  };

  /**
   * @description function that handles share button logic
   */
  const handleShareButton = () => {
    console.log("shares");
  };

  /**
   * @description functions that handles Popover toggle
   */
  const togglePopover = (index: number) => {
    setIsSelected(index);

    setIsPopoverToggle(!popverToggle);
  };

  /**
   * @description functions to revoke access code
   */
  const handleRevokeButton = (index: number) => {
    setIsSelected(index);

    if (isSelected === index) {
      setRevokeButton(true);
    } else {
      setRevokeButton(false);
    }

    setIsPopoverToggle(false);
  };

  return (
    <div
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out]`}
    >
      <DashBoardHeader title="Home" />
      <section className="bg-[#F8F8F8] p-6 flex md:flex-row flex-col gap-6 w-full">
        <Modal title="Modal" handleOpenModal={handleOpenModal} ref={modalRef}>
          <div className="flex flex-col justify-center items-center gap-4 p-6 rounded-[20px]">
            <SucessIcon />
            <p className="text-buttongray w-2/3 text-center">
              The generated code has been sent to the visitor&apos;s phone number
            </p>
            <h3 className="text-6xl font-bold">{gencode}</h3>
            <p className="text-buttongray">Haven&apos;t received code yet?</p>
            <div className="flex flex-row gap-2 border px-4 py-2 text-buttongray rounded-full ">
              <button onClick={handleShareButton}>Share code</button>
              <span>
                <ClipBoardCopy />
              </span>
            </div>
          </div>
        </Modal>

        <form
          className="flex flex-col md:w-[40%] bg-white gap-8 p-6 text-[14px] rounded-[16px] h-full"
          ref={formEle}
          onSubmit={(e) => handleCodeGeneration(e)}
        >
          <h3 className="font-semibold text-xl text-buttongray mb-6">
            Generate Visitor&apos;s code
          </h3>
          <Inputs
            label="Visitor's name*"
            inputtype="text"
            title="visitorname"
            placeholder=""
            color="#b4b4b4"
            inputBg="white"
            Border="1px solid #E3E5E5"
            arialabel="visitorname"
            required={true}
          />

          <Inputs
            label="Phone number*"
            inputtype="tel"
            title="Phone number"
            placeholder=""
            color="#b4b4b4"
            inputBg="white"
            Border="1px solid #E3E5E5"
            arialabel="phonenumber"
            required={true}
          />
          <Inputs
            label="Email address (optional)"
            inputtype="text"
            title="Email address"
            placeholder=""
            color="#b4b4b4"
            inputBg="white"
            Border="1px solid #E3E5E5"
            arialabel="emailaddress"
            required={false}
          />
          <Inputs
            label="Date of visitation"
            inputtype="date"
            title="Date of visitation"
            placeholder=""
            color="#b4b4b4"
            inputBg="white"
            Border="1px solid #E3E5E5"
            arialabel="date"
            required={false}
          />
          <p className="text-buttongray italic flex justify-center">
            *Please note that visitor&apos;s invitation codes are only valid for 24hrs
          </p>
          {/* <Checkbox label="Add expiration date" title="expiration" />

          <Inputs
            label="Invite expiration date"
            inputtype="text"
            title="Invite expiration date"
            placeholder=""
            color="#b4b4b4"
            inputBg="white"
            Border="1px solid #E3E5E5"
            arialabel="Invite expiration date"
          /> */}
          <div className="w-full flex justify-center">
            <Button
              variant="Primary"
              onClick={() => console.log("hi")}
              label="Generate code"
              iconAlign="after"
              bgColor="#1AD9C5"
            />
          </div>
        </form>

        <div className="md:w-[60%] mt-20 md:mt-0">
          <div className="flex md:flex-row flex-col justify-between text-buttongray gap-6">
            <div className="flex md:w-1/2">
              <SearchBox
                name="Searchinvite"
                placeholder="Search invite code or name"
                color="#b4b4b4"
                bgColor="#f1f1f3"
              />
            </div>
            <div className="flex flex-row gap-0  justify-between md:justify-normal">
              <div className="flex text-primary">
                <Button
                  bgColor=""
                  variant="Tertiary"
                  iconAlign="before"
                  icon={FilterIcon}
                  label="Filter"
                  color="#139D8F"
                  onClick={() => console.log("hi")}
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
            <h3 className="mb-4 text-buttongray font-bold text-xl">Invites</h3>
            <div className="flex flex-col overflow-auto relative  h-[50vh] rounded-t-[20px]">
              {/**Table */}
              <table className="tabler w-full [font-size:_clamp(.7rem,5vw,.9rem)] text-left border-collapse">
                <thead className="sticky top-0">
                  <tr className="bg-[#F0F2F5] text-buttongray">
                    <th colSpan={2} className="text-start">
                      Name
                    </th>
                    <th className="text-start">Visit date</th>
                    <th className="text-start text-nowrap">Phone number</th>
                    <th className="text-start">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white w-full">
                  {allformData.length > 0 ? (
                    allformData.map((tableData, index) => (
                      <tr className="border-b border-[#F0F2F5] w-full p-4" key={index}>
                        <td className="" width={10}>
                          <input type="checkbox" />
                        </td>
                        <td className="flex flex-row items-center gap-4 py-6 ">
                          <span className="flex w-10 h-10 p-5 rounded-full justify-center items-center font-bold bg-[#FFECE5] text-[#F56630] uppercase">
                            {tableData?.visitorname?.slice(0, 1)}
                          </span>
                          <div>
                            <h4 className="font-bold ">{tableData?.visitorname}</h4>
                            <p className="text-buttongray">{tableData?.visitoremail}</p>
                          </div>
                        </td>
                        <td className="text-buttongray py-6 text-nowrap">
                          <p>{tableData?.Date_of_visit}</p>
                        </td>

                        <td className="text-buttongray py-6 text-nowrap">
                          <p>{tableData?.phone_number}</p>
                        </td>
                        <td className="text-[12px]">
                          <StatusPill
                            title={revokeButton && isSelected === index ? "Revoked" : "Active"}
                            status={revokeButton && isSelected === index ? "danger" : "success"}
                          />
                        </td>

                        <td className="relative ">
                          <div
                            className="flex "
                            tabIndex={0}
                            aria-label="More icon button"
                            role="button"
                          >
                            <div onClick={() => togglePopover(index)}>
                              <MoreIcon />
                            </div>
                            <div className="">
                              {popverToggle && isSelected === index && (
                                <Popover>
                                  <ul className="flex flex-col bg-white absolute top-16 right-6 text-[14px] text-nowrap text-buttongray drop-shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-10 rounded-[8px]">
                                    <li
                                      className="p-2 hover:bg-slate-200 cursor-pointer hover:text-black  "
                                      aria-label="Revoke code button"
                                      role="button"
                                      onClick={() => handleRevokeButton(index)}
                                    >
                                      Revoke Code
                                    </li>
                                    <li className="p-2 hover:bg-slate-200 cursor-pointer hover:text-black  ">
                                      Delete Visitor
                                    </li>
                                    <li
                                      className=" text-red-500 rounded-b-[8px] text-center font-semibold py-1 hover:bg-slate-200"
                                      role="button"
                                      aria-label="close popup"
                                      onClick={() => setIsPopoverToggle(false)}
                                    >
                                      Close
                                    </li>
                                  </ul>
                                </Popover>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {allformData.length > 3 ? (
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
            ) : (
              ""
            )}
          </section>
        </div>
      </section>
    </div>
  );
};
