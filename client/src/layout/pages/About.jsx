import { Helmet } from "react-helmet";
import AboutSection from "../../components/common/AboutSection";
import TeamSection from "../../components/common/TeamSection";
import ValuesSection from "../../components/common/ValuesSection";

const About = () => {
  return (
    <div >
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>About Us | Gavel</title>
        <meta
          name="description"
          content="Learn more about Gavel — our mission, our team, and the values that drive us to make hiring smarter and faster."
        />
        <meta
          name="keywords"
          content="Gavel, hiring automation, interview platform, team, company values"
        />
        <meta property="og:title" content="About Gavel" />
        <meta
          property="og:description"
          content="Meet the team behind Gavel and discover our commitment to modern recruitment solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gavel-frontend.vercel.app/about" />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>

      {/* ✅ Page Sections */}
      <AboutSection />
      <TeamSection />
      <ValuesSection />
    </div>
  );
};

export default About;
