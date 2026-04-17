import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Certifications"
          title="Continuous learning, certified"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <div className="glass group flex h-full flex-col gap-3 rounded-2xl p-5 transition-all hover:glow-primary">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <c.Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">{c.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
                </div>
                <span className="mt-auto text-[11px] font-semibold text-primary">{c.year}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
