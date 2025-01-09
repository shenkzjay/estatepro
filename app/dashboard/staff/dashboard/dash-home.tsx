"use client";

import { SearchBox } from "@/stories/searchbox/search";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";

import { Button } from "@/stories/Button/Button";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";

import { FilterIcon } from "@/public/svgIcons/filter";
import { QRCode } from "@/public/svgIcons/qrcode";
import { Inputs } from "@/stories/input/input";
import { VerifyVisitorCode } from "../actions/verify-vistorcode";
import { VisitorCodeStatus } from "@prisma/client";
import { Modal } from "@/stories/modal/modal";

import { useRef, useState } from "react";

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

export interface visitorProps {
  resident: {
    user: {
      name: string | null;
      email: string;
    };
    housenumber: string | null;
    streetaddress: string | null;
    phonenumber: string | null;
  };
  visitorname: string;
  visitornumber: string;
  visitoremail: string | null;
  Dateofvisit: Date;
  createdAt: Date;
  expiresAt: Date;
  status: VisitorCodeStatus;
  code: string;
}

export const StaffHome = ({ isCollapse }: DashBoardNavProp) => {
  const verifycodeRef = useRef<HTMLDialogElement | null>(null);
  const verifyCodeFormRef = useRef<HTMLFormElement | null>(null);

  const [visitorDetails, setVisitorDetails] = useState<visitorProps>();
  const [resident, setResident] = useState<visitorProps>();

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget) {
      const formData = new FormData(e.currentTarget);

      const visitor = await VerifyVisitorCode(formData);

      const visitorDetail = visitor.visitor as visitorProps;

      console.log(visitorDetails);

      setVisitorDetails(visitorDetail);
    }

    handleOpenModal();

    verifyCodeFormRef.current?.reset();
  };

  const handleOpenModal = () => {
    verifycodeRef.current?.showModal();
  };

  return (
    <div
      className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out]`}
    >
      <Modal title="Verify Code" handleOpenModal={handleOpenModal} ref={verifycodeRef}>
        <section>
          {visitorDetails ? (
            visitorDetails.status === "REVOKED" ? (
              <div className="flex flex-col justify-center items-center gap-4 mt-6">
                <p className="w-full text-center px-4 py-2 rounded-xl bg-[#fbeae9] text-[#9e0a05] font-semibold text-2xl">
                  This code has been REVOKED by the resident!
                </p>
                <span className="text-6xl">⚠️</span>
                <p className="text-buttongray w-2/3 text-center">
                  Please input a new code and try again
                </p>
              </div>
            ) : visitorDetails.status === "EXPIRED" ? (
              <div className="mt-6 flex flex-col justify-center items-center gap-4">
                <p className="w-full text-center px-4 py-2 rounded-xl bg-[#fbeae9] text-[#9e0a05] font-semibold text-2xl">
                  This code has expired!
                </p>
                <span className="text-6xl">⚠️</span>
                <p className="text-buttongray w-2/3 text-center">
                  Please input the correct code and try again
                </p>
              </div>
            ) : Object.keys(visitorDetails).length > 0 ? ( // Use Object.keys for checking emptiness
              <section className="mt-6 md:w-[25rem] flex flex-col gap-2 ">
                <div className="w-full">
                  <div className="flex w-full justify-center">
                    <p
                      className={`font-semibold ${
                        visitorDetails?.status === "ACTIVE" ? "bg-[#e7f6ec] text-[#139d8f]" : ""
                      } flex px-4 py-2 rounded-xl mb-6`}
                    >
                      {`CODE ${visitorDetails?.status}`}
                    </p>
                  </div>
                  <h3 className="text-xl text-buttongray font-semibold">Visitor&apos;s details</h3>

                  <div className=" bg-[#e7f6ec] p-6 rounded-xl flex flex-row mt-4 w-full justify-between">
                    <div className="flex flex-col gap-6 ">
                      <div>
                        <p className="text-buttongray text-sm">NAME</p>
                        <p className="font-semibold  text-sm">{visitorDetails.visitorname}</p>
                      </div>

                      <div>
                        <p className="text-buttongray text-sm">NUMBER</p>
                        <p className="font-semibold  text-sm">{visitorDetails.visitornumber}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="text-buttongray text-sm">EMAIL</p>
                        <p className="font-semibold  text-sm">{visitorDetails.visitoremail}</p>
                      </div>
                      <div>
                        <p className="text-buttongray text-sm">DATE OF VISIT</p>
                        <p className="font-semibold  text-sm">
                          {new Date(visitorDetails.Dateofvisit).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 ">
                    <h3 className=" mb-4 text-xl text-buttongray font-semibold">
                      Resident details
                    </h3>
                    <div className="grid grid-cols-2 justify-between w-full gap-6">
                      <div className=" grid  gap-6">
                        <div>
                          <p className="text-buttongray text-sm"> Name</p>
                          <p className="font-semibold  text-sm">
                            {visitorDetails.resident.user.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-buttongray text-sm">House adddress</p>
                          <p className="font-semibold  text-sm">
                            {visitorDetails.resident.housenumber}{" "}
                            {visitorDetails.resident.streetaddress}
                          </p>
                        </div>
                      </div>
                      <div className=" grid gap-6 justify-end">
                        <div>
                          <p className="text-buttongray text-sm">NUMBER</p>
                          <p className="font-semibold  text-sm">
                            {visitorDetails?.resident?.phonenumber}
                          </p>
                        </div>

                        <div>
                          <p className="text-buttongray text-sm">EMAIL</p>
                          <p className="font-semibold  text-sm">
                            {visitorDetails?.resident?.user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ... (rest of the visitor details section) */}
              </section>
            ) : (
              // Default case: visitorDetails exists, but doesn't match other conditions
              <div className="flex flex-col justify-center items-center gap-4 mt-6">
                <p className="w-full text-center px-4 py-2 rounded-xl bg-[#fbeae9] text-[#9e0a05] font-semibold text-2xl">
                  Invalid code!
                </p>
                <span className="text-6xl">⚠️</span>
                <p className="text-buttongray w-2/3 text-center">
                  Please input a new code and try again
                </p>
              </div>
            )
          ) : (
            // Handle the case where visitorDetails is null or undefined
            <div className="flex flex-col justify-center items-center gap-4 mt-6">
              <p className="w-full text-center px-4 py-2 rounded-xl bg-[#fbeae9] text-[#9e0a05] font-semibold text-2xl">
                Invalid code!
              </p>
              <span className="text-6xl">⚠️</span>
              <p className="text-buttongray w-2/3 text-center">
                Please input a new code and try again
              </p>
            </div>
          )}
        </section>
      </Modal>

      <DashBoardHeader title="Home" />
      <section className="bg-[#F8F8F8] p-6 flex md:flex-row flex-col gap-6 w-full">
        <div className="w-[40%] flex flex-col h-full ">
          <div className=" py-10 flex flex-col gap-2 items-center bg-white p-6 rounded-xl">
            <h3>Scan QR Code</h3>
            <QRCode />
            <Button
              bgColor=""
              variant="Tertiary"
              iconAlign="after"
              icon={() => <ArrowIcon color="" />}
              label="Scan QR Code"
              color="#139D8F"
              onClick={() => "click"}
            />
          </div>
          <div className="mt-6 flex w-full bg-white py-6 rounded-xl">
            <form
              ref={verifyCodeFormRef}
              onSubmit={handleVerifyCode}
              className="w-full flex flex-col justify-center items-center p-6 mt-6"
            >
              <Inputs
                label="Enter visitor's code"
                inputtype="text"
                title="visitorcode"
                placeholder=""
                color="#b4b4b4"
                inputBg="white"
                Border="1px solid #E3E5E5"
                arialabel="visitorcode"
                required={true}
              />
              <Button
                variant="Primary"
                onClick={() => console.log("hi")}
                label="Verify code"
                iconAlign="after"
                bgColor="#1AD9C5"
              />
            </form>
          </div>
        </div>
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
                  onClick={() => "click"}
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
                <tbody className="bg-white w-full"></tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
