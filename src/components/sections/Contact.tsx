import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Heart, Copy } from "lucide-react";
import { toast } from "sonner";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden scroll-mt-20 px-6 pb-10 pt-14">
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
          className="mb-10 text-center"
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
        <div className="grid gap-4 md:grid-cols-2">
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
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Usually a reply within a day.</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="break-all text-lg font-bold">{profile.email}</p>
                  <button
                    type="button"
                    aria-label="Copy email"
                    title="Copy email"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigator.clipboard.writeText(profile.email).then(
                        () => toast.success("Email copied to clipboard"),
                        () => toast.error("Couldn't copy — please copy manually"),
                      );
                    }}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-glass-border bg-primary/10 text-primary transition hover:bg-primary/25 active:scale-95"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="hidden h-8 w-px rounded-full bg-glass-border md:block" />
              <p className="hidden text-right text-[10px] font-bold uppercase tracking-widest text-primary/60 md:block">
                Direct Line
              </p>
            </div>
          </motion.a>


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

        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 pb-24 text-xs text-muted-foreground sm:flex-row sm:pr-24 sm:pb-8">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-semibold tracking-[0.2em] text-foreground">SANGAMITHRA D</span>
            <span suppressHydrationWarning>© {new Date().getFullYear()} · Designed & engineered with <Heart className="inline h-3 w-3 fill-primary text-primary" /> in India</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { href: profile.links.linkedin, label: "LinkedIn", Icon: FaLinkedin },
              { href: profile.links.github, label: "GitHub", Icon: SiGithub },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-card/40 text-foreground transition hover:-translate-y-0.5 hover:bg-primary/15 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
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
      aria-label={`${label} — ${handle}`}
      title={label}
      className="card-hover-glow glass group relative flex min-h-[140px] items-center justify-center rounded-3xl p-6"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-glass-border shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `color-mix(in oklab, ${accent} 18%, transparent)`,
          color: iconColorClass ? undefined : accent,
        }}
      >
        <Icon className={`h-8 w-8 ${iconColorClass ?? ""}`} />
      </div>
      <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  );
}
