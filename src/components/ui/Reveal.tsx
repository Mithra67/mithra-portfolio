import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}
