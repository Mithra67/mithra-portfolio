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

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sangamithra D — Product Developer Portfolio" },
      {
        name: "description",
        content:
          "Strategic Product Developer engineering high-performance, scalable enterprise applications with role-based security and seamless UX.",
      },
      { property: "og:title", content: "Sangamithra D — Product Developer" },
      {
        property: "og:description",
        content: "Premium portfolio: React 19, TypeScript, RBAC, enterprise UX.",
      },
    ],
  }),
});

function Index() {
  return (
    <ThemeProvider>
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
      </div>
    </ThemeProvider>
  );
}
