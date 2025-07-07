"use client";

import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import Loading from "@/components/Custom/Loading/Loading";
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
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useEffect, useState } from "react";
import { TProperty } from "@/types/Property";
import { FieldValues } from "react-hook-form";
import PHDropdown from "@/components/Forms/PHDropdown";
import { ratingOptions } from "@/constants/formOptions";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { toast } from "sonner";
import { useGetPropertyByIdQuery } from "@/redux/api/propertiesApi";

const ReviewPage = () => {
  const router = useRouter();
  const params = useParams();
  const [flat, setFlat] = useState<TProperty | undefined>(undefined);
  const { data: flatData, isLoading } = useGetPropertyByIdQuery(params?.id);
  const [createReview] = useCreateReviewMutation();

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
    const reviewData = { flatId: flat?.id, data: values };
    try {
      const res = await createReview(reviewData);

      if (res?.data) {
        toast.success("Review added successfully!");
        router.push(`/flats/${flat?.id}`);
      } else {
        toast.success("You have already submitted a review for this flat.");
      }
    } catch (err: any) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";
      toast(errorMessage);
    }
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
                        src={flat?.images[0]}
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
                      <Typography>{flat?.state}</Typography>
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
                      <Typography>{flat?.price} USD</Typography>
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
