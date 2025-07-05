"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, Home, Sparkles } from "lucide-react";
import Link from "next/link";

const PaymentSuccessPage = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setShowAnimation(true), 100);
    setTimeout(() => setShowConfetti(true), 500);
  }, []);

  const handleBackToHome = () => {
    // Navigate to home page
    console.log("Navigating to home...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-bounce delay-500"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-bounce delay-1500"></div>

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-lg w-full">
          {/* Success Card */}
          <div
            className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center transform transition-all duration-1000 ${
              showAnimation
                ? "scale-100 opacity-100 translate-y-0"
                : "scale-95 opacity-0 translate-y-10"
            }`}
          >
            {/* Success Icon */}
            <div className="relative mb-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-12 h-12 text-white animate-pulse" />
              </div>
              {/* Sparkle Effects */}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles className="w-6 h-6 text-purple-400 animate-bounce" />
              </div>
            </div>

            {/* Success Message */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Payment Successful!
              </h1>
              <p className="text-xl text-gray-600">
                🎉 Thank you! Your payment has been processed successfully.
              </p>
            </div>

            {/* Back to Home Button */}
            <Link href="/">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto">
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </Link>
          </div>

          {/* Thank You Message */}
          <div
            className={`text-center mt-8 transform transition-all duration-1000 delay-500 ${
              showAnimation
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <p className="text-white text-lg font-medium bg-black bg-opacity-20 rounded-full px-6 py-3 backdrop-blur-sm">
              Thank you for choosing us! 🙏
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
