/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Mic, Clock, Target, Users } from "lucide-react";
import { Card } from "../ui/card";
import AnimatedCounter from "./AnimatedCounter";
import { useRef } from "react";

const StatsSection = () => {
  const statsRef = useRef(null);

  return (
    <section className="py-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center"
      >

        <motion.div 
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: Mic, end: 50000, suffix: "+", label: "Interviews Conducted" },
            { icon: Clock, end: 10000, suffix: "+", label: "Hours Saved" },
            { icon: Target, end: 95, suffix: "%", label: "Match Success Rate" },
            { icon: Users, end: 500, suffix: "+", label: "Companies Trust Us" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -10 }}
              className="relative group"
            >
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] overflow-hidden">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <stat.icon className="w-8 h-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
                </motion.div>
                <div className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={3} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
