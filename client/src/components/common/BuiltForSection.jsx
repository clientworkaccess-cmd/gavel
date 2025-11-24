import { motion } from "framer-motion";
import { Building, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const markets = [
  {
    icon: <Scale className="w-12 h-12 text-primary" />,
    title: "Law Firms",
    description: "Automate screening of associates and paralegals to focus partner time on billable hours.",
  },
  {
    icon: <Building className="w-12 h-12 text-primary" />,
    title: "Hospitality Groups",
    description: "Efficiently vet high-volume applicants for seasonal staff, front desk, and management positions.",
  },
];

const BuiltForSection = () => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent">
            Built For Your Industry
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Gavel is designed to help organizations of all sizes streamline hiring with AI-driven automation and consistent evaluation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group text-center">
                <CardHeader className="items-center">
                  <p className="mx-auto my-3">
                    {market.icon}
                  </p>
                  <CardTitle className="text-xl font-semibold text-foreground">{market.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{market.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltForSection;