/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaPhoneAlt, FaUserTie } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";

const AboutSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 w-full">
      <div className="grid lg:grid-cols-[1fr_auto_1.5fr] gap-10 items-center">
        {/* LEFT SIDE – Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-left lg:text-right"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-6 leading-tight">
            About Gavel
          </h2>
        </motion.div>

        {/* SEPARATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="h-0.5 w-3/4 lg:h-80 lg:w-0.5 bg-linear-to-r lg:bg-linear-to-b from-secondary/10 via-secondary/70 to-secondary/10 rounded-full mx-auto"
        />

        {/* RIGHT SIDE – Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-left"
        >
          <p className="text-lg text-foreground/60 leading-relaxed mb-6">
            <strong>Gavel AI </strong> was not built in a tech incubator by people who have never read a resume. It was built by industry veterans who lived the daily challenges of hiring. Nick Lysett and Liza Yakimchuk founded the platform on a shared conviction: that technology shouldn't replace the human element of hiring, it should liberate it.

          </p>

          <p className="text-lg text-foreground/60 leading-relaxed mb-8">
            After years of leading Evolve Workforce Solutions, they saw that the biggest barrier to hiring wasn't a lack of talent, but a lack of time. They built Gavel to handle the heavy lifting of sourcing and screening, allowing recruiters to get back to what they do best: building relationships
          </p>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-secondary">Our Mission</h3>
            <p className="text-foreground/60 mb-8">
              Empowering businesses to discover top talent through AI automation that’s intelligent, consistent, and human-friendly.
            </p>
          </div>
        </motion.div>
      </div>

      {/* FEATURES SECTION */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {[
          {
            icon: <FaPhoneAlt className="text-secondary text-2xl" />,
            title: "AI Phone Screening",
            desc: "Natural voice interviews that capture real insights — no scheduling required.",
          },
          {
            icon: <BsLightningChargeFill className="text-secondary text-2xl" />,
            title: "Lightning Fast",
            desc: "Screen hundreds of candidates simultaneously, cutting hiring time by over 70%.",
          },
          {
            icon: <FaUserTie className="text-secondary text-2xl" />,
            title: "Qualified Candidates",
            desc: "Receive only the top-ranked, best-fit candidates for every role you post.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl p-8 text-center border hover:scale-105 shadow-lg shadow-secondary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mx-auto mb-6">
              {card.icon}
            </div>
            <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
            <p className="text-foreground/40">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
