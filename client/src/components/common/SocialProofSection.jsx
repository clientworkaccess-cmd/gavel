import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Star, TrendingUp, Wallet } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


const stats = [
  {
    icon: <TrendingUp className="w-12 h-12 text-primary" />,
    value: "70%",
    label: "Faster to Shortlist",
  },
  {
    icon: <Wallet className="w-12 h-12 text-primary" />,
    value: "60%",
    label: "Lower Recruiter Spend",
  },
  {
    icon: <Star className="w-12 h-12 text-primary" />,
    value: "4.8 / 5",
    label: "Candidate Experience",
  },
];

const SocialProofSection = () => {

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 970,
        settings: { slidesToShow: 1 },
      },
    ],
  };

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
            Trusted by Leading Firms
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Companies that use Gavel hire faster, reduce costs, and provide a better candidate experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 bg-card/50 backdrop-blur border border-border/50 rounded-lg h-full">
                <div className="inline-block my-3">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <Slider {...settings} className="cursor-pointer space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto bg-card/70 backdrop-blur-lg border border-border/60 rounded-xl p-8 md:p-12 text-center "
          >
            <p className="text-xl md:text-2xl font-medium text-foreground italic mb-6">
              “Gavel cut our early hiring steps from weeks to days. It's an essential tool for any modern law firm.”
            </p>
            <div className="flex items-center justify-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary/50">
                <AvatarImage src="" alt="Emily Blunt" />
                <AvatarFallback>EB</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-foreground text-lg">Emily Blunt</h4>
                <p className="text-muted-foreground">Managing Partner, LexPoint Legal</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto bg-card/70 backdrop-blur-lg border border-border/60 rounded-xl p-8 md:p-12 text-center"
          >
            <p className="text-xl md:text-2xl font-medium text-foreground italic mb-6">
              “Gavel cut our early hiring steps from weeks to days. It's an essential tool for any modern law firm.”
            </p>
            <div className="flex items-center justify-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary/50">
                <AvatarImage src="" alt="Emily Blunt" />
                <AvatarFallback>EB</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-foreground text-lg">Emily Blunt</h4>
                <p className="text-muted-foreground">Managing Partner, LexPoint Legal</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto bg-card/70 backdrop-blur-lg border border-border/60 rounded-xl p-8 md:p-12 text-center"
          >
            <p className="text-xl md:text-2xl font-medium text-foreground italic mb-6">
              “Gavel cut our early hiring steps from weeks to days. It's an essential tool for any modern law firm.”
            </p>
            <div className="flex items-center justify-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary/50">
                <AvatarImage src="" alt="Emily Blunt" />
                <AvatarFallback>EB</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-foreground text-lg">Emily Blunt</h4>
                <p className="text-muted-foreground">Managing Partner, LexPoint Legal</p>
              </div>
            </div>
          </motion.div>

        </Slider>
      </div>
    </section>
  );
};

export default SocialProofSection;
