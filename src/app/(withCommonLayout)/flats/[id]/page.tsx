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
import Loading from "@/components/UI/Loading/Loading";

const placeholder =
  "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";

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
    return <Loading />;
  }

  return (
    <Box sx={{ p: 3, height: "100%", background: "#EBF0F4" }} mt={8}>
      <Container>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={8}>
            <Image
              src={flat?.image || placeholder}
              alt="flat image"
              width={800}
              height={450}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 10,
              }}
            />
          </Grid>
          {/* flat information */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{ borderRadius: 2, p: 3, background: "#FFF", height: "100%" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{ color: "#0B1134CC" }}
                >
                  {flat?.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  {flat?.location}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SingleBedIcon />
                    <Typography>
                      <strong>Total Bedrooms:</strong> {flat?.totalBedrooms}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SingleBedIcon />
                    <Typography>
                      <strong>Total Rooms:</strong> {flat?.totalRooms}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SquareFootIcon />
                    <Typography>
                      <strong>Square Feet:</strong> {flat?.squareFeet}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AttachMoneyIcon />
                    <Typography>
                      <strong>Rent Amount:</strong> {flat?.rent} per month
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AttachMoneyIcon />
                    <Typography>
                      <strong>Advance Amount:</strong> {flat?.advanceAmount} BDT
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Link href={`/booking/${flat?.id}`} passHref>
                  <Button variant="contained" color="primary" fullWidth>
                    Book This Flat
                  </Button>
                </Link>
                <Button variant="outlined" color="secondary" fullWidth>
                  Send Enquiry
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Property Description */}
        <Box my={4}>
          <Card sx={{ borderRadius: 2, p: 3, background: "#FFF" }}>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body1" color="textSecondary" my={1}>
              {flat?.description}
            </Typography>
            <Typography my={1} sx={{ color: "text.secondary" }}>
              <span className="font-semibold text-[#0B1134CC]">
                Amenities:{" "}
              </span>
              {flat?.amenities}
            </Typography>
          </Card>
        </Box>
        {/* -------------------------------------- */}
      </Container>
    </Box>
  );
};

export default FlatDetailCard;
