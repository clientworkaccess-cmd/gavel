import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PhoneCall, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const SupportSection = () => {
  const contactMethods = [
    {
      icon: PhoneCall,
      title: "Phone Support",
      description: "Available Monday–Friday, 9am–5pm ET",
      buttonText: "+1 (888) 555-1234",
      href: "tel:+18885551234",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "We typically respond within 24 hours",
      buttonText: "support@gavelapp.com",
      href: "mailto:support@gavelapp.com",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Available 24/7 for immediate assistance",
      buttonText: "Start Chat",
      href: "/contact", // Or trigger a chat widget
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
    <section className="px-6 lg:px-8 py-20 ">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
          Still Need Help?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Our support team is always here to assist you — choose the best way to
          reach out.
        </motion.p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col bg-transparent backdrop-blur border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-800 rounded-2xl hover:scale-105">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-secondary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {method.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center grow">
                  <p className="text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-center">
                  <Button asChild variant="outline" className="border-primary text-foreground hover:bg-secondary transition-all duration-200">
                    <Link to={method.href}>{method.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default SupportSection;
