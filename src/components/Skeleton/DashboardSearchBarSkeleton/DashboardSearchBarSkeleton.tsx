import { SlidersHorizontal } from "lucide-react";

const DashboardSearchBarSkeleton = () => {
  return (
    <div className="hidden md:block bg-white rounded-lg shadow-md border animate-pulse">
      <div className="flex items-center">
        {/* Left Label */}
        <div className="bg-[#1C2D37] text-white px-4 py-6 text-sm font-semibold flex items-center rounded-l-lg">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filter
        </div>

        {/* Skeleton Form Fields */}
        <div className="flex items-center justify-between flex-1 space-x-4 px-4 py-5">
          {/* Search Input Skeleton */}
          <div className="h-8 w-[200px] bg-gray-200 rounded-md" />

          {/* Availability Select Skeleton */}
          <div className="h-8 w-[140px] bg-gray-200 rounded-md" />

          {/* Sort By Select Skeleton */}
          <div className="h-8 w-[140px] bg-gray-200 rounded-md" />

          {/* Search Button Skeleton */}
          <div className="h-8 w-[100px] bg-gray-300 rounded-full" />

          {/* Clear Button Skeleton */}
          <div className="h-8 w-[120px] bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSearchBarSkeleton;
