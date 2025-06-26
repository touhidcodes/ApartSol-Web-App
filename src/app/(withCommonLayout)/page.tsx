import FlatsSection from "@/components/Custom/HomePage/FlatsSection/FlatsSection";
import HeroSection from "@/components/Custom/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/Custom/HomePage/HowItWorks/HowItWorks";
import LatestNews from "@/components/Custom/HomePage/LatestNews/LatestNews";
import Testimonial from "@/components/Custom/HomePage/Testimonial/Testimonial";
import WhyChooseUs from "@/components/Custom/HomePage/WhyChooseUs/WhyChooseUs";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <FlatsSection />
      <WhyChooseUs />
      <HowItWorks />
      <LatestNews />
      <Testimonial />
    </>
  );
};

export default Homepage;
