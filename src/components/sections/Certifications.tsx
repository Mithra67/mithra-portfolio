import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { certifications } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials that back the craft."
          description="React, TypeScript, Python, and Prompt Engineering — each credential tied to tools I ship with daily."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                style={{ ["--card-accent" as string]: c.accent }}
                className="card-hover-glow glass group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-5"
              >
                {/* corner accent */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 opacity-40 group-hover:opacity-90"
                  style={{ background: c.accent }}
                />

                <div className="flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: `color-mix(in oklab, ${c.accent} 18%, transparent)`,
                      color: c.accent,
                    }}
                  >
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <CheckCircle2 className="h-4 w-4 opacity-70" style={{ color: c.accent }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">{c.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
                </div>
                <span
                  className="mt-auto inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  style={{
                    background: `color-mix(in oklab, ${c.accent} 14%, transparent)`,
                    color: c.accent,
                  }}
                >
                  {c.year}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
