import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { experience } from "@/lib/data";
import { Briefcase, Sparkles } from "lucide-react";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="A track record of shipping"
          description="Roles where I shaped product, performance, and security from the inside out."
        />

        <div ref={ref} className="relative">
          {/* base line */}
          <div className="absolute left-4 top-0 h-full w-px bg-glass-border md:left-1/2" />
          {/* animated progress line */}
          <motion.div
            style={{ scaleY: lineHeight, transformOrigin: "top" }}
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-primary-glow to-primary md:left-1/2"
          />

          <ul className="space-y-12">
            {experience.map((e, i) => {
              const left = i % 2 === 0;
              const accents = ["#A855F7", "#06B6D4", "#10B981", "#F59E0B"];
              const accent = accents[i % accents.length];
              return (
                <Reveal key={e.company} delay={i * 0.06}>
                  <li className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
                    {/* Node */}
                    <motion.span
                      whileInView={{ scale: [0.6, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="absolute left-4 top-5 z-10 -translate-x-1/2 md:left-1/2"
                    >
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <span className="absolute inset-0 rounded-full bg-primary/40 pulse-dot" />
                        <span className="relative h-3 w-3 rounded-full bg-primary glow-primary" />
                      </span>
                    </motion.span>

                    {/* Meta side */}
                    <div className={left ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}>
                      <div
                        className={`flex items-center gap-2 ${
                          left ? "md:justify-end" : ""
                        }`}
                      >
                        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {e.period}
                        </span>
                        {e.active && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground glow-primary">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inset-0 rounded-full bg-white pulse-dot" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                            </span>
                            Active now
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-2xl font-bold leading-tight">{e.role}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{e.company}</span> ·{" "}
                        {e.type}
                      </p>
                    </div>

                    {/* Card side */}
                    <div className={left ? "md:pl-12" : "md:order-1 md:pr-12"}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        style={{ ["--card-accent" as string]: accent }}
                        className="card-hover-glow glass relative overflow-hidden rounded-2xl p-6"
                      >
                        {/* gradient corner accent */}
                        <div
                          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl"
                          style={{ background: accent }}
                        />

                        <div className="mb-3 flex items-center gap-2 text-xs text-primary">
                          <Briefcase className="h-3.5 w-3.5" />
                          <span className="font-semibold uppercase tracking-wider">Mission</span>
                        </div>

                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {e.description}
                        </p>

                        {e.highlights && e.highlights.length > 0 && (
                          <ul className="mt-4 space-y-1.5">
                            {e.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-2 text-xs text-foreground/85"
                              >
                                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {e.stack && e.stack.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {e.stack.map((s) => (
                              <span
                                key={s}
                                className="rounded-full border border-glass-border bg-background/40 px-2 py-0.5 text-[10px] text-muted-foreground"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
