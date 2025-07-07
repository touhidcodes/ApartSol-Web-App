"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Bed,
  Ruler,
  DollarSign,
  Bath,
  Home,
  Building,
  User,
  Phone,
  Star,
  CheckCircle,
  Wallet,
  Banknote,
  CalendarCheck2,
  Hash,
  KeyRound,
  SlashIcon,
  Building2,
  Landmark,
  Mailbox,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import FormTextarea from "@/components/Forms/FormTextarea";
import FormSelect from "@/components/Forms/FormSelect";
import { FieldValues } from "react-hook-form";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import useUserInfo from "@/hooks/useUserInfo";
import { TPropertyWithUserAndReviews } from "@/types/Property";
import PropertyDetailsSkeleton from "@/components/Skeleton/PropertyDetailsSkeleton/PropertyDetailsSkeleton";
import ThumbnailGallery from "@/components/Custom/ThumbnailGallery/ThumbnailGallery";
import PropertyOverviewItem from "@/components/Custom/PropertyOverviewItem/PropertyOverviewItem";
import { RenderStars } from "@/components/Custom/RenderStars/RenderStars";
import { FeaturesAmenities } from "@/components/Custom/FeatureAmenities/FeatureAmenities";
import { useGetPropertyByIdQuery } from "@/redux/api/propertiesApi";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/Shared/Breadcrumb/DynamicBreadcrumb";

type PropTypes = {
  params: {
    id: string;
  };
};

