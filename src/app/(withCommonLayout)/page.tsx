import GallerySection from "@/components/Pages/HomePage/GallerySection/GallerySection";
import HeroSection from "@/components/Pages/HomePage/HeroSection/HeroSection";
import LatestNews from "@/components/Pages/HomePage/LatestNews/LatestNews";
import NewsletterSection from "@/components/Pages/HomePage/NewsletterSection/NewsletterSection";
import PropertiesSection from "@/components/Pages/HomePage/PropertiesSection/PropertiesSection";
import ServiceSection from "@/components/Pages/HomePage/ServiceSection/ServiceSection";
import TestimonialSection from "@/components/Pages/HomePage/TestimonialSection/TestimonialSection";
import WhoWeAreSection from "@/components/Pages/HomePage/WhoWeAreSection/WhoWeAreSection";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <PropertiesSection />
      <ServiceSection />
      <TestimonialSection />
      <GallerySection />
      <LatestNews />
      <NewsletterSection />
    </>
  );
};

export default Homepage;
