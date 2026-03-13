import { useRef, useEffect, useState, useCallback } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  type: "center" | "primary" | "ambient";
  section?: string;
  color: string;
  glowColor: string;
}

interface NodeNetworkProps {
  onNodeClick?: (section: string) => void;
}

const PRIMARY_COLOR = "59, 130, 246";   // #3B82F6 in RGB
const SECONDARY_COLOR = "20, 184, 166"; // #14B8A6 in RGB

const SECTION_NODES = [
  { id: "projects", label: "Projects", section: "#projects" },
  { id: "timeline", label: "Timeline", section: "#timeline" },
  { id: "about", label: "About", section: "#about" },
  { id: "skills", label: "Skills", section: "#skills" },
  { id: "contact", label: "Contact", section: "#contact" },
];

const AMBIENT_LABELS = ["AI", "Python", "Systems", "Product", "IoT"];

function createNodes(width: number, height: number): Node[] {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) * 0.3;

  const nodes: Node[] = [];

  // Center node
  nodes.push({
    id: "center",
    x: cx,
    y: cy,
    vx: 0,
    vy: 0,
    radius: 30,
    label: "JG",
    type: "center",
    color: PRIMARY_COLOR,
    glowColor: PRIMARY_COLOR,
  });

  // Primary section nodes — arranged in a circle
  SECTION_NODES.forEach((s, i) => {
    const angle = (i / SECTION_NODES.length) * Math.PI * 2 - Math.PI / 2;
    nodes.push({
      id: s.id,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 20,
      label: s.label,
      type: "primary",
      section: s.section,
      color: PRIMARY_COLOR,
      glowColor: SECONDARY_COLOR,
    });
  });

  // Ambient nodes — scattered around
  AMBIENT_LABELS.forEach((label, i) => {
    const angle = (i / AMBIENT_LABELS.length) * Math.PI * 2 + Math.PI / 6;
    const dist = r * 0.55 + Math.random() * r * 0.2;
    nodes.push({
      id: `ambient-${i}`,
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 10,
      label,
      type: "ambient",
      color: SECONDARY_COLOR,
      glowColor: SECONDARY_COLOR,
    });
  });

  return nodes;
}

