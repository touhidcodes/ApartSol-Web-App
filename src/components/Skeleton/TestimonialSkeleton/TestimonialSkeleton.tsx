import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export const TestimonialSkeleton = () => {
  return (
    <div className="px-3 md:basis-1/3 flex-shrink-0">
      <Card className="bg-white text-slate-800 border-0 rounded-2xl overflow-hidden shadow-md h-full relative min-h-[280px]">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          {/* Comment Skeleton - More lines to match typical comment length */}
          <div className="space-y-2 mb-4 flex-1">
            <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-4/6"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3"></div>
          </div>

          {/* Quote Icon */}
          <Quote className="absolute bottom-6 right-6 text-slate-200 w-12 h-12 z-0" />

          {/* Star Ratings Skeleton */}
          <div className="flex items-center gap-1 mt-auto z-10">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-slate-200 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* User Info Skeleton */}
          <div className="flex items-center gap-3 mt-4 z-10">
            <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-200 rounded animate-pulse mb-1 w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
