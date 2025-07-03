"use client";

import { useEffect, useState } from "react";
import { useGetAllPropertiesQuery } from "@/redux/api/propertiesApi";
import { TProperty } from "@/types/Property";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/Card/PropertyCard/PropertyCard";
import PropertyCardSkeleton from "@/components/Skeleton/PropertyCardSkeleton/PropertyCardSkeleton";

export default function PropertiesSection() {
  const [properties, setProperties] = useState<TProperty[]>([]);
  const queryParams = new URLSearchParams({ limit: "6" }).toString();
  const { data, isLoading } = useGetAllPropertiesQuery(queryParams);

  useEffect(() => {
    if (data) {
      setProperties(data?.data);
    }
  }, [data]);

  if (isLoading) return <PropertyCardSkeleton />;

  return (
    <section className="py-16 bg-[#EBF0F4]" id="featured">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Side - Title and Description */}
          <div className="flex-1 max-w-2xl">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                FEATURED LISTINGS
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              Featured Properties
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover our handpicked selection of featured properties that
              combine modern design, comfort, and the best locations to ensure
              your perfect match.
            </p>
          </div>

          {/* Right Side - CTA Button */}
          <div className="flex-shrink-0">
            <Button
              className=" text-white px-6 py-3 rounded-full font-medium transition-all duration-200 group bg-[#1C2D37] hover:bg-slate-700"
              size="lg"
            >
              <Link href="/propertys"> View All Properties</Link>
              <ArrowRight className="ml- h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12">
          {properties.slice(0, 6).map((property: TProperty) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
