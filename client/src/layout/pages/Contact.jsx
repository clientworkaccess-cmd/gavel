import { Helmet } from "react-helmet";
import ContactSection from "../../components/common/ContactSection";

const Contact = () => {
  return (
    <div className="px-4">
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Contact Us | Gavel</title>
        <meta
          name="description"
          content="Get in touch with the Gavel team. Whether you have questions about our AI interview platform, pricing, or partnerships — we’re here to help."
        />
        <meta
          name="keywords"
          content="Gavel contact, AI interviews, customer support, sales inquiry, help"
        />
        <meta property="og:title" content="Contact Gavel" />
        <meta
          property="og:description"
          content="Reach out to the Gavel team for assistance with setup, demos, or custom solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gavel-frontend.vercel.app/contact" />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>

      {/* ✅ Page Section */}
      <ContactSection />
    </div>
  );
};

export default Contact;
