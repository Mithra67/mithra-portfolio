import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X, ExternalLink, Mail } from "lucide-react";
import { getAetherResponse } from "@/lib/ai.functions";
import { profile } from "@/lib/data";
import mithraPhoto from "@/assets/mithra-profile.png.asset.json";

/** Render markdown-style **bold** inside a plain text segment. */
function renderBold(segment: string, keyPrefix: string) {
  const pieces = segment.split(/\*\*(.+?)\*\*/g);
  return pieces.map((piece, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-foreground">
        {piece}
      </strong>
    ) : (
      piece
    )
  );
}

/**
 * A lightweight parser to turn markdown-style links and emails into clickable React elements.
 */
function SafeLinkify({ text }: { text: string }) {
  const parts = useMemo(() => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const seg = text.substring(lastIndex, match.index);
        result.push(...renderBold(seg, `pre-${match.index}`));
      }

      const key = `${match.index}-${match[0]}`;

      if (match[3]) {
        const email = match[3];
        const mailto = `mailto:${email}`;
        const fullSubject = "?subject=Inquiry from Portfolio — Sangamithra D&body=Hi Mithra,";
        result.push(
          <a
            key={key}
            href={mailto + fullSubject}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              // CRITICAL: Ensure no interaction with AI companion drag or chat state
              e.stopPropagation();
              window.location.assign(mailto + fullSubject);
            }}
            className="inline-flex items-center gap-1.5 font-bold text-primary underline decoration-primary/30 underline-offset-4 transition-all duration-300 hover:decoration-primary/80 hover:opacity-80 active:scale-[0.98]"
          >
            <Mail className="h-3 w-3" />
            {email}
          </a>
        );
      } else {
        const label = match[1];
        const url = match[2];
        result.push(
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 font-bold text-primary underline decoration-primary/30 underline-offset-4 transition-all duration-300 hover:decoration-primary/80 hover:opacity-80 active:scale-[0.98]"
          >
            {label}
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push(...renderBold(text.substring(lastIndex), "tail"));
    }
    return result;
  }, [text]);

  return <>{parts}</>;
}

function localFallback(question: string): string {
  const q = question.toLowerCase();

  if (/\b(hi|hey|hello|yo)\b/.test(q))
    return `Hey! Great to meet you — I'm Mithra. Ask me about my projects, my React + TypeScript work, AI builds, or the roles I'm after. 👋`;

  if (/\bui\b|interface|react|frontend|front-end|component|dashboard|figma|design system|responsive/.test(q))
    return `I build **all kinds of UI on React** — enterprise dashboards with live charts, SaaS workflows and admin portals, reusable component libraries, responsive consumer sites, smooth animated interfaces, and AI chat UIs. I take designs from Figma to pixel-perfect, accessible **React + TypeScript** code.`;

  if (/stack|tech|tool|framework|language/.test(q))
    return `My core stack is **React + TypeScript** with Redux Toolkit, Tailwind, and Framer Motion. I regularly integrate AI APIs (Claude, Gemini, OpenAI) and use ECharts / Three.js for data-heavy dashboards. What part are you curious about?`;

  if (/experience|job|work|career|company/.test(q))
    return `I'm currently a **Product Developer at DEVOPSLABS** (Dec 2024 – now), building scalable React + TypeScript frontends and RBAC-driven enterprise UI. Before that I freelanced as a Frontend Engineer and interned at Stark Institutions.`;

  if (/project|build|portfolio/.test(q))
    return `A few I'm proud of:\n- **Sprint Flow** — AI-integrated sprint management dashboard\n- **DevPerf Analyser** — real-time developer productivity platform\n- **Smart Career** — high-performing web career portal\n\nWant details on any of these?`;

  if (/education|degree|college|cgpa|gpa/.test(q))
    return `I hold an **M.Sc. Computer Science** from SNMV — **University 7th Rank (9.031 CGPA)**, a **B.Sc. CS as Gold Medalist (9.014 CGPA)**, and I was **School 1st Rank** in 12th (95%).`;

  if (/cert/.test(q))
    return `I'm certified in Full Stack Development, React Advanced Patterns, TypeScript Mastery, and Prompt Engineering — among others.`;

  if (/contact|email|reach|linkedin|github/.test(q))
    return `Best ways to reach me:\n📧 **${profile.email}**\n💼 [LinkedIn](${profile.links.linkedin})\n🐙 [GitHub](${profile.links.github})`;

  if (/available|hire|open|collab|role|opportunity/.test(q))
    return `Yes — I'm actively looking for full-time product engineering roles in 2026, and open to select freelance/contract work. Drop me a line at **${profile.email}** and let's talk scope.`;

  if (/skill|rbac|security|architecture|speciali[sz]|strongest|strength/.test(q))
    return `My sweet spot is **RBAC / ABAC architecture** — designing permission models that scale without turning into spaghetti. I've shipped it in production for security-sensitive enterprise products, alongside React and deep data-visualisation layers.`;

  if (/type|kind|looking for|prefer/.test(q))
    return `I'm looking for product engineering roles where I can own complex UI architecture — ideally enterprise SaaS, fintech, or AI-product teams that care about security and performance.`;

  if (/remote|location|timezone/.test(q))
    return `I'm remote-first from India (IST — GMT+5:30), which overlaps comfortably with EST, CET, and GMT. Open to hybrid in India too.`;

  if (/salary|pay|rate|ctc/.test(q))
    return `I prefer to discuss compensation directly based on the role scope and company — reach me at **${profile.email}** and let's talk properly.`;

  if (/weakness|weak|flaw|struggle|improve|bad at/.test(q))
    return `Honestly? There's nothing I feel I genuinely can't do. Anything I'm weak at, I treat as the next thing to master — I keep practising until that gap turns into a strength.`;

  if (/soft skill|leadership|communication|teamwork|collaborat|personality|work style/.test(q))
    return `A few that recruiters usually care about:\n- **Leadership** — I lead features end-to-end and mentor peers\n- **Strong communication** — I translate business intent into clean technical decisions\n- **Ownership & accountability** across design, backend, and QA\n- **Continuous learner** — I pick up new stacks and ship fast\n- **Calm under shipping pressure**`;

  if (/who|about|yourself/.test(q))
    return `${profile.bio} I care a lot about security-first UI, clean component architecture, and shipping things that actually work.`;

  return `That's a good one — I don't have a polished answer ready right now. Hit me at **${profile.email}** and I'll get back to you properly.`;
}

