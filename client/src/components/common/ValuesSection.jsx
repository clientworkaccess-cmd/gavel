/* eslint-disable no-unused-vars */
import { FaTrophy, FaBalanceScale, FaBullseye, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Excellence",
    description:
      "We're committed to building products that exceed expectations and deliver exceptional results for our customers.",
    icon: <FaTrophy className="text-2xl" />,
  },
  {
    title: "Fairness",
    description:
      "We design our technology to eliminate bias and create equal opportunities for all candidates.",
    icon: <FaBalanceScale className="text-2xl" />,
  },
  {
    title: "Innovation",
    description:
      "We continuously push the boundaries of what's possible with AI technology in recruitment.",
    icon: <FaBullseye className="text-2xl" />,
  },
  {
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and partnership to solve complex problems.",
    icon: <FaUsers className="text-2xl" />,
  },
];

const ValuesSection = () => {
  return (
    <div className="">
      {/* Values Section */}
      <section className="py-20 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-secondary mb-4"
        >
          Our Values
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 mb-16 text-lg"
        >
          The principles that guide our work and define our company culture.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 ">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start gap-5 p-6 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-300 text-left"
            >
              <div className="bg-blue-100 text-secondary p-4 rounded-full shadow-sm">
                {val.icon}
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-1">
                  {val.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-secondary to-[#4996ed] text-white py-20 text-center px-6 shadow-inner ">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Join Us in <span className="text-blue-100">Redefining Recruitment</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 max-w-xl mx-auto text-blue-100 text-lg"
        >
          Experience how our AI-powered platform can transform your hiring process.
        </motion.p>
        <Link
          to="/contact"
          className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default ValuesSection;
