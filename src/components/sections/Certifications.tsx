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
          title="Continuous learning, certified"
          description="A growing library of credentials — from full-stack engineering to applied AI."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="card-hover-glow glass group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-5"
              >
                {/* corner accent */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-50" />

                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-primary opacity-70" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">{c.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
                </div>
                <span className="mt-auto inline-flex w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
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
