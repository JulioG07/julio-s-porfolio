import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Trophy, GraduationCap, BookOpen, Briefcase } from "lucide-react";
import logoSeo from "@/assets/logo-seo.jpeg";
import logoLehigh from "@/assets/logo-lehigh.png";
import logoBmhs from "@/assets/logo-bmhs.jpg";
import logoTrackside from "@/assets/logo-trackside.png";
import logoDurango from "@/assets/logo-durango.jpg";

const events = [
  {
    year: "2026",
    title: "SEO First Year Tech Developer",
    description:
      "Selected as 1 of 75 from 500+ applicants for SEO's competitive tech career development program. Developing Python skills through hands-on projects and Git collaborative workflows.",
    icon: Building2,
    color: "primary",
    logo: logoSeo,
  },
  {
    year: "2025",
    title: "Lehigh Valley Hackathon — Evento-AI",
    description:
      "Built Evento-AI in 24 hours at a hackathon sponsored by AWS & Lehigh CSBA — a serverless app using Gemini AI and AWS Lambda to convert GroupMe messages into Google Calendar events.",
    icon: Trophy,
    color: "secondary",
    logo: logoLehigh,
  },
  {
    year: "2025",
    title: "CSB Honors Program @ Lehigh University",
    description:
      "Enrolled in Lehigh's competitive Computer Science & Business Honors dual-degree track. Cumulative GPA: 3.84. Pursuing minors in Data Science and Entrepreneurship.",
    icon: GraduationCap,
    color: "primary",
    logo: logoLehigh,
  },
  {
    year: "2025",
    title: "Curriculum Development Intern — IB CS HL",
    description:
      "Redesigned IB Computer Science HL lessons for Brien McMahon High School — creating interactive slide decks and logic gate demos on breadboards now used by 20–30 students.",
    icon: BookOpen,
    color: "secondary",
    logo: logoBmhs,
  },
  {
    year: "2024",
    title: "Coding Bootcamp Instructor — Trackside Teen Center",
    description:
      "Organized and led a 4-day coding bootcamp teaching middle schoolers web development (HTML, CSS, JavaScript) using an interactive curriculum with Replit and coding games.",
    icon: BookOpen,
    color: "primary",
    logo: logoTrackside,
  },
  {
    year: "2023–Present",
    title: "Communication Specialist — Durango Insurance",
    description:
      "Manage communication with 100+ clients weekly. Improved customer engagement and reduced policy cancellations by increasing follow-up calls and documenting all client interactions.",
    icon: Briefcase,
    color: "secondary",
    logo: logoDurango,
  },
];

export function TimelineSection() {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  return (
    <section id="timeline" className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background logo ghost — cinematic fade-in on card hover */}
      <AnimatePresence mode="wait">
        {hoveredLogo && (
          <motion.div
            key={hoveredLogo}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
          >
            <img
              src={hoveredLogo}
              alt=""
              className="w-[70vw] max-w-3xl object-contain select-none"
              style={{ opacity: 0.2, filter: "grayscale(50%) blur(1px)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-container relative z-10">
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
              const colorClass =
                event.color === "primary"
                  ? {
                      bg: "bg-primary/8",
                      border: "border-primary/25",
                      text: "text-primary",
                      dot: "bg-primary",
                    }
                  : {
                      bg: "bg-secondary/8",
                      border: "border-secondary/25",
                      text: "text-secondary",
                      dot: "bg-secondary",
                    };

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
                  <div
                    className={`absolute left-[14px] md:left-1/2 top-5 w-[10px] h-[10px] rounded-full ${colorClass.dot} md:-translate-x-1/2 ring-2 ring-background z-10`}
                  />

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 ${isLeft ? "md:mr-[calc(50%+20px)]" : "md:ml-[calc(50%+20px)]"} max-w-sm w-full`}
                    onMouseEnter={() => setHoveredLogo(event.logo)}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    <div
                      className={`bg-card border ${colorClass.border} rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 group hover:scale-[1.02]`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`p-2 rounded-xl ${colorClass.bg} border ${colorClass.border} transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon size={16} className={colorClass.text} />
                        </div>
                        <div>
                          <span
                            className={`text-xs font-bold tracking-widest ${colorClass.text} uppercase`}
                          >
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
