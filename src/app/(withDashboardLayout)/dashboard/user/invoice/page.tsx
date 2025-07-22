"use client";
import { Button } from "@/components/ui/button";

const payment = {
  id: "64f9e3a2c123456789abcd12",
  amount: 2500,
  currency: "USD",
  status: "SUCCESS",
  paymentMethod: "STRIPE",
  stripeId: "pi_1NV2YQKabcdef1234567890",
  sslCommerzId: null,
  transactionId: "txn_7Gdf8kASDasd98a7sdf",
  couponId: null,
  discountAmount: 200,
  vatAmount: 125,
  serviceCharge: 75,
  finalAmount: 2500,
  billingName: "Tony Stark",
  billingEmail: "tony@gmail.com",
  billingPhone: "209-234-22435",
  billingLocation: "Mirabazar, Sylhet, Bangladesh",
  userId: "64f8ee27c123456789abcd09",
  bookingId: "64f8ee38c123456789abcd0a",
  createdAt: "2025-02-15T12:00:00.000Z",
  updatedAt: "2025-02-15T12:00:00.000Z",
};

export default function InvoicePreview() {
  const downloadInvoice = () => {
    console.log("invoice");
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Invoice</h2>
          <p className="text-sm text-muted-foreground">
            #{payment.id.slice(-6)}
          </p>
        </div>
        <Button onClick={downloadInvoice}>Download PDF</Button>
      </div>

      <div id="invoice-pdf" className="text-sm leading-6 text-black">
        <div className="mb-6">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">From</p>
              <p>Washim Chowdhury</p>
              <p>Zindabazar, Sylhet, Bangladesh</p>
              <p>{payment.billingEmail}</p>
              <p>{payment.billingPhone}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">To</p>
              <p>{payment.billingName}</p>
              <p>{payment.billingLocation}</p>
              <p>{payment.billingEmail}</p>
              <p>{payment.billingPhone}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-4 font-semibold border-b py-2">
            <p>Description</p>
            <p className="text-center">Qty</p>
            <p className="text-center">Price</p>
            <p className="text-right">Amount</p>
          </div>
          <div className="grid grid-cols-4 border-b py-2">
            <p>Apartment Booking</p>
            <p className="text-center">1</p>
            <p className="text-center">${payment.amount.toFixed(2)}</p>
            <p className="text-right">${payment.amount.toFixed(2)}</p>
          </div>
          {payment.vatAmount > 0 && (
            <div className="grid grid-cols-4 border-b py-2">
              <p>VAT (5%)</p>
              <p className="text-center">-</p>
              <p className="text-center">-</p>
              <p className="text-right">${payment.vatAmount.toFixed(2)}</p>
            </div>
          )}
          {payment.serviceCharge > 0 && (
            <div className="grid grid-cols-4 border-b py-2">
              <p>Service Charge</p>
              <p className="text-center">-</p>
              <p className="text-center">-</p>
              <p className="text-right">${payment.serviceCharge.toFixed(2)}</p>
            </div>
          )}
          {payment.discountAmount > 0 && (
            <div className="grid grid-cols-4 border-b py-2">
              <p>Discount</p>
              <p className="text-center">-</p>
              <p className="text-center">-</p>
              <p className="text-right">
                -${payment.discountAmount.toFixed(2)}
              </p>
            </div>
          )}
          <div className="grid grid-cols-4 font-bold py-2">
            <p>Total</p>
            <p></p>
            <p></p>
            <p className="text-right">${payment.finalAmount.toFixed(2)}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Note: Late fee of 10% will be applied if payment is made after due
          date.
        </p>

        <div className="mt-6">
          <p className="font-semibold">Payment Method:</p>
          <p>{payment.paymentMethod}</p>
          <p>Transaction ID: {payment.transactionId || "N/A"}</p>
        </div>

        <div className="mt-10 text-right">
          <p className="font-semibold">Washim Chowdhury</p>
          <p className="text-xs">Signed electronically</p>
        </div>
      </div>
    </div>
  );
}