export default function PropertyDetailPage({ params }: PropTypes) {
  const userInfo = useUserInfo();
  const [createReview] = useCreateReviewMutation();
  const { data, isLoading } = useGetPropertyByIdQuery(params.id);
  const [property, setProperty] = useState<
    TPropertyWithUserAndReviews | undefined
  >();

  useEffect(() => {
    if (data) setProperty(data?.data);
  }, [data]);

  if (isLoading || !property) return <PropertyDetailsSkeleton />;

  const handleSubmitReview = async (data: FieldValues) => {
    const propertyId = params.id;

    try {
      const res = await createReview({ propertyId, data });

      if (res?.data?.id) {
        toast.success("Property reviewed successfully!");
      }
      toast.success("You already reviewed this property!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitMessage = async (data: FieldValues) => {
    console.log(data);
    // const propertyId = params.id;
    // try {
    //   const res = await createReview({ propertyId, data });

    //   console.log(res);

    //   if (res?.data?.id) {
    //     toast.success("Property reviewed successfully!");
    //   }
    //   toast.success("You already reviewed this property!");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const avatarPlaceholder = "https://avatar.iran.liara.run/public";
  return (
    <div className="bg-[#EBF0F4] py-10">
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
              {property.title}
            </h1>
            <div>
              <DynamicBreadcrumb />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16">
        {/* Image Carousel */}
        <div className="mb-10 w-full content grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {property.images && <ThumbnailGallery images={property.images} />}
          </div>
          {/* Right Side */}
          <div className="flex flex-col  justify-between h-full">
            {/* Author Info */}
            <Card className="bg-[#1C2D37] text-white">
              <CardHeader>
                <h3 className="text-lg font-semibold">Listing Owner Info</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Profile Picture and Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center overflow-hidden">
                      {property?.user?.userProfile?.image ? (
                        <Image
                          src={
                            property?.user?.userProfile?.image ||
                            avatarPlaceholder
                          }
                          alt={
                            property?.user?.userProfile?.name ||
                            "Property Owner"
                          }
                          className="w-12 h-12 object-cover"
                        />
                      ) : (
                        <User size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {property?.user?.userProfile?.name || "Property Owner"}
                      </h4>
                      <p className="text-sm text-slate-300">
                        {property?.user?.userProfile?.profession ||
                          "Profession not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Building size={16} />
                    {property?.user?.userProfile?.company ||
                      "Company not provided"}
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone size={16} />
                    {property?.user?.userProfile?.phone ||
                      property?.user?.userProfile?.secondaryPhone ||
                      "Phone not provided"}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <MapPin size={16} />
                    {property?.user?.userProfile?.city &&
                    property?.user?.userProfile?.country
                      ? `${property?.user?.userProfile.city}, ${property?.user?.userProfile.country}`
                      : "Location not provided"}
                  </div>

                  {/* Verification */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle size={16} />
                    {property?.user?.userProfile?.verified
                      ? "Verified Agent"
                      : "Not Verified"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties */}
            <Card className="bg-[#1C2D37] text-white">
              <CardHeader>
                <h3 className="text-lg font-semibold">Properties Pricing</h3>
              </CardHeader>

              <CardContent>
                <div className="space-y-4 text-sm text-slate-300">
                  {/* Rent */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wallet size={18} />
                      {property?.purpose === "RENT" ? (
                        <span className="font-medium">Rent Price:</span>
                      ) : (
                        <span className="font-medium">Sale Price:</span>
                      )}
                    </div>
                    <span>
                      $ {property?.price?.toLocaleString() || "Not specified"}
                    </span>
                  </div>

                  {/* Advance Amount */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Banknote size={18} />
                      <span className="font-medium">Advance Amount:</span>
                    </div>
                    <span>
                      ${" "}
                      {property?.advanceAmount?.toLocaleString() ||
                        "Not specified"}
                    </span>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarCheck2 size={18} />
                      <span className="font-medium">Availability:</span>
                    </div>
                    <Badge
                      className={
                        property?.availability ? "bg-green-600" : "bg-red-600"
                      }
                    >
                      {property?.availability ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  {/* Book property Button */}
                  <div>
                    <Link href={`/booking/${property.id}`}>
                      <Button
                        size="lg"
                        disabled={!property?.availability}
                        className="w-full bg-white text-slate-800 hover:bg-slate-100 font-semibold"
                      >
                        {property?.availability
                          ? "Book This property"
                          : "Not Available"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About Property and Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Location */}
            <div className="space-y-2 bg-slate-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Property Location
              </h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  {property?.street || "N/A"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Building2 className="w-4 h-4 text-slate-600" />
                  {property?.city || "N/A"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Landmark className="w-4 h-4 text-slate-600" />
                  {property?.state || "N/A"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Globe className="w-4 h-4 text-slate-600" />
                  {property?.country || "N/A"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mailbox className="w-4 h-4 text-slate-600" />
                  {property?.zipCode || "N/A"}
                </div>
              </div>
            </div>
            {/* About This Property */}
            <div className="bg-slate-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Property
              </h2>
              <div className="text-gray-600 space-y-4">
                <p className="leading-relaxed">{property.description}</p>
                <p className="leading-relaxed">
                  This property offers excellent value for money with modern
                  amenities and prime location. The building features 24/7
                  security, backup generator, and professional maintenance
                  services. Perfect for families looking for comfort and
                  convenience in the heart of the city.
                </p>
              </div>
            </div>

            {/* Property Overview */}
            <div className="rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-6">
                Property Overview
              </h2>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <PropertyOverviewItem
                    label="ID NO."
                    value={`#${property.id.slice(-4).toUpperCase()}`}
                  >
                    <Hash size={16} />
                  </PropertyOverviewItem>
                  <PropertyOverviewItem
                    label="Type"
                    value={property.propertyType}
                  >
                    <Building size={16} />
                  </PropertyOverviewItem>
                  <PropertyOverviewItem
                    label="Room"
                    value={property.totalRooms}
                  >
                    <Home size={16} />
                  </PropertyOverviewItem>
                  <PropertyOverviewItem
                    label="Bedroom"
                    value={property.totalBedrooms}
                  >
                    <Bed size={16} />
                  </PropertyOverviewItem>
                  <PropertyOverviewItem
                    label="Bath"
                    value={property.totalBathrooms}
                  >
                    <Bath size={16} />
                  </PropertyOverviewItem>
                  <PropertyOverviewItem
                    label="Purpose"
                    value={`${property.purpose}`}
                  >
                    <DollarSign size={16} />
                  </PropertyOverviewItem>
                  <PropertyOverviewItem
                    label="SqFt"
                    value={property.squareFeet}
                  >
                    <Ruler size={16} />
                  </PropertyOverviewItem>
                  <PropertyOverviewItem
                    label="Price"
                    value={`S ${property.price?.toLocaleString() || "N/A"}`}
                  >
                    <DollarSign size={16} />
                  </PropertyOverviewItem>

                  <PropertyOverviewItem
                    label="Advance"
                    value={`$ ${
                      property.advanceAmount?.toLocaleString() || "N/A"
                    }`}
                  >
                    <KeyRound size={16} />
                  </PropertyOverviewItem>

                  <PropertyOverviewItem
                    label="Availability"
                    value={property.availability ? "Available" : "Unavailable"}
                  >
                    <CheckCircle size={16} />
                  </PropertyOverviewItem>
                </div>
              </div>
            </div>
            {/* Features and amenities */}
            <div>
              <FeaturesAmenities availableAmenities={property.amenities} />
            </div>
            {/* Review */}
            <div className="space-y-4">
              {property?.review?.length ? (
                property.review.map((review) => (
                  <div
                    key={review.id}
                    className="bg-slate-100 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        <User size={20} />
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="mb-1">
                          <span className="block font-semibold text-gray-800 text-sm">
                            {review.name}
                          </span>

                          <div className="flex items-center gap-2 mt-1">
                            {RenderStars(review.rating)}
                            <span className="text-xs text-gray-500">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed mt-2">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-100 rounded-lg shadow-sm">
                  <div className="flex justify-center mb-2">
                    <Star className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Be the first to write a review for this property.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact and Review */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card className="bg-[#1C2D37] text-white">
              <CardHeader>
                <h3 className="text-lg font-semibold">Contact Listing Owner</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormContainer
                  onSubmit={handleSubmitMessage}
                  defaultValues={{
                    name: "",
                    email: "",
                    message: "",
                  }}
                >
                  <FormInput
                    label="Your Name"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full p-4 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FormInput
                    label="Your Email"
                    type="email"
                    name="email"
                    placeholder="someone@apartsol.com"
                    required
                    className="w-full p-4 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <FormTextarea
                    name="message"
                    label="Your Message"
                    placeholder="Write a detailed message..."
                    required
                    rows={4}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <Button
                    disabled={!userInfo || userInfo.role === "ADMIN"}
                    className="w-full bg-white text-slate-800 hover:bg-slate-100 font-semibold"
                  >
                    Submit Now
                  </Button>
                </FormContainer>
              </CardContent>
            </Card>

            {/* Review */}
            <Card className="bg-[#1C2D37] text-white">
              <CardHeader>
                <h3 className="text-lg font-semibold">Review This Property</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormContainer
                  onSubmit={handleSubmitReview}
                  defaultValues={{
                    name: "",
                    email: "",
                    rating: "",
                    comment: "",
                  }}
                >
                  <FormInput
                    label="Your Name"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full p-4 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FormInput
                    label="Your Email"
                    type="email"
                    name="email"
                    placeholder="someone@apartsol.com"
                    required
                    className="w-full p-4 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FormSelect
                    name="rating"
                    label="Properties Rating"
                    placeholder="Select"
                    options={[
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                    ]}
                    required
                    className="w-full p-4 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FormTextarea
                    name="comment"
                    label="Your Review"
                    placeholder="Write a detailed review..."
                    required
                    rows={4}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <Button
                    disabled={!userInfo || userInfo.role === "ADMIN"}
                    className="w-full bg-white text-slate-800 hover:bg-slate-100 font-semibold"
                  >
                    Submit Now
                  </Button>
                </FormContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
