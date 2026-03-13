import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="section-container py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="font-semibold text-foreground">
            JG<span className="text-primary">.</span>
            <span className="ml-3 text-xs text-muted-foreground font-normal">
              © {new Date().getFullYear()} Julio Goitia
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/JulioG07"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
            >
              <Github size={17} />
            </a>
            <a
              href="https://linkedin.com/in/juliogoitia"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
            >
              <Linkedin size={17} />
            </a>
          </div>

          {/* Built with */}
          <p className="text-xs text-muted-foreground">
            Built with React + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
