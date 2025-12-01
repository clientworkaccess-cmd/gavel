import HowGavelWorks from "../modules/HowGavelWork";
import { Helmet } from "react-helmet";

const HowGavelWork = () => {
  return (
    <div>
      <Helmet>
        <title>How Gavel Works | Gavel Platform</title>
        <meta
          name="description"
          content="Learn how Gavel works for legal and hospitality clients, from signing up to managing jobs and candidates efficiently."
        />
        <meta name="keywords" content="Gavel, legal jobs, hospitality jobs, candidate management, client management" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="How Gavel Works | Gavel Platform" />
        <meta property="og:description" content="Learn how Gavel works for legal and hospitality clients, from signing up to managing jobs and candidates efficiently." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How Gavel Works | Gavel Platform" />
        <meta name="twitter:description" content="Learn how Gavel works for legal and hospitality clients, from signing up to managing jobs and candidates efficiently." />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Helmet>

      <HowGavelWorks />
    </div>
  );
};

export default HowGavelWork;
