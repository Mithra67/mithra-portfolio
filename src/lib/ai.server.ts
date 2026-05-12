'use server';
import { createServerFn } from "@tanstack/react-start";
import { profile, experience, projects, skills, education, certifications } from "./data";

const MITHRA_PERSONA = `
You are a personal AI assistant for Mithra (Sangamithra D), a React developer.
Answer questions about her work, skills, and background using ONLY the knowledge provided below.
Speak naturally, like a knowledgeable human assistant — warm but concise, no corporate tone.

RULES:
- Never make up or assume information not listed below
- If something isn't covered, say "I don't have that detail — reach her directly at ${profile.email}"
- Keep replies conversational and short (2–5 sentences or a tight bullet list)
- Salary / comp: say she prefers to discuss based on the role
- Use "she / her" when referring to Mithra

STYLE:
- Human, natural, direct — like a colleague who knows her well
- No bullet lists unless listing 3+ things
- No formal headers or robotic phrasing
- Match the energy of the question — casual question gets a casual answer

OUTPUT FORMAT:
- Use structured responses (bullet lists when listing multiple items)
- Max 6–10 lines per answer unless explicitly asked for more detail

--- PORTFOLIO DATA ---

NAME: ${profile.name}
ROLE: ${profile.role}
BIO: ${profile.bio}
EMAIL: ${profile.email}
LINKEDIN: ${profile.links.linkedin}
GITHUB: ${profile.links.github}

AVAILABILITY:
- Status: Actively looking for product engineering roles in 2026
- Open to: Full-time and select freelance / contract engagements
- Setup: Remote-first; open to hybrid within India
- Timezone: IST (GMT+5:30) — overlaps with EST, CET, GMT

SPECIALISATIONS:
- RBAC / ABAC architecture — production-grade permission models
- React 19 enterprise dashboards — ECharts, Three.js, Redux Toolkit
- Security-first UI — access control at the component layer
- Full product lifecycle: spec → design → build → test → production

EXPERIENCE:
${experience.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}${e.highlights ? '\n  Highlights: ' + e.highlights.join(', ') : ''}${e.stack ? '\n  Stack: ' + e.stack.join(', ') : ''}`).join('\n')}

PROJECTS:
${projects.map(p => `- ${p.title} (${p.period}): ${p.description}\n  Tags: ${p.tags.join(', ')}${p.metrics ? '\n  Metrics: ' + p.metrics.map(m => m.label + ': ' + m.value).join(', ') : ''}`).join('\n')}

SKILLS:
Frontend & Viz: React, TypeScript, JavaScript, Redux Toolkit, Three.js, Apache ECharts, Chart.js, Tailwind CSS, SCSS, Vite, Framer Motion
Architecture & Security: RBAC, ABAC, Permission Modeling, Access Control, API Gateway
DevOps & Systems: Kubernetes, Docker, Kafka, SonarQube, Nexus, JFrog, GitLab
Backend & API: Spring Boot, PostgreSQL, Firebase, Bruno
Tooling: Jira, Confluence, Figma, Canva, GitHub
AI Tools: Claude (Anthropic), ChatGPT, Gemini, Lovable, Cursor, Windsurf

EDUCATION:
${education.map(e => `- ${e.school} — ${e.degree} (${e.period}) · ${e.score}${e.badge ? ' · ' + e.badge : ''}`).join('\n')}

