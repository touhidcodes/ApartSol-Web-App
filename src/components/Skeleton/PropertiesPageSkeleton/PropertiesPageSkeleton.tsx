import { Search, SlidersHorizontal } from "lucide-react";

export default function PropertiesPageSkeleton() {
  return (
    <div className="bg-[#EBF0F4] py-10 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter Bar Skeleton */}
        <div className="mb-8 bg-white rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-[#1C2D37] text-white px-5 py-4 text-sm font-semibold flex items-center rounded-s-lg">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter Properties
            </div>

            <div className="flex items-center justify-between flex-1">
              {/* Search Input Skeleton */}
              <div className="flex items-center px-4 border-l border-gray-300">
                <Search className="w-4 h-4 text-gray-300 mr-2" />
                <div className="w-[200px] h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Location Select Skeleton */}
              <div className="px-4 border-l border-gray-300">
                <div className="w-[140px] h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Bedrooms Select Skeleton */}
              <div className="px-4 border-l border-gray-300">
                <div className="w-[140px] h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Purpose Select Skeleton */}
              <div className="px-4 border-l border-gray-300">
                <div className="w-[140px] h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Search Button Skeleton */}
              <div className="px-4 border-l border-gray-300">
                <div className="rounded-full px-6 py-2 bg-gray-200 animate-pulse flex items-center">
                  <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                  <div className="w-12 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Clear Button Skeleton */}
              <div className="ml-2 rounded-full px-6 py-2 border border-gray-200 bg-gray-50 animate-pulse">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>

        {/* Property Cards Skeleton */}
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
    </div>
  );
}
