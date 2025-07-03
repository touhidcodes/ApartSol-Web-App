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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md animate-pulse"
            >
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
