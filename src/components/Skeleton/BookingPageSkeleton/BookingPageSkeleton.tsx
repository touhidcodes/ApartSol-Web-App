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
      <div className="relative h-60 md:h-[300px] w-full">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
        <div className="absolute inset-0 bg-[#0D1B2A]/50 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <div className="text-center max-w-5xl w-full space-y-2 mx-auto">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto animate-pulse" />
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
