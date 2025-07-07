"use client";

import React from "react";
import {
  XCircle,
  ArrowLeft,
  CreditCard,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const PaymentFailedPage: React.FC = () => {
  const handleRetryPayment = () => {
    // Handle retry payment logic
    console.log("Retrying payment...");
  };

  const handleGoBack = () => {
    // Handle navigation back
    console.log("Going back...");
  };

  const handleContactSupport = () => {
    // Handle contact support
    console.log("Contacting support...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>

          {/* Title and Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
            <p className="text-gray-600">
              We couldn&apos;t process your payment. Please check your payment
              details and try again.
            </p>
          </div>

          {/* Error Alert */}
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              Your card was declined. Please verify your payment information or
              try a different payment method.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRetryPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <button
              onClick={handleGoBack}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 "
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Link>
            </button>

            <button
              onClick={handleContactSupport}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Contact Support
            </button>
          </div>

          {/* Additional Information */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <CreditCard className="w-4 h-4" />
              <span>All major credit cards accepted</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
