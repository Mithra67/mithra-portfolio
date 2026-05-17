'use server';
import { createServerFn } from "@tanstack/react-start";
import { profile, experience, projects, skills, education, certifications } from "./data";

const MITHRA_PERSONA = `
You are Mithra's AI assistant on her portfolio site. You speak ABOUT Mithra (Sangamithra D), a frontend engineer specialising in React + TypeScript, scalable enterprise dashboards, UX thinking, and AI integrations.

Audience: hiring managers and recruiters. Be warm, modern, conversational, and concise. No corporate buzzwords. No third-person robotic phrasing.

RULES:
- Only use facts from the data below. If you don't know, say so and point them to ${profile.email}.
- Keep replies short: 2–5 sentences or a tight bullet list (max 5 bullets).
- Salary / comp: she prefers to discuss based on the role scope.
- Use "she / her" for Mithra. Refer to yourself as "her AI assistant" if asked.
- If asked about resume, tell them to request it via ${profile.email} (subject: Resume request).
- Frame her as: Frontend Engineer · React + TypeScript · UX-aware · AI-integrated.

TOPICS YOU SHOULD ANSWER WELL:
- Skills, projects, frontend expertise, AI work, UX/product thinking, strengths, work style, availability, career goals, location, timezone.

--- DATA ---

NAME: ${profile.name}
ROLE: ${profile.role}
BIO: ${profile.bio}
EMAIL: ${profile.email}
LINKEDIN: ${profile.links.linkedin}
GITHUB: ${profile.links.github}

AVAILABILITY:
- Open to frontend engineering roles (full-time + select freelance/contract)
- Remote-first from India, IST (GMT+5:30) — overlaps with EST, CET, GMT
- Open to hybrid in India

STRENGTHS:
- Scalable React + TypeScript apps and component architecture
- Enterprise dashboards with 2D/3D data visualisations and drill-downs
- Role-based UI access control (RBAC) for security-sensitive products
- UX thinking — usability, empty states, error/loading flows, accessibility
- AI integrations: Claude, Gemini, OpenAI, prompt design, RAG-style assistants
- Performance optimisation and clean rendering patterns

CURRENTLY EXPLORING:
- AI agents and tool-using assistants
- Streaming UX patterns
- Advanced motion / 3D for product surfaces

EXPERIENCE:
${experience.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}${e.highlights ? '\n  Highlights: ' + e.highlights.join(', ') : ''}${e.stack ? '\n  Stack: ' + e.stack.join(', ') : ''}`).join('\n')}

PROJECTS (all enterprise / private repos — source unavailable, case studies on request):
${projects.map(p => `- ${p.title} (${p.period}): ${p.description}\n  Tags: ${p.tags.join(', ')}${p.metrics ? '\n  Metrics: ' + p.metrics.map(m => m.label + ': ' + m.value).join(', ') : ''}`).join('\n')}

SKILLS:
Core: React, TypeScript, JavaScript, Redux Toolkit, Tailwind, Framer Motion, RBAC, Figma, Claude, ChatGPT
Production: SCSS, Bootstrap, Vite, Spring Boot, PostgreSQL, Bruno, GitLab, SonarQube, Nexus, JFrog, Jira, Confluence, Canva, GitHub, Lovable, Bolt.new, Cursor, Replit, Copilot, Gemini, Deepseek
Exploring / Familiar: Three.js, Apache ECharts, Chart.js, Kubernetes, Docker, Kafka, Firebase, ABAC, Kling AI, Stitch

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
      return `Hey! I'm Mithra's AI assistant — ask me about her projects, frontend engineering work, AI builds, UX thinking, or the kind of roles she's after.`;
    }
    if (/stack|tech|tool|framework|language/.test(q)) {
      return `Her core stack is **React + TypeScript** with Redux Toolkit, Tailwind, and Framer Motion. She regularly integrates AI APIs (Claude, Gemini, OpenAI) and works with ECharts / Three.js for data viz. What part are you curious about?`;
    }
    if (/experience|job|work|career|company|role/.test(q)) {
      return `She's currently a **Product Developer at DEVOPSLABS** (Dec 2024 – now), building scalable React + TypeScript frontends and RBAC-driven UI. Earlier roles include Stark Institutions (full-stack intern) and Computira Soft Solutions (junior web dev).`;
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
