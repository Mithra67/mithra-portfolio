import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { projects } from "@/lib/data";
import { SiJira, SiFigma, SiGithub, SiDocker } from "react-icons/si";
import { ArrowRight } from "lucide-react";

const iconMap = {
  jira: { Icon: SiJira, label: "Jira", color: "#0052cc" },
  figma: { Icon: SiFigma, label: "Figma", color: "#f24e1e" },
  github: { Icon: SiGithub, label: "GitHub", color: "#ffffff" },
  docker: { Icon: SiDocker, label: "Docker", color: "#2496ed" },
} as const;

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects & Workflow"
          title="Selected work, end-to-end"
          description="Each project moves through a deliberate lifecycle — from spec to ship."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all hover:glow-primary">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-primary">{p.tagline}</p>
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

                <div className="mt-6 rounded-xl border border-glass-border bg-background/30 p-4">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Workflow
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    {p.workflow.map((key, idx) => {
                      const item = iconMap[key];
                      return (
                        <div key={key} className="flex flex-1 items-center justify-center gap-2">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-glass-border bg-card/40"
                              style={{ color: item.color }}
                            >
                              <item.Icon className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] text-muted-foreground">{item.label}</span>
                          </div>
                          {idx < p.workflow.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
                          )}
                        </div>
                      );
                    })}
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
