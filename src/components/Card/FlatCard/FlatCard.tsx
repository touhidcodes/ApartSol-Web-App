import { TFlat } from "@/types/Flats";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, BedSingle, Ruler, DollarSign, Star, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FlatCard = ({ flat }: { flat: TFlat }) => {
  const pathname = usePathname();
  const isFeatured = pathname === "/";
  const placeholder =
    "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";

  return (
    <Card className="rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row md:h-[250px]">
      {/* Image Section - wider and full height */}
      <div className="relative w-full md:w-10/12 h-[200px] md:h-full">
        <Image
          src={flat?.image || placeholder}
          alt="flat image"
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <div className=" flex justify-center items-center">
            {isFeatured ? (
              <Badge variant="default" className="bg-[#1C2D37] text-white">
                <Star className="w-3 h-3 mr-1" /> FEATURED
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-[#1C2D37] text-white">
                <Tag className="w-3 h-3 mr-1" /> {flat?.rent ? "RENT" : "BUY"}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="flex flex-col justify-between p-4 md:p-6 w-full">
        <div>
          <h3 className="text-lg font-semibold">{flat?.title}</h3>
          <div className="flex items-center text-muted-foreground gap-1 mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{flat?.location}</span>
          </div>
          <div className="flex items-center gap-6 mt-2 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <BedSingle className="w-4 h-4" />
              <span>{flat?.totalBedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="w-4 h-4" />
              <span>{flat?.squareFeet} sqft</span>
            </div>
          </div>
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between items-center">
          <div className="flex items-center font-bold text-lg">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{flat?.rent}</span>
          </div>
          <Link href={`/flats/${flat?.id}`}>
            <Button size="lg" className="bg-[#1C2D37]">
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlatCard;
