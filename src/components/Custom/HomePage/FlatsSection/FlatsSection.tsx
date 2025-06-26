"use client";

import FlatCard from "@/components/Card/FlatCard/FlatsCard";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { TFlat } from "@/types/Flats";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";

const FlatsSection = () => {
  const [flats, setFlats] = useState<TFlat[]>([]);
  const { data, isLoading } = useGetAllFlatsQuery({ limit: 6 });

  useEffect(() => {
    if (data) {
      setFlats(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ py: 5, background: "#EBF0F4" }}>
      <Container>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#00026E" }}
        >
          Featured Flats
        </Typography>
        <Grid container spacing={4} mt={2}>
          {flats.slice(0, 6).map((flat: TFlat) => (
            <Grid item xs={12} sm={6} md={6} key={flat.id}>
              <FlatCard flat={flat} />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
        >
          <Button component={Link} href="/flats">
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FlatsSection;
