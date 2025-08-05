"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronUp,
  MapPin,
  Mail,
  Phone,
  Github,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#1C2D37] text-white py-12 overflow-hidden">
      {/* Background SVG lines */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
          className="absolute right-0 top-0 h-full w-full"
        >
          <path
            d="M0,400 L200,200 L400,400"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0,300 L200,100 L400,300"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0,200 L200,0 L400,200"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10">
          {/* Logo and Info */}
          <div className="flex flex-col">
            {/* Logo */}
            <Link href="/">
              <div className="flex gap-2 text-2xl font-bold">
                {/* Logo */}
                <Image
                  src="/assets/images/logo/golden.png"
                  alt="ApartSol Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
                <div className="flex flex-col justify-center items-center ml-1">
                  <span className="text-white">APARTSOL</span>
                  <span className="text-xs text-gray-400 tracking-wide">
                    LIVING SOLUTIONS
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-400 mt-4 max-w-sm">
              ApartSol simplifies apartment renting and buying with verified
              listings, secure transactions, and expert support making your
              housing journey easy and stress-free.
            </p>
            <p className="flex items-center text-sm text-gray-400 mt-4">
              <MapPin className="w-4 h-4 mr-2" />
              Jashore, Bangladesh
            </p>
            <p className="flex items-center text-sm text-gray-400 mt-2">
              <Mail className="w-4 h-4 mr-2" />
              touhidcodes@gmail.com
            </p>
            <p className="flex items-center text-sm text-gray-400 mt-2">
              <Phone className="w-4 h-4 mr-2" />
              +880 1318434934
            </p>

            <div className="flex space-x-4 mt-6 text-white/80 text-xl">
              <a
                href="https://github.com/touhidcodes"
                aria-label="Twitter"
                className="hover:text-white"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/touhidcodes"
                aria-label="LinkedIn"
                className="hover:text-white"
              >
                <Linkedin />
              </a>
              <a
                href="https://instagram.com/"
                aria-label="Instagram"
                className="hover:text-white"
              >
                <Instagram />
              </a>
              <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                className="hover:text-white"
              >
                <Facebook />
              </a>
            </div>

            <div className="mt-6">
              <a
                href="#"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
              >
                <ChevronUp className="w-4 h-4 mr-2" />
                Back to Top
              </a>
            </div>
          </div>

          {/* Site Map */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Homepage
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white">
                  Contact Me
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms of Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 text-xs text-gray-500 pt-6">
          <hr className="border-white/20 mb-4" />
          &copy; {new Date().getFullYear()} APARTSOL
          <br />
          This site developed by{" "}
          <Link
            href="https://www.linkedin.com/in/touhidur-zaman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 underline"
          >
            touhidcodes
          </Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
