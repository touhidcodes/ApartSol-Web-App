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

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/Custom/AuthButton.tsx/AuthButton";
import useUserInfo from "@/hooks/useUserInfo";
import { USER_ROLE } from "@/constants/role";
import AuthLoading from "@/components/Custom/Loading/AuthLoading";

const Navbar = () => {
  const user = useUserInfo();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentPath = usePathname();
  const isHomepage = currentPath === "/";

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // if (isLoading) {
  //   return <AuthLoading />;
  // }

  return (
    <header
      className={`top-0 left-0 w-full z-50 text-white shadow-md transition-all duration-300 overflow-hidden bg-[#1C2D37] ${
        isHomepage ? "absolute" : "fixed "
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="flex flex-col leading-4 items-center">
            <span className="text-white">APARTSOL</span>
            <span className="text-xs text-gray-400 tracking-wide pt-1">
              LIVING SOLUTIONS
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/properties" className="hover:text-gray-300">
            Properties
          </Link>
          <Link href="/articles" className="hover:text-gray-300">
            Articles
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About Us
          </Link>
          {user ? (
            <Link
              href="/dashboard/home"
              className="hover:text-gray-300 capitalize"
            >
              {user?.role === USER_ROLE.ADMIN ? "Dashboard" : "My Profile"}
            </Link>
          ) : (
            <Link href="/register" className="hover:text-gray-300">
              Register
            </Link>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-transparent border-slate-600 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
          >
            <Link href="/properties/add">Add Listing</Link>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <AuthButton />
          {/* Mobile menu icon */}
          <button className="md:hidden" onClick={toggleMenu}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#1C2D37] text-sm font-medium px-4 py-4 space-y-3">
          <Link
            href="/"
            className="block hover:text-gray-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="block hover:text-gray-300"
            onClick={toggleMenu}
          >
            Properties
          </Link>
          <Link
            href="/articles"
            className="block hover:text-gray-300"
            onClick={toggleMenu}
          >
            Articles
          </Link>
          <Link
            href="/about"
            className="block hover:text-gray-300"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          {user ? (
            <Link
              href="/dashboard/home"
              className="block hover:text-gray-300 capitalize"
              onClick={toggleMenu}
            >
              {user?.role === USER_ROLE.ADMIN ? "Dashboard" : "My Profile"}
            </Link>
          ) : (
            <Link
              href="/register"
              className="block hover:text-gray-300"
              onClick={toggleMenu}
            >
              Register
            </Link>
          )}
          <Link
            href="/post"
            className="block hover:text-gray-300"
            onClick={toggleMenu}
          >
            Add Listing
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
