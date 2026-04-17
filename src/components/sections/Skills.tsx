import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/Reveal";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Expertise"
          title="An orbital grid of capabilities"
          description="Hover any skill — each card breathes with its own rhythm and lights up in its brand color."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              animate={{ y: [0, -8, 0] }}
              style={{ animationDelay: `${i * 0.2}s` }}
              whileHover={{ scale: 1.06 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3 + (i % 4) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 5) * 0.3,
                }}
                className="glass group flex h-32 flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-all hover:border-[var(--hover-c)]"
                style={
                  {
                    ["--hover-c" as string]: s.color,
                  } as React.CSSProperties
                }
              >
                <s.Icon
                  className="h-8 w-8 text-foreground/80 transition-all duration-300 group-hover:scale-110"
                  style={{ color: s.color }}
                />
                <span className="text-sm font-medium">{s.name}</span>
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `0 0 30px -5px ${s.color}66` }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
