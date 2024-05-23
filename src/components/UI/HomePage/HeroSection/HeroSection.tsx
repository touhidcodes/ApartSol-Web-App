import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets/index";

const HeroSection = () => {
  return (
    <div className="bg-[#FFF8F4] pt-5 pb-20">
      <Container
        sx={{
          position: "relative",
          height: "124vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                color: "#FFF8F4",
                width: "600px",
                fontWeight: "400",
                textAlign: "center",
                marginBottom: "100px",
                fontStyle: "bold",
              }}
            >
              Get the ideal flat for your family
            </Typography>
            <Box
              sx={{
                backgroundColor: "white",
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,

                textAlign: "center",
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Find Your Perfect Flat
              </Typography>
              <TextField
                label="Search for flats"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Search
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default HeroSection;
