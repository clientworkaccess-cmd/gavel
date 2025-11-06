/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Mic, FileText, BarChart2, ListOrdered, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const productFeatures = [
  {
    icon: Mic,
    title: "Voice Interview",
    description:
      "Conduct natural, AI-powered phone interviews that capture authentic candidate responses.",
  },
  {
    icon: FileText,
    title: "Transcript + Summary",
    description:
      "Automatically generate transcripts and concise summaries for easy review.",
  },
  {
    icon: BarChart2,
    title: "Skills + Fit Scoring",
    description:
      "Leverage AI analytics to evaluate candidate competencies and cultural fit.",
  },
  {
    icon: ListOrdered,
    title: "Ranked List",
    description:
      "Receive an intelligently ranked shortlist of the most qualified candidates.",
  },
  {
    icon: Database,
    title: "ATS Sync",
    description:
      "Seamlessly sync all candidate data and reports with your existing ATS.",
  },
];

const ProductSection = () => {
  return (
    <section className="py-20 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-secondary mb-10"
      >
        Product <span className="text-blue-600">Features</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-600 max-w-2xl mx-auto mb-14"
      >
        Everything you need to automate candidate interviews, scoring, and
        reporting — all in one place.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="p-8 bg-white shadow-md rounded-2xl hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <feature.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16"
      >
        <Button variant="outline" size="lg" className="text-blue-600 border-blue-600">
          View Sample Report
        </Button>
      </motion.div>
    </section>
  );
};

export default ProductSection;
