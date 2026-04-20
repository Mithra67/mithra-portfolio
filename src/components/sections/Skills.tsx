import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/Reveal";
import { skills, skillCategories, type SkillCategory } from "@/lib/data";

/**
 * Builds a tight, "all-in-one-place" pyramid layout.
 * Rows scale from narrow at top to wide at bottom — keeps the gap small
 * and gives the section a sculpted, premium silhouette.
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
  const [active, setActive] = useState<SkillCategory | "all">("all");
  const filtered = useMemo(
    () => (active === "all" ? skills : skills.filter((s) => s.category === active)),
    [active],
  );
  const rows = useMemo(() => buildPyramid(filtered), [filtered]);

  return (
    <section id="skills" className="relative px-6 py-24">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Expertise"
          title="A pyramid of capabilities"
          description="No cards, no clutter — every tool floats in formation and lights up in its brand color when you focus on it."
        />

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          <FilterPill active={active === "all"} onClick={() => setActive("all")}>
            All
          </FilterPill>
          {skillCategories.map((c) => (
            <FilterPill key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
              {c.label}
            </FilterPill>
          ))}
        </div>

        {/* Pyramid */}
        <motion.div layout className="flex flex-col items-center gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {rows.map((row, rIdx) => (
              <motion.div
                key={`row-${rIdx}-${active}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: rIdx * 0.05 }}
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
              >
                {row.map((s, i) => {
                  const idx = rIdx * 5 + i;
                  return (
                    <motion.div
                      key={s.name}
                      layout
                      whileHover={{ scale: 1.18, zIndex: 10 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 3 + (idx % 4) * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (idx % 5) * 0.3,
                        }}
                        className="group relative flex w-16 flex-col items-center gap-1 sm:w-20"
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
                        <span className="relative text-center text-[10px] font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground sm:text-[11px]">
                          {s.name}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-primary bg-primary text-primary-foreground glow-primary"
          : "border-glass-border bg-card/30 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
      }`}
    >
      {children}
    </motion.button>
  );
}
