import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { projects, Project } from "@/lib/data";
import { ArrowRight, ArrowUpRight, Calendar, Lock, Star, ChevronDown } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 -z-20 grid-fade opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: "oklch(0.55 0.22 300 / 0.12)" }} />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects & WorkFlow"
          title="End-to-end, without shortcuts."
          description="Each project ships through a deliberate lifecycle — from spec to production."
        />

        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const lastFrameRef = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const now = Date.now();
    if (now - lastFrameRef.current < 16) return; // cap at ~60fps
    lastFrameRef.current = now;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width * 200 - 100;
    const yPct = (event.clientY - rect.top) / rect.height * 200 - 100;
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
      onClick={() => setIsOpen(!isOpen)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ["--card-accent" as string]: "#A855F7",
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="card-hover-glow glass group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl cursor-pointer"
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
              style={{ background: "#A855F7" }}
            >
              <Star className="h-3 w-3" /> Featured
            </span>
          )}
          {p.category && !p.featured && (
            <span
              className="inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
              style={{ background: "#A855F7" }}
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
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm text-primary">{p.subtitle}</p>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4 text-foreground/60" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-foreground/60">
                <Calendar className="h-3 w-3" /> {p.period}
              </div>
              <p className="mt-3 text-sm text-foreground/90 leading-relaxed font-medium">{p.description}</p>

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
                    className="rounded-full border border-glass-border bg-card/30 px-2.5 py-1 text-[11px] text-foreground/80 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Merged Interactive Workflow */}
              <WorkflowRow stageTools={p.stageTools} aiTools={p.aiTools} className="mt-6" />

              {/* Private project disclosure */}
              <div className="mt-4 flex flex-col items-stretch gap-2 rounded-xl border border-glass-border bg-background/40 p-3">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <Lock className="h-3 w-3" /> Enterprise Project · Private Repository
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Source unavailable due to company confidentiality. Case study available on request.
                </p>
                <a
                  href={`mailto:duraisamysangamithra19@gmail.com?subject=Case%20study%20request%20%E2%80%94%20${encodeURIComponent(p.title)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 text-[11px] font-semibold text-primary transition hover:bg-primary/25"
                >
                  Request case study <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function WorkflowRow({
  stageTools,
  aiTools,
  className = "",
}: {
  stageTools: { name: string; Icon: React.ComponentType<{ className?: string }>; color: string }[];
  aiTools?: { name: string; Icon: React.ComponentType<{ className?: string }>; usage: string }[];
  className?: string;
}) {
  const allTools = [...stageTools, ...(aiTools?.map(t => ({ ...t, color: "#FFFFFF" })) || [])];

  return (
    <div className={className}>
      <div className="rounded-xl border border-glass-border bg-background/30 p-3">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
          Engineering & Intelligence Workflow
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {allTools.map((tool, idx) => (
            <div key={tool.name + idx} className="flex items-center">
              <div className="group/tooltip relative flex flex-col items-center gap-1">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-glass-border bg-card/40 transition-colors group-hover/tooltip:bg-card/80"
                  style={{ color: tool.color }}
                >
                  <tool.Icon className="h-4 w-4" />
                </div>
                <span className="absolute top-full mt-1 whitespace-nowrap text-[9px] font-bold text-white opacity-0 transition-all duration-300 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 z-50 pointer-events-none">
                  {tool.name}
                </span>

                {/* Hover Tooltip for AI Tools */}
                {'usage' in tool && (
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover/tooltip:opacity-100 z-50">
                    <div className="relative rounded-lg bg-[#0A0A0A] p-3 text-xs text-white shadow-2xl ring-1 ring-white/15">
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-[#0A0A0A]" />
                      <span className="block font-bold text-[#A855F7] mb-1">{tool.name} Usage</span>
                      <span className="text-white/80 leading-relaxed">{(tool as any).usage}</span>
                    </div>
                  </div>
                )}
              </div>
              {idx < allTools.length - 1 && (
                <ArrowRight className="mx-1 h-3 w-3 text-foreground/40 md:mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

