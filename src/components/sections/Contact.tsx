import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Heart } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-12 pt-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96">
        <div className="aurora-blob mx-auto h-full w-[80%] rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">Get in touch</p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight">
            Let's build <span className="text-gradient">something great.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
            I'm currently taking on a small number of product engagements for 2026 — enterprise
            React, RBAC platforms, and design-system led teams.
          </p>
        </motion.div>

        {/* Balanced bento — 3x2 layout */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Email — wide bar across 2 cols */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            href={`mailto:${profile.email}?subject=Inquiry from Portfolio — Sangamithra D&body=Hi Mithra,`}
            style={{ ["--card-accent" as string]: "#A855F7" }}
            className="card-hover-glow glass group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 md:col-span-2"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                <Mail className="h-3 w-3" /> Email
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Usually a reply within a day.</p>
                <p className="mt-1 break-all text-lg font-bold">{profile.email}</p>
              </div>
              <div className="hidden h-8 w-px rounded-full bg-glass-border md:block" />
              <p className="hidden text-right text-[10px] font-bold uppercase tracking-widest text-primary/60 md:block">
                Direct Line
              </p>
            </div>
          </motion.a>

          {/* LinkedIn */}
          <SocialTile
            href={profile.links.linkedin}
            label="LinkedIn"
            handle="/in/sangamithra-d"
            Icon={FaLinkedin}
            accent="#0A66C2"
            delay={0.1}
          />

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ ["--card-accent" as string]: "#06B6D4" }}
            className="card-hover-glow glass rounded-3xl p-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <MapPin className="h-3 w-3" /> Based in
            </span>
            <p className="mt-3 text-lg font-bold">India · Remote</p>
            <p className="mt-1 text-xs text-muted-foreground">Global Availability.</p>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ ["--card-accent" as string]: "#10B981" }}
            className="card-hover-glow glass rounded-3xl p-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available
            </span>
            <p className="mt-3 text-lg font-bold">Product Work</p>
            <p className="mt-1 text-xs text-muted-foreground">Open for 2026 roles.</p>
          </motion.div>

          {/* GitHub */}
          <SocialTile
            href={profile.links.github}
            label="GitHub"
            handle="@Mithra67"
            Icon={SiGithub}
            accent="#8B949E"
            iconColorClass="text-foreground"
            delay={0.25}
          />
        </div>

        {/* Footer line — refined, no "built with" */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-primary pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-semibold tracking-[0.2em] text-foreground">
              SANGAMITHRA D
            </span>
          </div>
          <span suppressHydrationWarning>© {new Date().getFullYear()} · Designed & engineered with <Heart className="inline h-3 w-3 fill-primary text-primary" /> in India</span>
        </div>
      </div>
    </section>
  );
}

function SocialTile({
  href,
  label,
  handle,
  Icon,
  accent,
  delay,
  iconColorClass,
}: {
  href: string;
  label: string;
  handle: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  delay: number;
  iconColorClass?: string;
}) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ ["--card-accent" as string]: accent }}
      className="card-hover-glow glass group relative flex flex-col justify-between rounded-3xl p-6"
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            background: `color-mix(in oklab, ${accent} 18%, transparent)`,
            color: iconColorClass ? undefined : accent,
          }}
        >
          <Icon className={`h-5 w-5 ${iconColorClass ?? ""}`} />
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 text-base font-bold">{handle}</p>
      </div>
    </motion.a>
  );
}
