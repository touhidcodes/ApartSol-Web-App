"use client";

import Image from "next/image";
import heroImage from "../../../../assets/images/hero.jpg";
import SearchBar from "../SearchBar/SearchBar";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src={heroImage}
        alt="home"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0D1B2A]/50 z-10" />

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
        <div className="text-center max-w-5xl w-full space-y-6 mx-auto">
          <h1 className="text-white font-semibold text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
            Experience The Harmonious Blend Of Luxury
          </h1>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
