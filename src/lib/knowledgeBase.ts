import { profile, experience, skills, projects, education } from "./data";

type Reply = { match: (q: string) => boolean; answer: () => string };

const has = (q: string, ...keys: string[]) => keys.some((k) => q.includes(k));

const replies: Reply[] = [
  {
    match: (q) => has(q, "hello", "hi", "hey"),
    answer: () =>
      `Hi! I'm Sangamithra's Digital Guardian. Ask me about her skills, experience, projects, or how to get in touch.`,
  },
  {
    match: (q) => has(q, "skill", "stack", "tech", "tool"),
    answer: () =>
      `Sangamithra works across ${skills.map((s) => s.name).join(", ")}. Her sweet spot is React + TypeScript with strong RBAC and DX.`,
  },
  {
    match: (q) => has(q, "experience", "work", "job", "company", "role"),
    answer: () =>
      experience
        .map((e) => `• ${e.role} @ ${e.company} (${e.period})`)
        .join("\n"),
  },
  {
    match: (q) => has(q, "project", "build", "portfolio", "case"),
    answer: () =>
      projects.map((p) => `• ${p.title} — ${p.tagline}`).join("\n"),
  },
  {
    match: (q) => has(q, "education", "study", "college", "degree", "gpa"),
    answer: () =>
      education.map((e) => `• ${e.school} — ${e.degree} (${e.score})`).join("\n"),
  },
  {
    match: (q) => has(q, "contact", "email", "reach", "hire", "linkedin", "github"),
    answer: () =>
      `LinkedIn: ${profile.links.linkedin}\nGitHub: ${profile.links.github}\nEmail: ${profile.email}`,
  },
  {
    match: (q) => has(q, "who", "about", "bio", "yourself", "her"),
    answer: () => `${profile.name} — ${profile.role}. ${profile.bio}`,
  },
];

export function answerQuestion(question: string): string {
  const q = question.toLowerCase().trim();
  if (!q) return "Ask me anything about Sangamithra's work.";
  for (const r of replies) if (r.match(q)) return r.answer();
  return `I don't have a precise answer for that yet, but you can reach Sangamithra directly:\nLinkedIn: ${profile.links.linkedin}\nEmail: ${profile.email}`;
}

export const suggestedQuestions = [
  "What are her core skills?",
  "Show me her experience",
  "Tell me about her projects",
  "How can I contact her?",
];
