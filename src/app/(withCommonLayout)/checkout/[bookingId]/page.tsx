"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import {
  CreditCard,
  MapPin,
  Home,
  Bath,
  Bed,
  Square,
  Loader2,
  Shield,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Info,
  Tag,
  ShoppingCart,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetBookingsByIdQuery } from "@/redux/api/bookingApi";
import { TBooking } from "@/types/Bookings";
import TextLoading from "@/components/Custom/Loading/TextLoading";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, FieldValues } from "react-hook-form";
import { paymentBillingSchema } from "@/schema/paymentSchema";
import { TCoupon } from "@/types/Payment";
import { COUPONS } from "@/data/cuponsData";
import { toast } from "sonner";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import CheckoutPageSkeleton from "@/components/Skeleton/CheckoutPageSkeleton/CheckoutPageSkeleton";

const CheckoutPage = () => {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [booking, setBooking] = useState<TBooking | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<TCoupon | null>(null);
  const [couponError, setCouponError] = useState("");

  // Redux hooks
  const { data: bookingData, isLoading: bookingLoading } =
    useGetBookingsByIdQuery(bookingId);
  const [createPayment] = useCreatePaymentMutation();

  // Update local state when data loads
  useEffect(() => {
    if (bookingData?.data) {
      setBooking(bookingData.data);
    }
  }, [bookingData]);

  const subtotal = booking?.totalAmount || 0;
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discount = (subtotal * appliedCoupon.discount) / 100;
    } else {
      discount = appliedCoupon.discount;
    }
  }

  const total = Math.max(0, subtotal - discount); // prevent negative total

  const handleCouponApply = () => {
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    const coupon = COUPONS[code];

    if (coupon) {
      const fullCoupon: TCoupon = { ...coupon, code };
      setAppliedCoupon(fullCoupon);
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleCouponRemove = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  const handlePayment = async (values: FieldValues) => {
    try {
      setIsLoading(true);
      const billingLocation = `${values.city}, ${values.state} ${values.zipCode}, ${values.country}`;

      const paymentData = {
        bookingId,
        billingName: values.billingName,
        billingEmail: values.billingEmail,
        billingPhone: values.billingPhone,
        billingLocation,
        finalAmount: total,
      };
      const res = await createPayment(paymentData);

      if (res?.data?.data?.url) {
        toast.success("Redirecting to payment...");
        router.push(`${res?.data?.data?.url}`);
        setIsLoading(false);
      } else {
        toast.error("Failed to initiate payment.");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Payment failed, please try again!");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (bookingLoading) {
    return <CheckoutPageSkeleton />;
  }

  const defaultValues = {
    billingName: "",
    billingEmail: "",
    billingPhone: "",
    country: "Bangladesh",
    city: "",
    state: "",
    zipCode: "",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <FormContainer
          onSubmit={handlePayment}
          resolver={zodResolver(paymentBillingSchema)}
          defaultValues={defaultValues}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Billing Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <FormInput
                      name="billingName"
                      label="Full Name"
                      placeholder="Brandon Johnson"
                      required
                    />
                    <FormInput
                      name="billingEmail"
                      label="Email Address"
                      type="email"
                      placeholder="brandon.johnson@gmail.com"
                      required
                    />
                    <FormInput
                      name="billingPhone"
                      label="Phone Number"
                      placeholder="1842515318"
                      required
                    />
                    <FormInput
                      name="country"
                      label="Country"
                      placeholder="Bangladesh"
                      required
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormInput
                        name="city"
                        label="City"
                        placeholder="Dhaka"
                        required
                      />
                      <FormInput
                        name="state"
                        label="State"
                        placeholder="Dhaka"
                        required
                      />
                      <FormInput
                        name="zipCode"
                        label="ZIP Code"
                        placeholder="1000"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I have read and agree to the Terms and Conditions
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Demo Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Info className="w-5 h-5" />
                    Demo Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Test Card Details:
                      </h4>
                      <div className="bg-blue-50 p-3 rounded text-sm">
                        <p>
                          Card: <strong>4242 4242 4242 4242</strong>
                        </p>
                        <p>
                          CVC: <strong>123</strong>
                        </p>
                        <p>
                          Expiry: <strong>12/25</strong>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Demo Coupon Codes:
                      </h4>
                      <div className="bg-green-50 p-3 rounded text-sm space-y-1">
                        <p>
                          <strong>WELCOME10</strong> - 10% off for new customers
                        </p>
                        <p>
                          <strong>SAVE500</strong> - $500 off on booking
                        </p>
                        <p>
                          <strong>PROPERTY20</strong> - 20% off on property
                          booking
                        </p>
                        <p>
                          <strong>FIRSTTIME</strong> - 15% off for first-time
                          users
                        </p>
                        <p>
                          <strong>PREMIUM100</strong> - $100 off premium
                          properties
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Cart Summary */}
            <div className="space-y-6">
              <Card>
                <CardTitle className="flex items-center gap-2 p-6">
                  <ShoppingCart className="w-5 h-5" />
                  Review your cart
                </CardTitle>
                <CardContent>
                  {/* Property Item */}
                  <div className="flex gap-4 mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={
                          booking?.property?.images?.[0] ||
                          "/placeholder-property.jpg"
                        }
                        alt={booking?.property?.title || "Property"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {booking?.property?.title || "Property Title"}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Bed className="w-4 h-4" />
                        <span>{booking?.property?.totalBedrooms || 3} bed</span>
                        <Bath className="w-4 h-4" />
                        <span>
                          {booking?.property?.totalBathrooms || 2} bath
                        </span>
                        <Square className="w-4 h-4" />
                        <span>
                          {booking?.property?.squareFeet || 1200} sqft
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {booking?.property?.city || "City"},{" "}
                          {booking?.property?.state || "State"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">
                          {booking?.property?.purpose === "RENT"
                            ? "RENT"
                            : "BUY"}
                        </Badge>
                        <Badge variant="outline">
                          {booking?.property?.propertyType || "RESIDENTIAL"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${subtotal.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">Total Amount</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Coupon Code */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={handleCouponApply}
                        className="text-blue-600"
                      >
                        Apply
                      </Button>
                    </div>

                    {couponError && (
                      <div className="border border-red-200 bg-red-50 p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-red-700 text-sm">
                            {couponError}
                          </span>
                        </div>
                      </div>
                    )}

                    {appliedCoupon && (
                      <div className="border border-green-200 bg-green-50 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-green-700 text-sm">
                              <strong>{appliedCoupon.code}</strong> applied -{" "}
                              {appliedCoupon.description}
                            </span>
                          </div>
                          <Button
                            type="submit"
                            variant="ghost"
                            size="sm"
                            onClick={handleCouponRemove}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>- ${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-6">
                    <Label className="text-base font-medium mb-3 block">
                      Payment Method
                    </Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="stripe" id="stripe" />
                        <CreditCard className="w-4 h-4" />
                        <Label
                          htmlFor="stripe"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">Stripe</div>
                          <div className="text-sm text-gray-500">
                            Pay with credit/debit card
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Pay Now Button */}
                  <div className="flex justify-center mt-8">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="hover:text-primary hover:border-white px-6 py-2 font-medium transition-all duration-200 group  bg-[#1C2D37] hover:bg-slate-700 hover:text-white w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4 mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        `Pay $${total.toFixed(2)}`
                      )}
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Secure Checkout - SSL Encrypted</span>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Your payment information is processed securely. We do not
                    store credit card details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default CheckoutPage;
