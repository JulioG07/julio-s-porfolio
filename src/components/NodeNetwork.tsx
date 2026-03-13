import { useRef, useEffect, useState, useCallback } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  // home position for primary nodes
  homeX: number;
  homeY: number;
  // organic drift offset
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
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

const PRIMARY_COLOR   = "59, 130, 246";   // --primary  #3B82F6
const SECONDARY_COLOR = "20, 184, 166";   // --secondary #14B8A6

const SECTION_NODES = [
  { id: "projects", label: "Projects", section: "#projects" },
  { id: "timeline", label: "Timeline", section: "#timeline" },
  { id: "about",    label: "About",    section: "#about"    },
  { id: "skills",   label: "Skills",   section: "#skills"   },
  { id: "contact",  label: "Contact",  section: "#contact"  },
];

const AMBIENT_LABELS = ["AI", "Python", "Systems", "Product", "IoT"];

function createNodes(width: number, height: number): Node[] {
  const cx = width / 2;
  const cy = height / 2;
  const r  = Math.min(width, height) * 0.32;
  const nodes: Node[] = [];

  // Center node
  nodes.push({
    id: "center",
    x: cx, y: cy,
    homeX: cx, homeY: cy,
    driftAngle: 0, driftSpeed: 0, driftRadius: 0,
    vx: 0, vy: 0,
    radius: 32,
    label: "JG",
    type: "center",
    color: PRIMARY_COLOR,
    glowColor: PRIMARY_COLOR,
  });

  // Primary section nodes — circle arrangement
  SECTION_NODES.forEach((s, i) => {
    const angle = (i / SECTION_NODES.length) * Math.PI * 2 - Math.PI / 2;
    const hx = cx + Math.cos(angle) * r;
    const hy = cy + Math.sin(angle) * r;
    nodes.push({
      id: s.id,
      x: hx, y: hy,
      homeX: hx, homeY: hy,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: 0.004 + Math.random() * 0.003,
      driftRadius: 8 + Math.random() * 8,
      vx: 0, vy: 0,
      radius: 20,
      label: s.label,
      type: "primary",
      section: s.section,
      color: PRIMARY_COLOR,
      glowColor: SECONDARY_COLOR,
    });
  });

  // Ambient nodes — between primary nodes
  AMBIENT_LABELS.forEach((label, i) => {
    const angle = (i / AMBIENT_LABELS.length) * Math.PI * 2 + Math.PI / 6;
    const dist  = r * 0.5 + Math.random() * r * 0.18;
    const hx = cx + Math.cos(angle) * dist;
    const hy = cy + Math.sin(angle) * dist;
    nodes.push({
      id: `ambient-${i}`,
      x: hx, y: hy,
      homeX: hx, homeY: hy,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: 0.006 + Math.random() * 0.005,
      driftRadius: 12 + Math.random() * 10,
      vx: 0, vy: 0,
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
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const nodesRef     = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef     = useRef({ x: -9999, y: -9999, active: false });
  const hoveredRef   = useRef<string | null>(null);
  const tickRef      = useRef<number>(0);

  const [hoveredLabel, setHoveredLabel] = useState<{
    label: string; x: number; y: number;
  } | null>(null);
  const [size, setSize] = useState({ w: 600, h: 500 });
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
    canvas.width  = size.w * dpr;
    canvas.height = size.h * dpr;
    ctx.scale(dpr, dpr);

    let animId: number;

    const draw = () => {
      tickRef.current += 1;
      ctx.clearRect(0, 0, size.w, size.h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      nodes.forEach((node) => {
        if (node.type === "center") return;

        // Advance organic drift angle
        node.driftAngle += node.driftSpeed;

        // Drift target = home + sine wave offset
        const driftX = node.homeX + Math.cos(node.driftAngle) * node.driftRadius;
        const driftY = node.homeY + Math.sin(node.driftAngle * 0.7) * node.driftRadius;

        // Soft spring toward drift target
        node.vx += (driftX - node.x) * 0.018;
        node.vy += (driftY - node.y) * 0.018;

        // Soft magnetic cursor pull/push
        if (mouse.active) {
          const dx   = node.x - mouse.x;
          const dy   = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const zone = node.type === "primary" ? 100 : 80;
          if (dist < zone && dist > 0) {
            const strength = (1 - dist / zone) * 0.04;
            node.vx += (dx / dist) * strength;
            node.vy += (dy / dist) * strength;
          }
        }

        // Damping — keeps motion smooth, not jittery
        node.vx *= 0.88;
        node.vy *= 0.88;
        node.x  += node.vx;
        node.y  += node.vy;

        // Soft boundary clamp (no hard bounce)
        const pad = node.radius + 10;
        if (node.x < pad)           node.vx += (pad - node.x) * 0.05;
        if (node.x > size.w - pad)  node.vx += (size.w - pad - node.x) * 0.05;
        if (node.y < pad)           node.vy += (pad - node.y) * 0.05;
        if (node.y > size.h - pad)  node.vy += (size.h - pad - node.y) * 0.05;
      });

      // Draw connections
      const center = nodes[0];
      nodes.forEach((a) => {
        nodes.forEach((b) => {
          if (a.id >= b.id) return;
          const dx   = a.x - b.x;
          const dy   = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist =
            a.type === "center" || b.type === "center" ? 280
            : a.type === "primary" && b.type === "primary" ? 200
            : 150;
          if (dist > maxDist) return;

          const isHighlighted =
            hoveredRef.current === a.id || hoveredRef.current === b.id;
          const baseAlpha = (1 - dist / maxDist) * 0.3;
          const alpha     = isHighlighted ? baseAlpha * 3 : baseAlpha;

          const c1 = a.type === "center" || a.type === "primary" ? PRIMARY_COLOR : SECONDARY_COLOR;
          const c2 = b.type === "center" || b.type === "primary" ? PRIMARY_COLOR : SECONDARY_COLOR;

          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${c1}, ${alpha})`);
          grad.addColorStop(1, `rgba(${c2}, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = isHighlighted ? 1.5 : 0.8;
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isHovered = hoveredRef.current === node.id;
        const scale     = isHovered ? 1.22 : 1;
        const nr        = node.radius * scale;

        // Glow
        const glowActive = isHovered || node.type === "center";
        if (glowActive) {
          const glowSize = node.type === "center" ? 44 : 22;
          const glow = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, nr + glowSize
          );
          glow.addColorStop(0, `rgba(${node.glowColor}, ${node.type === "center" ? 0.28 : 0.22})`);
          glow.addColorStop(1, `rgba(${node.glowColor}, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, nr + glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Persistent soft pulse on center node
        if (node.type === "center") {
          const pulse = (Math.sin(tickRef.current * 0.025) * 0.5 + 0.5) * 0.12 + 0.06;
          const pulseGrad = ctx.createRadialGradient(
            node.x, node.y, nr,
            node.x, node.y, nr + 28
          );
          pulseGrad.addColorStop(0, `rgba(${PRIMARY_COLOR}, ${pulse})`);
          pulseGrad.addColorStop(1, `rgba(${PRIMARY_COLOR}, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, nr + 28, 0, Math.PI * 2);
          ctx.fillStyle = pulseGrad;
          ctx.fill();
        }

        // Fill gradient
        const grad = ctx.createRadialGradient(
          node.x - nr * 0.3, node.y - nr * 0.3, 0,
          node.x, node.y, nr
        );
        if (node.type === "center") {
          grad.addColorStop(0, `rgba(${PRIMARY_COLOR}, 1)`);
          grad.addColorStop(1, `rgba(${SECONDARY_COLOR}, 0.88)`);
        } else if (node.type === "primary") {
          grad.addColorStop(0, `rgba(${PRIMARY_COLOR}, ${isHovered ? 1 : 0.88})`);
          grad.addColorStop(1, `rgba(${PRIMARY_COLOR}, ${isHovered ? 0.9 : 0.72})`);
        } else {
          grad.addColorStop(0, `rgba(${SECONDARY_COLOR}, 0.55)`);
          grad.addColorStop(1, `rgba(${SECONDARY_COLOR}, 0.3)`);
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, nr, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Border ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, nr, 0, Math.PI * 2);
        ctx.strokeStyle =
          node.type === "ambient"
            ? `rgba(${SECONDARY_COLOR}, 0.4)`
            : `rgba(${PRIMARY_COLOR}, ${isHovered ? 0.95 : 0.55})`;
        ctx.lineWidth = node.type === "center" ? 2.5 : 1.5;
        ctx.stroke();

        // Label inside center node
        if (node.type === "center") {
          ctx.fillStyle    = "rgba(255,255,255,0.97)";
          ctx.font         = "bold 14px Inter, system-ui, sans-serif";
          ctx.textAlign    = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, node.x, node.y);
        }

        // Labels below primary/ambient
        if (node.type === "primary" || node.type === "ambient") {
          ctx.fillStyle =
            node.type === "primary"
              ? `rgba(17,17,17,${isHovered ? 1 : 0.75})`
              : `rgba(107,114,128,0.75)`;
          ctx.font =
            `${node.type === "primary" ? (isHovered ? "600" : "500") : "400"} ${
              node.type === "primary" ? "12px" : "10px"
            } Inter, system-ui, sans-serif`;
          ctx.textAlign    = "center";
          ctx.textBaseline = "top";
          ctx.fillText(node.label, node.x, node.y + nr + 5);
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
      const dx  = node.x - cx;
      const dy  = node.y - cy;
      const hit = node.radius * 1.6;
      if (Math.sqrt(dx * dx + dy * dy) <= hit) return node;
    }
    return null;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      mouseRef.current = { x, y, active: true };

      const node = getHoveredNode(x, y);
      hoveredRef.current = node?.id ?? null;

      if (node && (node.type === "primary" || node.type === "center")) {
        setHoveredLabel({ label: node.label, x: node.x, y: node.y - node.radius - 14 });
        e.currentTarget.style.cursor = "pointer";
      } else {
        setHoveredLabel(null);
        e.currentTarget.style.cursor = "default";
      }
    },
    [getHoveredNode]
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false };
    hoveredRef.current = null;
    setHoveredLabel(null);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const node = getHoveredNode(x, y);
      if (node?.type === "primary" && node.section && onNodeClick) {
        onNodeClick(node.section);
      }
    },
    [getHoveredNode, onNodeClick]
  );

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
          className="pointer-events-none absolute bg-foreground text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md shadow-lg translate-x-[-50%] translate-y-[-100%] whitespace-nowrap transition-all duration-150"
          style={{ left: hoveredLabel.x, top: hoveredLabel.y }}
        >
          {hoveredLabel.label}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
        </div>
      )}
    </div>
  );
}
