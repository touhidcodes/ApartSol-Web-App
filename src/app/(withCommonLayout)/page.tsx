import FlatsSection from "@/components/UI/HomePage/FlatsSection/FlatsSection";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import LatestNews from "@/components/UI/HomePage/LatestNews/LatestNews";
import Testimonial from "@/components/UI/HomePage/Testimonial/Testimonial";
import WhyChooseUs from "@/components/UI/HomePage/WhyChooseUs/WhyChooseUs";

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
