import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets/index";
import SearchBar from "../SearchBar/SearchBar";

const HeroSection = () => {
  return (
    <div className="bg-[#FFF8F4] py-5 ">
      <Container
        sx={{
          position: "relative",
          height: { xs: "auto", md: "124vh" },
          minHeight: { xs: "80vh", md: "124vh" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: 2, md: 0 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            src={assets.images.hero}
            alt="home"
            layout="fill"
            objectFit="cover"
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          />
          <Stack
            sx={{
              position: "relative",
              zIndex: 1,
              padding: { xs: 2, md: 0 },
            }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                color: "#FFF8F4",
                width: { xs: "100%", md: "600px" },
                fontWeight: "400",
                textAlign: "center",
                marginBottom: { xs: "50px", md: "100px" },
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Get the ideal flat for your family
            </Typography>
            <SearchBar />
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default HeroSection;
