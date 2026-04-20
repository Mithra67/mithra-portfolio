import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { projects, Project } from "@/lib/data";
import { ArrowRight, Calendar, Star } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects & Workflow"
          title="Selected work, end-to-end"
          description="Each project moves through a deliberate lifecycle — from spec to ship."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <TiltCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ project: p }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Normalize coordinates to [-100, 100]
    const xPct = (mouseX / width - 0.5) * 200;
    const yPct = (mouseY / height - 0.5) * 200;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ["--card-accent" as string]: p.accent,
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="card-hover-glow glass group relative flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative aspect-[16/10] overflow-hidden"
      >
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={1280}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          {p.featured && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
              style={{ background: p.accent }}
            >
              <Star className="h-3 w-3" /> Featured
            </span>
          )}
          {p.category && !p.featured && (
            <span
              className="inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
              style={{ background: p.accent }}
            >
              {p.category}
            </span>
          )}
        </div>
      </div>

      <div 
        style={{ transform: "translateZ(30px)" }}
        className="flex flex-1 flex-col p-6"
      >
        <h3 className="text-xl font-bold leading-tight">{p.title}</h3>
        <p className="mt-1 text-sm text-primary">{p.subtitle}</p>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Calendar className="h-3 w-3" /> {p.period}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>

        {p.metrics && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {p.metrics.slice(0, 3).map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-glass-border bg-background/40 p-2 text-center"
              >
                <div className="text-sm font-bold text-gradient">{m.value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-glass-border bg-card/30 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <WorkflowRow tools={p.stageTools} className="mt-auto pt-6" />
      </div>
    </motion.article>
  );
}

function WorkflowRow({
  tools,
  className = "",
}: {
  tools: { name: string; Icon: React.ComponentType<{ className?: string }>; color: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="rounded-xl border border-glass-border bg-background/30 p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Workflow
        </p>
        <div className="flex items-center justify-between gap-1.5">
          {tools.map((tool, idx) => (
            <div key={tool.name} className="flex flex-1 items-center justify-center gap-1.5">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-glass-border bg-card/40"
                  style={{ color: tool.color }}
                >
                  <tool.Icon className="h-4 w-4" />
                </div>
                <span className="text-[9px] text-muted-foreground">{tool.name}</span>
              </div>
              {idx < tools.length - 1 && (
                <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

