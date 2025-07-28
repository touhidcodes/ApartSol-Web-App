"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/Custom/AuthButton.tsx/AuthButton";
import { USER_ROLE } from "@/constants/role";
import Image from "next/image";
import { useUserInfo } from "@/hooks/useUserInfo";

const Navbar = () => {
  const { user, loading } = useUserInfo();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = usePathname();
  const isHomepage = currentPath === "/";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const dashboardPath =
    user?.role === USER_ROLE.ADMIN
      ? "/dashboard/admin/overview"
      : user?.role === USER_ROLE.USER
      ? "/dashboard/user/overview"
      : "/login";

  return (
    <header
      className={`top-0 left-0 w-full z-50 text-white shadow-md transition-all duration-300 overflow-hidden bg-[#1C2D37] ${
        isHomepage ? "absolute" : "fixed "
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Image
            src="/assets/images/logo/white.png"
            alt="ApartSol Logo"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
          <span className="flex flex-col leading-4">
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
          <Link href="/news" className="hover:text-gray-300">
            News
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About Us
          </Link>
          {!loading &&
            (user ? (
              <Link
                href={dashboardPath}
                className="hover:text-gray-300 capitalize"
              >
                {user?.role === USER_ROLE.ADMIN ? "Dashboard" : "My Profile"}
              </Link>
            ) : (
              <Link href="/auth?type=register" className="hover:text-gray-300">
                Register
              </Link>
            ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-transparent border-slate-600 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
          >
            <Link href="/properties/add">Add Listing</Link>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
            href="/news"
            className="block hover:text-gray-300"
            onClick={toggleMenu}
          >
            News
          </Link>
          <Link
            href="/about"
            className="block hover:text-gray-300"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          {!loading &&
            (user ? (
              <Link
                href={dashboardPath}
                className="block hover:text-gray-300 capitalize"
                onClick={toggleMenu}
              >
                {user?.role === USER_ROLE.ADMIN ? "Dashboard" : "My Profile"}
              </Link>
            ) : (
              <Link
                href="/auth?type=register"
                className="block hover:text-gray-300"
                onClick={toggleMenu}
              >
                Register
              </Link>
            ))}
          <Link
            href="/properties/add"
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
