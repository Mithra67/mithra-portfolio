import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  certifications as seedCertifications,
  education as seedEducation,
  experience as seedExperience,
  projects as seedProjects,
  skills as seedSkills,
  skillCategories as seedSkillCategories,
  type ExperienceItem,
  type Project,
  type Skill,
} from "@/lib/data";
import type { IconType } from "react-icons";
import { LuAward, LuCode2 } from "react-icons/lu";

export type PortfolioSection = "experience" | "skills" | "education" | "projects" | "certifications";
export type PortfolioRecord = Record<string, unknown>;
export type PortfolioDocument = Record<PortfolioSection, PortfolioRecord[]> & {
  skillCategories: { id: string; label: string }[];
};
type SaveState = "loading" | "saved" | "saving" | "error";
type RenderContent = {
  experience: ExperienceItem[];
  skills: Skill[];
  education: typeof seedEducation;
  projects: Project[];
  certifications: (Omit<(typeof seedCertifications)[number], "Icon"> & { Icon: IconType })[];
  skillCategories: typeof seedSkillCategories;
};
type PortfolioContextValue = {
  content: RenderContent;
  document: PortfolioDocument;
  saveState: SaveState;
  replaceSection: (section: PortfolioSection, records: PortfolioRecord[]) => void;
};

const iconCatalog: Record<string, IconType> = {
  ...Object.fromEntries(seedSkills.map((skill) => [skill.name, skill.Icon])),
  ...Object.fromEntries(seedCertifications.map((cert) => [cert.name, cert.Icon])),
  ...Object.fromEntries(seedProjects.flatMap((project) => [
    ...project.stageTools.map((tool) => [tool.name, tool.Icon]),
    ...(project.aiTools ?? []).map((tool) => [tool.name, tool.Icon]),
  ])),
  Award: LuAward,
  Code: LuCode2,
};

function serializable<T extends { Icon: IconType }>(item: T, iconKey: string): PortfolioRecord {
  const { Icon: _icon, ...fields } = item;
  return { ...fields, iconKey };
}

function initialDocument(): PortfolioDocument {
  return {
    experience: seedExperience.map((item) => ({ ...item })),
    skills: seedSkills.map((item) => serializable(item, item.name)),
    education: seedEducation.map((item) => ({ ...item })),
    projects: seedProjects.map((project) => ({
      ...project,
      stageTools: project.stageTools.map((tool) => serializable(tool, tool.name)),
      aiTools: project.aiTools?.map((tool) => serializable(tool, tool.name)),
    })),
    certifications: seedCertifications.map((item) => serializable(item, item.name)),
    skillCategories: seedSkillCategories.map((category) => ({ ...category })),
  };
}

function record(value: unknown): PortfolioRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as PortfolioRecord : {};
}

function asRecords(value: unknown): PortfolioRecord[] {
  return Array.isArray(value) ? value.map(record) : [];
}

function withIcon<T extends PortfolioRecord>(item: T, fallback?: IconType) {
  const iconKey = typeof item.iconKey === "string" ? item.iconKey : "";
  return { ...item, Icon: iconCatalog[iconKey] ?? fallback ?? LuCode2 };
}

function normalize(document: PortfolioDocument): RenderContent {
  const baseProjects = new Map(seedProjects.map((project) => [project.title, project]));
  return {
    experience: document.experience as unknown as ExperienceItem[],
    skills: document.skills.map((skill) => withIcon(skill) as unknown as Skill),
    education: document.education as unknown as typeof seedEducation,
    certifications: document.certifications.map((cert) => withIcon(cert, LuAward)) as unknown as RenderContent["certifications"],
    projects: document.projects.map((item) => {
      const base = baseProjects.get(String(item.title ?? ""));
      const stageTools = Array.isArray(item.stageTools) ? item.stageTools.map((tool, index) =>
        withIcon(record(tool), base?.stageTools[index]?.Icon),
      ) : [];
      const aiTools = Array.isArray(item.aiTools) ? item.aiTools.map((tool, index) =>
        withIcon(record(tool), base?.aiTools?.[index]?.Icon),
      ) : undefined;
      return {
        ...item,
        image: typeof item.image === "string" && item.image.startsWith("/") ? base?.image ?? "" : String(item.image ?? base?.image ?? ""),
        stageTools,
        aiTools,
      } as unknown as Project;
    }),
    skillCategories: document.skillCategories as typeof seedSkillCategories,
  };
}

function restoreDocument(raw: unknown): PortfolioDocument {
  const value = record(raw);
  const fallback = initialDocument();
  return {
    experience: asRecords(value.experience).length ? asRecords(value.experience) : fallback.experience,
    skills: asRecords(value.skills).length ? asRecords(value.skills) : fallback.skills,
    education: asRecords(value.education).length ? asRecords(value.education) : fallback.education,
    projects: asRecords(value.projects).length ? asRecords(value.projects) : fallback.projects,
    certifications: asRecords(value.certifications).length ? asRecords(value.certifications) : fallback.certifications,
    skillCategories: Array.isArray(value.skillCategories) ? value.skillCategories as PortfolioDocument["skillCategories"] : fallback.skillCategories,
  };
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [document, setDocument] = useState<PortfolioDocument>(() => initialDocument());
  const documentRef = useRef(document);
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveQueue = useRef(Promise.resolve());

  useEffect(() => {
    let active = true;
    void supabase.from("portfolio_content").select("content").eq("id", "main").maybeSingle().then(({ data, error }) => {
      if (!active) return;
      if (error || !data) {
        console.error("Portfolio content could not be loaded", error);
        setSaveState("error");
        return;
      }
      const restored = restoreDocument(data.content);
      documentRef.current = restored;
      setDocument(restored);
      setSaveState("saved");
    });
    return () => { active = false; };
  }, []);

  const replaceSection = useCallback((section: PortfolioSection, records: PortfolioRecord[]) => {
    const updated = { ...documentRef.current, [section]: records };
    documentRef.current = updated;
    setDocument(updated);
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveQueue.current = saveQueue.current.then(async () => {
        const { error } = await supabase.from("portfolio_content").update({ content: updated }).eq("id", "main");
        setSaveState(error ? "error" : "saved");
        if (error) console.error("Portfolio changes could not be saved", error);
      }).catch((error: unknown) => {
        console.error("Portfolio changes could not be saved", error);
        setSaveState("error");
      });
    }, 650);
  }, []);

  const value = useMemo(() => ({ content: normalize(document), document, saveState, replaceSection }), [document, saveState, replaceSection]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolioContent() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("PortfolioProvider is missing");
  return context;
}