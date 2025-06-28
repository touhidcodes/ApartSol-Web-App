"use client";

import { useEffect, useState } from "react";
import { useGetFlatByIdQuery } from "@/redux/api/flatApi";
import { TFlat, TFlatWithUserAndReviews } from "@/types/Flats";
import {
  MapPin,
  Bed,
  Ruler,
  DollarSign,
  Bath,
  Wifi,
  Car,
  ArrowLeft,
  Home,
  Building,
  User,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Globe,
  Link2,
  Wallet,
  Banknote,
  CalendarCheck2,
  CalendarX2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Custom/Loading/Loading";
import ThumbnailGallery from "@/components/Shared/ThumbnailGallery/ThumbnailGallery";
import { FeaturesAmenities } from "@/components/Shared/FeatureAmenities/FeatureAmenities";
import { RenderStars } from "@/components/Shared/RenderStars/RenderStars";
import { Separator } from "@/components/ui/separator";

type PropTypes = {
  params: {
    id: string;
  };
};

const placeholder =
  "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";

const PropertyOverviewItem = ({
  icon,
  label,
  value,
  bgColor = "bg-slate-700",
}) => (
  <div
    className={`${bgColor} text-white p-4 rounded-lg flex items-center gap-3`}
  >
    <div className="text-blue-400">{icon}</div>
    <div>
      <div className="text-xs text-gray-300 uppercase">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  </div>
);

export default function FlatDetailPage({ params }: PropTypes) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { data, isLoading } = useGetFlatByIdQuery(params.id);
  const [flat, setFlat] = useState<TFlatWithUserAndReviews | undefined>();

  console.log(data);

  useEffect(() => {
    if (data) setFlat(data);
  }, [data]);

  if (isLoading || !flat) return <Loading />;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Contact form submitted:", contactForm);
    // Handle form submission here
    alert("Message sent successfully!");
    setContactForm({ name: "", email: "", message: "" });
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
            <h1 className="text-white font-semibold text-3xl md:text-5xl leading-tight">
              {flat.title}
            </h1>
            <p className="text-white text-sm md:text-base">
              Home → {flat.title}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/flats"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={18} /> Back to Flats
          </Link>
        </div>
        {/* Image Carousel */}
        <div className="mb-10 w-full content grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {flat.images && <ThumbnailGallery images={flat.images} />}
          </div>
          {/* Right Side */}
          <div className="flex flex-col  justify-between h-full">
            {/* Author Info */}
            <Card className="bg-[#1C2D37] text-white">
              <CardHeader>
                <h3 className="text-xl font-semibold">Author Info</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Profile Picture and Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center overflow-hidden">
                      {flat?.user?.UserProfile?.image ? (
                        <img
                          src={
                            flat?.user?.UserProfile?.image || avatarPlaceholder
                          }
                          alt={
                            flat?.user?.UserProfile?.name || "Property Owner"
                          }
                          className="w-12 h-12 object-cover"
                        />
                      ) : (
                        <User size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {flat?.user?.UserProfile?.name || "Property Owner"}
                      </h4>
                      <p className="text-sm text-slate-300">
                        {flat?.user?.UserProfile?.profession ||
                          "Profession not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Building size={16} />
                    {flat?.user?.UserProfile?.company || "Company not provided"}
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone size={16} />
                    {flat?.user?.UserProfile?.phone ||
                      flat?.user?.UserProfile?.secondaryPhone ||
                      "Phone not provided"}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <MapPin size={16} />
                    {flat?.user?.UserProfile?.city &&
                    flat?.user?.UserProfile?.country
                      ? `${flat?.user?.UserProfile.city}, ${flat?.user?.UserProfile.country}`
                      : "Location not provided"}
                  </div>

                  {/* Verification */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle size={16} />
                    {flat?.user?.UserProfile?.verified
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
                      <span className="font-medium">Rent Price:</span>
                    </div>
                    <span>
                      $ {flat?.rent?.toLocaleString() || "Not specified"}
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
                      {flat?.advanceAmount?.toLocaleString() || "Not specified"}
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
                        flat?.availability ? "bg-green-600" : "bg-red-600"
                      }
                    >
                      {flat?.availability ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  {/* Book Flat Button */}
                  <Button
                    size="lg"
                    disabled={!flat?.availability}
                    className="w-full bg-white text-slate-800 hover:bg-gray-100 font-semibold"
                  >
                    {flat?.availability ? "Book This Flat" : "Not Available"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About Property and Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* About This Property */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Property
              </h2>
              <div className="text-gray-600 space-y-4">
                <p className="leading-relaxed">{flat.description}</p>
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
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Property Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <PropertyOverviewItem
                  icon={<Home size={20} />}
                  label="ID NO."
                  value={`#${flat.id.slice(-6).toUpperCase()}`}
                />
                <PropertyOverviewItem
                  icon={<Building size={20} />}
                  label="Type"
                  value={flat.propertyType}
                />
                <PropertyOverviewItem
                  icon={<Home size={20} />}
                  label="Room"
                  value={flat.totalRooms}
                />
                <PropertyOverviewItem
                  icon={<Bed size={20} />}
                  label="Bedroom"
                  value={flat.totalBedrooms}
                />
                <PropertyOverviewItem
                  icon={<Bath size={20} />}
                  label="Bath"
                  value={flat.totalBathrooms}
                />
                <PropertyOverviewItem
                  icon={<DollarSign size={20} />}
                  label="Purpose"
                  value={`For ${flat.purpose}`}
                />
                <PropertyOverviewItem
                  icon={<Ruler size={20} />}
                  label="SqFt"
                  value={flat.squareFeet}
                />
                <PropertyOverviewItem
                  icon={<Car size={20} />}
                  label="Parking"
                  value={flat.parking ? "Yes" : "No"}
                />
                <PropertyOverviewItem
                  icon={<Building size={20} />}
                  label="Elevator"
                  value={flat.elevator ? "Yes" : "No"}
                />
                <PropertyOverviewItem
                  icon={<Wifi size={20} />}
                  label="Wifi"
                  value={flat.wifi ? "Yes" : "No"}
                />
              </div>
            </div>
            <FeaturesAmenities availableAmenities={flat.amenities} />
            <div className="bg-gray-100 p-6 rounded-lg max-w-2xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Review</h2>
                <button
                  // onClick={onLoginToReview}
                  className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors"
                >
                  <Star size={14} />
                  Login To Write Your Review
                </button>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {flat?.review?.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        <User size={20} />
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-gray-800">
                            {review.author}
                          </span>
                          {RenderStars(review.rating)}
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact and Author Info */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card className="bg-[#1C2D37] text-white">
              <CardHeader>
                <h3 className="text-lg font-semibold">
                  Contact the listing owner
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message..."
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-white text-slate-800 hover:bg-gray-100 font-semibold"
                  >
                    Submit Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card className="bg-[#1C2D37] text-white">
              <CardHeader>
                <h3 className="text-xl font-semibold">Author Info</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Profile Picture and Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center overflow-hidden">
                      {flat?.user?.UserProfile?.image ? (
                        <img
                          src={
                            flat?.user?.UserProfile?.image || avatarPlaceholder
                          }
                          alt={
                            flat?.user?.UserProfile?.name || "Property Owner"
                          }
                          className="w-12 h-12 object-cover"
                        />
                      ) : (
                        <User size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {flat?.user?.UserProfile?.name || "Property Owner"}
                      </h4>
                      <p className="text-sm text-slate-300">
                        {flat?.user?.UserProfile?.profession ||
                          "Profession not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Building size={16} />
                    {flat?.user?.UserProfile?.company || "Company not provided"}
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone size={16} />
                    {flat?.user?.UserProfile?.phone ||
                      flat?.user?.UserProfile?.secondaryPhone ||
                      "Phone not provided"}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <MapPin size={16} />
                    {flat?.user?.UserProfile?.city &&
                    flat?.user?.UserProfile?.country
                      ? `${flat?.user?.UserProfile.city}, ${flat?.user?.UserProfile.country}`
                      : "Location not provided"}
                  </div>

                  {/* Verification */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle
                      size={16}
                      className={
                        flat?.user?.UserProfile?.verified
                          ? "text-green-400"
                          : "text-gray-400"
                      }
                    />
                    {flat?.user?.UserProfile?.verified
                      ? "Verified Agent"
                      : "Not Verified"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
