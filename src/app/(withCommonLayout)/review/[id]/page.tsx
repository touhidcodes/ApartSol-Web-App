"use client";

import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import Loading from "@/components/UI/Loading/Loading";
import { useGetFlatByIdQuery } from "@/redux/api/flatApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { z } from "zod";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useEffect, useState } from "react";
import { TFlat } from "@/types/Flats";
import { FieldValues } from "react-hook-form";
import PHDropdown from "@/components/Forms/PHDropdown";
import { ratingOptions } from "@/constants/formOptions";

const ReviewPage = () => {
  const params = useParams();
  const [flat, setFlat] = useState<TFlat | undefined>(undefined);
  const { data: flatData, isLoading } = useGetFlatByIdQuery(params?.id);

  useEffect(() => {
    if (flatData) {
      setFlat(flatData);
    }
  }, [flatData]);

  const reviewSchema = z.object({
    rating: z.string().min(1).max(5),
    comment: z.string().min(5, "Comment should have at least 5 characters"),
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleMakeReview = async (values: FieldValues) => {
    console.log(values);
    // try {
    //   const res = await userLogin(values);

    //   if (res?.data?.token) {
    //     toast.success(res?.message);
    //     router.push("/"), router.refresh();
    //   } else {
    //     setError(res.message);
    //     console.log(res.message);
    //   }
    // } catch (err: any) {
    //   console.error(err.message);
    // }
  };

  return (
    <Box sx={{ background: "#EBF0F4" }} mt={10}>
      <Container sx={{ paddingBottom: "50px" }}>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            style={{ color: "#0B1134CC", marginTop: "20px" }}
          >
            Make a Review of Your Desired Flat
          </Typography>
          <Typography
            component="p"
            fontWeight={400}
            style={{ color: "#0B1134CC", marginTop: "5px" }}
          >
            Always we are with you!
          </Typography>

          {/* Flat Information */}
          <Box mt={5}>
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
                    {flat && (
                      <Image
                        src={flat?.image}
                        alt="flat image"
                        width={500}
                        height={350}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
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
                      spacing={1}
                      sx={{ color: "text.secondary", mt: 1 }}
                    >
                      <SingleBedIcon />
                      <Typography>{flat?.totalBedrooms} Bedrooms</Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ color: "text.secondary", mt: 1 }}
                    >
                      <SquareFootIcon />
                      <Typography>{flat?.squareFeet} sqft</Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ color: "text.secondary", mt: 1 }}
                    >
                      <AttachMoneyIcon sx={{ mr: 0.5 }} />
                      <Typography>{flat?.rent} USD</Typography>
                    </Stack>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Box>

          {/* Review Form */}
          <Box
            sx={{
              maxWidth: 600,
              width: "100%",
              boxShadow: 1,
              borderRadius: 1,
              p: 4,
              textAlign: "center",
              background: "#FFF",
              marginTop: 5,
            }}
          >
            <PHForm
              onSubmit={handleMakeReview}
              resolver={zodResolver(reviewSchema)}
              defaultValues={{
                identifier: "",
                password: "",
              }}
            >
              <Stack spacing={3} my={1}>
                <Box
                  fontWeight={400}
                  style={{ color: "#0B1134CC", textAlign: "start" }}
                >
                  <Typography style={{ marginBottom: "10px" }}>
                    Rating (1-5)*
                  </Typography>
                  <PHDropdown
                    name="rating"
                    fullWidth={true}
                    options={ratingOptions}
                  />
                </Box>
                <Box
                  fontWeight={400}
                  style={{ color: "#0B1134CC", textAlign: "start" }}
                >
                  <Typography style={{ marginBottom: "10px" }}>
                    Comment*
                  </Typography>
                  <PHInput
                    name="comment"
                    label="Comment"
                    type="text"
                    fullWidth={true}
                  />
                </Box>
              </Stack>

              <Button
                sx={{
                  margin: "10px 0px",
                  marginTop: 3,
                }}
                fullWidth={true}
                type="submit"
              >
                Submit
              </Button>
            </PHForm>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ReviewPage;
