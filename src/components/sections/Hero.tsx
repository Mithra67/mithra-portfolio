import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";
import { profile, heroStats, skills } from "@/lib/data";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Marquee skill names — pulled from real data, so it stays in sync
  const marquee = skills.slice(0, 18).map((s) => s.name);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden px-6 pb-28 pt-36 md:pt-44"
    >
      {/* Animated grid backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-20 grid-fade" />

      {/* Aurora orbs with parallax */}
      <motion.div
        style={{ y: orbY }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="aurora-blob absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="aurora-blob absolute right-0 top-40 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" style={{ animationDelay: "-3s" }} />
        <div className="aurora-blob absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" style={{ animationDelay: "-6s" }} />
      </motion.div>

      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="mx-auto max-w-6xl">
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
          <span className="text-muted-foreground">Open to product collaborations · 2025</span>
          <span className="h-3 w-px bg-glass-border" />
          <span className="inline-flex items-center gap-1 text-foreground/80">
            <MapPin className="h-3 w-3 text-primary" /> India
          </span>
        </motion.div>

        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.5em] text-primary"
          >
            Product · Design · Engineering
          </motion.p>

          {/* Animated split-letter name */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
            }}
            className="mt-6 text-[clamp(2.75rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tight"
          >
            {profile.name.split("").map((ch, i) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-5 inline-flex flex-wrap items-center justify-center gap-2 text-base text-muted-foreground md:text-lg"
          >
            <Tag>Product Developer</Tag>
            <Tag>React 19 · TypeScript</Tag>
            <Tag>RBAC Architect</Tag>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
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

        {/* Animated stat strip with hover glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="card-hover-glow glass relative overflow-hidden rounded-2xl p-5 text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <s.Icon className="mx-auto mb-2 h-5 w-5 text-primary" />
              <div className="text-2xl font-extrabold text-gradient md:text-3xl">{s.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Live skill marquee — gives a "moving" feel to the page */}
      <div className="relative mt-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-track flex w-max gap-3 whitespace-nowrap">
          {[...marquee, ...marquee].map((name, i) => (
            <span
              key={i}
              className="rounded-full border border-glass-border bg-card/30 px-4 py-1.5 text-xs text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-12 flex items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-glass-border p-1"
        >
          <span className="h-1.5 w-1 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
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
