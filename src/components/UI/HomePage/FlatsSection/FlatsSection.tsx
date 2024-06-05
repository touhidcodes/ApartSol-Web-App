"use client";

import FlatCard from "@/components/Card/FlatCard/FlatsCard";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { TFlat } from "@/types/Flats";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const FlatsSection = () => {
  const [flats, setFlats] = useState<TFlat[]>([]);
  const { data, isLoading } = useGetAllFlatsQuery({ limit: 6 });

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
    <Box sx={{ py: 5, background: "#FFF8F4" }}>
      <Container>
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
          Featured Flats
        </Typography>
        <Grid container spacing={4} mt={2}>
          {flats.slice(0, 6).map((flat: TFlat) => (
            <Grid item xs={12} sm={6} md={4} key={flat.id}>
              <FlatCard flat={flat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FlatsSection;
