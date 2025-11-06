/* eslint-disable no-unused-vars */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Nick from "/assets/images/Nick.jpeg";
import Liza from "/assets/images/Liza.jpeg";

const leadershipData = [
  {
    name: "Nick Lysett",
    title: "CEO & Co-Founder",
    description:
      "Former head of talent acquisition with 15+ years of experience leading recruitment transformations for global firms.",
    image: Nick,
  },
  {
    name: "Liza Yakimchuk",
    title: "COO & Co-Founder",
    description:
      "AI researcher and engineer specializing in natural language processing and machine learning-driven recruitment.",
    image: Liza,
  },
];

const TeamSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 970,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-secondary mb-4"
        >
          Our Leadership
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 text-lg "
        >
          Meet the visionaries building the future of AI-powered hiring.
        </motion.p>
      </div>

      <Slider {...settings}>
        {leadershipData.map((leader, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex justify-center px-2 "
          >
            <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center hover:bg-blue-50 md:items-start gap-6 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-40 h-40 rounded-xl object-cover shadow-md border border-gray-100"
              />
              <div className="flex flex-col justify-center text-center md:text-left">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-2xl font-semibold text-gray-900">
                    {leader.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                  <p className="text-secondary text-sm font-semibold tracking-wide uppercase">
                    {leader.title}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                    {leader.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default TeamSection;
