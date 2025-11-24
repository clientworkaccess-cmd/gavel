import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const CTASection = () => {
  return (
    <section className="py-20 px-6 md:px-10">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-10 rounded-3xl text-foreground px-8 md:px-12 py-14 border hover:scale-102 cursor-pointer transition-all duration-800"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Text Section */}
        <motion.div variants={itemVariants} className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Still have questions?
          </h2>
          <p className="text-foreground/40 text-lg max-w-lg">
            Our team is here to help you find the perfect plan for your
            organization’s hiring needs.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Button asChild size="lg" className="bg-secondary/60 text-primary hover:bg-secondary/50 font-semibold text-lg px-8 py-6 rounded-xl shadow-md transition-all duration-700 hover:scale-105">
            <Link to="/contact">Contact Sales</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white font-semibold text-lg px-8 py-6 rounded-xl transition-colors">
            <Link to="/contact">
              <HelpCircle className="h-5 w-5 mr-2" />
              Schedule a Demo
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
