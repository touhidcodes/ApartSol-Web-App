import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Testimonial = () => {
  const testimonials = [
    {
      text: "Efficient and friendly service, guided us perfectly. Satisfied with our new flat!",
      image:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
      rating: 5,
    },
    {
      text: "Found our dream home, great business with them. Thank you for excellent service!",
      image:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
      rating: 4,
    },
    {
      text: "Nice service and well decorated. You can find your flat here...",
      image:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
      rating: 4,
    },
    // Add more testimonials as needed
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<StarIcon key={i} />);
    }
    return stars;
  };

  return (
    <Box sx={{ py: 5, background: "#FFF8F4", textAlign: "center" }}>
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Testimonials
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} gap={3} my={3}>
              <Box
                sx={{
                  border: "2px solid #ff793f",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                }}
              >
                <Stack alignItems="center" justifyContent="center">
                  <Avatar
                    alt="image"
                    src={testimonial.image}
                    sx={{ width: 100, height: 100 }}
                  />
                </Stack>
                <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                  {testimonial.text}
                </Typography>
                <Box sx={{ color: "#ff793f" }}>
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
