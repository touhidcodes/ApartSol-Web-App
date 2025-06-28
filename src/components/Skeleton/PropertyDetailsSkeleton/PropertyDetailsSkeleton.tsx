const PropertyDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 mb-10">
      {/* Hero Section Skeleton */}
      <div className="relative h-72 bg-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Title Skeleton */}
          <div className="h-12 w-96 bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
          {/* Left Section (2 Columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-gray-300 rounded-xl h-72 w-full" />
          </div>

          {/* Right Section (1 Column) */}
          <div className="flex flex-col justify-between gap-6">
            <div className="bg-gray-300 rounded-xl h-32 w-full" />
            <div className="bg-gray-300 rounded-xl h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsSkeleton;
