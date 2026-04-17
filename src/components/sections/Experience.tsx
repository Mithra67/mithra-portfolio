import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="A track record of shipping"
          description="Roles where I shaped product, performance, and security from the inside out."
        />
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2" />
          <ul className="space-y-10">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.06}>
                <li className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
                  <span className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-primary glow-primary md:left-1/2" />
                  <div className={i % 2 === 0 ? "md:text-right md:pr-8" : "md:order-2 md:pl-8"}>
                    <p className="text-sm text-primary">{e.period}</p>
                    <h3 className="mt-1 text-xl font-bold">{e.role}</h3>
                    <p className="text-muted-foreground">{e.company}</p>
                    <div
                      className={`mt-2 inline-flex items-center gap-2 ${
                        i % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="rounded-full border border-glass-border bg-card/30 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                        {e.type}
                      </span>
                      {e.active && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inset-0 rounded-full bg-primary pulse-dot" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                          </span>
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={i % 2 === 0 ? "md:pl-8" : "md:order-1 md:pr-8 md:text-right"}>
                    <div className="glass rounded-2xl p-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {e.description}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
