import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-gradient-to-br from-secondary via-background to-secondary/50">
    {/* Subtle decorative circles */}
    <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />

    <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        New Season 2026
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.05] max-w-4xl text-balance"
      >
        Less, but <em className="text-primary">better</em>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-6 text-base md:text-lg text-muted-foreground max-w-md font-light leading-relaxed"
      >
        Thoughtfully curated products designed to elevate your everyday. Quality craftsmanship meets modern simplicity.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-10 flex items-center gap-4"
      >
        <Button asChild size="lg" className="gap-2.5 font-body text-sm tracking-wide">
          <Link to="/products">
            Shop Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant="glass" size="lg" className="font-body text-sm tracking-wide">
          <Link to="/products?cat=Fashion">
            Explore Fashion
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
