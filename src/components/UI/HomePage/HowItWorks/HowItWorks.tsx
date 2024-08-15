import { Box, Container, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const HowItWorks = () => {
  const steps = [
    {
      icon: <SearchIcon fontSize="large" />,
      title: "Search",
      description: "Find the perfect flat from our verified listings.",
    },
    {
      icon: <FavoriteIcon fontSize="large" />,
      title: "Choose",
      description: "Select the flat that best suits your needs.",
    },
    {
      icon: <ContactMailIcon fontSize="large" />,
      title: "Contact",
      description: "Get in touch with the flat owner and arrange a visit.",
    },
  ];

  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#00026E" }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ textAlign: "center" }}
            >
              <Box sx={{ mb: 2 }}>{step.icon}</Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body1">{step.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
