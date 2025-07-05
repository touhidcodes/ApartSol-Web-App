"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard, BadgeCheck, Banknote } from "lucide-react";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CheckoutPage = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("stripe");
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
    <div className="min-h-screen bg-muted py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Left - User Info */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BadgeCheck className="w-5 h-5" /> Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input placeholder="Enter your full name" required />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                placeholder="Enter your email address"
                required
                type="email"
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input placeholder="Enter phone number" required type="tel" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>City</Label>
                <Input placeholder="Enter city" required />
              </div>
              <div>
                <Label>State</Label>
                <Input placeholder="Enter state" required />
              </div>
              <div>
                <Label>ZIP Code</Label>
                <Input placeholder="ZIP" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right - Cart Summary */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="w-5 h-5" /> Review Your Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-6">
              <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                Booking Status: <Badge variant="outline">Pending</Badge>
              </h2>
              <p className="text-sm text-muted-foreground">
                Your booking was successful. Choose a payment method to proceed.
              </p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <RadioGroup
                defaultValue="stripe"
                onValueChange={(value) => setSelectedMethod(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe">Stripe</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                  <Label htmlFor="sslcommerz">SSLCommerz</Label>
                </div>
              </RadioGroup>

              <div className="text-sm text-muted-foreground">
                Use the following test card details for Stripe:
                <ul className="mt-1 ml-4 list-disc">
                  <li>
                    Card: <strong>4242 4242 4242 4242</strong>
                  </li>
                  <li>CVC: Any 3 digits</li>
                  <li>Expiry: Any future date</li>
                </ul>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isButtonDisabled || isLoading}
                className="w-full mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />{" "}
                    Redirecting...
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
