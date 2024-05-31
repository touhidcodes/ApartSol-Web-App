"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";
import FlatCardTable from "@/components/Card/FlatCardTable/FlatCardTable";
import { useGetMyFlatsQuery } from "@/redux/api/flatApi";
import { TFlat } from "@/types/Flats";
import { FieldValues } from "react-hook-form";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { data: flats, isLoading } = useGetMyFlatsQuery({});
  console.log(flats);

  const handleUpdate = async (updatedFlat: FieldValues) => {
    console.log(updatedFlat);
    //  try {
    //    await updatePost(updatedFlat).unwrap();
    //    setFlats(
    //      flats.map((flat) => (flat.id === updatedFlat.id ? updatedFlat : flat))
    //    );
    //  } catch (error) {
    //    console.error("Failed to update flat", error);
    //  }
  };

  const handleDelete = async (flatId: string) => {
    console.log(flatId);
    //  try {
    //    await deletePost(flatId).unwrap();
    //    setFlats(flats.filter((flat) => flat.id !== flatId));
    //  } catch (error) {
    //    console.error("Failed to delete flat", error);
    //  }
  };

  //   const { data, error, isLoading } = useGetUserPostsQuery(user?.id);

  //   useEffect(() => {
  //     if (data) {
  //       setPosts(data);
  //     }
  //   }, [data]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  //   if (error) {
  //     return (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "100vh",
  //         }}
  //       >
  //         <Typography variant="h6" color="error">
  //           Failed to load posts
  //         </Typography>
  //       </Box>
  //     );
  //   }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Posts
      </Typography>
      <FlatCardTable flats={flats} handleUpdate={handleUpdate} />
    </Container>
  );
};

export default MyPostsPage;
