"use client";

import { SearchBox } from "@/stories/searchbox/search";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { Inputs } from "@/stories/input/input";
import { Button } from "@/stories/Button/Button";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { FilterIcon } from "@/public/svgIcons/filter";
import { GenerateCodeFormAction } from "@/app/dashboard/resident/actions/generate-code-action";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { MoreIcon } from "@/public/svgIcons/moreIcon";
import { Modal } from "@/stories/modal/modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { SucessIcon } from "@/public/svgIcons/successIcon";
import { ClipBoardCopy } from "@/public/svgIcons/clipboardIcon";
import { Popover } from "@/stories/popover/popover";

import { useAdminContext } from "@/app/dashboard/provider";
import { GetVisitorsCode } from "@/app/api/queries/get-visitor-code";
import { VisitorProp } from "@/app/dashboard/resident/dashboard/dash-home";
import { SubmitButton } from "../formbutton";
import { ValidateCodeStatus } from "@/app/api/queries/validatecodestatus";
import { RevokeCode } from "@/app/api/queries/revokecode";
import QRCode from "react-qr-code";
import { DeleteVisitorCode } from "@/app/api/queries/delete-visitorcode";

import { toPng } from "html-to-image";
import { title } from "process";

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

interface VisitorTableProp {
  visitors: VisitorProp[];
}

