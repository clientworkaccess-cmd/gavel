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

const quickLinks = [
  {
    to: "#guides", 
    icon: Gavel,
    title: "Getting Started",
    description: "Learn the basics of setting up and using Gavel.",
  },
  {
    to: "#faq",
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

const QuickLinksHeader = () => (
  <motion.div
    className="text-center mb-14"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    variants={containerVariants}
  >
    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
      Quick Links
    </motion.h2>
    <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
      Explore key areas of our Help Center to find what you need quickly.
    </motion.p>
  </motion.div>
);

const QuickLinkCard = ({ link }) => {
  const Icon = link.icon;
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = link.to.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Link to={link.to} onClick={handleScroll} className="group block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl" aria-label={`Scroll to ${link.title}`}>
      <Card className="h-full bg-transparent backdrop-blur border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center rounded-2xl">
        <CardHeader className="flex flex-col items-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="h-7 w-7 text-primary transition-colors duration-300" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground mb-2">{link.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-sm leading-relaxed">{link.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

const QuickLinksSection = () => {
  return (
    <section className="px-6 py-20">
      <QuickLinksHeader />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {quickLinks.map((link, index) => (
          <motion.div key={index} variants={itemVariants}>
            <QuickLinkCard link={link} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default QuickLinksSection;
