"use client";

import UpdateUserProfileModal from "@/components/Modal/UpdateUserProfileModal/UpdateUserProfileModal";
import {
  useGetUserWithProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/userApi";
import { TUserWithProfile } from "@/types/User";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  styled,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 500,
  },
}));

const placeholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUOdfo4lewXJYT_2xPo_Xu2Lj6XPn78X9UJA&s";

const ProfilePage = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: profileData, isLoading } = useGetUserWithProfileQuery({});
  const [updateUser] = useUpdateUserProfileMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (updatedUser: Partial<TUserWithProfile>) => {
    try {
      const res = await updateUser(updatedUser);
      if (res?.data?.id) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

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
    <>
      <Box sx={{ background: "#FFF8F4" }}>
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
              My Profile
            </Typography>
            <Avatar
              alt="my picture"
              src={profileData?.image || placeholder}
              sx={{ width: 100, height: 100, marginTop: "50px" }}
            />

            <Grid item xs={12} md={8} my={4}>
              <Typography
                variant="h5"
                color={"secondary.main"}
                mb={2}
                marginLeft={5}
              >
                Your Information:
              </Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                gap={2}
                flexWrap={"wrap"}
                alignItems="center"
                justifyContent="center"
              >
                <StyledInformationBox>
                  <Typography color="secondary" variant="caption">
                    Username
                  </Typography>
                  <Typography>{profileData?.username}</Typography>
                </StyledInformationBox>
                <StyledInformationBox>
                  <Typography color="secondary" variant="caption">
                    Email
                  </Typography>
                  <Typography> {profileData?.email}</Typography>
                </StyledInformationBox>
                <StyledInformationBox>
                  <Typography color="secondary" variant="caption">
                    Name
                  </Typography>
                  <Typography>
                    {profileData?.name
                      ? profileData?.name
                      : "Data not provided"}
                  </Typography>
                </StyledInformationBox>
                <StyledInformationBox>
                  <Typography variant="caption" color="secondary">
                    Profession
                  </Typography>
                  <Typography>
                    {profileData?.profession
                      ? profileData?.profession
                      : "Data not provided"}
                  </Typography>
                </StyledInformationBox>
                <StyledInformationBox>
                  <Typography variant="caption" color="secondary">
                    Address
                  </Typography>
                  <Typography>
                    {profileData?.address
                      ? profileData?.address
                      : "Data not provided"}
                  </Typography>
                </StyledInformationBox>
              </Stack>
            </Grid>

            <Button
              variant="contained"
              onClick={handleOpenModal}
              disabled={isButtonDisabled}
            >
              Update Profile
            </Button>
          </Stack>
        </Container>
      </Box>
      {profileData && (
        <UpdateUserProfileModal
          open={isModalOpen}
          userProfile={profileData}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ProfilePage;
