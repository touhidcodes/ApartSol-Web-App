"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import assets from "@/assets/index";
import useUserInfo from "@/hooks/useUserInfo";
import { userLogout } from "@/services/actions/userLogout";
import { USER_ROLE } from "@/constants/role";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const userInfo = useUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    userLogout(router);
  };
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
            <Typography variant="navItem" component={Link} href="/">
              Home
            </Typography>
            <Typography variant="navItem" component={Link} href="/about">
              About Us
            </Typography>
            <Typography variant="navItem" component={Link} href="/login">
              Login
            </Typography>
            {userInfo?.userRole === USER_ROLE.ADMIN ? (
              <Typography component={Link} href="/dashboard">
                Dashboard
              </Typography>
            ) : (
              <Typography
                variant="navItem"
                component={Link}
                href="/dashboard/profile"
              >
                My Profile
              </Typography>
            )}
          </Stack>

          {userInfo?.userId ? (
            <Button onClick={handleLogOut}>Logout</Button>
          ) : (
            <Button component={Link} href="/login">
              Login
            </Button>
          )}
        </Stack>
      </Container>
    </div>
  );
};

export default Navbar;
