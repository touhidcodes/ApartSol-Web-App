"use client";

import { Box, Container, Typography } from "@mui/material";
import FlatCardTable from "@/components/Card/FlatCardTable/FlatCardTable";
import {
  useDeleteFlatMutation,
  useGetMyFlatsQuery,
  useUpdateFlatMutation,
} from "@/redux/api/flatApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Loading from "@/components/UI/Loading/Loading";

const MyPostsPage = () => {
  const { data: flats, isLoading } = useGetMyFlatsQuery({});
  const [updateFlat] = useUpdateFlatMutation();
  const [deleteFlat] = useDeleteFlatMutation();

  const handleUpdate = async (updatedFlat: FieldValues, flatId: string) => {
    try {
      const flatData = {
        ...updatedFlat,
        squareFeet: Number(updatedFlat?.squareFeet),
        totalBedrooms: Number(updatedFlat?.totalBedrooms),
        totalRooms: Number(updatedFlat?.totalRooms),
        rent: Number(updatedFlat?.rent),
        advanceAmount: Number(updatedFlat?.advanceAmount),
      };

      const res = await updateFlat({ flatId, flatData });

      if (res?.data?.id) {
        toast.success("Flat posted successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (flatId: string) => {
    try {
      const res = await deleteFlat(flatId);
      if (res?.data?.id) {
        toast.success("Flat deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete flat", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{ paddingBottom: "50px" }}>
      <Typography variant="h4" component="h1" gutterBottom my={3}>
        My Posts
      </Typography>
      <FlatCardTable
        flats={flats}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default MyPostsPage;
