/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQSection = ({ pricing }) => {
  const faqs = [
    {
      question: "What counts as an interview?",
      answer:
        "Any completed AI phone conversation with a candidate counts as one interview. There's no time limit per interview.",
    },
    {
      question: "Can I change plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What happens if I exceed my interview limit?",
      answer:
        "You can purchase additional interviews as needed at a per-interview rate, or upgrade to the next tier for better value.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer:
        "Yes, you can save 20% by choosing annual billing on any of our paid plans. Contact our sales team for details.",
    },
    {
      question: "What kind of support is included?",
      answer:
        "All plans include email support. Professional plans receive priority email support, while Enterprise clients get 24/7 support and a dedicated account manager.",
    },
    {
      question: "Do you offer custom plans?",
      answer:
        "Yes, we can create custom plans for organizations with specific needs. Contact our sales team to discuss your requirements.",
    },
  ];

  const commonFaqs = [
    {
      question: "How does Gavel's AI interview technology work?",
      answer:
        "Gavel uses advanced natural language processing and voice AI to conduct phone interviews with candidates. The system asks questions, understands responses, and dynamically adapts the conversation flow. It then analyzes responses to provide insights on candidate fit.",
    },
    {
      question: "How do I set up my first AI interview?",
      answer:
        "Simply create a job position, customize questions, and upload candidate details. Gavel automatically schedules and conducts the interviews for you.",
    },
    {
      question: "Can I customize the questions for different roles?",
      answer:
        "Yes, you can fully customize interview questions or choose from our pre-built templates for various industries and roles.",
    },
    {
      question: "How secure is candidate data on your platform?",
      answer:
        "We use enterprise-grade encryption and are GDPR compliant. Candidate data is anonymized and never shared with third parties.",
    },
    {
      question: "Can Gavel integrate with my existing ATS or HRIS?",
      answer:
        "Yes, Gavel integrates with major ATS platforms like Greenhouse, Lever, and Workday. You can also use our API for custom integrations.",
    },
    {
      question: "What if candidates face technical issues?",
      answer:
        "They can use the support link in their invitation or contact our team directly. We recommend a stable internet connection for best results.",
    },
  ];

  const data = pricing ? faqs : commonFaqs;

  return (
    <section className="py-20 px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-500">
          {pricing
            ? "Find answers to common questions about our pricing plans."
            : "Everything you need to know about how Gavel works."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Card className="border border-gray-200 shadow-sm rounded-2xl bg-white/70 backdrop-blur-sm">
          <CardContent className="px-4 md:px-8">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {data.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={`faq-${index}`}
                    className="rounded-lg border border-gray-100 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium text-gray-800 px-4 py-3">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-4 pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default FAQSection;
