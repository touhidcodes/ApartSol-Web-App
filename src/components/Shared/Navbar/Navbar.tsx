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
import { useState } from "react";
import AuthButton from "@/components/UI/AuthButton.tsx/AuthButton";
import ActiveLink from "@/components/UI/ActiveLink/ActiveLink";

const Navbar = () => {
  const userInfo = useUserInfo();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 10,
      }}
    >
      <Container maxWidth="xl">
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
            <ActiveLink href="/">Home</ActiveLink>
            <ActiveLink href="/flats">Flats</ActiveLink>
            <ActiveLink href="/about">About Us</ActiveLink>
            {!userInfo?.userId && (
              <ActiveLink href="/register">Register</ActiveLink>
            )}
            {userInfo?.userId && (
              <ActiveLink href="/dashboard/profile">
                {userInfo.role === USER_ROLE.ADMIN ? "Dashboard" : "My Profile"}
              </ActiveLink>
            )}
          </Stack>

          <Stack direction="row" spacing={2} sx={{ display: { xs: "flex" } }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/post"
            >
              Add Listing
            </Button>
            <AuthButton />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
