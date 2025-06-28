"use client";

import { Home, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const WhoWeAreSection = () => {
  const services = [
    {
      id: 1,
      icon: Home,
      title: "Buy a Home",
      description:
        "Explore a range of verified properties to find your ideal home with secure transactions.",
    },
    {
      id: 2,
      icon: Building,
      title: "Rent a Home",
      description:
        "Browse through thousands of rental listings suited for every lifestyle and budget.",
    },
    {
      id: 3,
      icon: Home,
      title: "Sell a Home",
      description:
        "List your property with confidence and connect with genuine buyers instantly.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          {/* Left Side - Title and Description */}
          <div className="flex-1 max-w-2xl">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Who We Are
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              Buy, Rent & Sell
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              We offer a complete suite of services to make your property
              journey seamless from verified listings and secure transactions to
              expert support and community reviews.
            </p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="bg-[#1C2D37] border-0 rounded-2xl p-8 text-center text-white hover:bg-slate-700 transition"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-600 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
                >
                  <Link href="/properties">Find Home</Link>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
