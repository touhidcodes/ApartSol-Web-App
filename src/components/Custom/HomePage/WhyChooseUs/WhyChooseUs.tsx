import { Box, Container, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const WhyChooseUs = () => {
  const features = [
    "Verified Listings",
    "Affordable Prices",
    "Secure Payments",
    "24/7 Customer Support",
    "Easy to Use",
    "Community Reviews",
  ];

  return (
    <Box sx={{ py: 5, textAlign: "center" }}>
      <Container>
        <Typography variant="h4" sx={{ mb: 3, color: "#00026E" }}>
          Why Choose Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} alignItems="center">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon sx={{ color: "#ff793f", mr: 2 }} />
                <Typography variant="body1">{feature}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
