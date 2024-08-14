// "use client";

// import {
//   Box,
//   Button,
//   Container,
//   IconButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Image from "next/image";
// import Link from "next/link";
// import assets from "@/assets/index";
// import useUserInfo from "@/hooks/useUserInfo";
// import { USER_ROLE } from "@/constants/role";

// import { useState } from "react";
// import AuthButton from "@/components/UI/AuthButton.tsx/AuthButton";

// const Navbar = () => {
//   const userInfo = useUserInfo();

//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <div className="bg-[#FFF8F4]">
//       <Container>
//         <Stack
//           py={2}
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Stack direction="row" alignItems="center">
//             <Box sx={{ display: { xs: "none", sm: "block" } }}>
//               <Image
//                 src={assets.images.logo}
//                 alt="logo"
//                 width={50}
//                 height={50}
//               />
//             </Box>
//             <Typography
//               variant="h4"
//               component={Link}
//               href="/"
//               fontWeight={600}
//               px={2}
//               sx={{
//                 color: "#0B1134CC",
//                 display: { xs: "none", sm: "block" },
//               }}
//             >
//               Flat Mate Finder
//             </Typography>
//           </Stack>

//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label="menu"
//             sx={{ display: { sm: "none" } }}
//             onClick={toggleMenu}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Stack
//             direction={{ xs: "column", sm: "row" }}
//             justifyContent="space-between"
//             alignItems="center"
//             gap={4}
//             sx={{
//               display: { xs: menuOpen ? "flex" : "none", sm: "flex" },
//               position: { xs: "absolute", sm: "relative" },
//               top: { xs: 64, sm: "auto" },
//               left: 0,
//               right: 0,
//               backgroundColor: { xs: "#FFF8F4", sm: "transparent" },
//               zIndex: { xs: 1, sm: "auto" },
//               padding: { xs: 2, sm: 0 },
//             }}
//           >
//             <Typography variant="navItem" component={Link} href="/">
//               Home
//             </Typography>
//             <Typography variant="navItem" component={Link} href="/flats">
//               Flats
//             </Typography>
//             <Typography variant="navItem" component={Link} href="/about">
//               About Us
//             </Typography>
//             {!userInfo?.userId && (
//               <Typography variant="navItem" component={Link} href="/register">
//                 Register
//               </Typography>
//             )}
//             {userInfo?.userId && (
//               <Typography
//                 variant="navItem"
//                 component={Link}
//                 href="/dashboard/profile"
//               >
//                 {userInfo.role === USER_ROLE.ADMIN ? "Dashboard" : "My Profile"}
//               </Typography>
//             )}
//           </Stack>

//           <Stack direction="row" spacing={2} sx={{ display: { xs: "flex" } }}>
//             <Button
//               variant="outlined"
//               color="primary"
//               component={Link}
//               href="/post"
//             >
//               Post Flat
//             </Button>
//             <AuthButton />
//           </Stack>
//         </Stack>
//       </Container>
//     </div>
//   );
// };

// export default Navbar;

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
            <Typography variant="navItem" component={Link} href="/">
              Home
            </Typography>
            <Typography variant="navItem" component={Link} href="/flats">
              Flats
            </Typography>
            <Typography variant="navItem" component={Link} href="/about">
              About Us
            </Typography>
            {!userInfo?.userId && (
              <Typography variant="navItem" component={Link} href="/register">
                Register
              </Typography>
            )}
            {userInfo?.userId && (
              <Typography
                variant="navItem"
                component={Link}
                href="/dashboard/profile"
              >
                {userInfo.role === USER_ROLE.ADMIN ? "Dashboard" : "My Profile"}
              </Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={2} sx={{ display: { xs: "flex" } }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/post"
            >
              Flat Listing
            </Button>
            <AuthButton />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
