I’ll implement this as a targeted upgrade, not a redesign.

Plan:

1. Fix the blank-page animation blocker first
- Replace the shared `Reveal` animation with a safe fail-visible pattern using:
  - `initial={{ opacity: 0, y: 24 }}`
  - `whileInView={{ opacity: 1, y: 0 }}`
  - `viewport={{ once: true, amount: 0.15 }}`
- Remove fragile `variants` dependency in reveal wrappers.
- Remove `useScroll` / scroll-linked opacity from the hero and scroll progress so content cannot fade out or stay hidden.
- Keep every section parent `relative` and make content visible by default if animation does not run.
- Reduce repeated per-item motion where it adds risk or overhead.

2. Recruiter-focused hero update
- Change role/title language to `Frontend Engineer · React + TypeScript`.
- Change `Open for 2026 Collaborations` to `Open for Collaborations`.
- Replace `React 19` with `React` everywhere visible and in AI copy.
- Rewrite the bio to emphasize scalable React apps, frontend engineering, UX thinking, AI integrations, performance optimization, and enterprise dashboards.
- Add a clear Resume CTA in the hero.
  - If no resume file exists, create a safe mail/contact CTA labeled for resume request or add a placeholder download route/file only if a resume asset is available.

3. Reorganize skills into honest recruiter categories
- Replace the current “Worked With / Familiar” pyramid framing with:
  - Core Expertise
  - Production Experience
  - Exploring / Familiar With
- Move tools into less inflated groups so React, TypeScript, frontend architecture, dashboards, RBAC, API integration, UX, and AI-assisted workflows read as credible strengths.
- Keep icons and premium visuals but reduce constant floating animation for performance.

4. Rewrite project cards for private enterprise work
- Keep current project features and visuals.
- Remove any broken CTA behavior.
- Label private work as `Enterprise Project · Private Repository`.
- Add `Source unavailable due to company confidentiality`.
- Replace CTA with `Case study available on request`.
- Add clearer content fields for:
  - business impact
  - tech stack
  - responsibilities
  - measurable outcomes
- Keep no fake GitHub/live links.

5. Upgrade Aether AI assistant for recruiters
- Replace robotic intro with:
  `Hey — I’m Mithra’s AI assistant. Ask me about projects, frontend engineering, AI work, UX thinking, or roles Mithra is targeting.`
- Update server persona and local fallback to be conversational, concise, and recruiter-friendly.
- Make responses strong for skills, projects, frontend expertise, AI work, UX/product thinking, strengths, work style, availability, and career goals.
- Add smart quick prompts plus a small `Currently Exploring` / trending prompt area in the chat UI.
- Replace outdated `React 19` / Anthropic-specific claims where they no longer match the current Lovable AI Gateway setup.

6. Add recruiter trust and UX case-study sections
- Add a lightweight UX case-study section after Projects or before Contact.
- Add testimonial/trust placeholders with honest wording, e.g. `References available on request`, not fake quotes.
- Add nav links only if spacing remains clean on desktop/mobile.

7. Improve SEO and share metadata
- Update page title and meta description for Frontend Engineer / React / TypeScript / UX / AI dashboards.
- Add stronger OG and Twitter card tags.
- Add Person JSON-LD schema in the route head.
- Keep one primary H1 in the hero and semantic section headings.

8. UI/UX polish and performance pass
- Improve CTA visibility, card readability, spacing, mobile layout, and contrast while keeping the premium glassmorphism aesthetic.
- Keep thicker subtle borders and gradient glow tokens already present.
- Lazy-load non-critical images where safe; keep the hero portrait prioritized.
- Avoid heavy scroll-bound animations and reduce unnecessary rerenders.
- Validate with the preview/console after changes and check that no section remains blank.