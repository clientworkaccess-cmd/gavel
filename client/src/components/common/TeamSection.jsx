import { motion } from "framer-motion";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Nick from "/assets/images/Nick.jpeg";
import Liza from "/assets/images/Liza.jpeg";

const leadershipData = [
  {
    image: Nick,
    name: "Nick Lysett",
    title: "CEO & Co-Founder",
    qoute: "“I’ve always believed in the transformative power of layering technology with staffing.”",
    description: "Nick is a veteran of the executive search and staffing industry who understands the macro challenges of workforce dynamics. Having launched and scaled multiple companies, including Evolve Workforce Solutions, Nick focuses on the strategic vision of Gavel. He ensures our AI isn't just smart, but practically useful for the high-volume demands of modern business.",
  },
  {
    image: Liza,
    name: "Liza Yakimchuk",
    title: "COO & Co-Founder",
    qoute: "“Operational excellence is about removing the friction between talent and opportunity.”",
    description: "Liza brings a decade of tenacity and operational leadership to Gavel. With a background that includes spearheading international expansions and serving high-profile administrations, she understands the rigorous standards required in top-tier hiring. Liza champions the intelligence side of the platform, ensuring our algorithms are bias-free, precise, and capable of identifying the nuance in every candidate's profile.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const LeadershipMember = ({ member, reverse = false }) => {
  const { name, title, description, image , qoute} = member;

  const textContent = (
    <motion.div
      variants={itemVariants}
      className="text-center lg:text-left"
    >
      <CardHeader className="p-0 mb-3">
        <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-2">
        <p className="text-secondary text-sm font-semibold tracking-wide uppercase">
          {title}
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {qoute}
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      </CardContent>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden shadow-lg"
    >
      <img
        src={image}
        alt={name}
        className="w-150 h-150 object-cover transition-transform duration-500 ease-in-out hover:scale-105 rounded-2xl"
      />
    </motion.div>
  );

  return (
    <div className="grid lg:grid-cols-[2fr_auto_3fr] gap-10 lg:gap-12 items-center">
      {reverse ? imageContent : textContent}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="h-0.5 w-3/4 lg:h-64 lg:w-0.5 bg-gradient-to-b from-border/10 via-border to-border/10 rounded-full mx-auto"
      />
      {reverse ? textContent : imageContent}
    </div>
  );
};

const TeamSection = () => {
  return (
    <section className="py-20 px-4 md:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
        className="text-center mb-20"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          Our Leadership
        </motion.h2>
        <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Meet the visionaries building the future of AI-powered hiring.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="space-y-20"
      >
        {leadershipData.map((member, index) => (
          <LeadershipMember key={member.name} member={member} reverse={index % 2 !== 0} />
        ))}
      </motion.div>
    </section>
  );
};

export default TeamSection;
