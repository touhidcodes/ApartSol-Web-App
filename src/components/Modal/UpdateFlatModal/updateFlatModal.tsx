import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import { TFlat } from "@/types/Flats";
import PHInput from "@/components/Forms/PHInput";
import PHFileUploader from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";

interface TUpdateFlatModalProps {
  open: boolean;
  flat: TFlat | null;
  onClose: () => void;
  onSave: (updatedFlat: FieldValues, flatId: string) => void;
}

const UpdateFlatModal = ({
  open,
  flat,
  onClose,
  onSave,
}: TUpdateFlatModalProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const [updatedFlat, setUpdatedFlat] = useState<TFlat | null>(flat);

  //  set flat data which going to be update
  useEffect(() => {
    setUpdatedFlat(flat);
  }, [flat]);

  //  pass the updated data to parent component for update
  const handleUpdatePost = async (values: FieldValues) => {
    if (thumbnailUrl && flat) {
      onSave({ ...values, image: thumbnailUrl }, flat?.id);
    } else if (flat) {
      onSave(values, flat?.id);
    }
    onClose();
    setThumbnailUrl("");
  };

  //  image upload
  const handleImageUpload = async (files: File[]) => {
    if (files.length > 0) {
      setImageUploadLoading(true);
      try {
        const url = await uploadImageToImageBB(files[0]);
        setThumbnailUrl(url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading thumbnail image:", error);
        toast.error("Please upload image again");
      } finally {
        setImageUploadLoading(false);
      }
    }
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
            background: "#EBF0F4",
            overflowY: "auto",
          }}
        >
          <PHForm
            onSubmit={handleUpdatePost}
            defaultValues={{
              title: updatedFlat?.title || "",
              squareFeet: updatedFlat?.squareFeet || "",
              totalBedrooms: updatedFlat?.totalBedrooms || "",
              totalRooms: updatedFlat?.totalRooms || "",
              amenities: updatedFlat?.amenities || "",
              location: updatedFlat?.location || "",
              description: updatedFlat?.description || "",
              rent: updatedFlat?.rent || "",
              advanceAmount: updatedFlat?.advanceAmount || "",
            }}
          >
            <Stack spacing={4} my={1} marginBottom={5}>
              <PHFileUploader
                accept="image/*"
                uploadType="single"
                onFileUpload={handleImageUpload}
              />
              {imageUploadLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "#ff793f", fontWeight: "500" }}>
                    Uploading image...
                  </Typography>
                </Box>
              )}
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
            <Stack
              direction="row"
              sx={{ alignItems: "enter", justifyContent: "space-between" }}
              spacing={5}
            >
              <Button fullWidth={true} type="submit">
                Submit
              </Button>
              <Button fullWidth={true} onClick={() => onClose()}>
                Cancel
              </Button>
            </Stack>
          </PHForm>
        </Box>
      </Stack>
    </Modal>
  );
};

export default UpdateFlatModal;
