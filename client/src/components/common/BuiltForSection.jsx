/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Briefcase, Hotel, Scale } from "lucide-react";

const BuiltForSection = () => {
  const markets = [
    {
      icon: Scale,
      title: "Law Firms",
      description:
        "Automate screening of associates and paralegals to focus partner time on billable hours.",
    },
    {
      icon: Hotel,
      title: "Hospitality Groups",
      description:
        "Efficiently vet high-volume applicants for seasonal staff, front desk, and management positions.",
    },
    {
      icon: Briefcase,
      title: "Professional Services",
      description:
        "Streamline the hiring for consulting, finance, and accounting roles with high objectivity.",
    },
  ];

  return (
    <section className="py-20 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-secondary mb-10"
      >
        Gavel is <span className="text-blue-600">Built For</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-600 max-w-2xl mx-auto mb-14"
      >
        Gavel helps organizations streamline hiring with AI-driven automation and consistent evaluation.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {markets.map((market, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-8 bg-white shadow-md rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <market.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{market.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{market.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BuiltForSection;