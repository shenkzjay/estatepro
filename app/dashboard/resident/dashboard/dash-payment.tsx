"use client";

import { DashBreadcrumbs } from "@/components/dashboardheader/dash-breadcrumbs";
import { DashBoardHeader } from "@/components/dashboardheader/dash-header";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { MoreIcon } from "@/public/svgIcons/moreIcon";
import { ArrowIcon } from "@/public/svgIcons/arrowIcon";
import { SearchBox } from "@/stories/searchbox/search";
import { Button } from "@/stories/Button/Button";
import { FilterIcon } from "@/public/svgIcons/filter";
import { DownoadIcon } from "@/public/svgIcons/downloadIcon";
import { useAdminContext } from "../../provider";
import { PaymentStatus } from "@prisma/client";
import { PaymentProp, ResidentPaymentProp } from "../payment/page";
import { useState, useEffect, SetStateAction } from "react";

export const DashPayment = ({ payments }: PaymentProp) => {
  console.log({ payments });

  const [payment, setPayment] = useState(payments || []);

  useEffect(() => {
    if (payments) {
      setPayment(payments);
    }
  }, [payments]);

  const pendingPayment = payment?.payments.filter((payment) => payment.paymentstatus === "PENDING");

  const paidPayment = payment.payments.filter((payment) => payment.paymentstatus === "PAID");

  const { isCollapse } = useAdminContext();

  const getStatusPillType = (paymentStatus: PaymentStatus, dueDate: Date | null) => {
    const isOverdue = Date.now() > new Date(dueDate!).getTime();
    if (paymentStatus === PaymentStatus.PAID && isOverdue) return "success";
    if (isOverdue) return "danger";
    if (paymentStatus === PaymentStatus.PAID) return "success";
    if (isOverdue) return "success";
    return "warning";
  };

  return (
    <div>
      <div
        className={`${isCollapse ? "md:ml-[18vw] ml-0" : "md:ml-[4vw] ml-0"} [transition:_margin-left_.2s_ease-out] bg-[#F8F8F8]`}
      >
        <DashBoardHeader title="Payment" />
        <DashBreadcrumbs title="Payment" />

        {/**Payment table */}
        <section className="p-6 bg-[#F8F8F8] ">
          <h3 className="mb-6 text-xl text-buttongray font-semibold">Payments</h3>
          <div className="overflow-auto">
            <table className="tabler w-full [font-size:_clamp(.7rem,5vw,.9rem)]  rounded-t-[20px] text-left border-collapse overflow-hidden">
              <thead className="sticky top-0">
                <tr className="bg-[#F0F2F5] text-buttongray">
                  <th className="text-start">S/N</th>
                  <th className="text-start">Description</th>
                  <th className="text-start">Amount</th>
                  <th className="text-start text-nowrap">Due Date</th>
                  <th className="text-start text-nowrap">Status</th>

                  {/* <th className="text-start">Status</th> */}
                </tr>
              </thead>
              <tbody className="bg-white p-0 w-full">
                {pendingPayment &&
                  pendingPayment.map((payment, index) => (
                    <tr key={index} className="border-b border-[#F0F2F5] w-full p-4">
                      <td className="" width={10}>
                        {index + 1}
                      </td>
                      <td className="">
                        <div>
                          <p className="text-buttongray">{payment.paymenttype}</p>
                        </div>
                      </td>
                      <td className="text-buttongray py-6 text-nowrap">
                        <p>{payment.paymentamount.toLocaleString()}</p>
                      </td>

                      <td className="text-buttongray py-6 text-nowrap">
                        <p>{new Date(payment.duedate || "").toDateString()}</p>
                      </td>
                      <td>
                        {/* <p className="text-buttongray">{payment.paymentstatus}</p> */}
                        <StatusPill
                          status={getStatusPillType(
                            payment?.paymentstatus as PaymentStatus,
                            payment.duedate
                          )}
                          title={
                            Date.now() > new Date(payment?.duedate!).getTime() &&
                            payment.paymentstatus === "PAID"
                              ? (payment.paymentstatus as string)
                              : Date.now() > new Date(payment.duedate!).getTime()
                                ? "Overdue"
                                : (payment.paymentstatus as string)
                          }
                        />
                      </td>
                      {/* <td>0</td>
                  <td className="text-[12px]  flex">
                   
                  </td> */}
                    </tr>
                  ))}

                {/* <tr className="border-b border-[#F0F2F5]">
                  <td>2</td>
                  <td className=" ">
                    <div>
                      <p className="text-buttongray">Plumbing</p>
                    </div>
                  </td>
                  <td className="text-buttongray py-6">
                    <p>20000</p>
                  </td>

                  <td className="text-buttongray py-6">
                    <p>Apr 14, 2023</p>
                  </td>
                </tr>

                <tr className="border-b border-[#F0F2F5]">
                  <td>3</td>
                  <td className=" ">
                    <div>
                      <p className="text-buttongray">thebigfish@gmail.com</p>
                    </div>
                  </td>
                  <td className="text-buttongray py-6">
                    <p>5200</p>
                  </td>

                  <td className="text-buttongray py-6">
                    <p>Apr 14, 2023</p>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
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
        </section>

        {/**Payment history table */}
        <div className="mt-20 md:mt-0 p-6 bg-[#F8F8F8]">
          <h3 className="text-buttongray font-semibold text-xl mb-6">Payment history</h3>
          <div className="flex md:flex-row flex-col text-buttongray gap-6">
            <div className="flex md:w-1/2">
              <SearchBox
                name="Searchinvite"
                placeholder="Search payment"
                color="#b4b4b4"
                bgColor="#f1f1f3"
              />
            </div>
            <div className="flex flex-row gap-0  md:justify-normal">
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
            </div>
          </div>

          <section className="mt-6">
            <div className="flex flex-col overflow-auto relative ">
              <table className="tabler w-full [font-size:_clamp(.7rem,5vw,.9rem)]  rounded-t-[20px] text-left border-collapse overflow-hidden">
                <thead className="sticky top-0">
                  <tr className="bg-[#F0F2F5] text-buttongray">
                    <th className="text-start">S/N</th>
                    <th className="text-start">Description</th>
                    <th className="text-start text-nowrap">Amount</th>
                    <th className="text-start">Date</th>
                    <th>Receipt</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white p-0 w-full">
                  {paidPayment &&
                    paidPayment.map((payment, index) => (
                      <tr key={index} className="border-b border-[#F0F2F5] w-full p-4">
                        <td className="" width={10}>
                          {index + 1}
                        </td>
                        <td className="">
                          <div className="">
                            <p className="text-buttongray">{payment.paymenttype}</p>
                          </div>
                        </td>

                        <td className="text-buttongray py-6 text-nowrap">
                          <p>{payment.paymentamount.toLocaleString()}</p>
                        </td>
                        <td className="text-buttongray py-6 text-nowrap">
                          <p>{new Date(payment.duedate || "").toDateString()}</p>
                        </td>
                        <td className="text-buttongray py-6 text-nowrap">
                          <p className="text-blue-400 underline">Download ↗</p>
                        </td>
                        <td>
                          <StatusPill
                            title={payment.paymentstatus as PaymentStatus}
                            status={
                              payment.paymentstatus === "OVERDUE"
                                ? "danger"
                                : payment.paymentstatus === "PENDING"
                                  ? "warning"
                                  : "success"
                            }
                          />
                        </td>
                      </tr>
                    ))}

                  {/* <tr className="border-b border-[#F0F2F5] w-full p-4">
                    <td className="" width={10}>
                      2
                    </td>
                    <td className="">
                      <div className="">
                        <p className="text-buttongray">Electricity</p>
                      </div>
                    </td>

                    <td className="text-buttongray py-6 text-nowrap">
                      <p>24000</p>
                    </td>
                    <td className="text-buttongray py-6 text-nowrap">
                      <p>Apr 14, 2024</p>
                    </td>
                    <td className="text-buttongray py-6 text-nowrap">
                      <p className="text-blue-400 underline">Download ↗</p>
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

                    <td className="text-buttongray py-6 text-nowrap">
                      <p>24000</p>
                    </td>
                    <td className="text-buttongray py-6 text-nowrap">
                      <p>Apr 14, 2024</p>
                    </td>
                    <td className="text-buttongray py-6 text-nowrap">
                      <p className="text-blue-400 underline">Download ↗</p>
                    </td>
                  </tr> */}
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
    </div>
  );
};