export const VisitorsCodeTable = ({ visitors }: VisitorTableProp) => {
  //init modal
  const modalRef = useRef<HTMLDialogElement>(null);

  const revokeRef = useRef<HTMLDialogElement>(null);

  const deleteCodeRef = useRef<HTMLDialogElement>(null);

  const codeRef = useRef<HTMLParagraphElement | null>(null);

  const htmltoPngRef = useRef<HTMLDivElement | null>(null);

  //store formElement ref
  const formEle = useRef<HTMLFormElement>(null);

  //store state for all formdatas
  const [allformData, setAllFormData] = useState<formdataProp[]>([]);

  //selected state
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [shareData, setShareData] = useState(null);

  const [gencode, setGencode] = useState("");

  //popover
  const [popverToggle, setIsPopoverToggle] = useState<boolean>(false);

  const [QRCodeData, setQRCodeData] = useState<string>("");

  const { user } = useAdminContext();

  console.log({ user });

  console.log({ gencode });

  /**
   * @description function to open modal
   */
  const handleOpenModal = () => {
    modalRef.current?.showModal();
  };

  useEffect(() => {
    const validateStatusCode = async () => {
      try {
        const ll = await ValidateCodeStatus();
        console.log(ll.expiredCount);
      } catch (error) {
        console.error("Error validating status code:", error);
      }
    };

    const interval = setInterval(() => {
      validateStatusCode();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * @description function that handles code generation
   */
  const handleCodeGeneration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // e.stopPropagation();

    //checks if formElement is present
    if (formEle.current && user) {
      const formData = new FormData(formEle.current);

      formData.append("email", user?.email);

      const response = await GenerateCodeFormAction(formData);

      if (!response) return;

      const code = response?.code?.[0];

      setGencode(code?.code || "");

      //   const qrCodeData = {
      //     visitorname: response.code?.map((name) => name.visitorname),
      //     visitornumber: response.code?.map((number) => number.visitornumber),
      //   };

      const qrcodeLink = `http://localhost:3000/dashboard/staff/qrcode?value=${JSON.stringify(code)}`;

      setQRCodeData(qrcodeLink);

      //opens modal
      handleOpenModal();
    }

    formEle.current?.reset();
  };

  /**
   * @description function that handles share button logic
   */
  const handleShareButton = useCallback(async () => {
    if (!htmltoPngRef.current) return;

    try {
      // Convert the HTML element to a PNG data URL
      const dataUrl = await toPng(htmltoPngRef.current, { cacheBust: true });
      const blob = await fetch(dataUrl).then((res) => res.blob());

      // Prepare sharing data
      const shareText =
        "Please present this QR code to the security at the gate to grant access. Thank you!";

      if ("canShare" in navigator) {
        const shareFile = new File([blob], "QR-code.png", { type: "image/png" });
        const sharePayload = {
          files: [shareFile],
          title: "QR Code",
          text: shareText,
        };

        if (navigator.canShare(sharePayload)) {
          try {
            await navigator.share(sharePayload);
          } catch (error: any) {
            if (error.name !== "AbortError") {
              console.error("Sharing failed:", error);
            }
          }
          return;
        }
      }

      // Fallback to download if sharing is not supported
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "QR-code.png";
      link.click();
    } catch (error) {
      console.error("Error processing the PNG or sharing:", error);
    }
  }, []);

  /**
   * @description functions that handles Popover toggle
   */
  const togglePopover = (index: number) => {
    setIsSelected(index);

    if (isSelected === index) {
      setIsSelected(null);
    } else {
      setIsSelected(index);
    }

    // setIsPopoverToggle(!popverToggle);
  };

  /**
   * @description functions to revoke access code
   */
  const handleRevokeButton = async (index: number, visitorId: string) => {
    setIsSelected(index);

    await RevokeCode(visitorId);

    console.log("hee");
  };

  const OpenRevokeCodeAlertModal = () => {
    revokeRef.current?.showModal();
  };

  const OpenDeleteCodeModal = () => {
    deleteCodeRef.current?.showModal();
  };

  const handleRevokeVisitorCode = (index: number) => {
    OpenRevokeCodeAlertModal();
    setIsSelected(index);
    setIsPopoverToggle(true);
  };

  const handleVisitorCodeRevoke = async () => {
    if (isSelected !== null) {
      const visitor = visitors[isSelected];

      const visitorId = visitor.id;

      await RevokeCode(visitorId);

      setIsSelected(null);
    }

    revokeRef.current?.close();
  };

  const handleOpenDeleteVisitorCode = (index: number) => {
    OpenDeleteCodeModal();
    setIsSelected(index);
    setIsPopoverToggle(true);
  };

  const handleVisitorCodeDelete = async () => {
    if (isSelected !== null) {
      const visitor = visitors[isSelected];

      const visitorId = visitor.id;

      await DeleteVisitorCode(visitorId);

      setIsSelected(null);
    }

    deleteCodeRef.current?.close();
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeRef.current?.textContent || "");
      return alert(`Copied to clipboard!!!`);
    } catch (error) {
      return console.error("Failed to copy code", error);
    }
  };

  const { isCollapse } = useAdminContext();

  return (
    <div
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out]`}
    >
      <DashBoardHeader title="Home" />
      <section className="bg-[#F8F8F8] p-6 flex md:flex-row flex-col gap-6 w-full">
        {/* QR code modal */}
        <Modal title="Generate code" handleOpenModal={handleOpenModal} ref={modalRef}>
          <div
            ref={htmltoPngRef}
            className="flex flex-col justify-center items-center gap-4 p-6 rounded-[20px]"
          >
            <SucessIcon />
            <p className="text-buttongray w-2/3 text-center">
              Please copy to share code or click the share button to share QRCode with the visitor
            </p>
            <div className="flex flex-row gap-6 items-center justify-center">
              <p className="text-4xl font-bold" ref={codeRef}>
                {gencode}
              </p>
              <button className="flex gap-2" onClick={handleCopyCode}>
                <ClipBoardCopy /> <p>Copy</p>
              </button>
            </div>
            {/* <p className="text-buttongray">Haven&apos;t received code yet?</p> */}
            <div>
              <QRCode
                size={150}
                value={QRCodeData}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <div className="flex flex-row gap-2 border px-4 py-2 text-buttongray rounded-full ">
              <button onClick={handleShareButton}>Share code</button>
              <span>
                <ClipBoardCopy />
              </span>
            </div>
          </div>
        </Modal>

        {/* Revoke code confirmation modal */}
        <Modal
          title="Revoke visitor's code"
          handleOpenModal={OpenRevokeCodeAlertModal}
          ref={revokeRef}
        >
          <div className="flex flex-col gap-4 mt-6">
            <p>You&apos;re trying to revoke a visitor&apos;s code</p>
            <p>Please note that this action is irreversible</p>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  revokeRef.current?.close();
                  setIsSelected(null);
                }}
                className="py-2 px-4 bg-red-500 rounded-[10px] text-white font-bold"
              >
                No
              </button>
              <button
                className="py-2 px-4 bg-[#c3f8f2] rounded-[10px] text-primary font-bold"
                onClick={handleVisitorCodeRevoke}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>

        {/* Delete code confirmation modal */}
        <Modal
          title="Delete Confirmation"
          handleOpenModal={OpenDeleteCodeModal}
          ref={deleteCodeRef}
        >
          <div className="flex flex-col gap-4 mt-6">
            <p>Do you want to delete this visitor&apos;s code?</p>
            <p>Please note that this action is irreversible</p>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  deleteCodeRef.current?.close();
                  setIsSelected(null);
                }}
                className="py-2 px-4 bg-red-500 rounded-[10px] text-white font-bold"
              >
                No
              </button>
              <button
                className="py-2 px-4 bg-[#c3f8f2] rounded-[10px] text-primary font-bold"
                onClick={handleVisitorCodeDelete}
              >
                Continue
              </button>
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
            {/* <SubmitButton ButtonName="Generate code" /> */}
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
                <thead className="sticky top-0 z-30">
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
                <tbody className="bg-white w-full ">
                  {visitors.length > 0 ? (
                    visitors.map((tableData, index) => (
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
                          <p>{new Date(tableData?.Dateofvisit).toDateString()}</p>
                        </td>

                        <td className="text-buttongray py-6 text-nowrap">
                          <p>{tableData?.visitornumber}</p>
                        </td>
                        <td className="text-[12px]">
                          <StatusPill
                            title={tableData.status || "No status"}
                            status={
                              tableData.status === "ACTIVE"
                                ? "success"
                                : tableData.status === "EXPIRED"
                                  ? "warning"
                                  : tableData.status === "REVOKED"
                                    ? "danger"
                                    : "default"
                            }
                          />
                        </td>

                        <td className="relative">
                          <div className="flex" tabIndex={0}>
                            <div>
                              <button
                                aria-label="More icon button"
                                role="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePopover(index);
                                }}
                                className="anchor"
                              >
                                <MoreIcon />
                              </button>
                              <div className="positionedElement">
                                {isSelected === index && (
                                  <>
                                    <Popover>
                                      <ul className="flex flex-col bg-white text-[14px] text-nowrap text-buttongray drop-shadow-[0_8px_24px_rgba(0,0,0,0.1)] rounded-[8px]">
                                        {tableData.status === "ACTIVE" && (
                                          <li>
                                            <button
                                              className="p-2 hover:bg-slate-200 cursor-pointer hover:text-black  "
                                              aria-label="Revoke code button"
                                              role="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleRevokeVisitorCode(index);
                                              }}
                                            >
                                              Revoke Code
                                            </button>
                                          </li>
                                        )}
                                        <li>
                                          <button
                                            aria-label="Delete code button"
                                            role="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleOpenDeleteVisitorCode(index);
                                            }}
                                            className="p-2 hover:bg-slate-200 cursor-pointer hover:text-black "
                                          >
                                            Delete Visitor
                                          </button>
                                        </li>
                                        <li
                                          className=" text-red-500 rounded-b-[8px] text-center font-semibold py-1 hover:bg-slate-200"
                                          role="button"
                                          aria-label="close popup"
                                          onClick={() => setIsSelected(null)}
                                        >
                                          Close
                                        </li>
                                      </ul>
                                    </Popover>
                                  </>
                                )}
                              </div>
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
