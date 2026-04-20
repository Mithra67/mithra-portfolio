'use server';
import { createServerFn } from "@tanstack/react-start";
import { profile, experience, projects, skills } from "./data";

const AETHER_PERSONA = `
You are Aether, a premium AI companion for Sangamithra D (a Product Developer). 
You represent Sangamithra and should answer questions about her work, skills, and experience with a professional, strategic, yet approachable tone.

Context about Sangamithra:
- Role: ${profile.role}
- Bio: ${profile.bio}
- Experience: ${experience.map(e => `${e.role} at ${e.company} (${e.period})`).join(", ")}
- Projects: ${projects.map(p => `${p.title}: ${p.subtitle}`).join(", ")}
- Top Skills: ${skills.slice(0, 10).map(s => s.name).join(", ")}

Instructions:
1. Ground your answers in the provided context.
2. If you don't know the answer, politely direct them to her email: ${profile.email} or LinkedIn.
3. Keep responses concise and formatted with markdown if helpful.
4. Do not mention that you are a language model.
`;

export const getAetherResponse = createServerFn({ method: "POST" })
  .inputValidator((d: { question: string }) => d)
  .handler(async ({ data }) => {
    const { question } = data;

    // In a real implementation with Lovable AI Gateway / Claude:
    /*
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: `${AETHER_PERSONA}\n\nUser Question: ${question}` }]
      })
    });
    const result = await response.json();
    return result.content[0].text;
    */

    // For now, we simulate the "Lovable AI Gateway" behavior with a brief delay and intelligent routing
    // and using the static matchers for consistency if needed, or returning a "free-form" feeling response.
    
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple routing logic to simulate Claude's grounding
    const q = question.toLowerCase();
    if (q.includes("stack") || q.includes("tech") || q.includes("tool")) {
      return `Sangamithra's core stack is built on React 19 and TypeScript, using Redux Toolkit for state management. She also specializes in RBAC architecture and data visualization with ECharts and Three.js. You can see these in action in her "Guardian AI" and "Sprint Flow" projects.`;
    }
    if (q.includes("experience") || q.includes("job") || q.includes("work")) {
      return `She is currently a Product Developer at DEVOPSLABS, where she builds scalable frontend systems and interactive dashboards. Previously, she interned at Stark Institutions and worked at Computira Soft Solutions. She has a strong track record of shipping production-ready modules efficiently.`;
    }
    if (q.includes("contact") || q.includes("reach") || q.includes("email")) {
      return `You can reach Sangamithra directly at ${profile.email}. She's also active on [LinkedIn](https://linkedin.com/in/sangamithra-d/). She's currently open to a limited number of product engagements for 2025.`;
    }

    return `That's an interesting question! While I focus on Sangamithra's professional profile, I can tell you that her approach to development is centered on security (RBAC/ABAC) and high-performance UI. Is there a specific project or skill of hers you'd like to dive deeper into?`;
  });
