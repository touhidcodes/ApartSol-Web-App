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
