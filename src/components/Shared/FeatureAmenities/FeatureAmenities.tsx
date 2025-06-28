import React from "react";
import { Check } from "lucide-react";

// Default amenities list (internal to component)
const DEFAULT_AMENITIES = [
  "24*7 Security",
  "Airconditioning",
  "Balcony",
  "Barbeque",
  "Basketball",
  "Elevator",
  "Fireplace",
  "Garage",
  "Generator",
  "Gym",
  "Indoor Game",
  "Internet",
  "Landscaping",
  "Microwave",
  "Modern Kitchen",
  "Outdoor Kitchen",
  "Parking",
  "Pool",
  "Refrigerator",
  "Swimming Pool",
  "Tennis Courts",
  "Washer",
  "WiFi",
  "Window Coverings",
] as const;

// Type definitions
interface AmenityItemProps {
  amenity: string;
  isAvailable: boolean;
}

interface FeaturesAmenitiesProps {
  availableAmenities: string[]; // Required array of available amenities
  title?: string;
}

// Type for amenity names based on the default list
type AmenityName = (typeof DEFAULT_AMENITIES)[number];

export const FeaturesAmenities: React.FC<FeaturesAmenitiesProps> = ({
  availableAmenities,
  title = "Features & amenities",
}) => {
  const availableSet = new Set<string>(
    availableAmenities.map((amenity: string) => amenity.toLowerCase())
  );

  // Separate available and unavailable amenities
  const available: string[] = [];
  const unavailable: string[] = [];

  DEFAULT_AMENITIES.forEach((amenity: string) => {
    if (availableSet.has(amenity.toLowerCase())) {
      available.push(amenity);
    } else {
      unavailable.push(amenity);
    }
  });

  // Sort both arrays alphabetically
  available.sort();
  unavailable.sort();

  // Combine with available first, then unavailable
  const sortedAmenities: string[] = [...available, ...unavailable];

  const AmenityItem: React.FC<AmenityItemProps> = ({
    amenity,
    isAvailable,
  }) => (
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
          isAvailable
            ? "bg-slate-600 border-slate-600"
            : "border-slate-400 bg-white"
        }`}
      >
        {isAvailable && <Check size={12} className="text-white" />}
      </div>
      <span
        className={`text-sm ${
          isAvailable ? "text-slate-700 font-medium" : "text-slate-500"
        }`}
      >
        {amenity}
      </span>
    </div>
  );

  return (
    <div className="bg-slate-100 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sortedAmenities.map((amenity: string, index: number) => {
          const isAvailable: boolean = availableSet.has(amenity.toLowerCase());
          return (
            <AmenityItem
              key={index}
              amenity={amenity}
              isAvailable={isAvailable}
            />
          );
        })}
      </div>

      {/* Optional: Show count summary */}
      <div className="mt-6 pt-4 border-t border-slate-300">
        <p className="text-sm text-slate-600 text-center">
          {available.length} of {DEFAULT_AMENITIES.length} amenities available
        </p>
      </div>
    </div>
  );
};

// Export types for external use
export type { FeaturesAmenitiesProps, AmenityItemProps, AmenityName };
