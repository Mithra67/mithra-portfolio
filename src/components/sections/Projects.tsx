import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { projects } from "@/lib/data";
import { ArrowRight, Calendar, Star } from "lucide-react";

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects & Workflow"
          title="Selected work, end-to-end"
          description="Each project moves through a deliberate lifecycle — from spec to ship."
        />

        {/* Featured project — wide hero card */}
        {featured && (
          <Reveal>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              style={{ ["--card-accent" as string]: featured.accent }}
              className="card-hover-glow glass group relative mb-8 grid overflow-hidden rounded-3xl md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/30 to-transparent md:bg-gradient-to-r" />
                <span
                  className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                  style={{ background: featured.accent }}
                >
                  <Star className="h-3 w-3" /> Featured
                </span>
              </div>

              <div className="flex flex-col p-7 md:p-8">
                {featured.category && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {featured.category}
                  </span>
                )}
                <h3 className="text-2xl font-bold leading-tight md:text-3xl">{featured.title}</h3>
                <p className="mt-1 text-sm text-primary">{featured.subtitle}</p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {featured.period}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{featured.description}</p>

                {featured.metrics && (
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {featured.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-glass-border bg-background/40 p-3 text-center"
                      >
                        <div className="text-lg font-bold text-gradient">{m.value}</div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-glass-border bg-card/30 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <WorkflowRow tools={featured.stageTools} className="mt-6" />
              </div>
            </motion.article>
          </Reveal>
        )}

        {/* Other projects — image-led cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                style={{ ["--card-accent" as string]: p.accent }}
                className="card-hover-glow glass group relative flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  {p.category && (
                    <span
                      className="absolute left-3 top-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                      style={{ background: p.accent }}
                    >
                      {p.category}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold leading-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-primary">{p.subtitle}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {p.period}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>

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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
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
