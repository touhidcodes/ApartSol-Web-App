"use client";

// import UpdateUserProfileModal from "@/components/Modal/UpdateUserProfileModal/UpdateUserProfileModal";
// import Loading from "@/components/UI/Loading/Loading";
// import {
//   useGetUserWithProfileQuery,
//   useUpdateUserProfileMutation,
// } from "@/redux/api/userApi";
// import { TUserWithProfile } from "@/types/User";
// import {
//   Box,
//   Button,
//   Container,
//   Stack,
//   Typography,
//   Grid,
//   styled,
//   Avatar,
// } from "@mui/material";
// import { useState } from "react";
// import { toast } from "sonner";

// const StyledInformationBox = styled(Box)(({ theme }) => ({
//   background: "#fff",
//   borderRadius: theme.spacing(1),
//   width: "45%",
//   padding: "8px 16px",
//   "& p": {
//     fontWeight: 500,
//   },
// }));

// const placeholder =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUOdfo4lewXJYT_2xPo_Xu2Lj6XPn78X9UJA&s";

// const ProfilePage = () => {
//   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const { data: profileData, isLoading } = useGetUserWithProfileQuery({});
//   const [updateUser] = useUpdateUserProfileMutation();

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleSave = async (updatedUser: Partial<TUserWithProfile>) => {
//     try {
//       const res = await updateUser(updatedUser);
//       if (res?.data?.id) {
//         toast.success("Profile updated successfully!");
//       }
//     } catch (error) {
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <Box sx={{ background: "#0B1134CC" }}>
//         <Container sx={{ paddingBottom: "50px" }}>
//           <Stack
//             sx={{
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <Typography
//               variant="h4"
//               component="h1"
//               style={{ color: "#0B1134CC", marginTop: "20px" }}
//             >
//               My Profile
//             </Typography>
//             <Avatar
//               alt="my picture"
//               src={profileData?.image || placeholder}
//               sx={{ width: 100, height: 100, marginTop: "50px" }}
//             />

//             <Grid item xs={12} md={8} my={4}>
//               <Typography
//                 variant="h5"
//                 color={"secondary.main"}
//                 mb={2}
//                 marginLeft={5}
//               >
//                 Your Information:
//               </Typography>

//               <Stack
//                 direction={{ xs: "column", md: "row" }}
//                 gap={2}
//                 flexWrap={"wrap"}
//                 alignItems="center"
//                 justifyContent="center"
//               >
//                 <StyledInformationBox>
//                   <Typography color="secondary" variant="caption">
//                     Username
//                   </Typography>
//                   <Typography>{profileData?.username}</Typography>
//                 </StyledInformationBox>
//                 <StyledInformationBox>
//                   <Typography color="secondary" variant="caption">
//                     Email
//                   </Typography>
//                   <Typography> {profileData?.email}</Typography>
//                 </StyledInformationBox>
//                 <StyledInformationBox>
//                   <Typography color="secondary" variant="caption">
//                     Name
//                   </Typography>
//                   <Typography>
//                     {profileData?.name
//                       ? profileData?.name
//                       : "Data not provided"}
//                   </Typography>
//                 </StyledInformationBox>
//                 <StyledInformationBox>
//                   <Typography variant="caption" color="secondary">
//                     Profession
//                   </Typography>
//                   <Typography>
//                     {profileData?.profession
//                       ? profileData?.profession
//                       : "Data not provided"}
//                   </Typography>
//                 </StyledInformationBox>
//                 <StyledInformationBox>
//                   <Typography variant="caption" color="secondary">
//                     Address
//                   </Typography>
//                   <Typography>
//                     {profileData?.address
//                       ? profileData?.address
//                       : "Data not provided"}
//                   </Typography>
//                 </StyledInformationBox>
//               </Stack>
//             </Grid>

//             <Button
//               variant="contained"
//               onClick={handleOpenModal}
//               disabled={isButtonDisabled}
//             >
//               Update Profile
//             </Button>
//           </Stack>
//         </Container>
//       </Box>
//       {profileData && (
//         <UpdateUserProfileModal
//           open={isModalOpen}
//           userProfile={profileData}
//           onClose={handleCloseModal}
//           onSave={handleSave}
//         />
//       )}
//     </>
//   );
// };

// export default ProfilePage;

import UpdateUserProfileModal from "@/components/Modal/UpdateUserProfileModal/UpdateUserProfileModal";
import Loading from "@/components/Custom/Loading/Loading";
import {
  useGetUserWithProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/userApi";
import { TUserWithProfile } from "@/types/User";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  styled,
  Avatar,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

const background =
  "https://images.unsplash.com/photo-1636690424408-4330adc3e583";
const placeholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUOdfo4lewXJYT_2xPo_Xu2Lj6XPn78X9UJA&s";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: theme.spacing(1),
  padding: "16px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  "& p": {
    fontWeight: 500,
  },
}));

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
    return <Loading />;
  }

  return (
    <>
      <Box>
        <Container>
          <Card
            sx={{
              maxWidth: "100%",
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              mt: 4,
              height: "300px",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={background}
              alt="Banner Image"
            />
            <CardContent
              sx={{
                textAlign: "center",
                position: "absolute",
                top: "80px",
                width: "100%",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                  <Avatar
                    alt="Profile Picture"
                    src={profileData?.image || placeholder}
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "0 auto",
                      border: "4px solid white",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ color: "#FFF", fontWeight: 600 }}
                  >
                    {profileData?.username || "User Name"}
                  </Typography>
                  <Typography variant="body2" color="#FFF" mb={2}>
                    {profileData?.profession || "Profession not provided"}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      borderRadius: "24px",
                      textTransform: "none",
                    }}
                    onClick={handleOpenModal}
                    disabled={isButtonDisabled}
                  >
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <StyledInformationBox>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#00026E",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Username
                </Typography>
                <Typography>{profileData?.username}</Typography>
              </StyledInformationBox>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledInformationBox>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#00026E",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Email
                </Typography>
                <Typography>{profileData?.email}</Typography>
              </StyledInformationBox>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledInformationBox>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#00026E",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Address
                </Typography>
                <Typography>
                  {profileData?.address || "Data not provided"}
                </Typography>
              </StyledInformationBox>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledInformationBox>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#00026E",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Profession
                </Typography>
                <Typography>
                  {profileData?.profession || "Data not provided"}
                </Typography>
              </StyledInformationBox>
            </Grid>
          </Grid>
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
