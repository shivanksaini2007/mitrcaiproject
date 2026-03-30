import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-secondary">
    <div className="container py-20 md:py-32 flex flex-col items-center text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4"
      >
        New Season Collection
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] max-w-3xl"
      >
        Less, but better.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-5 text-base md:text-lg text-muted-foreground max-w-lg"
      >
        Thoughtfully curated products designed to elevate your everyday. Quality craftsmanship meets modern simplicity.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8"
      >
        <Button asChild size="lg" className="rounded-full px-8 gap-2 font-body">
          <Link to="/products">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
