"use client";

import { Box, Container, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import UserCardTable from "@/components/Card/UserCardTable/UserCardTable";
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/userApi";

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
    <Container sx={{ paddingBottom: "50px" }}>
      <Typography variant="h4" component="h1" gutterBottom my={3}>
        All Users
      </Typography>
      <UserCardTable users={users} handleUpdate={handleUpdate} />
    </Container>
  );
};

export default AllUserPage;
