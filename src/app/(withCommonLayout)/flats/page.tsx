"use client";

import FlatCard from "@/components/Card/FlatCard/FlatsCard";
import Loading from "@/components/UI/Loading/Loading";
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
    return <Loading />;
  }

  return (
    <Box sx={{ p: 3, height: "100%", background: "#EBF0F4", mt: 10, pt: 5 }}>
      <Container>
        <Grid container spacing={4} mb={5}>
          {flats.map((flat: TFlat) => (
            <Grid item xs={12} sm={6} md={6} key={flat.id}>
              <FlatCard flat={flat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FlatsPage;
