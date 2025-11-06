import { Helmet } from "react-helmet";
import Home from "../modules/Home";

const Landing = () => {
  return (
    <div>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Gavel | AI-Powered Hiring Platform</title>
        <meta
          name="description"
          content="Hire smarter and faster with Gavel. Our AI interviews candidates instantly, helping recruiters shortlist top talent in minutes."
        />
        <meta
          name="keywords"
          content="AI hiring, automated interviews, recruitment platform, Gavel AI, HR tech"
        />
        <meta property="og:title" content="Gavel | AI-Powered Hiring Platform" />
        <meta
          property="og:description"
          content="Gavel automates candidate interviews using AI — saving you time and improving your hiring quality."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gavel-frontend.vercel.app/" />
        <meta property="og:image" content="/og-image.jpg" />
      </Helmet>

      {/* ✅ Page Content */}
      <Home />
    </div>
  );
};

export default Landing;
