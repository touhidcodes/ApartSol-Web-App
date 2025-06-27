"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    console.log("Newsletter form data:", formData);
    setFormData({ name: "", email: "" });
  };

  return (
    <section className="py-16 px-4 lg:px-16" id="why-choose-us">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          {/* Left Side - Title and Description */}
          <div className="flex-1 max-w-2xl">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Stay Updated
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              Subscribe Newsletter
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              Get exclusive listings, market tips, and community insights
              delivered straight to your inbox your smarter move starts here.
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="flex-1"
            />
            <Input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="flex-1"
            />
            <Button
              type="submit"
              className=" text-white px-6 py-3 font-medium transition-all duration-200 group bg-[#1C2D37] hover:bg-slate-700"
              size="lg"
            >
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
          By subscribing, you agree to our privacy policy and terms of service.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
