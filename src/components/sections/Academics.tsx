import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { usePortfolioContent } from "@/lib/portfolio-content";
import { GraduationCap, Award, Trophy, Sparkles, Medal } from "lucide-react";
import { sortNewestFirst } from "@/lib/portfolio-order";

// Color-code each badge so the achievement reads at a glance
const BADGE_STYLE: Record<string, { accent: string; Icon: typeof Award }> = {
  "Gold Medalist": { accent: "#F5B301", Icon: Trophy },
  "Pursuing": { accent: "#3B82F6", Icon: Sparkles },
  "Rank Holder": { accent: "#A855F7", Icon: Medal },
};
const DEFAULT_STYLE = { accent: "#A855F7", Icon: Award };

export function Academics() {
  const { content: { education } } = usePortfolioContent();
  const orderedEducation = sortNewestFirst(education);
  return (
    <section id="academics" className="relative px-6 py-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -z-10 h-72 w-72 rounded-full blur-3xl opacity-10" style={{ background: "oklch(0.62 0.27 300)" }} />

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundations & honors."
          description="Three institutions. Top scores. Recognitions earned along the way."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {orderedEducation.map((e, i) => {
            const { accent, Icon: BadgeIcon } = BADGE_STYLE[e.badge ?? ""] ?? DEFAULT_STYLE;
            return (
              <Reveal key={e.school + e.degree} delay={i * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{ ["--card-accent" as string]: accent }}
                  className="card-hover-glow glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
                >
                  {/* Top accent line */}
                  <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: accent }} />

                  {/* Header with Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <div 
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ 
                        background: `color-mix(in oklab, ${accent} 15%, transparent)`,
                        color: accent 
                      }}
                    >
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    
                    {e.badge && (() => {
                      const isGold = e.badge === "Gold Medalist";
                      const isRank = e.badge === "Rank Holder";
                      const shimmerClass = isGold
                        ? "badge-shimmer-gold"
                        : isRank
                        ? "badge-shimmer-violet"
                        : "";
                      return (
                        <div
                          className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em]"
                          style={{
                            background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                            border: `1px solid color-mix(in oklab, ${accent} 35%, transparent)`,
                            boxShadow: shimmerClass
                              ? `0 0 22px color-mix(in oklab, ${accent} 45%, transparent)`
                              : undefined,
                          }}
                        >
                          <BadgeIcon
                            className="h-3.5 w-3.5"
                            style={{ color: accent, filter: `drop-shadow(0 0 6px ${accent})` }}
                          />
                          <span className={shimmerClass} style={!shimmerClass ? { color: accent } : undefined}>
                            {e.badge}
                          </span>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="mt-5 flex-1">
                    <h3 className="text-lg font-bold leading-tight">{e.school}</h3>
                    <p className="mt-1.5 text-sm font-medium text-muted-foreground">{e.degree}</p>
                    {e.period && (
                      <p className="mt-1 text-xs text-muted-foreground opacity-80">{e.period}</p>
                    )}
                  </div>

                  <div className="mt-6 border-t border-glass-border pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Achievement</p>
                    <p className="mt-1 text-2xl font-black text-gradient">{e.score}</p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
