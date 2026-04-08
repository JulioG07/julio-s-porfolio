import { motion } from "framer-motion";
import { User, Code2, Heart } from "lucide-react";

const blocks = [
  {
    icon: User,
    label: "Who I Am",
    color: "primary",
    content:
      "I'm Julio Goitia, a Computer Science & Business Honors student at Lehigh University. I'm passionate about the intersection of technology and human experience — building software that solves real problems with elegance. I bring a dual lens of engineering rigor and product intuition to everything I create.",
  },
  {
    icon: Code2,
    label: "What I'm Building",
    color: "secondary",
    content:
      "Right now I'm exploring AI tooling, prompt engineering, and creative coding. I'm focused on building projects that demonstrate product thinking — from IoT systems that bridge physical and digital worlds, to AI-powered apps that feel delightfully useful.",
  },
  {
    icon: Heart,
    label: "What I Care About",
    color: "primary",
    content:
      "I believe great products come from deep empathy. Whether I'm writing code or designing a user flow, I'm always asking: who is this for, and why does it matter? I care about clarity, craft, and shipping things that work. I'm drawn to teams building at the frontier of AI, product-led growth, and developer tools.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24">
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
            Background
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            The story behind the engineer, the product thinker, and the builder.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blocks.map((block, i) => {
            const Icon = block.icon;
            const colorClass = block.color === "primary"
              ? { bg: "bg-primary/8", border: "border-primary/20", text: "text-primary", line: "bg-primary" }
              : { bg: "bg-secondary/8", border: "border-secondary/20", text: "text-secondary", line: "bg-secondary" };

            return (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                {/* Top accent line */}
                <div className={`h-0.5 w-12 ${colorClass.line} rounded-full mb-5`} />

                {/* Icon + label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${colorClass.bg} border ${colorClass.border}`}>
                    <Icon size={18} className={colorClass.text} />
                  </div>
                  <h3 className="font-semibold text-foreground">{block.label}</h3>
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {block.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
