/* eslint-disable no-unused-vars */
import { FaClock, FaRobot, FaBalanceScale, FaDatabase, FaChartLine, FaPlug } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaClock className="text-blue-600 text-xl" />,
    title: "Save Time",
    points: [
      "Automated interview scheduling",
      "24/7 candidate screening",
      "Instant evaluation reports",
    ],
    description:
      "Conduct hundreds of initial phone screenings simultaneously, reducing manual interviews by up to 85%.",
  },
  {
    icon: <FaRobot className="text-blue-600 text-xl" />,
    title: "AI Intelligence",
    points: [
      "Natural conversation flow",
      "Skill-based assessment",
      "Personality insights",
    ],
    description:
      "Our NLP technology evaluates technical skills, communication, and culture fit with unmatched accuracy.",
  },
  {
    icon: <FaBalanceScale className="text-blue-600 text-xl" />,
    title: "Reduce Bias",
    points: [
      "Consistent candidate experience",
      "Skills-first evaluation",
      "Bias-free algorithms",
    ],
    description:
      "Eliminate unconscious bias with standardized interviews and objective assessments.",
  },
  {
    icon: <FaDatabase className="text-blue-600 text-xl" />,
    title: "Centralized Data",
    points: [
      "Searchable candidate database",
      "Interview transcriptions",
      "Secure cloud storage",
    ],
    description:
      "All candidate information and evaluations stored securely in one centralized place.",
  },
  {
    icon: <FaChartLine className="text-blue-600 text-xl" />,
    title: "Actionable Insights",
    points: [
      "Hiring funnel metrics",
      "Skill gap analysis",
      "Customizable reports",
    ],
    description:
      "Gain deep insights into your hiring process with detailed analytics and performance reports.",
  },
  {
    icon: <FaPlug className="text-blue-600 text-xl" />,
    title: "Easy Integration",
    points: [
      "API connections",
      "Data synchronization",
      "Custom workflows",
    ],
    description:
      "Seamlessly integrate with ATS and HRIS systems to maintain your existing workflow.",
  },
];

const WhyGavel = () => {
  return (
    <section className="px-6 py-20 text-center">
      {/* Why Choose Section */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-secondary mb-4">
          WHY GAVEL?
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Hiring slows down when you rely on recruiters.
          Gavel automates sourcing and the first screening call.
          Every candidate is scored based on fit.
          You only talk to finalists.
        </p>
      </div>

      <h3 className="text-3xl font-bold text-secondary mb-4">
        WHAT YOU GET
      </h3>
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 text-left"
          >
            <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mb-4 shadow-sm">
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h4>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              {feature.points.map((point, i) => (
                <li key={i} className="font-medium text-gray-800">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyGavel;
