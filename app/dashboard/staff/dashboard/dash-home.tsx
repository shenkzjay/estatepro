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

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget) {
      const formData = new FormData(e.currentTarget);

      const visitor = await VerifyVisitorCode(formData);

      const visitorDetail = visitor.visitor as visitorProps;

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
        <section className="mt-6 w-[25rem] flex flex-col gap-4 justify-center items-center">
          <div>
            <span
              className={`font-semibold ${visitorDetails?.status === "ACTIVE" ? "bg-[#e7f6ec] text-[#139d8f]" : visitorDetails?.status === "EXPIRED" ? "bg-[#fef6e7] text-[#865503]" : "bg-[#fbeae9] text-[#9e0a05]"} flex w-fit px-4 py-2 rounded-xl`}
            >
              {`CODE ${visitorDetails?.status}`}
            </span>
          </div>
          <figure className="w-full border p-4 rounded-xl flex flex-col gap-4">
            <figcaption className="font-semibold text-buttongray">
              Visitor&apos;s details
            </figcaption>
            <div>
              <p className="text-buttongray text-sm">Name</p>
              <p className="font-bold">{visitorDetails?.visitorname}</p>
            </div>
            <div>
              <p className="text-buttongray text-sm">Phone number</p>
              <p className="font-bold">{visitorDetails?.visitornumber}</p>
            </div>

            <div>
              <p className="text-buttongray text-sm">Email</p>
              <p className="font-bold">{visitorDetails?.visitoremail}</p>
            </div>
          </figure>
          <figure className="w-full border p-4 rounded-xl flex flex-col gap-4">
            <figcaption className="font-semibold text-buttongray">
              Resident&apos;s details
            </figcaption>
            <div>
              <p className="text-buttongray text-sm">Name</p>
              <p className="font-bold">{visitorDetails?.resident?.user?.name}</p>
            </div>
            <div>
              <p className="text-buttongray text-sm">Phone number</p>
              <p className="font-bold">{visitorDetails?.resident?.phonenumber}</p>
            </div>
            <div>
              <p className="text-buttongray text-sm">House address</p>
              <p className="font-bold">
                {`${visitorDetails?.resident?.housenumber}, ${visitorDetails?.resident?.streetaddress}`}
              </p>
            </div>
          </figure>
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
