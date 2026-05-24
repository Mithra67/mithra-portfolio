import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X, ExternalLink, Mail } from "lucide-react";
import { getAetherResponse } from "@/lib/ai.functions";
import { profile } from "@/lib/data";
import aetherAvatar from "@/assets/aether-avatar.jpg";

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
        result.push(text.substring(lastIndex, match.index));
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
            className="inline-flex items-center gap-1.5 font-bold text-primary underline decoration-primary/20 underline-offset-4 transition-all hover:decoration-primary/60"
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
            className="inline-flex items-center gap-1 font-bold text-primary underline decoration-primary/20 underline-offset-4 transition-all hover:decoration-primary/60"
          >
            {label}
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }
    return result;
  }, [text]);

  return <>{parts}</>;
}

function localFallback(question: string): string {
  const q = question.toLowerCase();
  
  const ASSISTANT_INFO = `Greetings. I am Aether, Mithra's portfolio assistant. You may ask me about her engineering expertise, projects, or professional background.`;

  if (/\b(hi|hey|hello|yo)\b/.test(q))
    return ASSISTANT_INFO;
    
  if (/stack|tech|tool|framework|language/.test(q))
    return `Mithra's core stack revolves around **React, TypeScript**, and Redux Toolkit. She specializes in data visualization using ECharts and Three.js. Her infrastructure experience includes Docker, Kubernetes, and Kafka.`;
    
  if (/experience|job|work|career|company/.test(q))
    return `She is currently a **Product Developer at DEVOPSLABS**, focused on RBAC-driven architectures and scalable enterprise dashboards. Her previous experience includes freelance consulting and internships at Stark Institutions.`;
    
  if (/project|build|portfolio/.test(q))
    return `Key projects include:\n- **Sprint Flow**: AI-integrated sprint management dashboard\n- **DevPerf Analyser**: Real-time developer productivity platform\n- **Smart Career**: High-performing web career portal`;
    
  if (/education|degree|college|gpa/.test(q))
    return `Mithra holds an **M.Sc. in Computer Science** (9.0 CGPA) and a **B.Sc. in Computer Science** (9.014 GPA, Gold Medalist).`;
    
  if (/cert/.test(q))
    return `Her certifications include Full Stack Development, React Advanced Patterns, and Prompt Engineering for Developers.`;
    
  if (/contact|email|reach|linkedin|github/.test(q))
    return `You may reach Mithra via:\n📧 ${profile.email}\n💼 [LinkedIn](${profile.links.linkedin})\n🐙 [GitHub](${profile.links.github})`;
    
  if (/available|hire|open|collab|role|opportunity/.test(q))
    return `Mithra is actively exploring product engineering opportunities for 2026. She is also available for high-impact freelance engagements.`;
    
  if (/skill|rbac|security|architecture|speciali[sz]|strongest|strength/.test(q))
    return `Her primary specialization is **RBAC / ABAC architecture**, designing scalable permission models for enterprise applications. This is typically implemented alongside React and deep data visualization layers.`;
    
  if (/type|kind|looking for|prefer/.test(q))
    return `She prefers working with Engineering-heavy teams in SaaS, FinTech, or AI-product spaces that prioritize security and high-performance UI.`;
    
  if (/remote|location|timezone/.test(q))
    return `She works remote-first from India (IST / GMT+5:30), with overlap for EST, CET, and GMT timezones.`;
    
  if (/salary|pay|rate|ctc/.test(q))
    return `Mithra prefers to discuss compensation directly based on the specific scope of the role.`;
    
  if (/who|about|yourself/.test(q))
    return `Mithra is a product-focused engineer with a deep interest in security-first UI and complex dashboard systems. I am her digital assistant, trained on her professional history.`;
    
  return `Not available in portfolio data. You may contact Mithra directly at ${profile.email} for this information.`;
}

type Msg = { id: number; role: "user" | "bot"; text: string; displayBuffer?: string };

const ASSISTANT_NAME = "Aether";

