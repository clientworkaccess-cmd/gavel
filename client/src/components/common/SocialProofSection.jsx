/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Star, TrendingUp, Wallet } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FaPhoneAlt } from "react-icons/fa";

const stats = [
  {
    icon: TrendingUp,
    value: "70%",
    label: "Faster to Shortlist",
  },
  {
    icon: Wallet,
    value: "60%",
    label: "Lower Recruiter Spend",
  },
  {
    icon: Star,
    value: "4.8 / 5",
    label: "Candidate Experience",
  },
];

const SocialProofSection = () => {
  return (
    <>
      <section className="py-20 px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-secondary mb-10"
        >
          Social <span className="text-blue-600">Proof</span>
        </motion.h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 bg-white shadow-md rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center items-center w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          <p className="text-xl text-gray-800 italic mb-6">
            “Gavel cut our early hiring steps from weeks to days.”
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/images/testimonial-avatar.jpg" alt="Client" />
              <AvatarFallback>GF</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-gray-900">Jordan Patel</h4>
              <p className="text-gray-600 text-sm">Managing Partner, LexPoint Legal</p>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="relative bg-linear-to-r from-secondary to-secondary/65 text-white py-20 px-6 overflow-hidden ">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.svg')] opacity-10 bg-cover"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let <span className="text-yellow-300">Gavel</span> interview for you.
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Experience AI-driven recruitment that saves time, reduces bias, and delivers top talent faster.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Primary CTA */}
            <Link to="/login">
              <Button
                size="lg"
                className="bg-white text-secondary hover:bg-gray-100 flex items-center gap-2 font-semibold"
              >
                <FaPhoneAlt /> Try the Interview
              </Button>
            </Link>

            {/* Secondary CTA */}
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-secondary hover:bg-gray-100 flex items-center gap-2 font-semibold"
              >
                Book a Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default SocialProofSection;
