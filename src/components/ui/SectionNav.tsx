import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const SECTIONS: { id: string; label: string }[] = [
  { id: "top", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "academics", label: "Academics" },
  { id: "skills", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function SectionNav() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id));

    const onScroll = () => {
      setVisible(window.scrollY > 240);
      const mid = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      nodes.forEach((n, i) => {
        if (n && n.offsetTop <= mid) idx = i;
      });
      setActive(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prev = SECTIONS[active - 1];
  const next = SECTIONS[active + 1];
  const current = SECTIONS[active];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Section navigator"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: [0, -4, 0],
          }}
          exit={{ opacity: 0, y: 30 }}
          transition={{
            opacity: { duration: 0.35 },
            y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4 pointer-events-none"
        >
          <div className="glass pointer-events-auto flex items-center gap-1 rounded-full border border-glass-border bg-card/70 p-1.5 shadow-2xl backdrop-blur-xl">
            <button
              onClick={() => prev && goTo(prev.id)}
              disabled={!prev}
              aria-label={prev ? `Go to ${prev.label}` : "At top"}
              className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-primary/15 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">{prev?.label ?? "Top"}</span>
            </button>

            <div className="relative flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              {current.label}
            </div>

            <button
              onClick={() => next && goTo(next.id)}
              disabled={!next}
              aria-label={next ? `Go to ${next.label}` : "At end"}
              className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-primary/15 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <span className="hidden sm:inline">{next?.label ?? "End"}</span>
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
