"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const AuthPageSkeleton = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      {/* Carousel Section - Hidden on mobile/tablet */}
      <div className="w-full h-full relative hidden lg:block bg-gray-200">
        <Skeleton className="absolute inset-0 w-full h-full" />

        {/* Logo and Back Button Skeleton */}
        <div className="absolute top-10 left-10 z-40 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-20 h-2" />
            </div>
          </div>
          <Skeleton className="w-32 h-4 mt-2" />
        </div>

        {/* Heading and Subtext Skeleton */}
        <div className="absolute bottom-28 left-10 text-white space-y-2 z-20">
          <Skeleton className="w-64 h-6" />
          <Skeleton className="w-48 h-4" />
        </div>

        {/* Dots Skeleton */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-8 h-1.5 rounded-full bg-white/50" />
          ))}
        </div>
      </div>

      {/* Form Section Skeleton */}
      <div className="flex justify-center items-center bg-white px-6 sm:px-10 overflow-y-auto">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="w-2/3 h-8 mx-auto" />
          <Skeleton className="w-full h-12 rounded-md" />
          <Skeleton className="w-full h-12 rounded-md" />
          <Skeleton className="w-full h-12 rounded-md" />
          <Skeleton className="w-1/2 h-10 mx-auto mt-4 rounded-md" />
          <Skeleton className="w-2/3 h-4 mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
};

export default AuthPageSkeleton;
