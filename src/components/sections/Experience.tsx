import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { experience } from "@/lib/data";
import { Briefcase } from "lucide-react";

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
              <Reveal key={e.company} delay={i * 0.08}>
                <li className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
                  <span className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-primary glow-primary md:left-1/2" />
                  <div className={i % 2 === 0 ? "md:text-right md:pr-8" : "md:order-2 md:pl-8"}>
                    <p className="text-sm text-primary">{e.period}</p>
                    <h3 className="mt-1 text-xl font-bold">{e.role}</h3>
                    <p className="text-muted-foreground">{e.company}</p>
                  </div>
                  <div className={i % 2 === 0 ? "md:pl-8" : "md:order-1 md:pr-8 md:text-right"}>
                    <div className="glass rounded-2xl p-5">
                      <Briefcase className="mb-3 h-4 w-4 text-primary" />
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {e.points.map((p) => (
                          <li key={p}>• {p}</li>
                        ))}
                      </ul>
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
