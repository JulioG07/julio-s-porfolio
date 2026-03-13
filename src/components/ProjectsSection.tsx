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
    const stackOffset = i === 0
      ? "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
      : i === 1
      ? "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
      : i === 2
      ? "[grid-area:stack] translate-x-24 translate-y-20 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
      : "[grid-area:stack] translate-x-36 translate-y-[120px] hover:translate-y-[100px]";

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
          className="mb-14"
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

        {/* DisplayCards layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16">
          {/* Stacked cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-shrink-0 w-full lg:w-auto flex justify-center"
          >
            <div className="relative" style={{ height: "280px", width: "400px" }}>
              <DisplayCards cards={displayCards} />
            </div>
          </motion.div>

          {/* Project list (right side) */}
          <div className="flex flex-col gap-4 w-full">
            {projects.map((project, i) => {
              const Icon = project.icon;
              const isSecondary = project.color === "secondary";
              const colorClass = isSecondary
                ? { bg: "bg-secondary/8", border: "border-secondary/20", text: "text-secondary", iconBg: "bg-secondary/10" }
                : { bg: "bg-primary/8", border: "border-primary/20", text: "text-primary", iconBg: "bg-primary/10" };

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className={`group flex items-start gap-4 bg-card border ${colorClass.border} rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-default`}
                >
                  <div className={`p-2.5 rounded-xl ${colorClass.iconBg} border ${colorClass.border} flex-shrink-0`}>
                    <Icon size={18} className={colorClass.text} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass.bg} ${colorClass.text} ${colorClass.border}`}>
                        {project.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
