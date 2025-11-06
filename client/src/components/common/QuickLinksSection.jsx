/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Gavel, HelpCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const QuickLinksSection = () => {
  const quickLinks = [
    {
      to: "#getting-started",
      icon: Gavel,
      title: "Getting Started",
      description: "Learn the basics of setting up and using Gavel.",
    },
    {
      to: "#troubleshooting",
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Find solutions to common issues and technical problems.",
    },
    {
      to: "#guides",
      icon: FileText,
      title: "Guides & Tutorials",
      description: "Step-by-step guides to help you get the most out of Gavel.",
    },
  ];

  return (
    <section className="px-6 py-20 ">
      {/* Heading */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
          Quick Links
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore key areas of our Help Center to find what you need quickly.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {quickLinks.map((link, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              to={link.to}
              className="group block no-underline focus:outline-none"
            >
              <Card className="hover:shadow-xl border border-gray-200 hover:border-secondary transition-all duration-300 bg-white text-center rounded-2xl hover:bg-blue-50">
                <CardHeader className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-5 group-hover:bg-secondary transition-colors duration-300">
                    <link.icon className="h-7 w-7 text-secondary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                    {link.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {link.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuickLinksSection;
