import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, CircleAlert, LoaderCircle, LogOut, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { usePortfolioContent, portfolioIconOptions, type PortfolioRecord, type PortfolioSection } from "@/lib/portfolio-content";

export const Route = createFileRoute("/manage")({
  head: () => ({
    meta: [
      { title: "Manage portfolio — Sangamithra D" },
      { name: "description", content: "Private portfolio content editor for Sangamithra D." },
      { property: "og:title", content: "Manage portfolio — Sangamithra D" },
      { property: "og:description", content: "Private portfolio content editor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ManagePage,
});

const sections: { id: PortfolioSection; title: string }[] = [
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Tech stack" },
  { id: "education", title: "Education" },
  { id: "projects", title: "Projects" },
  { id: "certifications", title: "Certifications" },
];
const fieldLabels: Record<string, string> = {
  company: "Company", role: "Role", period: "Period", description: "Description", type: "Engagement type", active: "Current role",
  highlights: "Highlights", stack: "Technologies used", name: "Name", color: "Brand color", category: "Category", level: "Experience level", url: "Website link",
  school: "Institution", degree: "Degree", score: "Result", badge: "Distinction", title: "Project title", subtitle: "Short summary", tags: "Technologies", image: "Project image path",
  accent: "Accent color", metrics: "Impact metrics", stageTools: "Workflow stages", aiTools: "AI tools used", featured: "Featured project", href: "Project link", hrefLabel: "Link label",
  issuer: "Issuer", year: "Year", iconKey: "Icon", usage: "How it was used", label: "Category label", id: "Category key",
};
const fieldOrder: Record<PortfolioSection, string[]> = {
  experience: ["company", "role", "period", "description", "type", "active", "highlights", "stack"],
  skills: ["name", "category", "level", "color", "url", "iconKey"],
  education: ["school", "degree", "period", "score", "badge"],
  projects: ["title", "subtitle", "description", "period", "category", "tags", "metrics", "stageTools", "aiTools", "image", "accent", "featured", "href", "hrefLabel"],
  certifications: ["name", "issuer", "year", "iconKey", "accent"],
};
const blankEntry: Record<PortfolioSection, PortfolioRecord> = {
  experience: { company: "", role: "", period: "", description: "", type: "Full-time", highlights: [], stack: [] },
  skills: { name: "", category: "frontend", level: "familiar", color: "#3B82F6", iconKey: "React", url: "" },
  education: { school: "", degree: "", period: "", score: "", badge: "" },
  projects: { title: "", subtitle: "", description: "", period: "", category: "", tags: [], metrics: [], stageTools: [], aiTools: [], image: "", accent: "#3B82F6", featured: false, href: "", hrefLabel: "" },
  certifications: { name: "", issuer: "", year: "2026", iconKey: "Award", accent: "#3B82F6" },
};

function ManagePage() {
  const navigate = useNavigate();
  const { document, replaceSection, saveState } = usePortfolioContent();
  const [authState, setAuthState] = useState<"checking" | "signed-out" | "denied" | "owner">("checking");
  const [activeSection, setActiveSection] = useState<PortfolioSection>("experience");
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    let active = true;
    async function checkOwner() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) { setAuthState("signed-out"); return; }
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "owner").maybeSingle();
      if (!active) return;
      setAuthState(!error && data?.role === "owner" ? "owner" : "denied");
    }
    void checkOwner();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { void checkOwner(); });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    await navigate({ to: "/auth" });
  }

  if (authState === "checking") return <StatusPage title="Checking access" body="Confirming portfolio owner access…" />;
  if (authState === "signed-out") return <StatusPage title="Owner sign-in required" body="Sign in with the portfolio owner’s account to edit saved content." action={<Button onClick={() => void navigate({ to: "/auth" })}>Go to sign in</Button>} />;
  if (authState === "denied") return <StatusPage title="Read-only access" body="This account can view the portfolio but cannot change its content." action={<Button variant="outline" onClick={() => void signOut()}><LogOut /> Sign out</Button>} />;

  const entries = document[activeSection];
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <a href="/" className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Portfolio</a>
            <h1 className="text-3xl font-black">Manage portfolio</h1>
          </div>
          <div className="flex items-center gap-3">
            <span role="status" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              {saveState === "saving" || saveState === "loading" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : saveState === "error" ? <CircleAlert className="h-4 w-4 text-destructive" /> : <Check className="h-4 w-4 text-emerald-600" />}
              {saveState === "saving" ? "Saving changes…" : saveState === "loading" ? "Loading…" : saveState === "error" ? "Could not save — try editing again" : "All changes saved"}
            </span>
            <Button variant="outline" onClick={() => void signOut()}><LogOut /> Sign out</Button>
          </div>
        </header>

        {authMessage && <p role="alert" className="mt-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{authMessage}</p>}
        <div className="mt-7 flex flex-wrap gap-2 border-b border-border pb-4" role="tablist" aria-label="Portfolio sections">
          {sections.map((section) => <Button key={section.id} type="button" variant={activeSection === section.id ? "default" : "outline"} onClick={() => setActiveSection(section.id)} role="tab" aria-selected={activeSection === section.id}>{section.title} <span className="text-xs opacity-70">{document[section.id].length}</span></Button>)}
        </div>
        <section className="py-6" aria-label={`${sections.find((section) => section.id === activeSection)?.title} entries`}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{sections.find((section) => section.id === activeSection)?.title}</p>
            <Button type="button" onClick={() => replaceSection(activeSection, [...entries, { ...blankEntry[activeSection] }])}><Plus /> Add entry</Button>
          </div>
          {entries.map((entry, index) => (
            <EntryEditor
              key={`${activeSection}-${index}`}
              section={activeSection}
              entry={entry}
              index={index}
              onChange={(updated) => replaceSection(activeSection, entries.map((item, itemIndex) => itemIndex === index ? updated : item))}
              onDelete={() => {
                if (window.confirm("Delete this entry from the portfolio?")) replaceSection(activeSection, entries.filter((_, itemIndex) => itemIndex !== index));
              }}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

function StatusPage({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return <main className="flex min-h-screen items-center justify-center px-5"><section className="glass-strong max-w-lg rounded-2xl p-8 text-center"><h1 className="text-2xl font-black">{title}</h1><p className="mt-3 text-muted-foreground">{body}</p><div className="mt-6">{action}</div><a href="/" className="mt-6 inline-flex text-sm text-primary hover:underline">Back to portfolio</a></section></main>;
}

function EntryEditor({ section, entry, index, onChange, onDelete }: { section: PortfolioSection; entry: PortfolioRecord; index: number; onChange: (record: PortfolioRecord) => void; onDelete: () => void }) {
  const [parseErrors, setParseErrors] = useState<Record<string, string>>({});
  const keys = fieldOrder[section].filter((key) => key in entry || key in blankEntry[section]);
  const categoryItems = useMemo(() => {
    const candidates = [{ id: "frontend", label: "Frontend" }, { id: "architecture", label: "Architecture" }, { id: "devops", label: "DevOps" }, { id: "backend", label: "Backend" }, { id: "productivity", label: "Productivity" }, { id: "ai", label: "AI" }, { id: "vibe", label: "AI-assisted development" }];
    return candidates;
  }, []);

  function update(key: string, value: unknown) { onChange({ ...entry, [key]: value }); }
  function updateArray(key: string, event: ChangeEvent<HTMLTextAreaElement>) {
    const raw = event.target.value;
    if (Array.isArray(entry[key]) && entry[key].some((item) => typeof item === "object" && item !== null)) {
      try {
        const parsed = raw.trim() ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed)) throw new Error("Use a JSON list.");
        update(key, parsed);
        setParseErrors((current) => ({ ...current, [key]: "" }));
      } catch {
        setParseErrors((current) => ({ ...current, [key]: "Enter a valid JSON list before saving." }));
      }
      return;
    }
    update(key, raw.split("\n").map((line) => line.trim()).filter(Boolean));
  }

  return (
    <article className="glass mb-5 rounded-xl p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-bold">{String(entry.title ?? entry.role ?? entry.name ?? entry.school ?? entry.company ?? `New entry ${index + 1}`)}</h2>
        <Button type="button" variant="ghost" size="icon" aria-label={`Delete entry ${index + 1}`} title="Delete entry" onClick={onDelete}><Trash2 className="text-destructive" /></Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {keys.map((key) => {
          const value = entry[key] ?? "";
          const label = fieldLabels[key] ?? key;
          if (typeof value === "boolean") return <label key={key} className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={value} onChange={(event) => update(key, event.target.checked)} className="h-4 w-4 accent-primary" />{label}</label>;
          if (Array.isArray(value)) {
            const complex = value.some((item) => typeof item === "object" && item !== null);
            const text = complex ? JSON.stringify(value, null, 2) : value.join("\n");
            return <label key={key} className="space-y-1.5 text-sm font-semibold sm:col-span-2">{label}
              <textarea value={text} onChange={(event) => updateArray(key, event)} rows={complex ? 7 : 4} className="w-full resize-y rounded-md border border-input bg-background/60 px-3 py-2 font-normal leading-relaxed shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              {parseErrors[key] && <span className="block text-xs font-normal text-destructive">{parseErrors[key]}</span>}
            </label>;
          }
          if (key === "iconKey") return <label key={key} className="space-y-1.5 text-sm font-semibold">{label}<select value={String(value)} onChange={(event) => update(key, event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">Automatic</option>{portfolioIconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}</select></label>;
          if (key === "category" && section === "skills") return <label key={key} className="space-y-1.5 text-sm font-semibold">{label}<select value={String(value)} onChange={(event) => update(key, event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">{categoryItems.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></label>;
          if (key === "level") return <label key={key} className="space-y-1.5 text-sm font-semibold">{label}<select value={String(value)} onChange={(event) => update(key, event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="core">Core expertise</option><option value="production">Production experience</option><option value="familiar">Exploring / familiar</option></select></label>;
          const multiline = ["description", "subtitle"].includes(key);
          return <label key={key} className={`space-y-1.5 text-sm font-semibold ${multiline ? "sm:col-span-2" : ""}`}>{label}{multiline ? <textarea value={String(value)} onChange={(event) => update(key, event.target.value)} rows={3} className="w-full resize-y rounded-md border border-input bg-background/60 px-3 py-2 font-normal shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" /> : <Input value={String(value)} onChange={(event) => update(key, event.target.value)} />}</label>;
        })}
      </div>
    </article>
  );
}