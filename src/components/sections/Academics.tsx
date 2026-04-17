import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { education } from "@/lib/data";
import { GraduationCap, Award } from "lucide-react";

export function Academics() {
  return (
    <section id="academics" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Academic Path" title="Built on a foundation of excellence" />
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.1}>
              <div className={`glass relative overflow-hidden rounded-2xl p-6 ${e.accent ? "glow-primary" : ""}`}>
                {e.accent && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    <Award className="h-3 w-3" /> Gold Medalist
                  </div>
                )}
                <GraduationCap className="mb-4 h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold">{e.school}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.degree}</p>
                <p className="mt-4 text-2xl font-extrabold text-gradient">{e.score}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
