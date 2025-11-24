import { motion } from "framer-motion";
import { Mic, FileText, BarChart2, ListOrdered, Database, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const productFeatures = [
  {
    icon: <Mic className="w-12 h-12 text-primary" />,
    title: "Voice Interviews",
    description: "Conduct natural, AI-powered phone interviews that capture authentic candidate responses.",
  },
  {
    icon: <FileText className="w-12 h-12 text-primary" />,
    title: "Transcripts & Summaries",
    description: "Automatically generate transcripts and concise summaries for every interview, making review a breeze.",
  },
  {
    icon: <BarChart2 className="w-12 h-12 text-primary" />,
    title: "Skills & Fit Scoring",
    description: "Leverage our AI analytics to objectively evaluate candidate competencies and cultural alignment.",
  },
  {
    icon: <ListOrdered className="w-12 h-12 text-primary" />,
    title: "Ranked Shortlists",
    description: "Receive an intelligently ranked shortlist of the most qualified candidates, ready for you to engage.",
  },
  {
    icon: <Database className="w-12 h-12 text-primary" />,
    title: "ATS Synchronization",
    description: "Seamlessly sync all candidate data, reports, and statuses with your existing Applicant Tracking System.",
  },
  {
    icon: <ArrowRight className="w-12 h-12 text-primary" />,
    title: "And Much More",
    description: "From custom branding to advanced analytics, Gavel is packed with features to supercharge your hiring.",
  },
];

const ProductSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent">
            Powerful Features, Seamless Experience
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to automate candidate interviews, scoring, and reporting — all in one unified platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group text-center">
                <CardHeader className="items-center">
                  <div className="mx-auto my-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
