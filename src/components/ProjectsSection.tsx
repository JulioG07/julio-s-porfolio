import { motion } from "framer-motion";
import { ArrowUpRight, Github, Zap, Inbox, Calculator, DollarSign } from "lucide-react";

const projects = [
  {
    title: "Evento-AI",
    description:
      "AI-powered event discovery platform built at Lehigh Valley Hackathon. Connects users with local events using NLP-based recommendations and smart filtering.",
    tech: ["Python", "OpenAI", "React", "FastAPI"],
    icon: Zap,
    color: "primary",
    tag: "🏆 Hackathon",
    link: "#",
  },
  {
    title: "IoT Mailbox Sensor",
    description:
      "Smart mailbox sensor using Raspberry Pi and IoT sensors. Sends real-time push notifications when mail arrives, demonstrating embedded systems and hardware integration.",
    tech: ["Python", "Raspberry Pi", "IoT", "MQTT"],
    icon: Inbox,
    color: "secondary",
    tag: "🔧 Hardware",
    link: "#",
  },
  {
    title: "GPA Calculator",
    description:
      "Clean, responsive GPA calculator web app tailored for Lehigh University's grading system. Features semester tracking, cumulative GPA, and grade scenario simulation.",
    tech: ["JavaScript", "HTML/CSS", "React"],
    icon: Calculator,
    color: "primary",
    tag: "📊 Utility",
    link: "#",
  },
  {
    title: "Expense Tracker",
    description:
      "Full-featured personal finance tracker with categorized spending, monthly summaries, and visual breakdowns. Built to understand product thinking through financial tools.",
    tech: ["React", "TypeScript", "Recharts", "LocalStorage"],
    icon: DollarSign,
    color: "secondary",
    tag: "💰 FinTech",
    link: "#",
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary/8",
    text: "text-primary",
    border: "border-primary/20",
    tag: "bg-primary/8 text-primary border-primary/20",
  },
  secondary: {
    bg: "bg-secondary/8",
    text: "text-secondary",
    border: "border-secondary/20",
    tag: "bg-secondary/8 text-secondary border-secondary/20",
  },
};

export function ProjectsSection() {
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const colors = colorMap[project.color as keyof typeof colorMap];
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`group relative bg-card rounded-2xl border border-border p-6 cursor-pointer
                  transition-all duration-300 hover:shadow-card-hover hover:border-primary/30`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.border} border`}>
                    <Icon size={20} className={colors.text} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colors.tag}`}>
                      {project.tag}
                    </span>
                    <a
                      href={project.link}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>

                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  style={{ background: `radial-gradient(ellipse at top left, hsl(var(--primary)/0.04), transparent 60%)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
