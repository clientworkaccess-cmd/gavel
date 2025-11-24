import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const PricingTier = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  popular = false,
  index,
}) => {
  const isNumericPrice = typeof price === 'number';
  const linkDestination = title === "Starter" ? "/login" : "/contact";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
    >
      <Card
        className={`relative flex flex-col h-full border rounded-2xl transition-all duration-300 bg-transparent ${popular
            ? "border-secondary shadow-lg shadow-secondary/20 scale-[1.02] hover:scale-[1.04]"
            : "border-border hover:border-secondary/50 hover:shadow-md hover:scale-[1.02]"
          }`}
      >
        {/* Most Popular Badge */}
        {popular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-3 right-4"
            viewport={{ once: true }}
          >
            <span className="inline-block bg-secondary text-foreground/80 text-xs font-semibold py-1 px-3 rounded-full shadow-sm">
              Most Popular
            </span>
          </motion.div>
        )}

        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-foreground">
            {title}
          </CardTitle>
          <div className="mt-2 mb-1 flex items-baseline">
            <span className="text-4xl font-extrabold text-foreground">
              {isNumericPrice ? `$${price}` : price}
            </span>
            {isNumericPrice && (
              <span className="text-muted-foreground ml-1.5 text-sm font-medium">
                /month per seat
              </span>
            )}
          </div>
          <CardDescription className="text-muted-foreground text-base">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="grow pt-2">
          <ul className="space-y-3">
            {features?.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="mt-6">
          <motion.div whileHover={{ scale: 1.03 }}>
            <Button
              asChild
              variant={buttonVariant}
              className={`w-full font-semibold py-2.5 ${popular
                  ? "bg-secondary hover:bg-secondary/90 text-foreground"
                  : "border-secondary text-foreground hover:bg-secondary/10 bg-transparent"
                }`}
            >
              <Link to={linkDestination}>{buttonText}</Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const pricingTiers = [
  {
    title: "Starter",
    price: "Free Trial",
    description: "Perfect for trying out Gavel",
    features: [
      "Up to 5 AI phone interviews per month",
      "Basic candidate assessment",
      "Interview recordings",
      "Email support",
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline",
  },
  {
    title: "Professional",
    price: 249,
    description: "Ideal for growing teams",
    features: [
      "Up to 150 AI phone interviews per month",
      "Advanced candidate scoring",
      "Interview recordings & transcriptions",
      "Custom interview questions",
      "Priority email support",
    ],
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Contact Sales",
    description: "For high-volume recruitment",
    features: [
      "Unlimited AI phone interviews",
      "Advanced analytics dashboard",
      "Multiple ATS integrations",
      "Custom AI voice personas",
      "Team collaboration tools",
      "API access",
      "Dedicated account manager",
      "24/7 priority support",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
];

const PricingSection = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="py-20 text-center px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Transparent Pricing Plans</h1>
        <p className="text-muted-foreground mb-2 text-lg max-w-2xl mx-auto">
          Choose the perfect plan for your recruitment needs
        </p>
        <p className="text-muted-foreground/80 mb-0">
          All plans include a 14-day free trial — no credit card required
        </p>
      </motion.section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 ">
          {pricingTiers.map((tier, i) => (
            <PricingTier key={tier.title} {...tier} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingSection;
