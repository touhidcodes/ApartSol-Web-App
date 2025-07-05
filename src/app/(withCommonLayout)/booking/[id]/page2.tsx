"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Home,
  Ruler,
  DollarSign,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Star,
  Building2,
  Landmark,
  Globe,
  Mailbox,
  CreditCard,
  Shield,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  AlertCircle,
  Loader2,
  UserRound,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

// Types

export default function PropertyBookingPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;

  // Redux hooks
  const {
    data: propertyData,
    isLoading: propertyLoading,
    error: propertyError,
  } = useGetPropertyByIdQuery(propertyId);
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserWithProfileQuery("");
  const [bookingRequest, { isLoading: bookingLoading }] =
    useBookingRequestMutation();

  // Local state
  const [property, setProperty] = useState<TPropertyWithUserAndReviews | null>(
    null
  );
  const [user, setUser] = useState<TUserWithProfile | null>(null);
  const [bookingError, setBookingError] = useState<string>("");

  if (!property) {
    // Show a loading state or return null to avoid error
    return null;
  }

  const vatPercent = 0.15; // 15% VAT
  const processingFee = 50; // fixed service charge

  let extraCharge = 0;

  if (property.purpose === "SALE") {
    extraCharge = (property.price ?? 0) * vatPercent;
  } else {
    extraCharge = processingFee;
  }
  const totalDueToday = (property.price ?? 0) + extraCharge;
  const averageRating = calculateAverageRating(property.review);

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

    setBookingError("");

    try {
      const propertyId = property.id;

      const propertyData = {
        totalAmount: totalDueToday,
      };

      const res = await bookingRequest({ propertyId, propertyData });

      if (res?.data?.id) {
        toast.success("Booking request submitted successfully!");
        router.push(`/checkout/${res.data.id}`);
      } else {
        toast.success("You have already booked this property!");
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Something went wrong with your booking";
      setBookingError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Loading state
  if (propertyLoading || userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading booking information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (propertyError || userError || !property || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {propertyError
                  ? "Failed to load property information"
                  : userError
                  ? "Failed to load user information"
                  : "Property or user information not found"}
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Button
                onClick={() => router.push("/properties")}
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBF0F4]">
      {/* Banner Section */}
      <div className="relative h-60 md:h-[300px] w-full">
        {/* Background image */}
        <Image
          src="/assets/images/detailsPage.jpg"
          alt="home"
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
        {/* Booking Error Alert */}
        {bookingError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {bookingError}
            </AlertDescription>
          </Alert>
        )}

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
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      {(property.street ||
                        property.city ||
                        property.state ||
                        property.country) && (
                        <span className="font-small text-sm text-gray-500">
                          {[
                            property.street,
                            property.city,
                            property.state,
                            property.country,
                          ]
                            .filter(Boolean)
                            .join(", ") || "N/A"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {averageRating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({property.review.length} reviews)
                        </span>
                      </div>
                    </div>
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
                    {property ? (
                      <AvatarImage
                        src={property.user.userProfile?.image || undefined}
                        alt={property.user.userProfile?.name || "user"}
                      />
                    ) : (
                      <AvatarImage src={avatarPlaceholder} alt="user" />
                    )}
                    <AvatarFallback className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full">
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
                      {property.user.userProfile?.profession && (
                        <p className="text-sm text-gray-500 mt-1">
                          {property.user.userProfile.profession}
                        </p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-200 rounded-lg">
                    <UserRound className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Username</p>
                      <p className="font-semibold">{user.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-200  rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-200  rounded-lg">
                    <UserRound className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-semibold">
                        {user.userProfile?.name || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-200  rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-semibold">
                        {user.userProfile
                          ? `${user.userProfile.state || "State"}, ${
                              user.userProfile.country || "Country"
                            }`
                          : "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-200  rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {/* Location Fields */}
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
                {/* Optional Full Address Below */}
                {(property.street ||
                  property.city ||
                  property.state ||
                  property.country) && (
                  <p className="text-xs text-gray-500">
                    Full Address:&nbsp;
                    <span className="font-small text-gray-700">
                      {[
                        property.street,
                        property.city,
                        property.state,
                        property.country,
                        property.zipCode,
                      ]
                        .filter(Boolean)
                        .join(", ") || "N/A"}
                    </span>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card className="shadow-lg border-0 bg-white sticky top-4">
              <CardHeader className="bg-[#1C2D37] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-slate-100 rounded-b-lg">
                <div className="space-y-4 text-sm text-gray-700">
                  {property.purpose === "RENT" ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Monthly Rent</span>
                        <span className="font-semibold text-base">
                          ${property.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Advance Amount</span>
                        <span className="font-semibold text-base">
                          ${property.advanceAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Processing Fee</span>
                        <span className="font-semibold">${processingFee}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>VAT</span>
                        <span className="font-semibold">$0</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Total Price</span>
                        <span className="font-semibold text-base">
                          ${property.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Processing Fee</span>
                        <span className="font-semibold">${processingFee}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>VAT (15%)</span>
                        <span className="font-semibold">
                          $
                          {(property.price * 0.15 || 0).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Due Today</span>
                    <span className="text-blue-600">${totalDueToday}</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> The advance amount will be refunded
                    when you move out, subject to property conditions.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="hover:text-primary hover:border-white px-6 py-2 font-medium transition-all duration-200 group  bg-[#1C2D37] hover:bg-slate-700 hover:text-white"
                    onClick={handleBooking}
                    disabled={bookingLoading || !property.availability}
                  >
                    {bookingLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : !property.availability ? (
                      "Not Available"
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Book Property Now
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>🔒 Your payment is secure and encrypted</p>
                </div>
              </CardContent>
            </Card>

            {/* Booking Benefits */}
            <Card className="shadow-lg border-0 bg-slate-100">
              <CardHeader>
                <CardTitle className="text-lg">Why Book With Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">
                      Instant booking confirmation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Verified property owners</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="shadow-lg border-0 bg-slate-100">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our booking specialists are here to assist you
                </p>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
