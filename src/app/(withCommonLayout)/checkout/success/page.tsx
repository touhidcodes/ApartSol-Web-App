import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

const PaymentSuccess = () => {
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
          Payment Successful!
        </Typography>
        <Typography variant="body1" mb={3}>
          Thank you for your payment. Your booking has been confirmed.
        </Typography>
        <Link href="/dashboard/my-bookings" passHref>
          <Button variant="contained" color="primary">
            View My Bookings
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;
