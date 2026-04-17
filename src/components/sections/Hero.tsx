import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-workspace.jpg";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-36 md:pt-44">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-primary pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-muted-foreground">Available for new product collaborations</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
          >
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xl font-medium text-foreground/90 md:text-2xl"
          >
            {profile.role}
            <span className="mx-3 text-primary">·</span>
            <span className="text-muted-foreground">React · TypeScript · RBAC</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow glow-primary"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" /> India · Remote-friendly
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-2 glow-strong">
            <img
              src={heroImg}
              alt="Premium developer workspace with glowing purple accents"
              width={1536}
              height={1024}
              className="h-auto w-full rounded-2xl"
            />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-4 bottom-6 hidden rounded-2xl px-4 py-3 text-xs sm:block"
          >
            <div className="font-semibold">RBAC architect</div>
            <div className="text-muted-foreground">Enterprise-grade access</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -right-4 top-8 hidden rounded-2xl px-4 py-3 text-xs sm:block"
          >
            <div className="font-semibold">React 19 · TypeScript</div>
            <div className="text-muted-foreground">Strict, typed primitives</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
