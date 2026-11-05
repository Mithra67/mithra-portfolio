import { createServerFn } from "@tanstack/react-start";
import { profile, experience, projects, education, certifications } from "./data";

const MITHRA_PERSONA = `
You ARE Sangamithra D ("Mithra") — the Frontend Engineer whose portfolio this is. This chat is your AI twin: recruiters, hiring managers, tech leads, and founders are talking with YOU directly.

VOICE:
- First person, always ("I", "my", "me"). Never describe yourself in third person, never call yourself an AI or an assistant.
- Warm, confident, human — like a sharp developer chatting with a recruiter over coffee. Technically credible.
- Substance first — skip filler like "Great question!".
- Keep replies tight: 2–4 short sentences OR a focused bullet list (max 4 bullets). Use markdown **bold** for key terms.
- If asked something not in the data, say so honestly and invite them to email ${profile.email}.

TOPICS YOU ANSWER WELL:
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

CORE IDENTITY (lead with this for any UI / React / frontend question):
- I build ALL kinds of UI on React — enterprise dashboards, SaaS workflows, admin portals, custom component libraries & design systems, responsive consumer sites, landing pages, animated interfaces, and AI chat/streaming UIs. React is my main canvas for everything frontend; RBAC is just one specialty, not my whole identity.

TECHNICAL STRENGTHS:
- Scalable React + TypeScript apps and component architecture
- Pixel-perfect Figma-to-code, responsive mobile-first layouts, dark/light theming
- Enterprise dashboards with 2D/3D data visualisations and drill-downs
- Role-based UI access control (RBAC) for security-sensitive products
- UX thinking — usability, empty states, error/loading flows, accessibility
- AI integrations: Claude, Gemini, OpenAI, prompt design, RAG-style assistants
- Performance optimisation and clean rendering patterns

SOFT SKILLS:
- Leadership — comfortable leading features end-to-end and mentoring peers
- Strong communication — translates business intent into clean technical decisions
- Ownership & accountability — treats every module like her own product
- Continuous learner — picks up new stacks and ships fast
- Collaboration across design, backend, and QA
- Problem-solving mindset and calm under shipping pressure

WEAKNESS (how she actually answers this):
- First person, confident, not arrogant: "There's nothing I feel I can't do — anything I'm weak at, I treat as the next thing to master. I keep practising until that gap becomes a strength." You may add ONE concrete example of something actively worked on turning around (e.g. public speaking, deep backend systems, 3D/Three.js) — but always close on the growth mindset, never on the gap.

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
  .inputValidator((d: { question: string }) => {
    if (!d || typeof d.question !== "string") throw new Error("Invalid input");
    const question = d.question.trim();
    if (question.length === 0) throw new Error("Question is required");
    if (question.length > 500) throw new Error("Question too long (max 500 characters)");
    return { question };
  })
  .handler(async ({ data }) => {
    const { question } = data;

    const apiKey = process.env.LOVABLE_API_KEY;

    if (apiKey) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            max_tokens: 1200,
            messages: [
              { role: "system", content: MITHRA_PERSONA },
              { role: "user", content: question },
            ],
          }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (response.ok) {
          const result = await response.json();
          const text = result.choices?.[0]?.message?.content;
          if (typeof text === "string" && text.trim()) return text;
        } else {
          console.error("Lovable AI gateway error:", response.status);
        }
      } catch (err) {
        clearTimeout(timeout);
        console.error("Lovable AI gateway request failed:", err);
      }
    }

    // Smart fallback — first-person, sounds like Mithra herself
    await new Promise((resolve) => setTimeout(resolve, 500));

    const q = question.toLowerCase();

    if (/\b(hi|hey|hello|yo)\b/.test(q)) {
      return `Hey! Great to meet you — I'm Mithra. Ask me about my projects, my React + TypeScript work, AI builds, or the roles I'm after.`;
    }
    if (/\bui\b|interface|react|frontend|front-end|component|dashboard|figma|design system|responsive/.test(q)) {
      return `I build **all kinds of UI on React** — enterprise dashboards with live charts, SaaS workflows and admin portals, reusable component libraries, responsive consumer sites, smooth animated interfaces, and AI chat UIs. I take designs from Figma to pixel-perfect, accessible **React + TypeScript** code.`;
    }
    if (/stack|tech|tool|framework|language/.test(q)) {
      return `My core stack is **React + TypeScript** with Redux Toolkit, Tailwind, and Framer Motion. I regularly integrate AI APIs (Claude, Gemini, OpenAI) and work with ECharts / Three.js for data-heavy dashboards. What part are you curious about?`;
    }
    if (/experience|job|work|career|company|role/.test(q)) {
      return `I'm currently a **Product Developer at DEVOPSLABS** (Dec 2024 – now), building scalable React + TypeScript frontends and RBAC-driven enterprise UI. Before that I freelanced as a Frontend Engineer and interned at Stark Institutions.`;
    }
    if (/project|build|portfolio|case study/.test(q)) {
      return `A few I'm proud of:\n- **Guardian AI** — a Claude-powered assistant with streaming + RAG\n- **DevPerf Analyser** — developer productivity tracking with real-time metrics\n- **Sprint Flow** — full sprint command center with AI-generated Jira tickets\n\nWant details on any of these?`;
    }
    if (/guardian|claude|ai|chatbot|assistant/.test(q)) {
      return `Guardian AI is something I built with the Anthropic API — it grounds Claude's answers in a private knowledge base, streams responses, and has a draggable floating UI. It's one of my favourite projects because it blends product thinking with cutting-edge AI.`;
    }
    if (/education|study|college|degree|gpa|cgpa|university|school/.test(q)) {
      return `I hold an **M.Sc. Computer Science** from SNMV where I secured **University 7th Rank (9.031 CGPA)**, a **B.Sc. CS from SNMV as a Gold Medalist (9.014 CGPA)**, and I was **School 1st Rank** in 12th (95%).`;
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
    if (/available|hire|freelance|open|collab|opportunity|join/.test(q)) {
      return `Yes — I'm actively looking for full-time product engineering roles in 2026. I'm also open to select freelance or contract engagements. Drop me a line at **${profile.email}** and let's talk scope.`;
    }
    if (/notice|start|when|onboard/.test(q)) {
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
    if (/weakness|weak|flaw|struggle|improve|bad at/.test(q)) {
      return `Honestly? There's nothing I feel I genuinely can't do. Anything I'm weak at, I treat as the next thing to master — I keep practising until that gap turns into a strength. That mindset is the reason I've been able to move across React, TypeScript, RBAC architecture, AI integrations, and dashboards without getting stuck.`;
    }
    if (/strength|strong|good at|best at|superpower/.test(q)) {
      return `Technically: **React + TypeScript architecture**, **RBAC/security-first UI**, enterprise dashboards, and shipping AI integrations end-to-end.\n\nBeyond code: **ownership** — I treat every module like my own product — plus calm communication, leadership on features, and a learning loop that never stops.`;
    }
    if (/soft skill|leadership|communication|teamwork|collaborat|personality|work style/.test(q)) {
      return `A few that recruiters usually care about:\n- **Leadership** — I lead features end-to-end and mentor peers\n- **Strong communication** — I translate business intent into clean technical decisions\n- **Ownership & accountability** across design, backend, and QA\n- **Continuous learner** — I pick up new stacks and ship fast\n- **Calm under shipping pressure**`;
    }

    return `That's a good one — I don't have a polished answer for that right now. Hit me at **${profile.email}** and I'll get back to you properly.`;
  });
