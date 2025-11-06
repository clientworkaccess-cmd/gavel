/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>404 | Page Not Found - Gavel</title>
        <meta
          name="description"
          content="Oops! The page you are looking for could not be found. Return to Gavel’s homepage to continue exploring our AI-powered hiring platform."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* ✅ Animated 404 Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center text-center text-gray-800 px-4 bg-linear-to-b from-gray-50 to-white"
      >
        {/* Icon + 404 */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex flex-col items-center"
        >
          <AlertTriangle className="w-20 h-20 text-blue-600 mb-2" />
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide">
            404
          </h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl md:text-3xl font-semibold mb-2"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-md text-gray-600 mb-6"
        >
          The page you’re looking for doesn’t exist or may have been moved.  
          Let’s get you back on track!
        </motion.p>

        {/* Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white font-semibold rounded-full shadow-md px-6 py-2 hover:bg-blue-700 transition"
          >
            Go Back Home
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFound;
