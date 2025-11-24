import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UploadCloud, Bot, FileText, ArrowRight } from "lucide-react";
import { Card} from "../ui/card";

const steps = [
  {
    icon: <UploadCloud className="w-12 h-12 text-primary" />,
    title: "Upload a Role",
    description: "Paste a job description or define your role, and Gavel's AI will automatically configure the perfect screening questions.",
  },
  {
    icon: <Bot className="w-12 h-12 text-primary" />,
    title: "AI Conducts Interviews",
    description: "Candidates engage with our AI from their browser. It asks your questions, records responses, and analyzes every detail.",
  },
  {
    icon: <FileText className="w-12 h-12 text-primary" />,
    title: "Get Ranked Summaries",
    description: "Gavel scores every candidate for skills and culture fit, delivering a ranked shortlist with concise, actionable summaries.",
  },
];

const HowItWorksSection = () => {

  return (
    <section className="py-20 " aria-labelledby="how-it-works">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="how-it-works" className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From role creation to a ranked shortlist, Gavel automates the tedious parts of hiring so you can focus on what truly matters.
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-border/50 -translate-y-1/2"></div>
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 origin-left"></div>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/60 backdrop-blur border-border/50 text-center p-8 transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:-translate-y-2">
                  <p className="p-4 rounded-full mx-auto ">
                    {step.icon}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;