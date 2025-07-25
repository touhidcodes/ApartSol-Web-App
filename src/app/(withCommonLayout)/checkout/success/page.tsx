// "use client";

// import React, { useEffect, useState } from "react";
// import { CheckCircle, Home, Sparkles } from "lucide-react";
// import Link from "next/link";

// const PaymentSuccessPage = () => {
//   const [showAnimation, setShowAnimation] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);

//   useEffect(() => {
//     // Trigger animations on mount
//     setTimeout(() => setShowAnimation(true), 100);
//     setTimeout(() => setShowConfetti(true), 500);
//   }, []);

//   const handleBackToHome = () => {
//     // Navigate to home page
//     console.log("Navigating to home...");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Floating Shapes */}
//         <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce"></div>
//         <div className="absolute top-20 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
//         <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-bounce delay-500"></div>
//         <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-bounce delay-1500"></div>

//         {/* Confetti Effect */}
//         {showConfetti && (
//           <div className="absolute inset-0 pointer-events-none">
//             {[...Array(15)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute w-2 h-2 bg-yellow-400 rounded animate-ping"
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 2}s`,
//                   animationDuration: `${1 + Math.random() * 2}s`,
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
//         <div className="max-w-lg w-full">
//           {/* Success Card */}
//           <div
//             className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center transform transition-all duration-1000 ${
//               showAnimation
//                 ? "scale-100 opacity-100 translate-y-0"
//                 : "scale-95 opacity-0 translate-y-10"
//             }`}
//           >
//             {/* Success Icon */}
//             <div className="relative mb-8">
//               <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
//                 <CheckCircle className="w-12 h-12 text-white animate-pulse" />
//               </div>
//               {/* Sparkle Effects */}
//               <div className="absolute -top-2 -right-2">
//                 <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
//               </div>
//               <div className="absolute -bottom-2 -left-2">
//                 <Sparkles className="w-6 h-6 text-purple-400 animate-bounce" />
//               </div>
//             </div>

//             {/* Success Message */}
//             <div className="mb-8">
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//                 Payment Successful!
//               </h1>
//               <p className="text-xl text-gray-600">
//                 🎉 Thank you! Your payment has been processed successfully.
//               </p>
//             </div>

//             {/* Back to Home Button */}
//             <Link href="/">
//               <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto">
//                 <Home className="w-5 h-5" />
//                 Back to Home
//               </button>
//             </Link>
//           </div>

//           {/* Thank You Message */}
//           <div
//             className={`text-center mt-8 transform transition-all duration-1000 delay-500 ${
//               showAnimation
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-5"
//             }`}
//           >
//             <p className="text-white text-lg font-medium bg-black bg-opacity-20 rounded-full px-6 py-3 backdrop-blur-sm">
//               Thank you for choosing us! 🙏
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccessPage;

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, PlusCircle, X } from "lucide-react";
import Link from "next/link";

const steps = [
  { label: "Sites selected", done: true },
  { label: "Payment received", done: true },
  { label: "Processing report", done: false },
];

const PaymentSuccessPage = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D3D2F] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        {/* Notification */}
        <div className="bg-[#EBF4EC] text-green-900 flex items-center justify-between px-6 py-3 rounded-t-xl text-sm font-medium">
          <span>Almost there Prasad!</span>
          <button className="hover:text-red-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Card */}
        <Card className="rounded-b-xl border-t-0">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10 px-8 md:px-12">
            {/* Left Section */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Payment successful
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for choosing Croply. Your custom Reports will be
                generated within two business days.
              </p>

              {/* Stepper */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 flex items-center justify-center text-xs rounded-full font-bold ${
                        step.done
                          ? "bg-green-600 text-white"
                          : "border border-gray-400 text-gray-400"
                      }`}
                    >
                      {step.done ? "✓" : "i"}
                    </div>
                    <span className="text-xs text-gray-600">{step.label}</span>
                    {idx !== steps.length - 1 && (
                      <div
                        className={`h-0.5 w-5 ${
                          steps[idx + 1]?.done ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link href="/new-site">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Site
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="text-green-700 border-green-700 hover:bg-green-100"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back Home
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center items-center">
              <img
                src="/success-illustration.png" // Replace with your actual image
                alt="Success Illustration"
                className={`w-64 md:w-72 transition-all duration-1000 ${
                  show ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
