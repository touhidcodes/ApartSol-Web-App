"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { toast } from "sonner";
import { useState } from "react";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import Loading from "@/components/Custom/Loading/Loading";
import { useParams } from "next/navigation";

const StyledBox = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: theme.spacing(1),
  padding: "20px 30px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  textAlign: "center",
}));

const CheckoutPage = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const { bookingId } = useParams();

  const handlePayment = async () => {
    setIsButtonDisabled(true);
    try {
      const res = await createPayment(bookingId);

      if (res?.data?.url) {
        toast.success("Redirecting to payment...");
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to initiate payment.");
        setIsButtonDisabled(false);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Payment failed, please try again.");
      setIsButtonDisabled(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ background: "#EBF0F4" }} mt={10}>
      <Container sx={{ paddingBottom: "50px" }}>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            style={{ color: "#0B1134CC", marginTop: "20px" }}
          >
            Congratulations!
          </Typography>
          <Typography
            component="p"
            fontWeight={400}
            style={{ color: "#0B1134CC", marginTop: "5px" }}
          >
            Your booking has been successful. Ready to proceed with payment?
          </Typography>

          {/* Information Box */}
          <StyledBox mt={5}>
            <Typography variant="h6">Booking Summary</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Thank you for booking! Please click the button below to complete
              your payment.
            </Typography>
            <Stack spacing={1} alignItems="center">
              <Typography
                variant="h6"
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                For Demo Use
              </Typography>

              <Typography variant="body1" sx={{ color: "#424242" }}>
                Card No:{" "}
                <span style={{ fontWeight: "bold" }}>4242 4242 4242 4242</span>
              </Typography>

              <Typography variant="body1" sx={{ color: "#424242" }}>
                CVC: <span style={{ fontWeight: "bold" }}>Any 3 digits</span>
              </Typography>

              <Typography variant="body1" sx={{ color: "#424242" }}>
                Expiry Date:{" "}
                <span style={{ fontWeight: "bold" }}>Any future date</span>
              </Typography>
            </Stack>

            <Box mt={3}>
              <Button
                variant="contained"
                onClick={handlePayment}
                disabled={isButtonDisabled}
              >
                Proceed to Payment
              </Button>
            </Box>
          </StyledBox>
        </Stack>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