export function AetherChat() {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const INTRO = `Hey — I'm Mithra's AI assistant. Ask me about projects, frontend engineering, AI work, UX thinking, or roles Mithra is targeting.`;
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
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, showDots]);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  const typeMessage = useCallback(async (msgId: number, fullText: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    // Chunked reveal — fast, smooth, never blocks the UI for long
    const CHUNK = 3;
    for (let i = 0; i < fullText.length; i += CHUNK) {
      if (controller.signal.aborted) return;
      const slice = fullText.slice(0, i + CHUNK);
      setMessages((m) =>
        m.map((msg) => (msg.id === msgId ? { ...msg, displayBuffer: slice } : msg))
      );
      await new Promise<void>((resolve) => {
        const id = setTimeout(resolve, 14);
        controller.signal.addEventListener("abort", () => clearTimeout(id), { once: true });
      });
    }
    // Ensure full text is shown at the end
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
    setShowDots(true);

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

    setShowDots(false);
    const botId = userId + 1;
    setMessages((m) => [...m, { id: botId, role: "bot", text: reply, displayBuffer: "" }]);
    try {
      await typeMessage(botId, reply);
    } catch {
      // typewriter interrupted
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div ref={dragRef} className="pointer-events-none fixed inset-0 z-[60]">
      {/* Floating Toggle Bubble */}
      <motion.button
        drag
        dragMomentum={false}
        dragElastic={0.05}
        dragConstraints={isMounted ? dragRef : undefined}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.06 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="pointer-events-auto fixed bottom-6 right-6 flex h-16 w-16 cursor-grab items-center justify-center rounded-full border border-white/20 shadow-2xl backdrop-blur-md active:cursor-grabbing"
        style={{ 
          background: "linear-gradient(135deg, oklch(0.6 0.28 300 / 0.9), oklch(0.7 0.2 310 / 0.8))",
          boxShadow: "0 0 40px -10px oklch(0.6 0.28 300 / 0.5), inset 0 0 20px oklch(1 0 0 / 0.1)"
        }}
      >
        <span className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-2xl" />
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/30 p-0.5">
           <img src={aetherAvatar} alt="Aether assistant avatar" className="h-full w-full rounded-full object-cover shadow-inner" />
        </div>
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-primary shadow-lg ring-1 ring-white/20">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto fixed bottom-28 right-6 flex h-[540px] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
            style={{ 
              background: "linear-gradient(165deg, rgba(15,15,20,0.85), rgba(25,25,35,0.7) 40%, rgba(10,10,15,0.9))",
            }}
          >
            {/* Header Area */}
            <div className="relative border-b border-white/5 px-6 py-5">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary-glow/5" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-primary/30 ring-2 ring-primary/10">
                       <img src={aetherAvatar} alt="Aether assistant avatar" className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full border border-black/40 bg-emerald-400" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold tracking-tight text-white">{ASSISTANT_NAME}</h3>
                    <p className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-primary" /> Active Now
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full bg-white/5 p-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div 
              ref={scrollRef} 
              className="flex-1 space-y-5 overflow-y-auto px-5 py-6 scrollbar-hide"
            >
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[88%] whitespace-pre-line px-4 py-3 text-[14px] leading-relaxed shadow-xl ${
                        m.role === "user"
                          ? "rounded-2xl rounded-tr-sm bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-medium"
                          : "rounded-2xl rounded-tl-sm border border-white/5 bg-white/5 text-foreground/95 backdrop-blur-md"
                      }`}
                    >
                      {m.role === "bot" && (
                        <div className="absolute -left-0.5 top-3 h-4 w-1 rounded-full bg-primary/40" />
                      )}
                      <SafeLinkify text={m.displayBuffer !== undefined ? m.displayBuffer : m.text} />
                    </div>
                  </motion.div>
                ))}

                {showDots && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/5 bg-white/5 px-5 py-4 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "0.2s" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && !isTyping && (
              <div className="flex flex-wrap gap-1.5 px-5 pb-3">
                {[
                  "What's Mithra's core stack?",
                  "Walk me through her best project",
                  "What are her strengths?",
                  "What's her biggest weakness?",
                  "Tell me about her soft skills",
                  "Is she available for roles?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-foreground/80 transition hover:border-primary/40 hover:bg-primary/15 hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Island */}
            <div className="p-5 pt-0">
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 p-1.5 pl-5 transition-all focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 backdrop-blur-xl"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${ASSISTANT_NAME}…`}
                  aria-label="Ask a question"
                  disabled={isTyping}
                  className="flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-muted-foreground/60 disabled:opacity-60"
                />
                <motion.button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  aria-label="Send message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary-glow disabled:opacity-40 disabled:hover:scale-100"
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

