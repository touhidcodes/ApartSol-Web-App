import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

const PaymentFailed = () => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Failed!
        </Typography>
        <Typography variant="body1" mb={3}>
          Unfortunately, your payment could not be processed. Please try again.
        </Typography>
        <Link href="/my-bookings" passHref>
          <Button variant="contained" color="error">
            View My Bookings
          </Button>
        </Link>
        <Link href="/dashboard/my-bookings" passHref>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default PaymentFailed;
