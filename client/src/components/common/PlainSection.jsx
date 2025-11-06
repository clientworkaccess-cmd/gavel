/* eslint-disable no-unused-vars */
import React from "react";
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
  const showDollarSign =
    typeof price === "number" ||
    (!isNaN(Number(price)) && price !== "Free Trial" && price !== "Contact Sales");

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
    >
      <Card
        className={`relative flex flex-col h-full border rounded-2xl transition-all duration-300 ${popular
            ? "border-secondary shadow-lg scale-[1.02] bg-blue-50/30"
            : "border-gray-200 hover:shadow-md hover:bg-blue-50"
          }`}
      >
        {/* Most Popular Badge */}
        {popular && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-3 right-4"
          >
            <span className="inline-block bg-secondary text-white text-xs font-semibold py-1 px-3 rounded-full shadow-sm">
              Most Popular
            </span>
          </motion.div>
        )}

        <CardHeader className="pb-4 text-center md:text-left">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {title}
          </CardTitle>
          <div className="mt-2 mb-1 flex items-end justify-center md:justify-start">
            <span className="text-4xl font-extrabold text-gray-900">
              {showDollarSign ? `$${price}` : price}
            </span>
            {showDollarSign && (
              <span className="text-gray-500 ml-1 text-sm font-medium">
                /month
              </span>
            )}
          </div>
          <CardDescription className="text-gray-600 text-base">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="grow pt-2">
          <ul className="space-y-3">
            {features?.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <Check className="h-5 w-5 text-secondary mr-2 shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{feature}</span>
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
                  ? "bg-secondary hover:bg-blue-700 text-white"
                  : "border-secondary text-secondary hover:bg-blue-50"
                }`}
            >
              <Link to={price === "Free Trial" ? "/login" : "/contact"}>{buttonText}</Link>
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
    price: 9999,
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">Transparent Pricing Plans</h1>
        <p className="text-gray-600 mb-2 text-lg">
          Choose the perfect plan for your recruitment needs
        </p>
        <p className="text-gray-500 mb-0">
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
