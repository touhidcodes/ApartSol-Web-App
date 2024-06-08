"use client";

import { TFlat } from "@/types/Flats";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Divider,
  Container,
  Button,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useGetFlatByIdQuery } from "@/redux/api/flatApi";
import { useEffect, useState } from "react";
import Link from "next/link";

const placeholder =
  "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmxhdHN8ZW58MHx8MHx8fDA%3D";

type PropTypes = {
  params: {
    id: string;
  };
};

const FlatDetailCard = ({ params }: PropTypes) => {
  const { data, error, isLoading } = useGetFlatByIdQuery(params?.id);
  const [flat, setFlat] = useState<TFlat | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setFlat(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#FFF8F4",
          color: "#ff793f",
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, height: "100%", background: "#FFF8F4" }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={8} sm={12}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                p: "20px",
              }}
            >
              <Image
                src={flat?.image || placeholder}
                alt="flat image"
                width={500}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{ color: "#0B1134CC" }}
                >
                  {flat?.title}
                </Typography>
                <Typography sx={{ my: 2, color: "text.secondary" }}>
                  <span className="font-semibold text-[#0B1134CC]">
                    Flat Description:{" "}
                  </span>
                  {flat?.description}
                </Typography>
                <Typography sx={{ my: 2, color: "text.secondary" }}>
                  <span className="font-semibold text-[#0B1134CC]">
                    Amenities:{" "}
                  </span>
                  {flat?.amenities}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={4} sm={12}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                p: "10px",
                pb: "50px",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={2}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{ color: "#0B1134CC", textAlign: "center", my: 5 }}
                  >
                    {flat?.title}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "text.secondary", mt: 3 }}
                  >
                    <LocationOnIcon />
                    <Typography>
                      <span className="font-semibold text-[#0B1134CC]">
                        Location:{" "}
                      </span>
                      {flat?.location}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "text.secondary" }}
                  >
                    <SingleBedIcon />
                    <Typography>
                      <span className="font-semibold text-[#0B1134CC]">
                        Total Bedrooms:{" "}
                      </span>
                      {flat?.totalBedrooms}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "text.secondary" }}
                  >
                    <SingleBedIcon />
                    <Typography>
                      <span className="font-semibold text-[#0B1134CC]">
                        Total Rooms:{" "}
                      </span>
                      {flat?.totalRooms}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "text.secondary" }}
                  >
                    <SquareFootIcon />
                    <Typography>
                      <span className="font-semibold text-[#0B1134CC]">
                        Square Feet:{" "}
                      </span>
                      {flat?.squareFeet}
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 2 }} />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "text.secondary" }}
                  >
                    <AttachMoneyIcon />
                    <Typography>
                      <span className="font-semibold text-[#0B1134CC]">
                        Rent Amount:{" "}
                      </span>
                      {flat?.rent} per month
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "text.secondary" }}
                  >
                    <AttachMoneyIcon />
                    <Typography>
                      <span className="font-semibold text-[#0B1134CC]">
                        Advance Amount:{" "}
                      </span>
                      {flat?.advanceAmount}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Stack sx={{ alignItems: "center" }}>
                <Link href={`/booking/${flat?.id}`} passHref>
                  <Button variant="contained">Book Flat</Button>
                </Link>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FlatDetailCard;
