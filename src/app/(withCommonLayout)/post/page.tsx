"use client";
import { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
import PHFileUploader from "@/components/Forms/PHFileUploader";

// Define the validation schema
const validationSchema = z.object({
  title: z.string().nonempty("Flat title is required"),
  image: z.string().optional(),
  showImages: z.array(z.string()).optional(),
  squareFeet: z.number().nonnegative("Square feet must be a positive number"),
  totalBedrooms: z
    .number()
    .nonnegative("Total bedrooms must be a positive number"),
  totalRooms: z.number().nonnegative("Total rooms must be a positive number"),
  amenities: z.string().optional(),
  location: z.string().nonempty("Location is required"),
  description: z.string().optional(),
  rent: z.number().nonnegative("Rent must be a positive number"),
  advanceAmount: z
    .number()
    .nonnegative("Advance amount must be a positive number"),
});

const handlePost = async (values: any) => {
  console.log(values);
  // Handle form submission logic here
};

const PostFlatPage = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [showUrls, setShowUrls] = useState<string[]>([]);

  const handleImageUpload = async (files: File[]) => {
    if (files.length > 0) {
      try {
        const url = await uploadImageToImageBB(files[0]);
        setThumbnailUrl(url);
      } catch (error) {
        console.error("Error uploading thumbnail image:", error);
      }
    }
  };

  const handleShowImagesUpload = async (files: File[]) => {
    try {
      const urls = await Promise.all(
        files.map((file) => uploadImageToImageBB(file))
      );
      setShowUrls(urls);
    } catch (error) {
      console.error("Error uploading show images:", error);
    }
  };

  return (
    <Box sx={{ p: 3, background: "#FFF8F4" }}>
      <Container>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 700,
              width: "100%",
              boxShadow: 1,
              borderRadius: 2,
              p: 8,
              textAlign: "center",
              background: "#fff",
            }}
          >
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
              spacing={2}
            >
              <Typography
                variant="h3"
                fontWeight={600}
                style={{ color: "#0B1134CC", marginTop: "20px" }}
              >
                Share Your Flat
              </Typography>
              <Typography
                component="p"
                fontWeight={400}
                style={{ color: "#0B1134CC" }}
              >
                Please provide your flat information
              </Typography>
            </Stack>

            <Box m={5}>
              <PHForm
                onSubmit={handlePost}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  title: "",
                  image: thumbnailUrl,
                  squareFeet: 0,
                  totalBedrooms: 0,
                  totalRooms: 0,
                  amenities: "",
                  location: "",
                  description: "",
                  rent: 0,
                  advanceAmount: 0,
                }}
              >
                <Stack spacing={4} my={1} marginBottom={5}>
                  <PHFileUploader
                    accept="image/*"
                    uploadType="single"
                    onFileUpload={handleImageUpload}
                  />
                  {thumbnailUrl && (
                    <Typography sx={{ color: "#ff793f", fontWeight: "500" }}>
                      Image uploaded successfully!
                    </Typography>
                  )}
                  <PHInput
                    name="title"
                    label="Flat Title"
                    type="text"
                    fullWidth={true}
                  />
                  <PHInput
                    name="squareFeet"
                    label="Square Feet"
                    type="number"
                    fullWidth={true}
                  />
                  <PHInput
                    name="totalBedrooms"
                    label="Total Bedrooms"
                    type="number"
                    fullWidth={true}
                  />
                  <PHInput
                    name="totalRooms"
                    label="Total Rooms"
                    type="number"
                    fullWidth={true}
                  />
                  <PHInput
                    name="amenities"
                    label="Amenities"
                    type="text"
                    fullWidth={true}
                  />
                  <PHInput
                    name="location"
                    label="Location"
                    type="text"
                    fullWidth={true}
                  />
                  <PHInput
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth={true}
                  />
                  <PHInput
                    name="rent"
                    label="Rent"
                    type="number"
                    fullWidth={true}
                  />
                  <PHInput
                    name="advanceAmount"
                    label="Advance Amount"
                    type="number"
                    fullWidth={true}
                  />
                </Stack>

                <Button
                  sx={{
                    margin: "10px 0px",
                  }}
                  fullWidth={true}
                  type="submit"
                >
                  Submit
                </Button>
              </PHForm>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PostFlatPage;
