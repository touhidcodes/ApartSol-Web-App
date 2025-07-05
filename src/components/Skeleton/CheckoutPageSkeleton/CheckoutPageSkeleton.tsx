import React from "react";
import { Home, ShoppingCart, CreditCard, Shield } from "lucide-react";

const CheckoutPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title Skeleton */}
        <div className="h-8 bg-gray-200 rounded-md w-32 mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Billing Information Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-gray-300" />
                  <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Full Name Field */}
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-28 mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                  </div>

                  {/* Country Field */}
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                    <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                  </div>

                  {/* City, State, ZIP Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-8 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-10 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Cart Summary Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-gray-300" />
                  <div className="h-6 bg-gray-200 rounded w-36 animate-pulse"></div>
                </div>
              </div>
              <div className="p-6">
                {/* Property Item Skeleton */}
                <div className="flex gap-4 mb-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 bg-gray-200 rounded-full w-12 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-5 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Coupon Code Skeleton */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="flex-1 h-10 bg-gray-100 rounded-md animate-pulse"></div>
                    <div className="w-16 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Price Breakdown Skeleton */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-12 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>

                {/* Payment Method Skeleton */}
                <div className="mt-6">
                  <div className="h-5 bg-gray-200 rounded w-28 mb-3 animate-pulse"></div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    <CreditCard className="w-4 h-4 text-gray-300" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-12 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Pay Now Button Skeleton */}
                <div className="flex justify-center mt-8">
                  <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                {/* Security Badge Skeleton */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Shield className="w-4 h-4 text-gray-300" />
                  <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="h-3 bg-gray-200 rounded w-64 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSkeleton;
