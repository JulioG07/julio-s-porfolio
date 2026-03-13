import { motion } from "framer-motion";
import { Zap, Inbox, Calculator, DollarSign } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const projects = [
  {
    title: "Evento-AI",
    description:
      "Serverless AI app that converts GroupMe messages into Google Calendar events using Gemini AI + AWS Lambda. Built at Lehigh Valley Hackathon in 24 hours.",
    tech: ["Python", "AWS Lambda", "Gemini AI", "Google Calendar API"],
    icon: Zap,
    color: "primary",
    tag: "🏆 Hackathon",
    date: "Oct 2025",
  },
  {
    title: "IoT Mailbox Sensor",
    description:
      "Arduino-based mailbox sensor using C++, circuits, and embedded sensors. Integrated IoT cloud connectivity to display real-time mailbox status on a digital dashboard.",
    tech: ["C++", "Arduino", "IoT", "Cloud"],
    icon: Inbox,
    color: "secondary",
    tag: "🔧 Hardware",
    date: "2024",
  },
  {
    title: "GPA Calculator",
    description:
      "Python-based GPA calculator built during Synchrony Skills Academy, tracking cumulative GPA and grade scenarios with a clean, intuitive interface.",
    tech: ["Python", "HTML/CSS", "JavaScript"],
    icon: Calculator,
    color: "primary",
    tag: "📊 Utility",
    date: "2024",
  },
  {
    title: "Expense Tracker",
    description:
      "Full-featured personal finance tracker with categorized spending, monthly summaries, and visual breakdowns — built during Synchrony Skills Academy.",
    tech: ["React", "TypeScript", "Firebase", "JavaScript"],
    icon: DollarSign,
    color: "secondary",
    tag: "💰 FinTech",
    date: "2024",
  },
];

const primaryColor = "text-primary";
const secondaryColor = "text-secondary";

export function ProjectsSection() {
  const displayCards = projects.map((project, i) => {
    const Icon = project.icon;
    const isSecondary = project.color === "secondary";

    // Stack positioning — increase lift amount so underlying cards are visible
    const stackOffset =
      i === 0
        ? "[grid-area:stack] hover:-translate-y-[140px] before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 transition-all duration-500"
        : i === 1
        ? "[grid-area:stack] translate-x-10 translate-y-10 hover:-translate-y-[40px] hover:translate-x-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 transition-all duration-500"
        : i === 2
        ? "[grid-area:stack] translate-x-20 translate-y-20 hover:translate-y-[10px] hover:translate-x-20 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 transition-all duration-500"
        : "[grid-area:stack] translate-x-[120px] translate-y-[120px] hover:translate-y-[60px] hover:translate-x-[120px] transition-all duration-500";

    return {
      className: stackOffset,
      icon: <Icon size={16} />,
      title: project.title,
      description: project.description,
      date: project.tag,
      tech: project.tech,
      iconClassName: isSecondary ? secondaryColor : primaryColor,
      titleClassName: isSecondary ? secondaryColor : primaryColor,
    };
  });

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

        {/* Centered DisplayCards stack */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          {/* Extra height so the lifted cards have room */}
          <div className="relative" style={{ height: "380px", width: "500px" }}>
            <DisplayCards cards={displayCards} />
          </div>
        </motion.div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-xs text-muted-foreground/60 mt-6 font-mono"
        >
          hover each card to explore
        </motion.p>
      </div>
    </section>
  );
}
