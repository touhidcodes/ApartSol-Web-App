// import { TFlat } from "@/types/Flats";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Grid,
//   Stack,
//   Typography,
//   Divider,
// } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import SingleBedIcon from "@mui/icons-material/SingleBed";
// import SquareFootIcon from "@mui/icons-material/SquareFoot";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import { usePathname } from "next/navigation";

// const FlatCard = ({ flat }: { flat: TFlat }) => {
//   const pathname = usePathname();
//   const isFeatured = pathname === "/";
//   const placeholder =
//     "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";
//   return (
//     <Card
//       sx={{
//         borderRadius: "15px",
//         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         height: { xs: "auto", md: 250 },
//       }}
//     >
//       <Grid container spacing={0}>
//         {/* Image Grid */}
//         <Grid item xs={12} md={6}>
//           <Box
//             sx={{
//               position: "relative",
//               height: { xs: 200, md: "100%" },
//               width: "100%",
//               overflow: "hidden",
//             }}
//           >
//             <Image
//               src={flat?.image || placeholder}
//               alt="flat image"
//               width={500}
//               height={350}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//             {isFeatured ? (
//               <Chip
//                 label="FEATURED"
//                 color="primary"
//                 size="small"
//                 sx={{ position: "absolute", top: 10, left: 10 }}
//               />
//             ) : (
//               <Chip
//                 label={flat?.rent ? "RENT" : "BUY"}
//                 color="primary"
//                 size="small"
//                 sx={{ position: "absolute", top: 10, right: 10 }}
//               />
//             )}
//           </Box>
//         </Grid>
//         {/* Content Grid */}
//         <Grid item xs={12} md={6}>
//           <CardContent
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               height: "100%",
//               padding: { xs: 2, md: 3 },
//             }}
//           >
//             <Typography variant="h6" fontWeight={600}>
//               {flat?.title}
//             </Typography>
//             <Stack
//               direction="row"
//               alignItems="center"
//               spacing={1}
//               sx={{ color: "text.secondary", mt: 1 }}
//             >
//               <LocationOnIcon />
//               <Typography>{flat?.location}</Typography>
//             </Stack>
//             <Stack
//               direction="row"
//               alignItems="center"
//               spacing={3}
//               sx={{ mt: 1 }}
//             >
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1}
//                 sx={{ color: "text.secondary" }}
//               >
//                 <SingleBedIcon />
//                 <Typography>{flat?.totalBedrooms}</Typography>
//               </Stack>
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 sx={{ color: "text.secondary" }}
//               >
//                 <SquareFootIcon />
//                 <Typography>{flat?.squareFeet} sqft</Typography>
//               </Stack>
//             </Stack>
//             <Divider sx={{ my: 2 }} />
//             <Stack
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Stack direction="row" alignItems="center">
//                 <AttachMoneyIcon sx={{ mr: 0.5 }} />
//                 <Typography variant="h5" fontWeight={700}>
//                   {flat?.rent}
//                 </Typography>
//               </Stack>
//               <Link href={`/flats/${flat?.id}`} passHref>
//                 <Button variant="contained" size="small">
//                   Details
//                 </Button>
//               </Link>
//             </Stack>
//           </CardContent>
//         </Grid>
//       </Grid>
//     </Card>
//   );
// };

// export default FlatCard;

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
