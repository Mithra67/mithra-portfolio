import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { answerQuestion, suggestedQuestions } from "@/lib/knowledgeBase";
import avatar from "@/assets/avatar.jpg";

type Msg = { id: number; role: "user" | "bot"; text: string };

export function DigitalGuardian() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi! I'm Sangamithra's Digital Guardian. Ask me about her skills, experience, or projects.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [
      ...m,
      { id: Date.now(), role: "user", text: q },
      { id: Date.now() + 1, role: "bot", text: answerQuestion(q) },
    ]);
    setInput("");
  };

  return (
    <>
      <motion.button
        drag
        dragMomentum={false}
        dragElastic={0.15}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Digital Guardian chat"
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong fixed bottom-28 right-6 z-[60] flex h-[480px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl glow-primary"
          >
            <div className="flex items-center justify-between border-b border-glass-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-sm font-semibold">Digital Guardian</div>
                  <div className="text-[11px] text-muted-foreground">Online · drag me anywhere</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-glass-border bg-card/50 text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-glass-border bg-card/40 px-3 py-1.5 text-[11px] text-muted-foreground hover:bg-primary/15 hover:text-foreground"
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
                placeholder="Ask about skills, projects…"
                className="flex-1 rounded-full border border-glass-border bg-card/50 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-glow"
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
