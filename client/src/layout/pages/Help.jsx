import { Helmet } from "react-helmet";
import FAQSection from "../../components/common/FAQSection";
import GuidesResourcesSection from "../../components/common/GuidesResourcesSection";
import HeroSection from "../../components/common/HeroSection";
import QuickLinksSection from "../../components/common/QuickLinksSection";
import SupportSection from "../../components/common/SupportSection";

const Help = () => {
  return (
    <div className="px-4">
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Help Center | Gavel</title>
        <meta
          name="description"
          content="Find answers to common questions, explore guides, or get in touch with Gavel support. We're here to help you make the most of your AI interview experience."
        />
        <meta
          name="keywords"
          content="Gavel help center, Gavel support, AI interview FAQs, guides, troubleshooting"
        />
        <meta property="og:title" content="Help Center | Gavel" />
        <meta
          property="og:description"
          content="Explore Gavel’s Help Center for FAQs, setup guides, and 24/7 support."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gavel-frontend.vercel.app/help" />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>

      <div className="container mx-auto">
      <HeroSection help />
      <QuickLinksSection />
      <FAQSection />
      <GuidesResourcesSection />
      <SupportSection />
      </div>
    </div>
  );
};

export default Help;
