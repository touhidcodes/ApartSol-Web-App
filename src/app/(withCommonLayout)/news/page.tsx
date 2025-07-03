"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowRight, Clock, CalendarDays, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetAllBlogsQuery } from "@/redux/api/blogApi";
import { calculateReadTime, formatDate, truncateText } from "@/lib/utils";
import ArticleCadSkeleton from "@/components/Skeleton/ArticleCardSkeleton/ArticleCadSkeleton";

// Types
interface BlogMeta {
  total: number;
  page: number;
  limit: number;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  category?: string;
  updatedAt: string;
  createdAt: string;
}

interface BlogResponse {
  data: Blog[];
  meta: BlogMeta;
}

const NewsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Replace this with your actual hook
  const { data, isLoading } = useGetAllBlogsQuery({
    limit: 6,
    page: currentPage,
  });

  useEffect(() => {
    if (data) {
      setBlogs(data?.data);
    }
  }, [data]);

  const ITEMS_PER_PAGE = 6;
  const totalItems = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const start = totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const placeholder =
    "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  // Loading skeleton
  if (isLoading) {
    return <ArticleCadSkeleton />;
  }

  return (
    <div className="bg-[#EBF0F4] py-10 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            News & Articles
          </h1>
          <p className="text-gray-600">
            Stay updated with the latest real estate news, market trends, and
            expert insights
          </p>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Latest Articles
          </h2>
          <p className="text-gray-600">
            Showing {start} to {end} of {totalItems} articles
          </p>
        </div>

        {/* Content */}
        {blogs.length > 0 ? (
          <>
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {blogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image || placeholder}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(blog.updatedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {calculateReadTime(blog.content)}
                      </div>
                    </div>
                    {/* Category Badge */}
                    {blog.category && (
                      <div className="inline-flex items-center mb-3">
                        <span className="bg-[#1C2D37] text-white px-3 py-1 rounded-full text-xs font-medium">
                          {blog.category}
                        </span>
                      </div>
                    )}
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 leading-tight mb-3">
                      {blog.title}
                    </h3>
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                      {truncateText(blog.content, 150)}
                    </p>
                    {/* CTA Button */}
                    <Link href={`/articles/${blog.id}`}>
                      <Button className="w-full  hover:bg-[#1C2D37] hover:text-white transition-all duration-200 group text-white">
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => {
                          if (currentPage > 1)
                            handlePageChange(currentPage - 1);
                        }}
                        className={`transition-all duration-200 ${
                          currentPage === 1
                            ? "pointer-events-none opacity-50 cursor-not-allowed"
                            : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                        }`}
                      />
                    </PaginationItem>

                    {/* Page Indicator */}
                    <PaginationItem className="px-4 flex items-center text-sm text-gray-700">
                      Page
                      <span className="mx-1 font-semibold"> {currentPage}</span>
                      of{" "}
                      <span className="ml-1 font-semibold"> {totalPages}</span>
                    </PaginationItem>

                    {/* Next Button */}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => {
                          if (currentPage < totalPages)
                            handlePageChange(currentPage + 1);
                        }}
                        className={`transition-all duration-200 ${
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50 cursor-not-allowed"
                            : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-md">
              <AlertTriangle className="w-12 h-12 text-slate-800 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Articles Found!
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any articles. Please try again later.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full px-6"
              >
                Retry
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* CSS for line clamping */}
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
    </div>
  );
};

export default NewsPage;
