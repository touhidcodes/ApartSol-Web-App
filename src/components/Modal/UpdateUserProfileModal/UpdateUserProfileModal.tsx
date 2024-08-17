import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import { TFlat } from "@/types/Flats";
import PHInput from "@/components/Forms/PHInput";
import PHFileUploader from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
import { TUserWithProfile } from "@/types/User";

interface TUpdateUserProfileModalProps {
  open: boolean;
  userProfile: TUserWithProfile | null;
  onClose: () => void;
  onSave: (updatedUser: FieldValues) => void;
}

const UpdateUserProfileModal = ({
  open,
  userProfile,
  onClose,
  onSave,
}: TUpdateUserProfileModalProps) => {
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<TUserWithProfile | null>(
    userProfile
  );

  //  set user data which going to be update
  useEffect(() => {
    setUpdatedUser(userProfile);
  }, [userProfile]);

  //  pass the updated data to parent component for update
  const handleUpdateUser = async (values: FieldValues) => {
    if (profileUrl && userProfile) {
      onSave({ ...values, image: profileUrl });
    } else if (userProfile) {
      onSave(values);
    }
    onClose();
    setProfileUrl("");
  };

  //  image upload
  const handleImageUpload = async (files: File[]) => {
    if (files.length > 0) {
      setImageUploadLoading(true);
      try {
        const url = await uploadImageToImageBB(files[0]);
        setProfileUrl(url);
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
            onSubmit={handleUpdateUser}
            defaultValues={{
              email: updatedUser?.email || "",
              username: updatedUser?.username || "",
              name: updatedUser?.name || "",
              profession: updatedUser?.profession || "",
              address: updatedUser?.address || "",
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
              {profileUrl && (
                <Typography sx={{ color: "#ff793f", fontWeight: "500" }}>
                  Image uploaded successfully!
                </Typography>
              )}
              <PHInput
                name="username"
                label="Username"
                type="text"
                fullWidth={true}
              />
              <PHInput
                name="email"
                label="Email"
                type="email"
                fullWidth={true}
              />
              <PHInput name="name" label="Name" type="text" fullWidth={true} />
              <PHInput
                name="profession"
                label="Profession"
                type="text"
                fullWidth={true}
              />
              <PHInput
                name="address"
                label="Address"
                type="text"
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

export default UpdateUserProfileModal;
