// components/UpdateFlatModal.tsx

import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { TFlat } from "@/types/Flats";
import PHInput from "@/components/Forms/PHInput";
import PHFileUploader from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";

interface TUpdateFlatModalProps {
  open: boolean;
  flat: TFlat | null;
  onClose: () => void;
  onSave: (updatedFlat: FieldValues) => void;
}

const UpdateFlatModal = ({
  open,
  flat,
  onClose,
  onSave,
}: TUpdateFlatModalProps) => {
  const [updatedFlat, setUpdatedFlat] = useState<TFlat | null>(flat);

  useEffect(() => {
    setUpdatedFlat(flat);
  }, [flat]);

  const handleUpdate = (data: FieldValues) => {
    onSave(data);
    onClose();
  };

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [showUrls, setShowUrls] = useState<string[]>([]);

  const handleThumbnailUpload = async (files: File[]) => {
    //   if (files.length > 0) {
    //     try {
    //       const url = await uploadImageToImageBB(files[0]);
    //       setThumbnailUrl(url);
    //     } catch (error) {
    //       console.error("Error uploading thumbnail image:", error);
    //     }
    //   }
  };

  const handleShowImagesUpload = async (files: File[]) => {
    //   try {
    //     const urls = await Promise.all(
    //       files.map((file) => uploadImageToImageBB(file))
    //     );
    //     setShowUrls(urls);
    //   } catch (error) {
    //     console.error("Error uploading show images:", error);
    //   }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <Box
          m={5}
          sx={{
            maxWidth: 600,
            width: "100%",
            height: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 5,
            textAlign: "center",
            background: "#FFF8F4",
            overflowY: "auto",
          }}
        >
          <PHForm
            onSubmit={handleUpdate}
            defaultValues={{
              title: "",
              image: thumbnailUrl,
              showImages: showUrls,
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
            <Stack spacing={3} my={1}>
              <PHInput
                name="title"
                label="Flat Title"
                type="text"
                fullWidth={true}
              />
              <PHFileUploader
                label="Upload Thumbnail Image"
                accept="image/*"
                uploadType="single"
                onFileUpload={handleThumbnailUpload}
              />
              {thumbnailUrl && (
                <Typography>Thumbnail uploaded successfully!</Typography>
              )}
              <PHFileUploader
                label="Upload Show Images"
                accept="image/*"
                uploadType="multiple"
                onFileUpload={handleShowImagesUpload}
              />
              {showUrls.length > 0 && (
                <Typography>Show images uploaded successfully!</Typography>
              )}
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
      </Stack>
    </Modal>
  );
};

export default UpdateFlatModal;
