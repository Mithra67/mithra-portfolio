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

        {/* Unified contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ ["--card-accent" as string]: "#A855F7" }}
          className="card-hover-glow glass mx-auto max-w-3xl overflow-hidden rounded-3xl"
        >
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                <Mail className="h-3 w-3" /> Email · usually replies within a day
              </span>
              <a
                href={`mailto:${profile.email}?subject=Inquiry from Portfolio — Sangamithra D&body=Hi Mithra,`}
                className="mt-3 block break-all text-lg font-bold transition-colors hover:text-primary sm:text-xl"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Copy email"
                title="Copy email"
                onClick={() =>
                  navigator.clipboard.writeText(profile.email).then(
                    () => toast.success("Email copied to clipboard"),
                    () => toast.error("Couldn't copy — please copy manually"),
                  )
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-primary/10 text-primary transition hover:bg-primary/25 active:scale-95"
              >
                <Copy className="h-4 w-4" />
              </button>
              <a
                href={`mailto:${profile.email}?subject=Inquiry from Portfolio — Sangamithra D&body=Hi Mithra,`}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
              >
                Say hello <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 border-t border-glass-border sm:grid-cols-2">
            <div className="flex items-center gap-3 px-6 py-4">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">India · Remote</p>
                <p className="text-xs text-muted-foreground">IST · overlaps EU & US hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-glass-border px-6 py-4 sm:border-l sm:border-t-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <div>
                <p className="text-sm font-semibold">Open to Frontend & Product roles</p>
                <p className="text-xs text-muted-foreground">Full-time · 2026</p>
              </div>
            </div>
          </div>
        </motion.div>

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
