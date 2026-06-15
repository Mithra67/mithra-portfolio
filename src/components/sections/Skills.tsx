import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/Reveal";
import { skills, skillCategories, type SkillCategory, type SkillLevel } from "@/lib/data";

/**
 * Builds a tight, "all-in-one-place" pyramid layout.
 */
function buildPyramid<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  let row = 2;
  let i = 0;
  while (i < items.length) {
    const slice = items.slice(i, i + row);
    rows.push(slice);
    i += row;
    row += 1;
  }
  return rows;
}

export function Skills() {
  const [activeLevel, setActiveLevel] = useState<SkillLevel | "all">("all");
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">("all");

  const description =
    activeLevel === "all"
      ? "Every tool, framework, and platform in my stack — from daily drivers to the ones I've explored on the side."
      : activeLevel === "core"
        ? "The tools I lead with every day — deep expertise, shipped repeatedly in production."
        : activeLevel === "production"
          ? "Tools I've used to ship real, business-critical work."
          : "Technologies I've explored and can ramp up on quickly when a project needs them.";

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      const matchLevel = activeLevel === "all" || s.level === activeLevel;
      const matchCategory = activeCategory === "all" || s.category === activeCategory;
      return matchLevel && matchCategory;
    });
  }, [activeLevel, activeCategory]);

  const availableCategories = useMemo(() => {
    const ids = new Set(
      skills.filter((s) => activeLevel === "all" || s.level === activeLevel).map((s) => s.category),
    );
    return skillCategories.filter((c) => ids.has(c.id));
  }, [activeLevel]);

  const rows = useMemo(() => buildPyramid(filtered), [filtered]);

  const levelLabel: Record<SkillLevel | "all", string> = {
    all: "My Tech Stack",
    core: "Core Expertise",
    production: "Production Experience",
    familiar: "Exploring / Familiar",
  };

  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl opacity-50" />

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title={levelLabel[activeLevel]}
          description={description}
        />

        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center rounded-2xl bg-card/30 p-1.5 border border-glass-border shadow-xl backdrop-blur-md">
            {(["all", "core", "production", "familiar"] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setActiveLevel(l); setActiveCategory("all"); }}
                className={`relative rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeLevel === l
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeLevel === l && (
                  <motion.div
                    layoutId="level-pill"
                    className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow rounded-xl shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{l === "all" ? "All Tools" : levelLabel[l]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Category Pills */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <FilterPill active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
            All
          </FilterPill>
          {availableCategories.map((c) => (
            <FilterPill key={c.id} active={activeCategory === c.id} onClick={() => setActiveCategory(c.id)}>
              {c.label}
            </FilterPill>
          ))}
        </div>

        {/* Pyramid Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeLevel}-${activeCategory}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4 sm:gap-6"
          >
            {rows.length > 0 ? rows.map((row, rIdx) => (
              <div
                key={rIdx}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                {row.map((s, i) => {
                  const idx = rIdx * 5 + i;
                  const inner = (
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 3 + (idx % 4) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (idx % 5) * 0.3,
                      }}
                      className="group relative flex w-16 flex-col items-center gap-1.5 sm:w-20 will-change-transform"
                    >
                      {/* Aura */}
                      <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-90"
                        style={{ background: s.color }}
                      />
                      <s.Icon
                        className={`relative h-9 w-9 transition-all duration-300 group-hover:scale-110 sm:h-10 sm:w-10 ${s.name === "GitHub" ? "gh-icon" : ""}`}
                        style={{ color: s.name === "GitHub" ? undefined : s.color, filter: s.name === "GitHub" ? undefined : `drop-shadow(0 4px 12px ${s.color}50)` }}
                      />
                      <span className="absolute top-full mt-2 whitespace-nowrap text-center text-[10px] font-bold leading-tight text-foreground opacity-0 transition-all duration-300 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 sm:text-[11px]">
                        {s.name}
                      </span>
                    </motion.div>
                  );
                  return (
                    <motion.div
                      key={s.name}
                      whileHover={{ scale: 1.15, zIndex: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${s.name} website`}>
                          {inner}
                        </a>
                      ) : inner}
                    </motion.div>
                  );
                })}
              </div>
            )) : (
              <div className="text-muted-foreground italic text-sm py-12">
                Exploring and expanding this category...
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-[11px] font-bold tracking-wider transition-all shadow-sm ${
        active
          ? "border-primary bg-primary text-primary-foreground glow-primary"
          : "border-glass-border bg-card/40 text-muted-foreground hover:bg-primary/20 hover:text-foreground"
      }`}
    >
      {children}
    </motion.button>
  );
}
