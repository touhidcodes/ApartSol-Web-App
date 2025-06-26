import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { testimonialsData } from "@/data/testimonials";

const Testimonial = () => {
  const testimonials = testimonialsData;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          sx={{ color: i < rating ? "#ff793f" : "#dcdcdc", fontSize: "1rem" }}
        />
      );
    }
    return stars;
  };

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 4, md: 5 },
        background: "#EBF0F4",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#00026E",
          }}
        >
          What Our Clients Say
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
        >
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#FFF",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: { xs: "15px", sm: "20px" },
                  textAlign: "center",
                  height: "100%",
                  minHeight: "300px",
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ flex: 1 }}
                >
                  <Avatar
                    alt={testimonial.name}
                    src={testimonial.image}
                    sx={{
                      width: { xs: 80, sm: 100 },
                      height: { xs: 80, sm: 100 },
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    mb: 1,
                    fontStyle: "italic",
                  }}
                >
                  {testimonial.text}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#ff793f",
                  }}
                >
                  {renderStars(testimonial.rating)}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonial;
