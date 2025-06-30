import { Suspense } from "react";
import PropertiesPageContent from "./PropertiesPageContent";
import PropertiesPageSkeleton from "@/components/Skeleton/PropertiesPageSkeleton/PropertiesPageSkeleton";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertiesPageSkeleton />}>
      <PropertiesPageContent />
    </Suspense>
  );
}
