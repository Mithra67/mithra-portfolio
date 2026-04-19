import { profile, experience, skills, projects, education } from "./data";

type Reply = { match: (q: string) => boolean; answer: () => string };

const has = (q: string, ...keys: string[]) => keys.some((k) => q.includes(k));

const replies: Reply[] = [
  {
    match: (q) => has(q, "hello", "hi ", "hey", "yo "),
    answer: () =>
      `Hey! I'm Aether — Sangamithra's AI companion. Ask me anything about my work, the stack I use, or how to reach out.`,
  },
  {
    match: (q) => has(q, "skill", "stack", "tech", "tool"),
    answer: () =>
      `I work across ${skills.slice(0, 12).map((s) => s.name).join(", ")} and more. My sweet spot is React + TypeScript with strong RBAC architecture and developer experience.`,
  },
  {
    match: (q) => has(q, "experience", "work", "job", "company", "role"),
    answer: () =>
      `Here's where I've been shipping:\n` +
      experience.map((e) => `• ${e.role} @ ${e.company} (${e.period})`).join("\n"),
  },
  {
    match: (q) => has(q, "project", "build", "portfolio", "case"),
    answer: () =>
      `A few projects I'm proud of:\n` +
      projects.map((p) => `• ${p.title} — ${p.subtitle}`).join("\n"),
  },
  {
    match: (q) => has(q, "guardian", "claude", "ai assistant", "chatbot"),
    answer: () =>
      `Guardian AI is a Claude-powered companion I built — streaming responses grounded in a private knowledge base, with tool-use and a draggable floating UI.`,
  },
  {
    match: (q) => has(q, "education", "study", "college", "degree", "gpa", "school"),
    answer: () =>
      `Academically:\n` +
      education.map((e) => `• ${e.school} — ${e.degree} (${e.score})`).join("\n"),
  },
  {
    match: (q) => has(q, "contact", "email", "reach", "hire", "linkedin", "github"),
    answer: () =>
      `Best ways to reach me:\nEmail: ${profile.email}\nLinkedIn: ${profile.links.linkedin}\nGitHub: ${profile.links.github}`,
  },
  {
    match: (q) => has(q, "who", "about", "bio", "yourself", "you"),
    answer: () =>
      `I'm a Product Developer focused on engineering scalable, secure enterprise apps — RBAC architecture, rich data visualizations, and design-system-led teams.`,
  },
  {
    match: (q) => has(q, "available", "hire", "freelance", "open"),
    answer: () =>
      `Yes — I'm currently taking on a small number of product engagements for 2025. Drop me a line at ${profile.email}.`,
  },
];

export function answerQuestion(question: string): string {
  const q = question.toLowerCase().trim();
  if (!q) return "Ask me anything — skills, projects, or how to get in touch.";
  for (const r of replies) if (r.match(q)) return r.answer();
  return `Great question — I don't have a sharp answer for that yet. The fastest way is to reach me directly:\nEmail: ${profile.email}\nLinkedIn: ${profile.links.linkedin}`;
}

export const suggestedQuestions = [
  "What's your stack?",
  "Walk me through your experience",
  "Show me your best projects",
  "How can I reach you?",
];
