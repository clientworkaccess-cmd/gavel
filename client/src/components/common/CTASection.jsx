import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BookingModal from "./BookingModal";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

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

export const JoinUsCTA = () => (
  <section className="py-20 px-6 container mx-auto ">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      className="py-16 px-2 sm:px-8 rounded-3xl text-center border hover:bg-[#0B1138] transition-colors duration-900"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Join Us in Redefining Recruitment
      </motion.h2>
      <motion.p variants={itemVariants} className="mb-10 max-w-xl mx-auto text-primary-foreground/80 text-lg">
        Experience how our AI-powered platform can transform your hiring process.
      </motion.p>
      <motion.div variants={itemVariants}>
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/80 font-semibold text-lg px-8 py-6 rounded-xl shadow-lg transition-transform hover:scale-105">
          <Link to="/contact">
            Get Started <FaArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  </section>
);

const CTASection = () => {

  const [show, setShow] = useState(false);

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
          <Button asChild size="lg" variant="outline" onClick={() => setShow(true)} className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white font-semibold text-lg px-8 py-6 rounded-xl transition-colors">
            <p><HelpCircle className="h-5 w-5 mr-2" />
              Schedule a Demo</p>
          </Button>
        </motion.div>
      </motion.div>
      <BookingModal show={show} setShow={setShow} />
    </section>
  );
};

export default CTASection;
