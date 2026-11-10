import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { usePortfolioContent } from "@/lib/portfolio-content";
import { Briefcase, Sparkles, Building2, Calendar } from "lucide-react";
import { sortNewestFirst } from "@/lib/portfolio-order";
import { skills } from "@/lib/data";
import type { IconType } from "react-icons";
import { SiNodedotjs } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { LuSearch, LuCode } from "react-icons/lu";

const EXTRA_LOGOS: Record<string, { Icon: IconType; color: string }> = {
  node: { Icon: SiNodedotjs, color: "#5FA04E" },
  "node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "rest apis": { Icon: TbApi, color: "#A855F7" },
  seo: { Icon: LuSearch, color: "#10B981" },
  echarts: { Icon: skills.find((k) => k.name === "Apache ECharts")!.Icon, color: "#AA0201" },
};

function logoFor(name: string) {
  const key = name.toLowerCase();
  const hit = skills.find((k) => k.name.toLowerCase() === key);
  if (hit) return { Icon: hit.Icon, color: hit.color };
  return EXTRA_LOGOS[key] ?? { Icon: LuCode as IconType, color: "currentColor" };
}

export function Experience() {
  const { content: { experience } } = usePortfolioContent();
  const orderedExperience = sortNewestFirst(experience);
  return (
    <section id="experience" className="relative scroll-mt-20 px-6 py-14 md:py-16">
      {/* Background glow logic */}
      <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary-glow/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Roles that shaped real products."
          description="Every engagement left a product more secure, more performant, or more loved."
        />

        <div className="mt-16 space-y-32">
          {orderedExperience.map((e, i) => (
            <ExperienceEntry key={i} e={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceEntry({ e, index }: { e: any; index: number }) {
  const accents = ["#06B6D4", "#A855F7", "#10B981", "#F59E0B"];
  const accent = accents[index % accents.length];

  return (
    <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.5fr] md:gap-16">
      {/* Left Column: Sticky Role Info */}
      <div className="md:sticky md:top-32 md:h-fit">
        <Reveal delay={0.1}>
          <div className="relative">
            {/* Active Indicator */}
            {e.active && (
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 ring-1 ring-emerald-500/20 glow-emerald">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Active MISSION
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {e.period}
            </div>

            <h3 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              {e.role}
            </h3>
            
            <div 
              className="mt-4 flex items-center gap-2.5 text-lg font-bold"
              style={{ color: accent }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <Building2 className="h-5 w-5" />
              </div>
              {e.company}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-full border border-glass-border bg-card/30 w-fit px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {e.type} Engagement
            </div>

            {/* Decorative Connection Line (Desktop only) */}
            <div className="absolute -left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-glass-border to-transparent md:block" />
          </div>
        </Reveal>
      </div>

      {/* Right Column: Scrolling Details */}
      <div className="space-y-10">
        <Reveal delay={0.2}>
          <div className="glass-strong card-hover-glow relative overflow-hidden rounded-3xl p-8 md:p-10" style={{ ["--card-accent" as string]: accent }}>
            {/* Subtle corner glow */}
            <div 
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.08] blur-[80px]" 
              style={{ backgroundColor: accent }}
            />

            <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Briefcase className="h-4 w-4" />
              Mission Scope
            </div>

            <p className="text-lg leading-relaxed text-foreground/90 font-medium">
              {e.description}
            </p>

            {e.highlights && (
              <div className="mt-10 space-y-6">
                <div className="h-px w-12 bg-primary/30" />
                <ul className="space-y-5">
                  {e.highlights.map((h: string, idx: number) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <Sparkles className="h-3 w-3" />
                      </div>
                      <span className="text-[15px] leading-relaxed text-muted-foreground font-medium group-hover:text-foreground/90 transition-colors">
                        {h}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            
            {e.stack && (
              <div className="mt-12">
                <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Architected With
                </div>
                <div className="flex flex-wrap gap-2">
                  {e.stack.map((s: string) => {
                    const { Icon, color } = logoFor(s);
                    const tint = color === "#FFFFFF" || color === "#E5E5E5" ? undefined : color;
                    return (
                      <div key={s} className="group/logo relative">
                        <div
                          role="img"
                          aria-label={s}
                          tabIndex={0}
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-glass-border bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <Icon className="h-5 w-5 object-contain" style={{ color: tint }} />
                        </div>
                        <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-glass-border bg-popover px-2 py-1 text-[11px] font-bold text-popover-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover/logo:opacity-100 group-focus-within/logo:opacity-100">
                          {s}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
