/* eslint-disable no-unused-vars */
import { FaPhoneAlt, FaUserTie } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const HeroSection = ({ help }) => {
  return (
    <>
      {help ? (
        <section className="py-18 md:py-20 px-6 ">

          <motion.div
            className="relative z-10 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-secondary dark:text-blue-200">
              How Can We Help?
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for help..."
                  className="pl-10 rounded-r-none h-[50px] bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-secondary"
                />
              </div>
              <Button
                variant="default"
                className="rounded-l-none h-[50px] bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-md"
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
          {/* BG Gradient */}
          <div className=" flex flex-col lg:flex-row gap-2 items-center pt-20 px-6 justify-between" >
            <div className="lg:text-left lg:max-w-4xl">
              {/* Headline */}
              <h1 className="text-3xl 2xl:text-4xl font-extrabold text-black/80 leading-tight mb-5 shrink">
                AI HANDLES SOURCING AND <span className="text-secondary">SCREENING CANDIDATES </span>FOR YOUR OPEN ROLES.
              </h1>

              {/* Sub-headline */}
              <p className="text-gray-600 text-lg mx-auto mb-10">
                Upload a role — Gavel sources and interviews candidates, scores them,
                and delivers a ranked shortlist in minutes.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row max-lg:justify-center items-center gap-4 mb-16">
                <Link to="/login">
                  <Button className="flex items-center gap-2 bg-secondary text-white hover:bg-blue-700 px-6 py-3 text-lg rounded-xl shadow">
                    <FaPhoneAlt className="text-white" /> Try the Interview
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 text-lg rounded-xl"
                  >
                    ⚡ Book a Demo
                  </Button>
                </Link>
              </div>
            </div>

            <div className="">
              <img
                src="/assets/images/hero-image.png"
                alt="Hero-image"
                className="mx-auto sm:max-w-2xl lg:max-w-xl xl:max-w-5xl object-cover lg:ml-5"
              />
            </div>

          </div>
          {/* Cards Grid */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6">
            {/* Card 1 */}
            <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl border-gray-200 hover:bg-blue-50">
              <CardHeader>
                <div className="bg-blue-100 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                  <FaPhoneAlt className="text-secondary text-2xl" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  AI Phone Screening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Natural-sounding automated interviews powered by AI voice — gather
                  real candidate insights instantly.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl border-gray-200 hover:bg-blue-50">
              <CardHeader>
                <div className="bg-yellow-100 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                  <BsLightningChargeFill className="text-yellow-500 text-2xl" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Lightning Fast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Screen hundreds of candidates simultaneously — reduce time-to-hire
                  by <span className="font-semibold text-gray-800">70%</span>.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl border-gray-200 hover:bg-blue-50">
              <CardHeader>
                <div className="bg-green-100 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                  <FaUserTie className="text-green-600 text-2xl" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Qualified Candidates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AI-powered evaluation ensures only the most qualified candidates
                  advance to your hiring team.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
