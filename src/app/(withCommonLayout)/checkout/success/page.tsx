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

// components/SuccessPage.tsx
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const steps = [
  { label: "Sites selected", completed: true },
  { label: "Payment received", completed: true },
  { label: "Processing report", completed: false },
];

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-white">
      {/* Left Side */}
      <div className="max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            Payment successful
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Thank you for choosing Croply. Your custom reports will be generated
            within two business days.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 border-l-2 border-gray-300 pl-4 mt-8 flex">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-4">
              <div
                className={`absolute -left-6 top-0 w-4 h-4 rounded-full ${
                  step.completed ? "bg-green-600" : "bg-gray-300"
                } border-2 border-white`}
              ></div>
              <div
                className={`flex items-center gap-2 font-medium ${
                  step.completed ? "text-green-800" : "text-gray-500"
                }`}
              >
                {step.completed && (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
                <span>{step.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <Button className="bg-green-700 hover:bg-green-800">New Site</Button>
          <Button variant="outline">Back Home</Button>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block mt-12 md:mt-0">
        <Image
          src="/success-illustration.png" // replace with actual path
          alt="Success Illustration"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
