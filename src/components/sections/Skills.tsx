import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/Reveal";
import { skills, skillCategories, type SkillCategory } from "@/lib/data";

export function Skills() {
  const [active, setActive] = useState<SkillCategory | "all">("all");
  const filtered = active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Expertise"
          title="An orbital grid of capabilities"
          description="Filter by domain — each card breathes with its own rhythm and lights up in its brand color."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <FilterPill active={active === "all"} onClick={() => setActive("all")}>
            All
          </FilterPill>
          {skillCategories.map((c) => (
            <FilterPill key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
              {c.label}
            </FilterPill>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.div
                key={s.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, delay: (i % 12) * 0.03 }}
                whileHover={{ scale: 1.15 }}
                className="flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3 + (i % 4) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 5) * 0.3,
                  }}
                  className="group relative flex h-28 flex-col items-center justify-center gap-2 p-2"
                >
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-90"
                    style={{ background: s.color }}
                  />
                  <s.Icon
                    className="relative h-10 w-10 transition-all duration-300 group-hover:scale-110"
                    style={{ color: s.color, filter: `drop-shadow(0 4px 12px ${s.color}40)` }}
                  />
                  <span className="relative text-center text-[11px] font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                    {s.name}
                  </span>
                </motion.div>
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
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-primary bg-primary text-primary-foreground glow-primary"
          : "border-glass-border bg-card/30 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
