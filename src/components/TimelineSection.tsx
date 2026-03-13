import { motion } from "framer-motion";
import { Building2, Trophy, GraduationCap, Cpu, BookOpen } from "lucide-react";

const events = [
  {
    year: "2026",
    title: "SEO First Year Tech Developer",
    description: "Selected for SEO's competitive First Year Academy, connecting with top-tier tech companies and mentors in the industry.",
    icon: Building2,
    color: "primary",
  },
  {
    year: "2025",
    title: "Lehigh Valley Hackathon — Evento-AI",
    description: "Built and shipped Evento-AI: an AI-powered event discovery platform in 24 hours. Demonstrated rapid prototyping and product thinking under pressure.",
    icon: Trophy,
    color: "secondary",
  },
  {
    year: "2025",
    title: "CSB Honors Program @ Lehigh",
    description: "Began the competitive Computer Science & Business Honors program — one of Lehigh's most rigorous dual-degree tracks combining engineering and business.",
    icon: GraduationCap,
    color: "primary",
  },
  {
    year: "2024",
    title: "IoT Mailbox Sensor",
    description: "Designed and built a custom IoT solution using Raspberry Pi — exploring embedded systems, hardware integration, and real-time event-driven architectures.",
    icon: Cpu,
    color: "secondary",
  },
  {
    year: "2024",
    title: "Coding Bootcamp Instructor",
    description: "Taught foundational programming concepts to beginners, honing the ability to communicate complex ideas clearly — a core product management skill.",
    icon: BookOpen,
    color: "primary",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 bg-muted/20">
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
            Journey
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Timeline
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Key milestones that shaped my technical skills, product thinking, and engineering journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="flex flex-col gap-0">
            {events.map((event, i) => {
              const Icon = event.icon;
              const isLeft = i % 2 === 0;
              const colorClass = event.color === "primary"
                ? { bg: "bg-primary/8", border: "border-primary/25", text: "text-primary", dot: "bg-primary" }
                : { bg: "bg-secondary/8", border: "border-secondary/25", text: "text-secondary", dot: "bg-secondary" };

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative flex md:justify-${isLeft ? "start" : "end"} pb-10`}
                >
                  {/* Connector dot */}
                  <div className={`absolute left-[14px] md:left-1/2 top-5 w-[10px] h-[10px] rounded-full ${colorClass.dot} md:-translate-x-1/2 ring-2 ring-background z-10`} />

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 ${isLeft ? "md:mr-[calc(50%+20px)]" : "md:ml-[calc(50%+20px)]"} max-w-sm w-full`}
                  >
                    <div className={`bg-card border ${colorClass.border} rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 group`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-xl ${colorClass.bg} border ${colorClass.border}`}>
                          <Icon size={16} className={colorClass.text} />
                        </div>
                        <div>
                          <span className={`text-xs font-bold tracking-widest ${colorClass.text} uppercase`}>
                            {event.year}
                          </span>
                          <h3 className="text-sm font-semibold text-foreground mt-0.5 leading-snug">
                            {event.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
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
