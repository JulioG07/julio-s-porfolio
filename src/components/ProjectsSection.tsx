import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Inbox, Calculator, DollarSign, ArrowRight } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import eventoAiImg from "@/assets/evento-ai.jpeg";

const projects = [
  {
    title: "Evento-AI",
    description:
      "Serverless AI app that converts GroupMe messages into Google Calendar events using Gemini AI + AWS Lambda. Built at Lehigh Valley Hackathon in 24 hours.",
    tech: ["Python", "AWS Lambda", "Gemini AI", "Google Calendar API"],
    icon: Zap,
    color: "primary",
    tag: "🏆 Hackathon",
    image: eventoAiImg,
  },
  {
    title: "IoT Mailbox Sensor",
    description:
      "Arduino-based mailbox sensor using C++, circuits, and embedded sensors. Integrated IoT cloud connectivity to display real-time mailbox status on a digital dashboard.",
    tech: ["C++", "Arduino", "IoT", "Cloud"],
    icon: Inbox,
    color: "secondary",
    tag: "🔧 Hardware",
    image: null,
  },
  {
    title: "GPA Calculator",
    description:
      "Python-based GPA calculator built during Synchrony Skills Academy, tracking cumulative GPA and grade scenarios with a clean, intuitive interface.",
    tech: ["Python", "HTML/CSS", "JavaScript"],
    icon: Calculator,
    color: "primary",
    tag: "📊 Utility",
    image: null,
  },
  {
    title: "Expense Tracker",
    description:
      "Full-featured personal finance tracker with categorized spending, monthly summaries, and visual breakdowns — built during Synchrony Skills Academy.",
    tech: ["React", "TypeScript", "Firebase", "JavaScript"],
    icon: DollarSign,
    color: "secondary",
    tag: "💰 FinTech",
    image: null,
  },
];

const primaryColor = "text-primary";
const secondaryColor = "text-secondary";

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayCards = projects.map((project, i) => {
    const Icon = project.icon;
    const isSecondary = project.color === "secondary";

    // Each card lifts significantly to reveal the one beneath it
    // Offset increases by ~45px per card depth; lift clears ~130-150px
    const stackOffset =
      i === 0
        ? "[grid-area:stack] hover:-translate-y-[160px] before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 transition-all duration-500 cursor-pointer"
        : i === 1
        ? "[grid-area:stack] translate-x-[14px] translate-y-[14px] hover:-translate-y-[146px] hover:translate-x-[14px] before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 transition-all duration-500 cursor-pointer"
        : i === 2
        ? "[grid-area:stack] translate-x-[28px] translate-y-[28px] hover:-translate-y-[132px] hover:translate-x-[28px] before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 transition-all duration-500 cursor-pointer"
        : "[grid-area:stack] translate-x-[42px] translate-y-[42px] hover:-translate-y-[118px] hover:translate-x-[42px] before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 transition-all duration-500 cursor-pointer";

    return {
      className: stackOffset,
      icon: <Icon size={16} />,
      title: project.title,
      description: project.description,
      date: project.tag,
      tech: project.tech,
      iconClassName: isSecondary ? secondaryColor : primaryColor,
      titleClassName: isSecondary ? secondaryColor : primaryColor,
      onHover: () => setHoveredIndex(i),
      onLeave: () => setHoveredIndex(null),
    };
  });

  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : null;

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Work
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            A selection of projects that demonstrate product thinking, technical depth, and creative problem solving.
          </p>
        </motion.div>

        {/* Two-column layout: cards left, detail panel right */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* Left — stacked DisplayCards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-shrink-0"
          >
            {/* Extra height so lifted cards have room */}
            <div className="relative" style={{ height: "420px", width: "380px" }}>
              <DisplayCards cards={displayCards} />
            </div>
            <p className="text-xs text-muted-foreground/50 mt-3 font-mono text-center">
              hover each card to explore
            </p>
          </motion.div>

          {/* Right — project detail panel */}
          <div className="flex-1 min-h-[360px] flex items-center">
            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.div
                  key={activeProject.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full"
                >
                  {/* Image area */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-muted/30 border border-border mb-6">
                    {activeProject.image ? (
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-xs text-muted-foreground/40 font-mono">
                          project screenshot coming soon
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Title + tag */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-foreground">{activeProject.title}</h3>
                    <span className="text-xs text-muted-foreground bg-muted/60 border border-border rounded-full px-2.5 py-1">
                      {activeProject.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {activeProject.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/8 text-primary border border-primary/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Placeholder CTA */}
                  <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group">
                    View Details
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex flex-col items-center justify-center gap-3 text-center py-12"
                >
                  <div className="w-12 h-12 rounded-2xl bg-muted/40 border border-border flex items-center justify-center">
                    <ArrowRight size={18} className="text-muted-foreground/40 -rotate-45" />
                  </div>
                  <p className="text-sm text-muted-foreground/50 font-mono">
                    hover a card to see project details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
