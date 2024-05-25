"use client";

import FlatCard from "@/components/UI/Flats/FlatsCard";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { TFlat } from "@/types/Flats";
import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const FlatsPage = () => {
  const { data, error, isLoading } = useGetAllFlatsQuery({});
  const [flats, setFlats] = useState<TFlat[]>([]);

  useEffect(() => {
    if (data) {
      setFlats(data);
    }
  }, [data]);

  return (
    <Box sx={{ p: 3, height: "100%", background: "#FFF8F4" }}>
      {isLoading && (
        <div className="text-center text-xl text-[#ff5722] mt-10 h-screen">
          Your desired flats list on the way...
        </div>
      )}
      <Container>
        <Grid container spacing={4}>
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
