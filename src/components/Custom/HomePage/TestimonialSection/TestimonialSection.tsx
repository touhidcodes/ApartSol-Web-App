"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { TReview } from "@/types/Review";
import { RenderStars } from "@/components/Shared/RenderStars/RenderStars";

const TestimonialSection = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const { data, isLoading } = useGetAllReviewsQuery({ limit: 6 });

  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);

  const placeholder = "https://avatar.iran.liara.run/public";
  return (
    <section className="w-full py-16 px-4 bg-[#1C2D37]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex-1 max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="text-sm font-medium uppercase tracking-wide">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight">
              What Our Customers Says
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Hear from our satisfied clients and community members. Discover
              real experiences, honest feedback, and inspiring stories from
              people who found their perfect home through our platform.
            </p>
          </div>
        </div>

        {/* Blog Carousel */}
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="px-3 md:basis-1/3">
                <Card className="bg-white text-slate-800 border-0 rounded-2xl overflow-hidden shadow-md h-full relative">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    {/* Comment */}
                    <p className="text-sm leading-relaxed mb-4 relative z-10">
                      {review.comment}
                    </p>

                    {/* Quote Icon */}
                    <Quote className="absolute bottom-6 right-6 text-slate-200 w-12 h-12 z-0" />

                    {/* Star Ratings */}
                    <div className="flex items-center gap-1 mt-auto z-10">
                      {RenderStars(review.rating)}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mt-4 z-10">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={review.user?.UserProfile?.image || placeholder}
                          alt={review.user?.username || "User"}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {review.user?.UserProfile?.name ||
                            review.user?.username}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {review.user?.role === "AGENT"
                            ? "Verified Property Advisor"
                            : "Registered Member"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Clamp Utility */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
