import { GetSingleResident } from "@/app/api/queries/get-single-residents";
import { DashPayment } from "../dashboard/dash-payment";
import { GetUsers } from "@/app/api/queries/getuser-session";
import { PaymentStatus } from "@prisma/client";

export interface ResidentPaymentProp {
  id: string;
  createdAt?: Date;
  residentId?: string;
  paymenttype: string | null;
  duedate: Date | null;
  paymentamount: number;
  paymentstatus: PaymentStatus | null;
}

export interface PaymentProp {
  payments: {
    payments: ResidentPaymentProp[];
  };
}

export const dynamic = "force-dynamic";

export default async function Payment() {
  const user = await GetUsers();

  if (!user) {
    return null;
  }

  const residentPayment = await GetSingleResident(user?.id);

  const payments: ResidentPaymentProp[] = residentPayment?.payments ?? [];

  if (!residentPayment) return null;

  return (
    <div>
      <DashPayment payments={{ payments }} />
    </div>
  );
}
