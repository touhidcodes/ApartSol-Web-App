import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import assets from "@/assets/index";

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
          <Stack direction="row" alignItems="center">
            <Image src={assets.images.logo} alt="logo" width={50} height={50} />

            <Typography
              variant="h4"
              component={Link}
              href="/"
              fontWeight={600}
              px={2}
            >
              Flat Mate Finder
            </Typography>
          </Stack>

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
