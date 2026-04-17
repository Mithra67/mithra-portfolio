import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { projects } from "@/lib/data";
import { ArrowRight, Calendar } from "lucide-react";

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
              <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all hover:glow-primary">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {p.category && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                )}
                <h3 className="text-xl font-bold leading-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-primary">{p.subtitle}</p>

                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {p.period}
                </div>

                <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-glass-border bg-card/30 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <div className="rounded-xl border border-glass-border bg-background/30 p-4">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Workflow
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      {p.stageTools.map((tool, idx) => (
                        <div key={tool.name} className="flex flex-1 items-center justify-center gap-2">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-glass-border bg-card/40"
                              style={{ color: tool.color }}
                            >
                              <tool.Icon className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] text-muted-foreground">{tool.name}</span>
                          </div>
                          {idx < p.stageTools.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
