import { TFlat } from "@/types/Flats";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const FlatCard = ({ flat }: { flat: TFlat }) => {
  const placeholder =
    "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmxhdHN8ZW58MHx8MHx8fDA%3D";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2,
        borderRadius: "20px",
      }}
    >
      <Image
        src={flat?.image || placeholder}
        alt="flat image"
        width={500}
        height={300}
        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" fontWeight={600}>
          {flat?.title}
        </Typography>
        <Typography sx={{ my: 1, color: "text.secondary" }}>
          {flat?.description}
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ color: "text.secondary" }}
          >
            <LocationOnIcon />
            <Typography sx={{ fontWidth: 800 }}>{flat?.location}</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{ mt: "5px" }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ color: "text.secondary", fontWidth: 200, mt: 1 }}
            >
              <SingleBedIcon />
              <Typography>{flat?.totalBedrooms}</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ color: "text.secondary", fontWidth: 200, mt: 1 }}
            >
              <SquareFootIcon />
              <Typography>{flat?.squareFeet} sqft</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: "10px" }} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center">
              <AttachMoneyIcon />
              <Typography variant="h6">{flat?.rent}</Typography>
            </Stack>
            <Link href={`/flats/${flat?.id}`} passHref>
              <Button variant="contained" sx={{ mt: 2 }}>
                Details
              </Button>
            </Link>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlatCard;
