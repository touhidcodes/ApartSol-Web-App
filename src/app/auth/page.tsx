import { Suspense } from "react";
import AuthPageContent from "./AuthPageContent";
import AuthPageSkeleton from "@/components/Skeleton/AuthPageSkeleton/AuthPageSkeleton";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <AuthPageContent />
    </Suspense>
  );
}
