import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { answerQuestion, suggestedQuestions } from "@/lib/knowledgeBase";
import avatar from "@/assets/avatar.jpg";

type Msg = { id: number; role: "user" | "bot"; text: string; pending?: boolean };

const ASSISTANT_NAME = "Aether";

export function DigitalGuardian() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: `Hey, I'm ${ASSISTANT_NAME} — I'll answer anything about my work, stack, or how to collaborate.`,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, isTyping]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || isTyping) return;
    const userId = Date.now();
    setMessages((m) => [...m, { id: userId, role: "user", text: q }]);
    setInput("");
    setIsTyping(true);

    // Natural typing delay based on response length
    const reply = answerQuestion(q);
    const delay = Math.min(900 + reply.length * 8, 2200);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: userId + 1, role: "bot", text: reply }]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      <motion.button
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={false as unknown as undefined}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={`Open ${ASSISTANT_NAME} chat`}
        className="fixed bottom-6 right-6 z-[60] h-16 w-16 cursor-grab overflow-hidden rounded-full border-2 border-primary/60 bg-card glow-strong active:cursor-grabbing"
      >
        <span className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-xl" />
        <img src={avatar} alt="" className="h-full w-full object-cover" />
        <span className="pointer-events-none absolute right-1 top-1 flex h-3 w-3">
          <span className="absolute inset-0 rounded-full bg-primary pulse-dot" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong fixed bottom-28 right-6 z-[60] flex h-[500px] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-glass-border bg-gradient-to-r from-primary/10 via-transparent to-primary-glow/10 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight">{ASSISTANT_NAME}</div>
                  <div className="text-[11px] text-muted-foreground">AI companion · drag me anywhere</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                        m.role === "user"
                          ? "rounded-br-md bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"
                          : "rounded-bl-md border border-glass-border bg-card/60 text-foreground backdrop-blur"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-glass-border bg-card/60 px-4 py-3 backdrop-blur">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-glass-border bg-card/40 px-3 py-1.5 text-[11px] text-muted-foreground transition hover:bg-primary/15 hover:text-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-glass-border bg-background/40 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${ASSISTANT_NAME} anything…`}
                className="flex-1 rounded-full border border-glass-border bg-card/60 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={isTyping}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground transition hover:scale-105 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
