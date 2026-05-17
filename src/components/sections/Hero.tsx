import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Download, MapPin, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useMemo } from "react";
import { profile, heroStats, skills } from "@/lib/data";
import avatarImg from "@/assets/image.jfif";

export function Hero() {
  const marquee = useMemo(() => skills.slice(0, 18).map((s) => s.name), []);
  const nameChars = useMemo(() => profile.name.split(""), []);

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-28 pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-20 grid-fade" />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="aurora-blob absolute right-0 top-40 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" style={{ animationDelay: "-3s" }} />
        <div className="aurora-blob absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto max-w-6xl">

        {/* ── Two-column hero ── */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-12">

          {/* LEFT — text */}
          <div className="flex-1 text-center lg:text-left">

            {/* System Status Chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass border-glow group mb-8 inline-flex items-stretch overflow-hidden rounded-xl border border-glass-border p-[1px] text-[10px] sm:text-xs"
            >
              <div className="flex items-center gap-2 bg-background/40 px-3 py-1.5 font-mono font-bold uppercase tracking-widest text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Available
              </div>
              <div className="flex items-center gap-3 border-l border-glass-border bg-card/60 px-3 py-1.5 text-muted-foreground transition-colors group-hover:bg-card/80">
                <span>Open for Collaborations</span>
                <span className="h-3 w-px bg-glass-border" />
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                  <MapPin className="h-3 w-3 text-primary" /> India
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 text-xs uppercase tracking-[0.5em] text-primary"
            >
              Frontend · UX · AI Integrations
            </motion.p>

            {/* Animated name */}
            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
              }}
              className="text-[clamp(2.6rem,5.5vw,4.8rem)] font-extrabold leading-[1.05] tracking-tight"
              aria-label="Sangamithra D — Frontend Engineer"
            >
              <span className="sr-only">Sangamithra D — Frontend Engineer</span>
              {nameChars.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: -90 },
                    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className={`inline-block ${ch === " " ? "w-[0.4em]" : "text-gradient"}`}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </motion.h1>

            {/* Role tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              <Tag>Frontend Engineer</Tag>
              <Tag>React · TypeScript</Tag>
              <Tag>UX · AI Integrations</Tag>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              {profile.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow glow-primary"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${profile.email}?subject=Resume%20request%20%E2%80%94%20Sangamithra%20D&body=Hi%20Mithra%2C%20could%20you%20share%20your%20latest%20resume%3F`}
                className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-card/30 px-5 py-3 text-sm font-medium hover:bg-primary/10"
              >
                <Download className="h-4 w-4 text-primary" /> Request Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-card/30 px-5 py-3 text-sm font-medium hover:bg-primary/10"
              >
                <Sparkles className="h-4 w-4 text-primary" /> Let's collaborate
              </a>
              <div className="flex items-center gap-2">
                <IconLink href={profile.links.linkedin} label="LinkedIn">
                  <FaLinkedin className="h-4 w-4" />
                </IconLink>
                <IconLink href={profile.links.github} label="GitHub">
                  <SiGithub className="h-4 w-4" />
                </IconLink>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — portrait */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[360px] flex-shrink-0 lg:w-[380px] xl:w-[420px]"
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/35 via-primary-glow/20 to-transparent blur-3xl" />

            {/* Photo frame */}
            <div
              className="relative rounded-[2rem] p-[2px] shadow-2xl"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.62 0.27 305 / 0.95), oklch(0.78 0.18 310 / 0.4) 45%, oklch(0.62 0.27 305 / 0.75))",
              }}
            >
              <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-card">
                <img
                  src={avatarImg}
                  alt="Sangamithra D"
                  fetchPriority="high"
                  className="h-[460px] w-full object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {heroStats.map((s, i) => {
            const accent = STAT_ACCENTS[i];
            return (
              <motion.div
                key={s.label}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="card-hover-glow glass relative overflow-hidden rounded-2xl p-5 text-center"
                style={{
                  ["--card-accent" as string]: accent,
                  background: `color-mix(in oklab, ${accent} 16%, var(--color-card))`,
                }}
              >
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl" style={{ background: accent }} />
                <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl opacity-40" style={{ background: accent }} />
                <s.Icon className="relative mx-auto mb-3 h-6 w-6" style={{ color: accent }} />
                <div className="relative text-3xl font-extrabold md:text-4xl" style={{ color: accent }}>{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Skill marquee ── */}
      <div className="mx-auto mt-20 max-w-6xl overflow-hidden px-6">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="marquee-track flex w-max gap-3 whitespace-nowrap">
            {[...marquee, ...marquee].map((name, i) => (
              <span key={i} className="rounded-full border border-glass-border bg-card/30 px-4 py-1.5 text-xs text-muted-foreground">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.a
        href="#experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-12 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to experience"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-primary" />
        </motion.div>
      </motion.a>
    </section>
  );
}

const STAT_ACCENTS = ["#A855F7", "#06B6D4", "#EC4899", "#F59E0B"] as const;

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-glass-border bg-card/30 px-3 py-1 text-sm">
      {children}
    </span>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
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
