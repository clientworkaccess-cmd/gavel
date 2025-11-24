/* eslint-disable no-unused-vars */
import { FaPhoneAlt } from "react-icons/fa";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import StatsSection from "./StatsSection";

const HeroSection = ({ help }) => {
  return (
    <>
      {help ? (
        <section className="py-18 md:py-20 px-6 ">

          <motion.div
            className="relative z-10 text-center max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              How Can We Help?
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-foreground/40 mb-10">
              Find answers, browse articles, or connect with our friendly support team.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center max-w-xl mx-auto"
            >
              <div className="relative grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 h-5 w-5 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search for help..."
                  className="pl-10 rounded-r-none h-[50px] bg-transparent border-foreground/20 focus:ring-2 focus:ring-secondary text-foreground/40 "
                />
              </div>
              <Button
                variant="default"
                className="rounded-l-none h-[50px] bg-secondary hover:bg-secondary/90 text-foreground font-semibold shadow-md"
              >
                Search
              </Button>
            </motion.div>

            {/* Subtext */}
            <motion.p
              className="mt-6 text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Need more help?{" "}
              <a
                href="/contact"
                className="text-secondary font-medium hover:underline"
              >
                Contact our support team
              </a>{" "}
              anytime.
            </motion.p>
          </motion.div>
        </section>
      ) : (
        // ✅ Main Landing Hero
        <section className="text-center pb-10 relative overflow-hidden ">
            <div className="max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto pt-30 pb-10">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-5 px-2">
                AI HANDLES SOURCING AND <span className="text-secondary">SCREENING CANDIDATES </span>FOR YOUR OPEN ROLES.
              </h1>
              <p className="text-foreground/40 text-lg mx-auto mb-10 px-4">
                Upload a role — Gavel sources and interviews candidates, scores them,
                and delivers a ranked shortlist in minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
                <Link to="/login">
                  <Button className="flex items-center gap-2 bg-secondary text-foreground hover:bg-secondary/70 px-6 py-3 text-lg rounded-xl shadow">
                    <FaPhoneAlt className="text-foreground" /> Try the Interview
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-foreground/80 text-foreground/60 hover:bg-foreground hover:text-background px-6 py-3 text-lg rounded-xl"
                  >
                    ⚡ Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
            <StatsSection />
        </section>
      )}
    </>
  );
};

export default HeroSection;
