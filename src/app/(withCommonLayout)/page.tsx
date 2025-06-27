import FlatsSection from "@/components/Custom/HomePage/FlatsSection/FlatsSection";
import GallerySection from "@/components/Custom/HomePage/GallerySection/GallerySection";
import HeroSection from "@/components/Custom/HomePage/HeroSection/HeroSection";
import LatestNews from "@/components/Custom/HomePage/LatestNews/LatestNews";
import NewsletterSection from "@/components/Custom/HomePage/NewsletterSection/NewsletterSection";
import ServiceSection from "@/components/Custom/HomePage/ServiceSection/ServiceSection";
import TestimonialSection from "@/components/Custom/HomePage/TestimonialSection/TestimonialSection";
import WhoWeAreSection from "@/components/Custom/HomePage/WhoWeAreSection/WhoWeAreSection";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <FlatsSection />
      <ServiceSection />
      <TestimonialSection />
      <GallerySection />
      <LatestNews />
      <NewsletterSection />
    </>
  );
};

export default Homepage;
