"use client";

import { residentShit } from "@/app/dashboard/admin/admin-dashboard/admin-residents";
import { StatusPill } from "@/stories/statuspills/statuspill";
import { useState, useEffect, useRef } from "react";

import { PaymentStatus } from "@prisma/client";
import { UpdatePaymentStatus } from "@/app/actions/update-payment-status";
import { DeleteIcon } from "@/public/svgIcons/deleteIcon";
import Payment from "@/app/dashboard/resident/payment/page";
import { DeletePayment } from "@/app/api/queries/delete-payment";
import { toast } from "sonner";
import { Modal } from "@/stories/modal/modal";
import { Button } from "@/stories/Button/Button";

interface viewPaymentProps {
  currentViewPayment: residentShit | undefined;
  closePaymentModal: () => void;
}

export const ViewPaymentModal = ({ currentViewPayment, closePaymentModal }: viewPaymentProps) => {
  console.log(currentViewPayment);

  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const confirmRef = useRef<HTMLDialogElement | null>(null);

  const [updateIndex, setUpdateIndex] = useState<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [payments, setPayments] = useState(currentViewPayment?.residentData?.payment || []);

  console.log({ payments });

  console.log(selectedStatus);

  const handleUpdatePaymentStatus = (index: number) => {
    setUpdateIndex(index);
  };

  useEffect(() => {
    if (currentViewPayment?.residentData?.payment) {
      setPayments(currentViewPayment.residentData.payment);
    }
  }, [currentViewPayment]);

  const handleSelectPaymentStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
    paymentId: string
  ) => {
    const newStatus = e.target.value as PaymentStatus;

    setPayments((prevPayments) =>
      prevPayments.map((payment, i) =>
        i === index ? { ...payment, paymentstatus: newStatus } : payment
      )
    );

    setUpdateIndex(null);

    try {
      await UpdatePaymentStatus(newStatus, paymentId);
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  const OpenConfirmationModal = () => {};

  const getStatusPillType = (paymentStatus: PaymentStatus, dueDate: string) => {
    const isOverdue = Date.now() > new Date(dueDate).getTime();
    if (paymentStatus === PaymentStatus.PAID && isOverdue) return "success";
    if (isOverdue) return "danger";
    if (paymentStatus === PaymentStatus.PAID) return "success";
    if (isOverdue) return "success";
    return "warning";
  };

  const handleOpenConfirmationModal = (index: number) => {
    setCurrentIndex(index);
    confirmRef.current?.showModal();
    closePaymentModal();
  };

  const handleDeletePayment = async (paymentId: string) => {
    const result = await DeletePayment(paymentId);

    if (result.success === true) {
      toast.success(result.message);
      setPayments((prevPayment) => prevPayment.filter((payment, _) => payment.id !== paymentId));
    } else {
      toast.error(result.message);
    }
  };

  return (
    <ul className="w-[50vw] mt-10 grid gap-4">
      <h3 className="grid grid-cols-[repeat(auto-fit,minmax(10px,1fr))] text-sm justify-center items-center ">
        <p>Payment type</p>
        <p className="ml-3">Amount</p>
        <p className="ml-1">CreatedAt</p>
        <p className="ml-2">Due date</p>
        <p></p>
        <p></p>
      </h3>
      {payments.map((viewpayment, index) => (
        <li
          key={index}
          className="grid grid-cols-[repeat(auto-fit,minmax(10px,1fr))]  bg-[#f7f7f7] text-sm justify-center items-center p-4 rounded-[12px]"
        >
          {/* <div>{index + 1}</div> */}
          <div>{viewpayment.paymenttype}</div>
          <div>{viewpayment.paymentamount.toLocaleString()}</div>
          <div className="text-wrap text-xs">{new Date(viewpayment.createdAt).toDateString()}</div>
          <div className="text-wrap text-xs text-center">
            {new Date(viewpayment.duedate).toDateString()}
          </div>
          <div className="justify-end flex">
            {" "}
            {updateIndex === index ? (
              <select onChange={(e) => handleSelectPaymentStatus(e, index, viewpayment?.id)}>
                <option>Select</option>
                {Object.keys(PaymentStatus).map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex gap-6 !text-sm">
                <StatusPill
                  status={getStatusPillType(
                    viewpayment?.paymentstatus as PaymentStatus,
                    viewpayment.duedate
                  )}
                  title={
                    Date.now() > new Date(viewpayment.duedate).getTime() &&
                    viewpayment.paymentstatus === "PAID"
                      ? (viewpayment.paymentstatus as string)
                      : Date.now() > new Date(viewpayment.duedate).getTime()
                        ? "Overdue"
                        : (viewpayment.paymentstatus as string)
                  }
                />

                <button onClick={() => handleUpdatePaymentStatus(index)}>Update</button>
              </div>
            )}
            {}
          </div>
          <button
            onClick={() => handleDeletePayment(viewpayment.id)}
            className="text-red-500 flex justify-end"
          >
            {/* <DeleteIcon /> */}
            <DeleteIcon />
          </button>
        </li>
      ))}
      {/* <Modal title="Delete Payment" handleOpenModal={OpenConfirmationModal} ref={confirmRef}>
        <div>
          <p>Do you want to delete this payment</p>
          <div className="flex justify-between">
            <Button
              label={isLoading ? "Loading" : "No"}
              onClick={() => confirmRef.current?.close()}
              iconAlign="none"
              variant="Tertiary"
              color="#139D8F"
              diasbled={isLoading}
              btnbgColor={isLoading ? "#c4c4c4" : "#139D8F"}
            />
            <Button
              label={isLoading ? "Loading" : "Proceed"}
              onClick={() => handleDeletePayment()}
              iconAlign="after"
              variant="Primary"
              color="#139D8F"
              diasbled={isLoading}
              btnbgColor={isLoading ? "#c4c4c4" : "#139D8F"}
            />
          </div>
        </div>
      </Modal> */}
    </ul>
  );
};
