import { motion } from "framer-motion";
import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/julio-goitia-5a828330b/",
    icon: Linkedin,
    description: "Connect with me professionally",
    color: "primary",
  },
  {
    label: "GitHub",
    href: "https://github.com/JulioG07",
    icon: Github,
    description: "See what I'm building",
    color: "secondary",
  },
  {
    label: "Email",
    href: "mailto:jug229@lehigh.edu",
    icon: Mail,
    description: "Drop me a message",
    color: "primary",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
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
            Reach Out
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Let's Talk
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Whether you're a recruiter, founder, or fellow builder — I'd love to connect.
          </p>
        </motion.div>

        {/* Contact card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left — message */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl border border-border p-8 shadow-card"
          >
            <div
              className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
              }}
            >
              <Mail size={22} className="text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Open to opportunities
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm actively seeking SWE and Product Management internships for Summer 2026.
              I'm interested in roles at companies pushing the boundaries of AI, developer
              tooling, and product-led growth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Not hiring? Still reach out — I'm always happy to chat about projects, share
              ideas, or collaborate on something interesting.
            </p>
          </motion.div>

          {/* Right — links */}
          <div className="flex flex-col gap-4">
            {links.map((link, i) => {
              const Icon = link.icon;
              const colorClass =
                link.color === "primary"
                  ? {
                      bg: "bg-primary/8",
                      border: "border-primary/20",
                      text: "text-primary",
                      iconBg: "bg-primary/10",
                    }
                  : {
                      bg: "bg-secondary/8",
                      border: "border-secondary/20",
                      text: "text-secondary",
                      iconBg: "bg-secondary/10",
                    };

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className={`flex items-center gap-4 bg-card border ${colorClass.border} rounded-2xl p-5
                    shadow-card hover:shadow-card-hover transition-all duration-300 group`}
                >
                  <div
                    className={`p-3 rounded-xl ${colorClass.iconBg} border ${colorClass.border}`}
                  >
                    <Icon size={20} className={colorClass.text} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
