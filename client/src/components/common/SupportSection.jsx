/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { PhoneCall, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const SupportSection = () => {
  const contactMethods = [
    {
      icon: PhoneCall,
      title: "Phone Support",
      description: "Available Monday–Friday<br />9am–5pm ET",
      buttonText: "+1 (888) 555-1234",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "We typically respond<br />within 24 hours",
      buttonText: "support@gavelapp.com",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Available 24/7 for<br />immediate assistance",
      buttonText: "Start Chat",
    },
  ];

  return (
    <section className="px-6 lg:px-8 py-20 ">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-secondary">
          Still Need Help?
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Our support team is always here to assist you — choose the best way to
          reach out.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border border-gray-100 hover:border-secondary hover:shadow-lg hover:bg-blue-50 transition-all duration-300 rounded-2xl">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[#e9e9ff] rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-secondary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {method.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center">
                  <p
                    className="text-gray-600 mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: method.description }}
                  />
                </CardContent>

                <CardFooter className="flex justify-center">
                  <Button
                    variant="outline"
                    className="text-secondary border-secondary hover:bg-secondary hover:text-white transition-all duration-200"
                  >
                    {method.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SupportSection;
