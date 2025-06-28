"use client";

import {
  ShieldCheck,
  DollarSign,
  Lock,
  Headset,
  Smartphone,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Verified Listings",
    description:
      "All properties are manually reviewed and verified by our team.",
    icon: ShieldCheck,
  },
  {
    title: "Affordable Prices",
    description:
      "Find the best deals tailored to your budget without compromise.",
    icon: DollarSign,
  },
  {
    title: "Secure Payments",
    description: "We use industry-leading encryption for all transactions.",
    icon: Lock,
  },
  {
    title: "24/7 Support",
    description: "Our team is always ready to help with any queries you have.",
    icon: Headset,
  },
  {
    title: "Easy to Use",
    description:
      "Clean, intuitive interface to help you find your next home fast.",
    icon: Smartphone,
  },
  {
    title: "Community Reviews",
    description:
      "Read real feedback from other users before making a decision.",
    icon: ThumbsUp,
  },
];

export default function ServiceSection() {
  return (
    <section className="py-16 px-4 lg:px-16" id="why-choose-us">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          {/* Left Side - Title and Description */}
          <div className="flex-1 max-w-2xl">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                We Are Here
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              Our Services
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              We offer a complete suite of services to make your property
              journey seamless from verified listings and secure transactions to
              expert support and community reviews.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition"
              >
                <div className="flex justify-center items-center w-12 h-12 mx-auto mb-4 bg-[#1C2D37] rounded-full">
                  <Icon className="text-white w-6 h-6" />
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-sm text-gray-600">
                  {feature.description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
