import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-24 pt-36 md:pt-44"
    >
      {/* ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-primary-glow/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mx-auto mb-10 flex w-fit items-center gap-3 rounded-full px-4 py-1.5 text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-primary pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-muted-foreground">
            Open to product collaborations · 2025
          </span>
          <span className="h-3 w-px bg-glass-border" />
          <span className="inline-flex items-center gap-1 text-foreground/80">
            <MapPin className="h-3 w-3 text-primary" /> India
          </span>
        </motion.div>

        {/* Centered display name */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.5em] text-primary"
          >
            Product · Design · Engineering
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 text-[clamp(2.75rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-5 inline-flex flex-wrap items-center justify-center gap-2 text-base text-muted-foreground md:text-lg"
          >
            <Tag>Product Developer</Tag>
            <Tag>React 19 · TypeScript</Tag>
            <Tag>RBAC Architect</Tag>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow glow-primary"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-card/30 px-5 py-3 text-sm font-medium hover:bg-primary/10"
            >
              <Sparkles className="h-4 w-4 text-primary" /> Let's collaborate
            </a>
            <div className="flex items-center gap-2">
              <IconLink href={profile.links.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </IconLink>
              <IconLink href={profile.links.github} label="GitHub">
                <Github className="h-4 w-4" />
              </IconLink>
            </div>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="glass mx-auto mt-16 grid max-w-4xl grid-cols-2 divide-glass-border rounded-2xl text-center sm:grid-cols-4 sm:divide-x"
        >
          <Stat value="3+" label="Years building" />
          <Stat value="9.0" label="Master's CGPA" />
          <Stat value="30+" label="Tools mastered" />
          <Stat value="4" label="Certifications" />
        </motion.div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-glass-border bg-card/30 px-3 py-1 text-sm">
      {children}
    </span>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-card/30 transition-colors hover:bg-primary/15 hover:text-primary"
    >
      {children}
    </a>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4 py-5">
      <div className="text-2xl font-extrabold text-gradient md:text-3xl">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
