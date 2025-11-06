import { Helmet } from "react-helmet";
import CTASection from "../../components/common/CTASection";
import FAQSection from "../../components/common/FAQSection";
import PlainSection from "../../components/common/PlainSection";

const Pricing = () => {
  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Pricing | Gavel</title>
        <meta
          name="description"
          content="Discover Gavel’s transparent pricing plans designed for every hiring team. Pay only for what you need — AI-powered interviews, smart shortlisting, and automated screening."
        />
        <meta name="keywords" content="Gavel pricing, AI hiring, interview automation, recruitment software cost, smart hiring" />
        <meta property="og:title" content="Pricing | Gavel" />
        <meta
          property="og:description"
          content="Explore flexible pricing options for Gavel’s AI-powered interview automation platform."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gavel-frontend.vercel.app/pricing" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ✅ Page Sections */}
      <div className="">
        <PlainSection />
        <FAQSection pricing />
        <CTASection />
      </div>
    </>
  );
};

export default Pricing;