export function NodeNetwork({ onNodeClick }: NodeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hoveredRef = useRef<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<{ label: string; x: number; y: number } | null>(null);
  const [size, setSize] = useState({ w: 500, h: 420 });

  const containerRef = useRef<HTMLDivElement>(null);

  const resize = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    setSize({ w: clientWidth, h: clientHeight });
    nodesRef.current = createNodes(clientWidth, clientHeight);
  }, []);

  useEffect(() => {
    resize();
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    ctx.scale(dpr, dpr);

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, size.w, size.h);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update node positions (drift + cursor attraction for primary/ambient)
      nodes.forEach((node) => {
        if (node.type === "center") return;

        // Soft cursor repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          node.vx += (dx / dist) * 0.08;
          node.vy += (dy / dist) * 0.08;
        }

        // Drift back toward home (soft spring)
        const cx = size.w / 2;
        const cy = size.h / 2;
        const r = Math.min(size.w, size.h) * 0.3;

        if (node.type === "primary") {
          const idx = SECTION_NODES.findIndex((s) => s.id === node.id);
          const angle = (idx / SECTION_NODES.length) * Math.PI * 2 - Math.PI / 2;
          const homeX = cx + Math.cos(angle) * r;
          const homeY = cy + Math.sin(angle) * r;
          node.vx += (homeX - node.x) * 0.003;
          node.vy += (homeY - node.y) * 0.003;
        }

        // Damping
        node.vx *= 0.95;
        node.vy *= 0.95;
        node.x += node.vx;
        node.y += node.vy;

        // Boundary bounce
        if (node.x < node.radius) { node.x = node.radius; node.vx *= -1; }
        if (node.x > size.w - node.radius) { node.x = size.w - node.radius; node.vx *= -1; }
        if (node.y < node.radius) { node.y = node.radius; node.vy *= -1; }
        if (node.y > size.h - node.radius) { node.y = size.h - node.radius; node.vy *= -1; }
      });

      // Draw connections
      nodes.forEach((a) => {
        nodes.forEach((b) => {
          if (a.id >= b.id) return;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = a.type === "center" || b.type === "center" ? 260 : 180;
          if (dist > maxDist) return;

          const alpha = (1 - dist / maxDist) * 0.35;
          const isHighlighted =
            hoveredRef.current === a.id || hoveredRef.current === b.id;

          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          const c1 = a.type === "center" || a.type === "primary" ? PRIMARY_COLOR : SECONDARY_COLOR;
          const c2 = b.type === "center" || b.type === "primary" ? PRIMARY_COLOR : SECONDARY_COLOR;
          grad.addColorStop(0, `rgba(${c1}, ${isHighlighted ? alpha * 2.5 : alpha})`);
          grad.addColorStop(1, `rgba(${c2}, ${isHighlighted ? alpha * 2.5 : alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = isHighlighted ? 1.5 : 0.8;
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isHovered = hoveredRef.current === node.id;
        const scale = isHovered ? 1.25 : 1;
        const r = node.radius * scale;

        // Glow
        if (isHovered || node.type === "center") {
          const glowSize = node.type === "center" ? 40 : 20;
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r + glowSize);
          glow.addColorStop(0, `rgba(${node.glowColor}, 0.25)`);
          glow.addColorStop(1, `rgba(${node.glowColor}, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Node circle fill
        const grad = ctx.createRadialGradient(
          node.x - r * 0.3, node.y - r * 0.3, 0,
          node.x, node.y, r
        );
        if (node.type === "center") {
          grad.addColorStop(0, `rgba(${PRIMARY_COLOR}, 1)`);
          grad.addColorStop(1, `rgba(${SECONDARY_COLOR}, 0.9)`);
        } else if (node.type === "primary") {
          grad.addColorStop(0, `rgba(${PRIMARY_COLOR}, ${isHovered ? 1 : 0.85})`);
          grad.addColorStop(1, `rgba(${PRIMARY_COLOR}, ${isHovered ? 0.9 : 0.7})`);
        } else {
          grad.addColorStop(0, `rgba(${SECONDARY_COLOR}, 0.5)`);
          grad.addColorStop(1, `rgba(${SECONDARY_COLOR}, 0.3)`);
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Border
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = node.type === "ambient"
          ? `rgba(${SECONDARY_COLOR}, 0.4)`
          : `rgba(${PRIMARY_COLOR}, ${isHovered ? 0.9 : 0.5})`;
        ctx.lineWidth = node.type === "center" ? 2 : 1.5;
        ctx.stroke();

        // Label inside center node
        if (node.type === "center") {
          ctx.fillStyle = "rgba(255,255,255,0.95)";
          ctx.font = "bold 13px Inter, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, node.x, node.y);
        }

        // Label below primary/ambient nodes
        if (node.type === "primary" || node.type === "ambient") {
          ctx.fillStyle = node.type === "primary"
            ? `rgba(17, 17, 17, ${isHovered ? 1 : 0.75})`
            : `rgba(107, 114, 128, 0.8)`;
          ctx.font = `${node.type === "primary" ? (isHovered ? "600" : "500") : "400"} ${node.type === "primary" ? "12px" : "10px"} Inter, system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(node.label, node.x, node.y + r + 5);
        }
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    animFrameRef.current = animId;
    return () => cancelAnimationFrame(animId);
  }, [size]);

  const getHoveredNode = useCallback((cx: number, cy: number): Node | null => {
    const nodes = nodesRef.current;
    for (const node of nodes) {
      const dx = node.x - cx;
      const dy = node.y - cy;
      const hitRadius = node.radius * 1.5;
      if (Math.sqrt(dx * dx + dy * dy) <= hitRadius) return node;
    }
    return null;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };

    const node = getHoveredNode(x, y);
    hoveredRef.current = node?.id ?? null;

    if (node && (node.type === "primary" || node.type === "center")) {
      setHoveredLabel({ label: node.label, x: node.x, y: node.y - node.radius - 14 });
      e.currentTarget.style.cursor = "pointer";
    } else {
      setHoveredLabel(null);
      e.currentTarget.style.cursor = "default";
    }
  }, [getHoveredNode]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
    hoveredRef.current = null;
    setHoveredLabel(null);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const node = getHoveredNode(x, y);
    if (node?.type === "primary" && node.section && onNodeClick) {
      onNodeClick(node.section);
    }
  }, [getHoveredNode, onNodeClick]);

  return (
    <div ref={containerRef} className="relative w-full h-full select-none">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      {/* Tooltip */}
      {hoveredLabel && (
        <div
          className="pointer-events-none absolute bg-foreground text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md shadow-lg translate-x-[-50%] translate-y-[-100%] whitespace-nowrap"
          style={{ left: hoveredLabel.x, top: hoveredLabel.y }}
        >
          {hoveredLabel.label}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
        </div>
      )}
    </div>
  );
}
