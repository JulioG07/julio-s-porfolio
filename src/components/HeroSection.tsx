import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { NodeNetwork } from "./NodeNetwork";

interface HeroSectionProps {
  onScrollTo: (section: string) => void;
}

export function HeroSection({ onScrollTo }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden pt-16"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── TOP: Introduction text ── */}
      <div className="relative z-10 section-container w-full pt-10 pb-2 pointer-events-none">
        <div className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto pointer-events-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm text-xs font-medium text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Open to SWE & PM Internships
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-foreground"
          >
            Julio <span className="text-gradient">Goitia</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg font-medium text-muted-foreground"
          >
            CSB Honors @ Lehigh University
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base text-muted-foreground max-w-md leading-relaxed"
          >
            Product-minded engineer building software, AI tools, and creative
            coding projects. I think in systems, design for people, and ship
            with intention.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <motion.button
              onClick={() => onScrollTo("#projects")}
              whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors duration-200"
            >
              View Projects
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              onClick={() => onScrollTo("#contact")}
              whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card/80 backdrop-blur-sm border border-border text-foreground text-sm font-semibold hover:bg-muted/60 hover:border-primary/30 transition-all duration-200"
            >
              <Mail size={16} />
              Contact
            </motion.button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex gap-10 pt-1"
          >
            {[
              { value: "4+", label: "Projects Built" },
              { value: "2029", label: "Expected Grad" },
              { value: "3.84", label: "GPA" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM: Full-width interactive node network ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="relative z-0 flex-1 w-full -mt-6"
        style={{ minHeight: "460px" }}
      >
        <NodeNetwork onNodeClick={onScrollTo} />
      </motion.div>

      {/* Bottom hint label */}
      <div className="absolute bottom-5 right-6 z-10 text-xs text-muted-foreground/40 font-mono pointer-events-none">
        click nodes to navigate
      </div>
    </section>
  );
}
