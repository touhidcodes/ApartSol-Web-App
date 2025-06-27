import FlatsSection from "@/components/Custom/HomePage/FlatsSection/FlatsSection";
import HeroSection from "@/components/Custom/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/Custom/HomePage/HowItWorks/HowItWorks";
import LatestNews from "@/components/Custom/HomePage/LatestNews/LatestNews";
import ServiceSection from "@/components/Custom/HomePage/ServiceSection/ServiceSection";
import Testimonial from "@/components/Custom/HomePage/Testimonial/Testimonial";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <FlatsSection />
      <ServiceSection />
      <HowItWorks />
      <LatestNews />
      <Testimonial />
    </>
  );
};

export default Homepage;
