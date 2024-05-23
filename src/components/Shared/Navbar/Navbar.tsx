import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-[#FFF8F4]">
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component={Link} href="/" fontWeight={600}>
            Flat Mate Finder
          </Typography>

          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Typography variant="navItem">Home</Typography>
            <Typography variant="navItem">About Us</Typography>
            <Typography variant="navItem">Login</Typography>
            <Typography variant="navItem">My Profile</Typography>
          </Stack>

          <Button component={Link} href="/login">
            Login
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default Navbar;
