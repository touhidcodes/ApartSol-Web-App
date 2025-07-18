import { TProperty } from "@/types/Property";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  BedSingle,
  DollarSign,
  Star,
  Tag,
  Bath,
  Home,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { truncateText } from "@/lib/utils";

const PropertyCard = ({ property }: { property: TProperty }) => {
  const pathname = usePathname();
  const isFeatured = pathname === "/";
  const placeholder =
    "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";

  return (
    <Card className="rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row md:h-[250px]">
      {/* Image Section */}
      <div className="relative w-full md:w-10/12 h-[200px] md:h-full">
        <Image
          src={property?.images[0] || placeholder}
          alt="flat image"
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <div className="flex justify-center items-center">
            {isFeatured ? (
              <Badge
                variant="default"
                className="bg-[#1C2D37] text-white px-2 py-1"
              >
                <Star className="w-3 h-3 mr-1" /> FEATURED
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-[#1C2D37] text-white px-2 py-1"
              >
                <Tag className="w-3 h-3 mr-1" />
                {property?.purpose === "RENT" ? "RENT" : "SALE"}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="flex flex-col justify-between p-4 md:p-6 w-full">
        <div>
          <h3 className="text-lg font-semibold">{property?.title}</h3>

          {/* Location */}
          <div className="flex items-center text-muted-foreground gap-1 mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              `{property?.city}, ${property?.country}`
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {truncateText(property?.description, 95)}
          </p>

          {/* Info Row */}
          <div className="flex items-center justify-start mt-3 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>{property?.totalRooms} rooms</span>
            </div>
            <div className="border-l h-4 mx-3" />
            <div className="flex items-center gap-1">
              <BedSingle className="w-4 h-4" />
              <span>{property?.totalBedrooms} beds</span>
            </div>
            <div className="border-l h-4 mx-3" />
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property?.totalBathrooms} baths</span>
            </div>
          </div>
        </div>

        {/* Rent & Details */}
        <div className="border-t mt-4 pt-4 flex justify-between items-center">
          <div className="flex items-center font-bold text-lg">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{property?.price}</span>
          </div>
          <Link href={`/properties/${property?.id}`}>
            <Button size="lg" className="bg-[#1C2D37] hover:bg-slate-700">
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
