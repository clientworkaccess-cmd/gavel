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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <section
      id="guides"
      className="py-20 scroll-mt-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Section Heading */}
      <motion.div
        className="text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Guides & Resources
        </motion.h2>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
          Explore helpful resources to make the most of your Gavel experience.
        </motion.p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {resources.map((resource, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full bg-transparent backdrop-blur border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-800 rounded-2xl hover:scale-102">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {resource.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                  {resource.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button variant="outline" className="mt-4 border-primary text-foreground hover:bg-secondary/80 transition-all duration-200">
                  {resource.buttonText}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default GuidesResourcesSection;
