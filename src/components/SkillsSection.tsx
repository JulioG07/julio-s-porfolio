import { motion } from "framer-motion";
import { Code2, Layers, Award } from "lucide-react";

const categories = [
  {
    icon: Code2,
    label: "Technical Skills",
    color: "primary",
    items: [
      { name: "Java", level: 85 },
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "HTML/CSS", level: 88 },
      { name: "C++", level: 70 },
      { name: "React", level: 78 },
      { name: "TypeScript", level: 72 },
    ],
  },
  {
    icon: Layers,
    label: "Programs",
    color: "secondary",
    items: [
      { name: "SEO First Year Academy", level: null },
      { name: "Synchrony Skills Academy", level: null },
      { name: "Lehigh CSB Honors", level: null },
      { name: "Lehigh Valley Hackathon", level: null },
    ],
  },
  {
    icon: Award,
    label: "Leadership",
    color: "primary",
    items: [
      { name: "Coding Bootcamp Instructor", level: null },
      { name: "Hackathon Team Lead", level: null },
      { name: "Peer Tutor", level: null },
    ],
  },
];

interface SkillItemProps {
  name: string;
  level: number | null;
  colorClass: { bg: string; bar: string; border: string; text: string };
  index: number;
}

function SkillItem({ name, level, colorClass, index }: SkillItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group"
    >
      {level !== null ? (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-foreground">{name}</span>
            <span className={`text-xs font-semibold ${colorClass.text}`}>{level}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 + 0.3, duration: 0.7, ease: "easeOut" }}
              className={`h-full ${colorClass.bar} rounded-full`}
            />
          </div>
        </div>
      ) : (
        <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${colorClass.border} ${colorClass.bg} group-hover:shadow-sm transition-all`}>
          <div className={`w-1.5 h-1.5 rounded-full ${colorClass.bar}`} />
          <span className="text-sm font-medium text-foreground">{name}</span>
        </div>
      )}
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-muted/20">
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
            Capabilities
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Skills & Highlights
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            A snapshot of my technical toolkit, program experience, and leadership background.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            const colorClass = cat.color === "primary"
              ? {
                  bg: "bg-primary/8",
                  border: "border-primary/20",
                  text: "text-primary",
                  bar: "bg-primary",
                  iconBg: "bg-primary/8",
                }
              : {
                  bg: "bg-secondary/8",
                  border: "border-secondary/20",
                  text: "text-secondary",
                  bar: "bg-secondary",
                  iconBg: "bg-secondary/8",
                };

            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.15, duration: 0.55 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-card"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl ${colorClass.iconBg} border ${colorClass.border}`}>
                    <Icon size={18} className={colorClass.text} />
                  </div>
                  <h3 className="font-semibold text-foreground">{cat.label}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-col gap-3">
                  {cat.items.map((item, ii) => (
                    <SkillItem
                      key={item.name}
                      name={item.name}
                      level={item.level}
                      colorClass={colorClass}
                      index={ii}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
