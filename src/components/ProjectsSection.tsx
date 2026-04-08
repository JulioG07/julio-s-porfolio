import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Inbox, Calculator, DollarSign, ArrowRight } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import eventoAiImg from "@/assets/evento-ai.jpeg";
import mailboxSensorImg from "@/assets/mailbox-sensor.jpg";
import gpaCalculatorImg from "@/assets/gpa-calculator.png";
import expenseTrackerImg from "@/assets/expense-tracker.png";

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
    imagePosition: "center 45%",
  },
  {
    title: "IoT Mailbox Sensor",
    description:
      "Arduino-based mailbox sensor using C++, circuits, and embedded sensors. Integrated IoT cloud connectivity to display real-time mailbox status on a digital dashboard.",
    tech: ["C++", "Arduino", "IoT", "Cloud"],
    icon: Inbox,
    color: "secondary",
    tag: "🔧 Hardware",
    image: mailboxSensorImg,
    imagePosition: "center 35%",
  },
  {
    title: "GPA Calculator",
    description:
      "Python-based GPA calculator built during Synchrony Skills Academy, tracking cumulative GPA and grade scenarios with a clean, intuitive interface.",
    tech: ["Python"],
    icon: Calculator,
    color: "primary",
    tag: "📊 Utility",
    image: gpaCalculatorImg,
    imagePosition: "top",
  },
  {
    title: "Expense Tracker",
    description:
      "Full-featured personal finance tracker with categorized spending, monthly summaries, and visual breakdowns — built during Synchrony Skills Academy.",
    tech: ["React", "TypeScript", "Firebase", "JavaScript"],
    icon: DollarSign,
    color: "secondary",
    tag: "💰 FinTech",
    image: expenseTrackerImg,
    imagePosition: "top",
  },
];

const primaryColor = "text-primary";
const secondaryColor = "text-secondary";

// Resting offsets for each card in the stack (no hover classes)
// Cards start at y=80 so there's room above for the lift
const RESTING_OFFSETS = [
  { x: 0,  y: 80  },
  { x: 14, y: 136 },
  { x: 28, y: 192 },
  { x: 42, y: 248 },
];

// Subtle lift — cards rise just enough to feel interactive
const LIFT_Y = -70;

const CARD_WIDTH = 352;
const CARD_HEIGHT = 176;

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  hoveredIndexRef.current = hoveredIndex;

  const handleCardEnter = (i: number) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setHoveredIndex(i);
  };

  const handleAreaLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 400);
  };

  // Geometry-based hover using RESTING positions for every card.
  // Inactive cards are visually at their resting position, so the cursor
  // crosses their visible edge exactly when the hit-test fires — no dead zone.
  // The active card stays active while the cursor is in its lifted zone
  // (nothing is detected there, so state is left unchanged).
  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Highest index = highest natural z, so check descending to give top card priority
    for (let i = projects.length - 1; i >= 0; i--) {
      const { x: ox, y: oy } = RESTING_OFFSETS[i];
      if (
        mouseX >= ox &&
        mouseX <= ox + CARD_WIDTH &&
        mouseY >= oy &&
        mouseY <= oy + CARD_HEIGHT
      ) {
        if (hoveredIndexRef.current !== i) setHoveredIndex(i);
        return;
      }
    }
    // Cursor is over no resting card area (e.g. in the lifted card's empty zone) — keep state
  };

  const displayCards = projects.map((project, i) => {
    const Icon = project.icon;
    const isSecondary = project.color === "secondary";
    const isActive = hoveredIndex === i;

    const { x, y } = RESTING_OFFSETS[i];
    const liftY = isActive ? y + LIFT_Y : y;

    // Static base class — NO hover: translate classes so CSS and JS don't fight
    const base =
      "before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 before:left-0 before:top-0 transition-all duration-300 cursor-pointer [grid-area:stack]";

    const grayscaleClass = isActive
      ? "grayscale-0 before:opacity-0"
      : "grayscale-[100%] before:opacity-100 before:transition-opacity before:duration-500";

    return {
      className: `${base} ${grayscaleClass}`,
      // Inline style drives ALL positional transforms — single source of truth
      style: {
        transform: `translate(${x}px, ${liftY}px)`,
        zIndex: isActive ? 10 : i,
      },
      icon: <Icon size={16} />,
      title: project.title,
      description: project.description,
      date: project.tag,
      tech: project.tech,
      iconClassName: isSecondary ? secondaryColor : primaryColor,
      titleClassName: isSecondary ? secondaryColor : primaryColor,
      onHover: () => handleCardEnter(i),
      // onLeave omitted — handled by the outer container's onMouseLeave
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

        {/* Two-column layout — single leave boundary */}
        <div
          className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16"
          onMouseLeave={handleAreaLeave}
        >

          {/* Left — stacked DisplayCards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-shrink-0"
          >
            <div ref={containerRef} className="relative" style={{ height: "480px", width: "360px" }} onMouseMove={handleContainerMouseMove}>
              <DisplayCards cards={displayCards} />
            </div>
            <p className="text-xs text-muted-foreground/50 mt-3 font-mono text-center">
              hover each card to explore
            </p>
          </motion.div>

          {/* Right — project detail panel */}
          <div
            className="flex-1 min-h-[400px] flex items-center pl-10 lg:pl-14"
          >
            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.div
                  key={activeProject.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full"
                >
                  {/* Image area */}
                  <div className="w-full h-64 rounded-2xl overflow-hidden bg-muted/30 border border-border mb-6">
                    {activeProject.image ? (
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: activeProject.imagePosition ?? "center" }}
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

                  {/* CTA */}
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
