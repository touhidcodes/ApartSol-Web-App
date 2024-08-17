"use client";

import { Box, Container, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import UserCardTable from "@/components/Card/UserCardTable/UserCardTable";
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/userApi";
import Loading from "@/components/UI/Loading/Loading";

const AllUserPage = () => {
  const { data: users, isLoading } = useGetAllUserQuery({});
  const [updateUser] = useUpdateUserStatusMutation();

  const handleUpdate = async (updatedData: FieldValues, userId: string) => {
    try {
      const res = await updateUser({ userId, updatedData });

      if (res?.data?.id) {
        toast.success("User status successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container
      sx={{
        paddingBottom: "50px",
        minHeight: "100vh",
        paddingX: { xs: "16px", sm: "24px", md: "32px" },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        my={3}
        textAlign={{ xs: "center", sm: "left" }}
      >
        All Users
      </Typography>
      <Box>
        <UserCardTable users={users} handleUpdate={handleUpdate} />
      </Box>
    </Container>
  );
};

export default AllUserPage;
