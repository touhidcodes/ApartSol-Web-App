"use client";

import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import assets from "@/assets/index";
import useUserInfo from "@/hooks/useUserInfo";
import { USER_ROLE } from "@/constants/role";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import { useState } from "react";

const Navbar = () => {
  const userInfo = useUserInfo();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logoutUser(router);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Image
                src={assets.images.logo}
                alt="logo"
                width={50}
                height={50}
              />
            </Box>
            <Typography
              variant="h4"
              component={Link}
              href="/"
              fontWeight={600}
              px={2}
              sx={{
                color: "#0B1134CC",
                display: { xs: "none", sm: "block" },
              }}
            >
              Flat Mate Finder
            </Typography>
          </Stack>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" } }}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={4}
            sx={{
              display: { xs: menuOpen ? "flex" : "none", sm: "flex" },
              position: { xs: "absolute", sm: "relative" },
              top: { xs: 64, sm: "auto" },
              left: 0,
              right: 0,
              backgroundColor: { xs: "#FFF8F4", sm: "transparent" },
              zIndex: { xs: 1, sm: "auto" },
              padding: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="navItem" component={Link} href="/">
              Home
            </Typography>
            <Typography variant="navItem" component={Link} href="/about">
              About Us
            </Typography>
            <Typography variant="navItem" component={Link} href="/login">
              Login
            </Typography>
            {userInfo?.role === USER_ROLE.ADMIN ? (
              <Typography
                variant="navItem"
                component={Link}
                href="/dashboard/profile"
              >
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

          <Stack direction="row" spacing={2} sx={{ display: { xs: "flex" } }}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              href="/post"
            >
              Post Flat
            </Button>
            {userInfo?.userId ? (
              <Button onClick={handleLogOut}>Logout</Button>
            ) : (
              <Button component={Link} href="/login">
                Login
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default Navbar;
