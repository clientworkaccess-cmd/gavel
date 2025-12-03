import { FaTrophy, FaBalanceScale, FaBullseye, FaUsers, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: <FaTrophy className="h-7 w-7" />,
    title: "Excellence",
    description: "We're committed to building products that exceed expectations and deliver exceptional results for our customers.",
  },
  {
    icon: <FaBalanceScale className="h-7 w-7" />,
    title: "Fairness",
    description: "We design our technology to eliminate bias and create equal opportunities for all candidates.",
  },
  {
    icon: <FaBullseye className="h-7 w-7" />,
    title: "Innovation",
    description: "We continuously push the boundaries of what's possible with AI technology in recruitment.",
  },
  {
    icon: <FaUsers className="h-7 w-7" />,
    title: "Collaboration",
    description: "We believe in the power of teamwork and partnership to solve complex problems.",
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

const Mission = () => (
  <section className="pt-20 px-6 text-center">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-secondary mb-4">
        Our Mission
      </motion.h2>
      <motion.p variants={itemVariants} className="text-muted-foreground mb-16 text-lg max-w-4xl mx-auto">
        Empowering businesses to discover top talent through AI automation that’s intelligent, consistent, and human-friendly.
      </motion.p>
    </motion.div>
  </section>
)

const Values = () => (
  <section className="py-20 px-6 text-center ">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-secondary mb-4">
        Our Values
      </motion.h2>
      <motion.p variants={itemVariants} className="text-muted-foreground mb-16 text-lg max-w-4xl mx-auto">
        The principles that guide our work and define our company culture.
      </motion.p>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {values.map((val) => (
        <motion.div
          key={val.title}
          variants={itemVariants}
          className="flex items-start gap-5 p-6 bg-card/50 backdrop-blur border border-border/50 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-left"
        >
          <div className="bg-primary/10 text-primary p-4 rounded-full">
            {val.icon}
          </div>
          <div>
            <h3 className="font-semibold text-xl text-foreground mb-1">
              {val.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {val.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

const JoinUsCTA = () => (
  <section className="py-20 px-6">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      className="py-16 px-2 sm:px-8 rounded-3xl text-center border"
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

const ValuesSection = () => {
  return (
    <div className="">
      <Mission />
      <Values />
      <JoinUsCTA />
    </div>
  );
};

export default ValuesSection;
