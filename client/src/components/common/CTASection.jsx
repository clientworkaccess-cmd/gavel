/* eslint-disable no-unused-vars */
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20 px-6 md:px-10">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between gap-10 rounded-3xl bg-linear-to-r from-secondary to-secondary/60 text-white shadow-lg px-8 md:px-12 py-14"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-helvetica">
            Still have questions?
          </h2>
          <p className="text-white/90 text-lg max-w-lg">
            Our team is here to help you find the perfect plan for your
            organization’s hiring needs.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Link
            to="/contact"
            className="px-8 py-3 text-lg font-semibold bg-white text-[#6366f1] rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Contact Sales
          </Link>

          <button
            type="button"
            className="px-8 py-3 text-lg font-semibold bg-transparent border border-white text-white rounded-lg hover:bg-white/10 flex items-center justify-center transition duration-200"
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            Schedule a Demo
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