CERTIFICATIONS:
${certifications.map(c => `- ${c.name} · ${c.issuer} · ${c.year}`).join('\n')}
`.trim();

export const getAetherResponse = createServerFn({ method: "POST" })
  .inputValidator((d: { question: string }) => d)
  .handler(async ({ data }) => {
    const { question } = data;

    const apiKey = process.env.LOVABLE_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Lovable-API-Key": apiKey,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            max_tokens: 512,
            messages: [
              { role: "system", content: MITHRA_PERSONA },
              { role: "user", content: question },
            ],
          }),
        });
        if (response.ok) {
          const result = await response.json();
          const text = result.choices?.[0]?.message?.content;
          if (typeof text === "string" && text.trim()) return text;
        }
      } catch {
        // fall through to smart fallback
      }
    }

    // Smart fallback — first-person, matches the persona
    await new Promise((resolve) => setTimeout(resolve, 700));

    const q = question.toLowerCase();

    if (/\b(hi|hey|hello|yo)\b/.test(q)) {
      return `Hey! I'm Mithra — ask me anything about my work, stack, or how to get in touch. I don't bite 😄`;
    }
    if (/stack|tech|tool|framework|language/.test(q)) {
      return `My core stack is **React 19 + TypeScript**, with Redux Toolkit for state and ECharts / Three.js for data viz. On the infra side I work with Docker, Kubernetes, and Kafka. What part are you curious about?`;
    }
    if (/experience|job|work|career|company|role/.test(q)) {
      return `I'm currently a **Product Developer at DEVOPSLABS** (Dec 2024 – now), building scalable frontend systems and RBAC-driven architectures. Before that I interned at Stark Institutions and did frontend work at Computira Soft Solutions.`;
    }
    if (/project|build|portfolio|case study/.test(q)) {
      return `A few I'm proud of:\n- **Guardian AI** — a Claude-powered assistant with streaming + RAG\n- **DevPerf Analyser** — developer productivity tracking with real-time metrics\n- **Sprint Flow** — full sprint command center with AI-generated Jira tickets\n\nWant details on any of these?`;
    }
    if (/guardian|claude|ai|chatbot|assistant/.test(q)) {
      return `Guardian AI is something I built with the Anthropic API — it grounds Claude's answers in a private knowledge base, streams responses, and has a draggable floating UI. It's one of my favourite projects because it blends product thinking with cutting-edge AI.`;
    }
    if (/education|study|college|degree|gpa|university|school/.test(q)) {
      return `I'm doing my **M.Sc. Computer Science at Bharathiar University** (9.0 CGPA) and I hold a B.Sc. CS from SNMV — graduated with a **Gold Medal and 9.014 GPA**.`;
    }
    if (/cert|certification/.test(q)) {
      return `I'm certified in Full Stack Development, Python, React Advanced Patterns, TypeScript Mastery, and Prompt Engineering (Anthropic Academy) — among others.`;
    }
    if (/contact|email|reach|linkedin|github/.test(q)) {
      return `Best ways to reach me:\n📧 **${profile.email}**\n💼 [LinkedIn](${profile.links.linkedin})\n🐙 [GitHub](${profile.links.github})\n\nI'm actively exploring strong product engineering opportunities for 2026.`;
    }
    if (/who|about|bio|yourself/.test(q)) {
      return `${profile.bio} I care a lot about security-first UI, clean component architecture, and shipping things that actually work.`;
    }
    if (/available|hire|freelance|open|collab|role|opportunity|join/.test(q)) {
      return `Yes — I'm actively looking for full-time product engineering roles in 2026. I'm also open to select freelance or contract engagements. Drop me a line at **${profile.email}** and let's talk scope.`;
    }
    if (/notice|start|when|join|onboard/.test(q)) {
      return `My notice period is flexible and I'm happy to align it with your timeline. I can discuss specifics directly — reach me at **${profile.email}**.`;
    }
    if (/remote|hybrid|location|onsite|office|relocat/.test(q)) {
      return `I'm remote-first and based in India (IST — GMT+5:30). That overlaps comfortably with EST, CET, and GMT hours. I'm open to hybrid setups too.`;
    }
    if (/salary|compensation|pay|rate|ctc/.test(q)) {
      return `I prefer to discuss compensation directly based on the role scope and company — it's a conversation worth having properly. Reach me at **${profile.email}**.`;
    }
    if (/skill|rbac|security|architecture|permission/.test(q)) {
      return `My sweet spot is **RBAC / ABAC architecture** — designing permission models that scale without turning into spaghetti. It's the part of product engineering most teams skip until it's too late, and I've shipped it in production.`;
    }
    if (/type|kind|looking for|prefer|want/.test(q)) {
      return `I'm looking for product engineering roles where I can own complex UI architecture — ideally in enterprise SaaS, fintech, or AI-product companies. Teams that care about security and performance are my kind of people.`;
    }

    return `That's a good one — I don't have a polished answer for that right now. Hit me at **${profile.email}** and I'll get back to you properly.`;
  });