type Msg = { id: number; role: "user" | "bot"; text: string; displayBuffer?: string };

const ASSISTANT_NAME = "Mithra";

export function AetherChat() {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [typingId, setTypingId] = useState<number | null>(null);
  const INTRO = `Hey! I'm Mithra 👋 Ask me anything about my work — projects, frontend engineering, AI builds, or the roles I'm after.`;
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: INTRO,
      displayBuffer: INTRO,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const draggedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open, isThinking]);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  // Smooth word-by-word reveal — reads like the answer is streaming in.
  const typeMessage = useCallback(async (msgId: number, fullText: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const tokens = fullText.split(/(\s+)/); // keeps words and whitespace separate
    let acc = "";
    for (const token of tokens) {
      if (controller.signal.aborted) return;
      acc += token;
      const snapshot = acc;
      setMessages((m) =>
        m.map((msg) => (msg.id === msgId ? { ...msg, displayBuffer: snapshot } : msg))
      );
      const isWhitespace = /^\s+$/.test(token);
      const delay = isWhitespace ? 10 : 34 + Math.random() * 26;
      await new Promise<void>((resolve) => {
        const id = setTimeout(resolve, delay);
        controller.signal.addEventListener("abort", () => clearTimeout(id), { once: true });
      });
    }
    if (!controller.signal.aborted) {
      setMessages((m) =>
        m.map((msg) => (msg.id === msgId ? { ...msg, displayBuffer: fullText } : msg))
      );
    }
  }, []);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || isTyping) return;

    const userId = Date.now();
    setMessages((m) => [...m, { id: userId, role: "user", text: q, displayBuffer: q }]);
    setInput("");
    setIsTyping(true);
    setIsThinking(true);

    const startedAt = Date.now();
    let reply = "";
    try {
      const result = await Promise.race([
        getAetherResponse({ data: { question: q } }),
        new Promise<string>((_, reject) => setTimeout(() => reject(new Error("timeout")), 18000)),
      ]);
      reply = typeof result === "string" && result.trim() ? result : localFallback(q);
    } catch {
      reply = localFallback(q);
    }

    // Let the "typing" moment breathe for a beat before the answer streams in
    const elapsed = Date.now() - startedAt;
    if (elapsed < 700) {
      await new Promise<void>((resolve) => setTimeout(resolve, 700 - elapsed));
    }

    setIsThinking(false);
    const botId = userId + 1;
    setMessages((m) => [...m, { id: botId, role: "bot", text: reply, displayBuffer: "" }]);
    setTypingId(botId);
    try {
      await typeMessage(botId, reply);
    } catch {
      // reveal interrupted
    } finally {
      setTypingId(null);
      setIsTyping(false);
    }
  };

  const [showHi, setShowHi] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setShowHi(true), 2500);
    const t2 = setTimeout(() => setShowHi(false), 12000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div ref={dragRef} className="pointer-events-none fixed inset-0 z-[60]">
      {/* Floating Toggle Bubble */}
      <motion.button
        drag
        dragMomentum={false}
        dragElastic={0.05}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        onDragStart={() => { draggedRef.current = true; }}
        onDragEnd={() => { setTimeout(() => { draggedRef.current = false; }, 50); }}
        dragConstraints={isMounted ? dragRef : undefined}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.07 }}
        onClick={() => { if (!draggedRef.current) setOpen((o) => !o); }}
        aria-label={open ? "Close chat" : "Chat with Mithra's AI assistant"}
        className="pointer-events-auto fixed bottom-6 right-6 flex h-16 w-16 cursor-grab items-center justify-center rounded-full border border-glass-border bg-gradient-to-br from-primary to-primary-glow shadow-2xl backdrop-blur-md transition-shadow duration-300 hover:brightness-110 active:cursor-grabbing"
      >
        <span className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-primary/25 blur-2xl" />
        <div className="float-bob relative h-14 w-14 overflow-hidden rounded-full border border-white/30 p-0.5 shadow-inner">
          <img src={mithraPhoto.url} alt="Chat with Mithra" className="h-full w-full rounded-full object-cover" />
        </div>
      </motion.button>

      <AnimatePresence>
        {showHi && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="pointer-events-auto fixed bottom-24 right-6 flex max-w-[240px] items-start gap-2 rounded-2xl border border-glass-border bg-popover/80 px-3.5 py-2.5 text-xs text-foreground shadow-xl backdrop-blur-xl"
          >
            <button onClick={() => setOpen(true)} className="text-left leading-snug">
              Hi! I'm Mithra's AI — ask me anything 👋
            </button>
            <button onClick={() => setShowHi(false)} aria-label="Dismiss greeting" className="text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 32, scale: 0.96, filter: "blur(12px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto fixed bottom-28 right-6 flex h-[540px] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2rem] border border-glass-border bg-popover/85 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="relative border-b border-border/60 px-6 py-4">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-primary-glow/8" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-primary/40 ring-2 ring-primary/15">
                      <img src={mithraPhoto.url} alt="Mithra" className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                      <span className="relative inline-flex h-3 w-3 rounded-full border border-background bg-primary" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold tracking-tight text-foreground">Mithra's AI Assistant</h3>
                    <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                      <span className="h-1 w-1 animate-pulse rounded-full bg-primary" /> Active now
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full bg-secondary/70 p-2 text-muted-foreground transition-all duration-300 hover:bg-primary/15 hover:text-primary active:scale-90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-5 py-5 scrollbar-hide"
            >
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 14, scale: 0.98, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[88%] whitespace-pre-line px-4 py-3 text-[14px] leading-relaxed shadow-md ${
                        m.role === "user"
                          ? "rounded-2xl rounded-tr-sm bg-gradient-to-br from-primary to-primary-glow font-medium text-primary-foreground"
                          : "rounded-2xl rounded-tl-sm border border-border/70 bg-secondary/60 text-foreground backdrop-blur-md"
                      }`}
                    >
                      {m.role === "bot" && (
                        <div className="absolute -left-0.5 top-3 h-4 w-1 rounded-full bg-primary/50" />
                      )}
                      <SafeLinkify text={m.displayBuffer !== undefined ? m.displayBuffer : m.text} />
                      {m.role === "bot" && m.id === typingId && (
                        <span className="ml-1 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse rounded-full bg-primary align-middle" />
                      )}
                    </div>
                  </motion.div>
                ))}

                {isThinking && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm border border-border/70 bg-secondary/60 px-4 py-3.5 backdrop-blur-md">
                      <div className="flex items-center gap-1.5">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                      <span className="badge-shimmer-violet text-[12px] font-bold uppercase tracking-widest">
                        Typing…
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && !isTyping && (
              <div className="flex flex-wrap gap-1.5 px-5 pb-3">
                {[
                  "What's your core stack?",
                  "Walk me through your best project",
                  "What are your strengths?",
                  "What's your biggest weakness?",
                  "Are you available for roles?",
                  "How do I reach you?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-glass-border bg-card/60 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/12 hover:text-primary active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-5 pt-2">
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-glass-border bg-card/60 p-1.5 pl-5 transition-all duration-300 focus-within:border-primary/50 focus-within:bg-card/90 focus-within:ring-4 focus-within:ring-primary/15"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${ASSISTANT_NAME}…`}
                  aria-label="Ask a question"
                  disabled={isTyping}
                  className="flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 disabled:opacity-60"
                />
                <motion.button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  aria-label="Send message"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
