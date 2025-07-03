"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  "all-user": "All Users",
  "my-profile": "My Profile",
  // Add other mappings as needed
};

export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Split, filter empty segments and remove "user" / "admin"
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment && segment !== "user" && segment !== "admin");

  const breadcrumbs = pathSegments.map((segment, index) => {
    const label =
      labelMap[segment] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return { label };
  });

  return (
    <Breadcrumb className="flex items-center space-x-1 text-black text-sm lg:text-md list-none">
      {/* Home is the only clickable link */}
      <BreadcrumbLink
        href="/"
        className="text-black no-underline hover:text-black"
      >
        Home
      </BreadcrumbLink>

      {breadcrumbs.map((crumb, idx) => (
        <span key={idx} className="flex items-center gap-1">
          <BreadcrumbSeparator className="text-black" />
          <span
            className="text-black font-normal select-none no-underline"
            aria-current={idx === breadcrumbs.length - 1 ? "page" : undefined}
          >
            {crumb.label}
          </span>
        </span>
      ))}
    </Breadcrumb>
  );
}
