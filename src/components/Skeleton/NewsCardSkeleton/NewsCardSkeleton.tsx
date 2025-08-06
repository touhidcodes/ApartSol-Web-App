import { Card, CardContent } from "@/components/ui/card";

export const NewsCardSkeleton = () => {
  return (
    <Card className="bg-[#1C2D37] border-none shadow-none rounded-2xl overflow-hidden h-full">
      {/* Image Skeleton */}
      <div className="relative h-48 overflow-hidden rounded-2xl">
        <div className="w-full h-full bg-slate-700/50 animate-pulse rounded-2xl"></div>
      </div>

      {/* Content Skeleton */}
      <CardContent className="py-6">
        {/* Meta Info Skeleton */}
        <div className="flex items-center gap-6 mb-3">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-slate-600/50 rounded animate-pulse"></div>
            <div className="w-20 h-3 bg-slate-600/50 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-slate-600/50 rounded animate-pulse"></div>
            <div className="w-16 h-3 bg-slate-600/50 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-3 space-y-2">
          <div className="w-full h-5 bg-slate-600/50 rounded animate-pulse"></div>
          <div className="w-3/4 h-5 bg-slate-600/50 rounded animate-pulse"></div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-6 space-y-2">
          <div className="w-full h-3 bg-slate-600/50 rounded animate-pulse"></div>
          <div className="w-full h-3 bg-slate-600/50 rounded animate-pulse"></div>
          <div className="w-2/3 h-3 bg-slate-600/50 rounded animate-pulse"></div>
        </div>

        {/* Button Skeleton */}
        <div className="w-32 h-9 bg-slate-600/50 rounded-full animate-pulse"></div>
      </CardContent>
    </Card>
  );
};
