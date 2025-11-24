import HowItWorksSection from "@/components/common/HowItWorksSection";
import HeroSection from "../../components/common/HeroSection";
import WhyGavel from "../../components/common/WhyGavelSection";
import BuiltForSection from "@/components/common/BuiltForSection";
import ProductSection from "@/components/common/ProductSection";
import SocialProofSection from "@/components/common/SocialProofSection";
import InterviewDetailDemo from "@/components/common/DummyInterview";


const Home = () => {
  return (
    <div>
      <HeroSection />
      <WhyGavel />
      <InterviewDetailDemo />
      <HowItWorksSection />
      <BuiltForSection />
      <ProductSection />
      <SocialProofSection />
    </div>
  );
};

export default Home;

