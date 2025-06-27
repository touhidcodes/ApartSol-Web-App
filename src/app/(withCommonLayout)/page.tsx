import FlatsSection from "@/components/Custom/HomePage/FlatsSection/FlatsSection";
import HeroSection from "@/components/Custom/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/Custom/HomePage/HowItWorks/HowItWorks";
import LatestNews from "@/components/Custom/HomePage/LatestNews/LatestNews";
import ServiceSection from "@/components/Custom/HomePage/ServiceSection/ServiceSection";
import Testimonial from "@/components/Custom/HomePage/Testimonial/Testimonial";
import WhoWeAreSection from "@/components/Custom/HomePage/WhoWeAreSection/WhoWeAreSection";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <FlatsSection />
      <ServiceSection />
      <HowItWorks />
      <LatestNews />
      <Testimonial />
    </>
  );
};

export default Homepage;
