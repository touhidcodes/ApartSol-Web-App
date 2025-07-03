"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Badge, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useGetBlogByIdQuery } from "@/redux/api/blogApi";

interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  category?: string;
  updatedAt: string;
  createdAt: string;
}
const BlogDetailsPage = () => {
  const params = useParams();
  const slug = params.id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Replace this with your actual hook
  const { data, isLoading } = useGetBlogByIdQuery(slug);

  useEffect(() => {
    if (data) {
      setBlog(data?.data);
    }
  }, [data]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (!res.ok) {
          if (res.status === 500) {
            notFound();
          }
        }
        const data = await res.json();

        if (data?.data) {
          setBlog(data.data);
        } else {
          notFound();
        }
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );

  if (!blog) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/articles"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:underline mt-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {blog?.image && (
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
