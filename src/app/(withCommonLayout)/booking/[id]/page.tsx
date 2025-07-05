"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Home,
  Ruler,
  User,
  Mail,
  Phone,
  CheckCircle,
  Star,
  Building2,
  Landmark,
  Globe,
  Mailbox,
  CreditCard,
  Loader2,
  UserRound,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useGetPropertyByIdQuery } from "@/redux/api/propertiesApi";
import { useGetUserWithProfileQuery } from "@/redux/api/userApi";
import { useBookingRequestMutation } from "@/redux/api/bookingApi";
import { toast } from "sonner";
import DynamicBreadcrumb from "@/components/Shared/Breadcrumb/DynamicBreadcrumb";
import Image from "next/image";
import { calculateAverageRating } from "@/lib/utils";
import { TPropertyWithUserAndReviews } from "@/types/Property";
import { TUserWithProfile } from "@/types/User";
import { avatarPlaceholder } from "@/data/common";
import BookingPageSkeleton from "@/components/Skeleton/BookingPageSkeleton/BookingPageSkeleton";

export default function PropertyBookingPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;

  // Redux hooks
  const { data: propertyData, isLoading: propertyLoading } =
    useGetPropertyByIdQuery(propertyId);
  const { data: userData, isLoading: userLoading } =
    useGetUserWithProfileQuery("");
  const [bookingRequest] = useBookingRequestMutation();

  // Local state
  const [property, setProperty] = useState<TPropertyWithUserAndReviews | null>(
    null
  );
  const [user, setUser] = useState<TUserWithProfile | null>(null);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);

  // Update local state when data loads
  useEffect(() => {
    if (propertyData?.data) {
      setProperty(propertyData.data);
    }
  }, [propertyData]);

  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    }
  }, [userData]);

  // Pricing calculations
  const processingFee = 50;
  const vatRate = 0.15; // 15% VAT
  const price = property?.price ?? 0;
  const advance = property?.advanceAmount ?? 0;
  const vatAmount = property?.purpose === "SALE" ? price * vatRate : 0;
  const serviceCharge = property?.purpose === "RENT" ? processingFee : 0;
  const totalDueToday = Math.floor(price + vatAmount + serviceCharge + advance);

  // Handle booking submission
  const handleBooking = async () => {
    if (!property || !user) {
      toast.error("Missing property or user information");
      return;
    }

    if (!property.availability) {
      toast.error("This property is no longer available");
      return;
    }

    try {
      setBookingLoading(true);
      const bookingData = {
        totalAmount: totalDueToday,
      };

      const res = await bookingRequest({
        propertyId,
        propertyData: bookingData,
      });

      if (res?.data?.data?.id) {
        toast.success(res?.data?.message);
        router.push(`/checkout/${res?.data?.data?.id}`);
      } else {
        toast.info(res?.data?.data?.message);
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      const errorMessage =
        error?.data?.message || "Something went wrong with your booking";
      toast.error(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  // Loading state
  if (propertyLoading || userLoading) {
    return <BookingPageSkeleton />;
  }

  // If no property or user data available, continue loading
  if (!property || !user) {
    return <BookingPageSkeleton />;
  }

  const averageRating = calculateAverageRating(property.review);

  return (
    <div className="min-h-screen bg-[#EBF0F4]">
      {/* Banner Section */}
      <div className="relative h-60 md:h-[300px] w-full">
        <Image
          src="/assets/images/detailsPage.jpg"
          alt="Property Details"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/50 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <div className="text-center max-w-5xl w-full space-y-2 mx-auto">
            <h1 className="text-white text-3xl md:text-5xl leading-tight font-semibold">
              Complete Your Booking
            </h1>
            <div className="flex items-center justify-center">
              <DynamicBreadcrumb />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Card */}
            <Card className="overflow-hidden shadow-lg border-0 bg-white">
              <div className="relative">
                <img
                  src={property.images[0] || "/api/placeholder/600/400"}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/80 text-white">
                    {property.propertyType}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    className={
                      property.availability
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-red-600 hover:bg-red-600"
                    }
                  >
                    {property.availability ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 bg-slate-100">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm text-gray-500">
                      {[
                        property.street,
                        property.city,
                        property.state,
                        property.country,
                      ]
                        .filter(Boolean)
                        .join(", ") || "Address not available"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{averageRating}</span>
                    <span className="text-sm text-gray-500">
                      ({property.review.length} reviews)
                    </span>
                  </div>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-slate-200 rounded-lg">
                    <Bed className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Bedrooms</p>
                      <p className="font-semibold">{property.totalBedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-200 rounded-lg">
                    <Bath className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Bathrooms</p>
                      <p className="font-semibold">{property.totalBathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-200 rounded-lg">
                    <Home className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Total Rooms</p>
                      <p className="font-semibold">{property.totalRooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-200 rounded-lg">
                    <Ruler className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Square Feet</p>
                      <p className="font-semibold">{property.squareFeet}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Property Description
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Property Owner */}
            <Card className="shadow-lg border-0 bg-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Property Owner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={
                        property.user.userProfile?.image || avatarPlaceholder
                      }
                      alt={property.user.userProfile?.name || "Property Owner"}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                      {property.user.userProfile?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">
                        {property.user.userProfile?.name || "Property Owner"}
                      </h3>
                      {property.user.userProfile?.verified && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{property.user.email}</span>
                      </div>
                      {property.user.userProfile?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{property.user.userProfile.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Information */}
            <Card className="shadow-lg border-0 bg-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="w-5 h-5" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-200 rounded-lg">
                    <UserRound className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Username</p>
                      <p className="font-semibold">{user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-200 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-200 rounded-lg">
                    <UserRound className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-semibold">
                        {user.userProfile?.name || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-200 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-semibold">
                        {user.userProfile?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Location */}
            <Card className="shadow-lg border-0 bg-slate-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Property Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-slate-200 rounded-lg">
                    <Building2 className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Street</p>
                      <p className="font-semibold">
                        {property.street || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-200 rounded-lg">
                    <Landmark className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">City</p>
                      <p className="font-semibold">{property.city || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-200 rounded-lg">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">State</p>
                      <p className="font-semibold">{property.state || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-200 rounded-lg">
                    <Mailbox className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Zip Code</p>
                      <p className="font-semibold">
                        {property.zipCode || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white sticky top-4">
              <CardHeader className="bg-[#1C2D37] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-slate-100 rounded-b-lg">
                <div className="space-y-3 text-sm text-gray-700">
                  {property.purpose === "RENT" ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Monthly Rent</span>
                        <span className="font-semibold">
                          ${price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Advance Amount</span>
                        <span className="font-semibold">
                          ${advance.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Processing Fee</span>
                        <span className="font-semibold">${processingFee}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Property Price</span>
                        <span className="font-semibold">
                          ${price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Advance Amount</span>
                        <span className="font-semibold">
                          ${advance.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>VAT (15%)</span>
                        <span className="font-semibold">
                          ${vatAmount.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Due Today</span>
                    <span className="text-blue-600">
                      ${totalDueToday.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> The advance amount will be refunded
                    when you move out, subject to property conditions.
                  </p>
                </div>

                <Button
                  className="w-full mt-6 bg-[#1C2D37] hover:bg-slate-700 text-white"
                  onClick={handleBooking}
                  disabled={bookingLoading || !property.availability}
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : !property.availability ? (
                    "Property Not Available"
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Book Property Now
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-3">
                  🔒 Your payment is secure and encrypted
                </p>
              </CardContent>
            </Card>

            {/* Booking Benefits */}
            <Card className="shadow-lg border-0 bg-slate-100">
              <CardHeader>
                <CardTitle className="text-lg">Why Book With Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Instant booking confirmation",
                    "24/7 customer support",
                    "Verified property owners",
                    "Secure payment processing",
                    "Money-back guarantee",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
