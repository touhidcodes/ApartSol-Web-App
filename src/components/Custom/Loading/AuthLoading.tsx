"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const AuthLoading = () => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-white/20 backdrop-blur-sm"
      )}
    >
      <Loader2 className="w-14 h-14 animate-spin text-gray-700" />
    </div>
  );
};

export default AuthLoading;
