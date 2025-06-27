// "use client";

// import { Box, Button, Container, IconButton, Stack } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Image from "next/image";
// import Link from "next/link";
// import assets from "@/assets/index";
// import { USER_ROLE } from "@/constants/role";
// import { useEffect, useState } from "react";
// import AuthButton from "@/components/Custom/AuthButton.tsx/AuthButton";
// import ActiveLink from "@/components/Custom/ActiveLink/ActiveLink";
// import { usePathname } from "next/navigation";
// import useUserInfo from "@/hooks/useUserInfo";
// import AuthLoading from "@/components/Custom/Loading/AuthLoading";

// const Navbar = () => {
//   const user = useUserInfo();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const currentPath = usePathname();

//   useEffect(() => {
//     if (user) {
//       setIsLoading(false);
//     }
//     setIsLoading(false);
//   }, [user]);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const isHomepage = currentPath === "/";

//   if (isLoading) {
//     return <AuthLoading />;
//   }

//   return (
//     <Box
//       sx={{
//         position: isHomepage ? "absolute" : "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         zIndex: 10,
//         backgroundColor: isHomepage ? "transparent" : "#FFF",
//         boxShadow: isHomepage ? "none" : "0 2px 4px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Stack
//           py={2}
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Link href="/">
//             <Stack direction="row" alignItems="center" justifyContent="center">
//               <Box sx={{ display: { xs: "none", sm: "block" } }}>
//                 <Image
//                   src={assets.images.logo}
//                   alt="logo"
//                   width={50}
//                   height={50}
//                 />
//               </Box>
//               <Box px={2} sx={{ display: { xs: "none", sm: "block" } }}>
//                 <Image
//                   src={isHomepage ? assets.images.text : assets.images.text2}
//                   alt="logo"
//                   width={300}
//                   height={50}
//                 />
//               </Box>
//             </Stack>
//           </Link>

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
//               backgroundColor: { xs: "#EBF0F4", sm: "transparent" },
//               zIndex: { xs: 1, sm: "auto" },
//               padding: { xs: 2, sm: 0 },
//             }}
//           >
//             <ActiveLink href="/">Home</ActiveLink>
//             <ActiveLink href="/flats">Flats</ActiveLink>
//             <ActiveLink href="/about">About Us</ActiveLink>
//             {user ? (
//               <ActiveLink href="/dashboard/home">
//                 {user?.role === USER_ROLE.ADMIN ? "Dashboard" : "My Profile"}
//               </ActiveLink>
//             ) : (
//               <ActiveLink href="/register">Register</ActiveLink>
//             )}
//           </Stack>

//           <Stack direction="row" spacing={2} sx={{ display: { xs: "flex" } }}>
//             <Button
//               variant="contained"
//               color="primary"
//               component={Link}
//               href="/post"
//               className="bg-[#1C2D37]"
//             >
//               Add Listing
//             </Button>
//             <AuthButton />
//           </Stack>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default Navbar;

"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="top-0 left-0 w-full z-50 bg-[#0D1B2A] text-white shadow overflow-hidden">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <span className="flex items-center gap-2">
            <span className="text-white">REALAR</span>
            <span className="text-sm text-gray-400">LIVING SOLUTIONS</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="#" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="#" className="hover:text-gray-300">
            About Us
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Properties
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Agencies
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Blog
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Contact Us
          </Link>
        </nav>

        {/* Right side: Button & Menu Icon */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="rounded-full border-white text-white hover:bg-white hover:text-black transition"
          >
            Request a quote
          </Button>
          <Menu className="md:hidden w-6 h-6" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
