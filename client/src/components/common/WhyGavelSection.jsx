import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle, Clock, Cpu, Filter, BarChart, Database, Zap } from "lucide-react";

const features = [
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Save Time",
    description: "Automate scheduling, screen candidates 24/7, and get instant evaluation reports. Reduce manual interviews by up to 85%.",
    points: [
      "Automated interview scheduling",
      "24/7 candidate screening",
      "Instant evaluation reports",
    ],
  },
  {
    icon: <Cpu className="w-8 h-8 text-primary" />,
    title: "AI Intelligence",
    description: "Our NLP technology evaluates technical skills, communication, and culture fit with unmatched accuracy in a natural conversation flow.",
    points: [
      "Natural conversation flow",
      "Skill-based assessment",
      "Personality insights",
    ],
  },
  {
    icon: <Filter className="w-8 h-8 text-primary" />,
    title: "Reduce Bias",
    description: "Eliminate unconscious bias with standardized interviews, skills-first evaluation, and our bias-free algorithms.",
    points: [
      "Consistent candidate experience",
      "Skills-first evaluation",
      "Bias-free algorithms",
    ],
  },
  {
    icon: <Database className="w-8 h-8 text-primary" />,
    title: "Centralized Data",
    description: "All candidate information, transcriptions and evaluations are stored securely in one centralized, searchable database.",
    points: [
      "Searchable candidate database",
      "Interview transcriptions",
      "Secure cloud storage",
    ],
  },
  {
    icon: <BarChart className="w-8 h-8 text-primary" />,
    title: "Actionable Insights",
    description: "Gain deep insights into your hiring process with detailed analytics, hiring funnel metrics and customizable reports.",
    points: [
      "Hiring funnel metrics",
      "Skill gap analysis",
      "Customizable reports",
    ],
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Easy Integration",
    description: "Seamlessly integrate with your existing ATS and HRIS systems to maintain your workflow with our API connections.",
    points: [
      "API connections",
      "Data synchronization",
      "Custom workflows",
    ],
  },
];

const WhyGavelSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent">
            Why Gavel is the Smarter Choice
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hiring slows you down. Gavel automates sourcing and screening, scoring every candidate so you only speak to the best.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGavelSection;
