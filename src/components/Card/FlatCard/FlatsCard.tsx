import { TFlat } from "@/types/Flats";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { usePathname } from "next/navigation";

const FlatCard = ({ flat }: { flat: TFlat }) => {
  const pathname = usePathname();
  const isFeatured = pathname === "/";
  const placeholder =
    "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";
  return (
    <Card
      sx={{
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: { xs: "auto", md: 250 },
      }}
    >
      <Grid container spacing={0}>
        {/* Image Grid */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              height: { xs: 200, md: "100%" },
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Image
              src={flat?.image || placeholder}
              alt="flat image"
              width={500}
              height={350}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {isFeatured ? (
              <Chip
                label="FEATURED"
                color="primary"
                size="small"
                sx={{ position: "absolute", top: 10, left: 10 }}
              />
            ) : (
              <Chip
                label={flat?.rent ? "RENT" : "BUY"}
                color="primary"
                size="small"
                sx={{ position: "absolute", top: 10, right: 10 }}
              />
            )}
          </Box>
        </Grid>
        {/* Content Grid */}
        <Grid item xs={12} md={6}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              padding: { xs: 2, md: 3 },
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              {flat?.title}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ color: "text.secondary", mt: 1 }}
            >
              <LocationOnIcon />
              <Typography>{flat?.location}</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={3}
              sx={{ mt: 1 }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ color: "text.secondary" }}
              >
                <SingleBedIcon />
                <Typography>{flat?.totalBedrooms}</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ color: "text.secondary" }}
              >
                <SquareFootIcon />
                <Typography>{flat?.squareFeet} sqft</Typography>
              </Stack>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <AttachMoneyIcon sx={{ mr: 0.5 }} />
                <Typography variant="h5" fontWeight={700}>
                  {flat?.rent}
                </Typography>
              </Stack>
              <Link href={`/flats/${flat?.id}`} passHref>
                <Button variant="contained" size="small">
                  Details
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FlatCard;
