"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard } from "lucide-react";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CheckoutPage = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const { bookingId } = useParams();

  const handlePayment = async () => {
    setIsButtonDisabled(true);
    try {
      const res = await createPayment(bookingId);
      console.log(res);
      if (res?.data?.url) {
        toast.success("Redirecting to payment...");
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to initiate payment.");
        setIsButtonDisabled(false);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Payment failed, please try again.");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-10 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <CreditCard className="w-5 h-5" /> Checkout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2 text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Booking Request Status: <Badge variant="outline">Pending</Badge>
            </h2>
            <p className="text-sm text-muted-foreground">
              Your booking was successful. Complete your payment to confirm.
            </p>
          </div>

          <Separator className="my-4" />

          <div className="space-y-1 mb-4">
            <h3 className="text-md font-semibold">Test Card Details</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Card:</strong> 4242 4242 4242 4242
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>CVC:</strong> Any 3 digits
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Expiry:</strong> Any future date
            </p>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isButtonDisabled || isLoading}
            className="w-full mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" /> Redirecting...
              </>
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
