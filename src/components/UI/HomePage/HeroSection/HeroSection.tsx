import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import heroImage from "../../../../assets/images/hero.jpg";
import SearchBar from "../SearchBar/SearchBar";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Image
        src={heroImage}
        alt="home"
        fill
        objectFit="cover"
        quality={100}
        priority
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ textAlign: "center" }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              color: "#FFF",
              fontWeight: "600",
              fontSize: { xs: "2rem", md: "4rem" },
            }}
          >
            Find Your Perfect Flatmate
          </Typography>
          <SearchBar />
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
