import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-12 pt-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96">
        <div className="mx-auto h-full w-[80%] rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Big marquee headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">Get in touch</p>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
            Let's build <span className="text-gradient">something great.</span>
          </h2>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid gap-4 md:grid-cols-6">
          {/* Email — large card */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            href={`mailto:${profile.email}`}
            className="glass group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-all hover:glow-primary md:col-span-4 md:row-span-2 md:min-h-[280px]"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                <Mail className="h-3 w-3" /> Email
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Drop a line — usually a reply within a day.</p>
              <p className="mt-2 break-all text-2xl font-bold md:text-3xl">{profile.email}</p>
            </div>
          </motion.a>

          {/* LinkedIn */}
          <SocialTile
            href={profile.links.linkedin}
            label="LinkedIn"
            handle="/in/sangamithra-d"
            Icon={Linkedin}
            colspan="md:col-span-2"
            delay={0.1}
          />

          {/* GitHub */}
          <SocialTile
            href={profile.links.github}
            label="GitHub"
            handle="github.com"
            Icon={Github}
            colspan="md:col-span-2"
            delay={0.15}
          />

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass col-span-1 rounded-3xl p-6 md:col-span-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <MapPin className="h-3 w-3" /> Based in
            </span>
            <p className="mt-3 text-2xl font-bold">India · Remote-friendly</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Working across IST · open to GMT, EST, CET overlaps.
            </p>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="glass col-span-1 rounded-3xl p-6 md:col-span-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Status
            </span>
            <p className="mt-3 text-2xl font-bold">Available for new product work</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Best fit: enterprise React, RBAC, design-system led teams.
            </p>
          </motion.div>
        </div>

        {/* Footer line */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-glass-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}. Crafted with intent.</span>
          <span className="flex items-center gap-2">
            Built with React 19 · TypeScript · Framer Motion
          </span>
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
  colspan,
  delay,
}: {
  href: string;
  label: string;
  handle: string;
  Icon: React.ComponentType<{ className?: string }>;
  colspan: string;
  delay: number;
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
      className={`glass group relative col-span-1 flex flex-col justify-between rounded-3xl p-6 transition-all hover:glow-primary ${colspan}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-bold">{handle}</p>
      </div>
    </motion.a>
  );
}
