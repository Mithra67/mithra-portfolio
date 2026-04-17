import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 text-center glow-strong">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Let's build</p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Have a product in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              I partner with teams shipping ambitious enterprise products. Drop a line — I usually
              respond within a day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow glow-primary"
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-card/30 px-4 py-2.5 text-sm font-medium hover:bg-primary/10"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-card/30 px-4 py-2.5 text-sm font-medium hover:bg-primary/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Crafted with intent.
        </p>
      </div>
    </section>
  );
}
