import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Skeleton Components
const PropertySkeleton = () => (
  <Card className="overflow-hidden shadow-lg border-0 bg-white">
    <div className="w-full h-64 bg-gray-200 animate-pulse" />
    <CardContent className="p-6 bg-slate-100">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
        <div className="h-20 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </CardContent>
  </Card>
);

const BookingSummarySkeleton = () => (
  <Card className="shadow-lg border-0 bg-white">
    <CardHeader className="bg-gray-200 animate-pulse rounded-t-lg">
      <div className="h-6 bg-gray-300 rounded w-32" />
    </CardHeader>
    <CardContent className="p-6 bg-slate-100 rounded-b-lg">
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
        ))}
        <div className="h-12 bg-gray-200 rounded animate-pulse mt-6" />
      </div>
    </CardContent>
  </Card>
);

const BookingPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#EBF0F4]">
      {/* Banner Section */}
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <PropertySkeleton />
            <Card className="shadow-lg border-0 bg-slate-100">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-48 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <BookingSummarySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPageSkeleton;
