/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GuidesResourcesSection = () => {
  const resources = [
    {
      title: "Getting Started Guide",
      description:
        "A complete walkthrough of setting up your Gavel account and conducting your first AI interview.",
      buttonText: "Read Guide",
    },
    {
      title: "Integration Tutorials",
      description:
        "Step-by-step instructions to connect Gavel with your ATS or HR systems seamlessly.",
      buttonText: "View Tutorials",
    },
    {
      title: "Best Practices",
      description:
        "Expert insights on crafting strong interview questions and interpreting candidate data.",
      buttonText: "Learn More",
    },
    {
      title: "Video Tutorials",
      description:
        "Watch short, practical videos to quickly understand how to use Gavel’s features effectively.",
      buttonText: "Watch Videos",
    },
  ];

  return (
    <section
      id="guides"
      className="py-20 scroll-mt-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Section Heading */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-secondary">
          Guides & Resources
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore helpful resources to make the most of your Gavel experience.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white border hover:bg-blue-50 border-gray-200 hover:border-secondary hover:shadow-lg transition-all duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {resource.title}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2 leading-relaxed">
                  {resource.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  variant="outline"
                  className="mt-4 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  {resource.buttonText}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GuidesResourcesSection;
