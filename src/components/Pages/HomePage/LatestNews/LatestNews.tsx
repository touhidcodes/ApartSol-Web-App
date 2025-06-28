"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useGetAllBlogsQuery } from "@/redux/api/blogApi";
import { TBlog } from "@/types/blog";
import { calculateReadTime, formatDate, truncateText } from "@/lib/utils";
import Link from "next/link";

const LatestNews = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const { data, isLoading } = useGetAllBlogsQuery({ limit: 6 });

  useEffect(() => {
    if (data) {
      setBlogs(data);
    }
  }, [data]);

  const placeholder =
    "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";

  return (
    <section className="w-full py-16 px-4 bg-[#1C2D37]">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          {/* Left Side - Title and Description */}
          <div className="flex-1 max-w-2xl text-white">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="text-sm font-medium uppercase tracking-wide">
                Trending News
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight">
              News & Articles
            </h2>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore the latest updates, market insights, and expert tips in
              real estate. From smart property deals to urban living trends our
              articles help you stay informed and make smarter housing
              decisions.
            </p>
          </div>

          {/* Right Side - CTA Button */}
          <div className="flex-shrink-0">
            <Button
              variant="outline"
              className=" bg-transparent border-slate-600 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
              size="lg"
            >
              <Link href="/flats"> View All News</Link>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
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
            {blogs.map((blog) => (
              <CarouselItem key={blog.id} className="px-2 md:px-5 md:basis-1/2">
                <Card className="bg-[#1C2D37] border-none shadow-none rounded-2xl overflow-hidden transition-transform duration-300 transform hover:scale-[1.02] h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image || placeholder}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="py-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-slate-400 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(blog.updatedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {calculateReadTime(blog.content)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 leading-tight">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                      {truncateText(blog.content, 150)}
                    </p>

                    {/* CTA Button */}
                    <Button
                      variant="outline"
                      className="bg-transparent border-slate-600 text-white hover:bg-white hover:text-slate-800 hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
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

export default LatestNews;
