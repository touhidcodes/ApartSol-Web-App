"use client";

import FlatCard from "@/components/Card/FlatCard/FlatsCard";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { RootState } from "@/redux/store";
import { TFlat } from "@/types/Flats";
import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FlatsPage = () => {
  const searchParams = useSelector((state: RootState) => state.flat.params);
  const [flats, setFlats] = useState<TFlat[]>([]);
  const { data, isLoading } = useGetAllFlatsQuery(searchParams);

  useEffect(() => {
    if (data) {
      setFlats(data);
    }
  }, [data]);

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
    <Box sx={{ p: 3, height: "100%", background: "#FFF8F4" }}>
      <Container>
        <Grid container spacing={4} mb={5}>
          {flats.map((flat: TFlat) => (
            <Grid item xs={12} sm={6} md={4} key={flat.id}>
              <FlatCard flat={flat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FlatsPage;
