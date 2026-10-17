import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Academics } from "@/components/sections/Academics";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { AetherChat } from "@/components/sections/AetherChat";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionNav } from "@/components/ui/SectionNav";
import { PortfolioProvider } from "@/lib/portfolio-content";

const PERSON_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sangamithra D",
  alternateName: "Mithra",
  jobTitle: "Frontend Engineer",
  description:
    "Frontend engineer building scalable React + TypeScript apps — enterprise dashboards, role-based UI architecture, UX thinking, and AI integrations.",
  email: "mailto:duraisamysangamithra19@gmail.com",
  url: "https://linkedin.com/in/sangamithra-d/",
  sameAs: [
    "https://linkedin.com/in/sangamithra-d/",
    "https://github.com/Mithra67",
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Frontend Engineering",
    "UX",
    "AI Integrations",
    "RBAC",
    "Data Visualization",
  ],
});

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sangamithra D — Frontend Engineer · React + TypeScript" },
      {
        name: "description",
        content:
          "Frontend engineer building scalable React + TypeScript apps — enterprise dashboards, role-based UI, UX thinking, and AI integrations.",
      },
      { name: "keywords", content: "Frontend Engineer, React, TypeScript, UX, AI integrations, enterprise dashboards, RBAC, portfolio" },
      { property: "og:title", content: "Sangamithra D — Frontend Engineer · React + TypeScript" },
      {
        property: "og:description",
        content:
          "Scalable React + TypeScript apps, enterprise dashboards, UX-led frontend, and AI integrations.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sangamithra D — Frontend Engineer · React + TypeScript" },
      {
        name: "twitter:description",
        content:
          "Scalable React + TypeScript apps, enterprise dashboards, UX-led frontend, and AI integrations.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: PERSON_SCHEMA,
      },
    ],
  }),
});

function Index() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen overflow-x-clip">
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Experience />
            <Academics />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
          </main>
          <AetherChat />
          <SectionNav />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
