import React from "react";

const PropertyCardSkeleton = () => {
  return (
    <div className="container mx-auto py-16 mt-10">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            className="rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row md:h-[250px] bg-white animate-pulse"
            key={index}
          >
            {/* Image Section Skeleton */}
            <div className="relative w-full md:w-10/12 h-[200px] md:h-full bg-gray-200">
              <div className="absolute top-3 left-3">
                <div className="bg-gray-300 rounded-md h-6 w-20"></div>
              </div>
            </div>

            {/* Content Section Skeleton */}
            <div className="flex flex-col justify-between p-4 md:p-6 w-full">
              <div>
                {/* Title Skeleton */}
                <div className="bg-gray-200 rounded h-6 w-3/4 mb-2"></div>

                {/* Location Skeleton */}
                <div className="flex items-center gap-1 mt-1">
                  <div className="bg-gray-200 rounded h-4 w-4"></div>
                  <div className="bg-gray-200 rounded h-4 w-32"></div>
                </div>

                {/* Description Skeleton */}
                <div className="mt-2 space-y-2">
                  <div className="bg-gray-200 rounded h-4 w-full"></div>
                  <div className="bg-gray-200 rounded h-4 w-2/3"></div>
                </div>

                {/* Info Row Skeleton */}
                <div className="flex items-center justify-start mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="bg-gray-200 rounded h-4 w-4"></div>
                    <div className="bg-gray-200 rounded h-4 w-16"></div>
                  </div>
                  <div className="border-l border-gray-200 h-4 mx-3" />
                  <div className="flex items-center gap-1">
                    <div className="bg-gray-200 rounded h-4 w-4"></div>
                    <div className="bg-gray-200 rounded h-4 w-12"></div>
                  </div>
                  <div className="border-l border-gray-200 h-4 mx-3" />
                  <div className="flex items-center gap-1">
                    <div className="bg-gray-200 rounded h-4 w-4"></div>
                    <div className="bg-gray-200 rounded h-4 w-14"></div>
                  </div>
                </div>
              </div>

              {/* Rent & Details Skeleton */}
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded h-4 w-4 mr-1"></div>
                  <div className="bg-gray-200 rounded h-6 w-20"></div>
                </div>
                <div className="bg-gray-200 rounded h-10 w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
