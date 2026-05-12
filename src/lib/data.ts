import {
  SiReact,
  SiJavascript,
  SiRedux,
  SiThreedotjs,
  SiApacheecharts,
  SiChartdotjs,
  SiTailwindcss,
  SiSass,
  SiBootstrap,
  SiKubernetes,
  SiDocker,
  SiApachekafka,
  SiSonarqubeserver,
  SiSonatype,
  SiJfrog,
  SiSpringboot,
  SiPostgresql,
  SiFirebase,
  SiJira,
  SiFigma,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiBruno,
  SiConfluence,
  SiCanva,
  SiOpenai,
  SiAnthropic,
  SiGoogle,
  SiPython,
  SiTypescript,
  SiVite,
  SiFramer,
  SiVercel,
  SiReplit,
  SiWindsurf,
} from "react-icons/si";
import {
  LuShieldCheck,
  LuShieldAlert,
  LuUsers,
  LuLock,
  LuGlobe,
  LuFileText,
  LuFileSpreadsheet,
  LuPresentation,
  LuAward,
  LuZap,
  LuTrophy,
  LuMedal,
  LuRocket,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { 
  LovableIcon, BoltIcon, ClaudeIcon, CursorIcon, StitchIcon, GeminiIcon, ChatGPTIcon,
  WordIcon, ExcelIcon, PowerPointIcon, CopilotIcon, DeepseekIcon, KlingIcon,
  JavaIcon, PostgreSQLIcon, FigmaIcon, ThreeJsIcon, JavascriptIcon
} from "@/components/icons/vibe-icons";
import projectDevperf from "@/assets/project-devperf.jpg";
import projectSprint from "@/assets/project-sprint.jpg";
import projectCareer from "@/assets/project-career.jpg";
import projectClaude from "@/assets/project-claude.jpg";

export const profile = {
  name: "Sangamithra D",
  role: "Product Developer",
  bio: "Strategic Product Developer dedicated to engineering high-performance, scalable enterprise applications with a core emphasis on role-based security architectures and seamless user experiences.",
  email: "duraisamysangamithra19@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/sangamithra-d/",
    github: "https://github.com/Mithra67",
  },
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  type: string;
  active?: boolean;
  highlights?: string[];
  stack?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "DEVOPSLABS",
    role: "Product Developer",
    period: "Dec 2024 — Present",
    description:
      "Engineered scalable frontend systems using React & TypeScript across multiple product modules and implemented RBAC-driven UI architecture for secure, role-based access control.",
    type: "Full-time",
    active: true,
    highlights: [
      "Built interactive dashboards with advanced 2D/3D visualizations and drill-down analytics",
      "Integrated REST APIs with efficient state, error, and data handling",
      "Contributed to greenfield feature design, driving product enhancements and UX improvements",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "ECharts", "Three.js", "REST APIs"],
  },
  {
    company: "Stark Institutions",
    role: "Full Stack Developer Intern",
    period: "Jul — Sep 2024",
    description:
      "Engineered full-stack web applications. Optimized frontend responsiveness and built robust backend integrations on a tight delivery cadence.",
    type: "Intern",
    highlights: [
      "Delivered 3 production modules within the internship",
      "Introduced reusable form + table primitives",
    ],
    stack: ["React", "Node", "PostgreSQL"],
  },
  {
    company: "Computira Soft Solutions",
    role: "Junior Web Developer",
    period: "Oct 2022 — Mar 2023",
    description:
      "Contributed to scalable web solutions. Drove UI optimization, architectural modeling, and mission-critical bug fixing.",
    type: "Junior",
    highlights: [
      "Refactored legacy components into a modern React stack",
      "Cut critical-path bug count by 40% in two sprints",
    ],
    stack: ["React", "SCSS", "Java"],
  },
  {
    company: "Freelance",
    role: "Product Developer & Consultant",
    period: "Nov 2024 — Present",
    active: true,
    description:
      "Delivering end-to-end product work for international clients — from React UI builds and API integrations to SEO architecture and conversion-focused brand decks.",
    type: "Remote",
    highlights: [
      "Built and shipped client-facing React dashboards with role-based access control",
      "Integrated REST APIs and automated data pipelines for 2 SaaS clients",
      "SEO content strategy powering inbound for 4 international clients",
      "Crafted product decks that closed pilot engagements",
    ],
    stack: ["React", "TypeScript", "REST APIs", "SEO", "Figma", "Canva", "Word", "Excel", "PowerPoint"],
  },
];

export const education = [
  {
    school: "SNMV College of Arts and Science",
    degree: "M.Sc. Computer Science",
    period: "2024 – 2026",
    score: "9.0 / 10 CGPA",
    badge: "Pursuing",
  },
  {
    school: "SNMV College of Arts and Science",
    degree: "B.Sc. Computer Science",
    period: "2020 – 2023",
    score: "9.014 GPA",
    badge: "Gold Medalist",
  },
  {
    school: "Pkd Matriculation Hr. Sec School",
    degree: "Higher Secondary",
    period: "2018 – 2020",
    score: "95%",
    badge: "Rank Holder",
  },
];

export const certifications = [
  { name: "Full Stack Developer", issuer: "Binalect Academy", year: "2024", Icon: LuAward, accent: "#A855F7" },
  { name: "Data Analytics", issuer: "Udemy", year: "2024", Icon: SiPostgresql, accent: "#10B981" },
  { name: "Diamond Grading", issuer: "Diamonds India", year: "2023", Icon: LuMedal, accent: "#F59E0B" },
  { name: "Python Certification", issuer: "United Latino Students Association", year: "2024", Icon: SiPython, accent: "#3B82F6" },
  { name: "React Advanced Patterns", issuer: "Udemy", year: "2025", Icon: SiReact, accent: "#06B6D4" },
  { name: "TypeScript Mastery", issuer: "Udemy", year: "2025", Icon: SiTypescript, accent: "#EC4899" },
  { name: "Prompt Engineering for Devs", issuer: "Self-Paced", year: "2025", Icon: SiAnthropic, accent: "#F97316" },
];

export type SkillLevel = "worked" | "familiar";
export type SkillCategory = "frontend" | "architecture" | "devops" | "backend" | "productivity" | "ai" | "vibe";
export type Skill = { 
  name: string; 
  Icon: IconType; 
  color: string; 
  category: SkillCategory; 
  level: SkillLevel;
  cls?: string; 
  url?: string 
};

export const skills: Skill[] = [
  { name: "React", Icon: SiReact, color: "#61DBFB", category: "frontend", level: "worked", url: "https://react.dev" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", category: "frontend", level: "worked", url: "https://www.typescriptlang.org" },
  { name: "JavaScript", Icon: JavascriptIcon as IconType, color: "#F7DF1E", category: "frontend", level: "worked", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Redux Toolkit", Icon: SiRedux, color: "#764ABC", category: "frontend", level: "worked", url: "https://redux-toolkit.js.org" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF", category: "frontend", level: "familiar", url: "https://threejs.org" },
  { name: "Apache ECharts", Icon: SiApacheecharts, color: "#AA0201", category: "frontend", level: "familiar", url: "https://echarts.apache.org" },
  { name: "Chart.js", Icon: SiChartdotjs, color: "#FF6384", category: "frontend", level: "familiar", url: "https://www.chartjs.org" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", category: "frontend", level: "worked", url: "https://tailwindcss.com" },
  { name: "SCSS", Icon: SiSass, color: "#CC6699", category: "frontend", level: "worked", url: "https://sass-lang.com" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3", category: "frontend", level: "worked", url: "https://getbootstrap.com" },
  { name: "Vite", Icon: SiVite, color: "#646CFF", category: "frontend", level: "worked", url: "https://vitejs.dev" },
  { name: "Framer Motion", Icon: SiFramer, color: "#E64BFF", category: "frontend", level: "worked", url: "https://www.framer.com/motion" },

  { name: "RBAC", Icon: LuShieldCheck, color: "#3B82F6", category: "architecture", level: "worked" },
  { name: "ABAC", Icon: LuShieldAlert, color: "#8B5CF6", category: "architecture", level: "familiar" },

  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5", category: "devops", level: "familiar", url: "https://kubernetes.io" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", category: "devops", level: "familiar", url: "https://www.docker.com" },
  { name: "Kafka", Icon: SiApachekafka, color: "#E30022", category: "devops", level: "familiar", url: "https://kafka.apache.org" },
  { name: "SonarQube", Icon: SiSonarqubeserver, color: "#4E9BCD", category: "devops", level: "worked", url: "https://www.sonarsource.com/products/sonarqube" },
  { name: "Nexus", Icon: SiSonatype, color: "#00BFFF", category: "devops", level: "worked", url: "https://www.sonatype.com/products/sonatype-nexus-repository" },
  { name: "JFrog", Icon: SiJfrog, color: "#40BE46", category: "devops", level: "worked", url: "https://jfrog.com" },
  { name: "GitLab", Icon: SiGitlab, color: "#FC6D26", category: "devops", level: "worked", url: "https://gitlab.com" },

  { name: "Java", Icon: JavaIcon as IconType, color: "#E32B25", category: "backend", level: "worked", url: "https://www.java.com" },
  { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F", category: "backend", level: "worked", url: "https://spring.io/projects/spring-boot" },
  { name: "PostgreSQL", Icon: PostgreSQLIcon as IconType, color: "#4F8FBF", category: "backend", level: "worked", url: "https://www.postgresql.org" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", category: "backend", level: "familiar", url: "https://firebase.google.com" },
  { name: "Bruno", Icon: SiBruno, color: "#F37021", category: "backend", level: "worked", url: "https://www.usebruno.com" },

  { name: "Word", Icon: WordIcon as IconType, color: "#1B5EBE", category: "productivity", level: "worked", url: "https://www.microsoft.com/microsoft-365/word" },
  { name: "Excel", Icon: ExcelIcon as IconType, color: "#21A366", category: "productivity", level: "worked", url: "https://www.microsoft.com/microsoft-365/excel" },
  { name: "PowerPoint", Icon: PowerPointIcon as IconType, color: "#D35230", category: "productivity", level: "worked", url: "https://www.microsoft.com/microsoft-365/powerpoint" },
  { name: "Jira", Icon: SiJira, color: "#4F8FE0", category: "productivity", level: "worked", url: "https://www.atlassian.com/software/jira" },
  { name: "Confluence", Icon: SiConfluence, color: "#4F8FE0", category: "productivity", level: "worked", url: "https://www.atlassian.com/software/confluence" },
  { name: "Figma", Icon: FigmaIcon as IconType, color: "#F24E1E", category: "productivity", level: "worked", url: "https://www.figma.com" },
  { name: "Canva", Icon: SiCanva, color: "#00C4CC", category: "productivity", level: "worked", url: "https://www.canva.com" },
  { name: "GitHub", Icon: SiGithub, color: "#E5E5E5", category: "productivity", level: "worked", url: "https://github.com" },

  { name: "Claude", Icon: ClaudeIcon as IconType, color: "#D97757", category: "ai", level: "worked", url: "https://claude.ai" },
  { name: "ChatGPT", Icon: ChatGPTIcon as IconType, color: "#10A37F", category: "ai", level: "worked", url: "https://chat.openai.com" },
  { name: "Gemini", Icon: GeminiIcon as IconType, color: "#4285F4", category: "ai", level: "worked", url: "https://gemini.google.com" },
  { name: "Deepseek", Icon: DeepseekIcon as IconType, color: "#4D6EFE", category: "ai", level: "worked", url: "https://www.deepseek.com" },
  { name: "Copilot", Icon: CopilotIcon as IconType, color: "#10A37F", category: "vibe", level: "worked", url: "https://copilot.microsoft.com" },
  { name: "Kling AI", Icon: KlingIcon as IconType, color: "#FF4560", category: "ai", level: "familiar", url: "https://kling.kuaishou.com" },
  { name: "Lovable",  Icon: LovableIcon as IconType,  color: "#FF4560", category: "vibe", level: "worked", url: "https://lovable.dev" },
  { name: "Bolt.new", Icon: BoltIcon as IconType,       color: "#FFB020", category: "vibe", level: "worked", url: "https://bolt.new" },
  { name: "Cursor",   Icon: CursorIcon as IconType,    color: "#4B9FFF", category: "vibe", level: "worked", url: "https://www.cursor.com" },
  { name: "Replit",   Icon: SiReplit,                  color: "#F26207", category: "vibe", level: "worked", url: "https://replit.com" },
  { name: "Stitch",   Icon: StitchIcon as IconType,    color: "#A855F7", category: "vibe", level: "familiar", url: "https://www.stitchdata.com" },
];

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend & Viz" },
  { id: "architecture", label: "Architecture & Security" },
  { id: "devops", label: "DevOps & Systems" },
  { id: "backend", label: "Backend & API" },
  { id: "productivity", label: "Productivity & Collab" },
  { id: "ai", label: "AI" },
  { id: "vibe", label: "AI-Assisted Dev" },
];

export type StageTool = { name: string; Icon: IconType; color: string };
export type AiToolUsage = { name: string; usage: string; Icon: IconType };
export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category?: string;
  period: string;
  image: string;
  accent: string;
  metrics?: { label: string; value: string }[];
  stageTools: StageTool[];
  aiTools?: AiToolUsage[];
  featured?: boolean;
  href?: string;
  hrefLabel?: string;
};

export const projects: Project[] = [
  {
    title: "Guardian AI — Claude-powered Assistant",
    subtitle: "Conversational AI, built around your knowledge",
    description:
      "An AI co-pilot built on Claude that grounds answers in a private knowledge base. Streaming responses, tool-use, and a draggable floating UI make it feel like a true product surface, not a chat widget.",
    tags: ["Claude", "Anthropic API", "React 19", "Streaming", "RAG"],
    category: "AI Product",
    period: "Mar 2026",
    image: projectClaude,
    accent: "#F97316",
    featured: true,
    metrics: [
      { label: "Avg. response", value: "<1.2s" },
      { label: "Knowledge accuracy", value: "94%" },
      { label: "Sessions", value: "2k+" },
    ],
    stageTools: [
      { name: "Spec", Icon: SiConfluence, color: "#4F8FE0" },
      { name: "Design", Icon: SiFigma, color: "#F24E1E" },
      { name: "Build", Icon: SiAnthropic, color: "#D97757" },
      { name: "Test", Icon: SiPostman, color: "#FF6C37" },
      { name: "Ship", Icon: SiDocker, color: "#2496ED" },
    ],
    aiTools: [
      { name: "Claude", usage: "Core intelligence backing the architectural RAG reasoning and managing conversational context.", Icon: ClaudeIcon as IconType },
      { name: "Cursor", usage: "Rapid prototyping of complex floating UI framer-motion components and React state persistence.", Icon: CursorIcon as IconType },
      { name: "Lovable", usage: "Scaffolding baseline frontend architecture before deep manual aesthetic customization.", Icon: LovableIcon as IconType },
      { name: "ChatGPT", usage: "Heavy iterative reasoning and complex algorithmic prompt generation.", Icon: ChatGPTIcon as IconType }
    ],
    hrefLabel: "Enterprise · Private",
  },
  {
    title: "DevPerf Analyser Automation Tool",
    subtitle: "Insights for productivity",
    description:
      "A performance analysis platform that tracks developer productivity and surfaces system insights. Real-time metrics, trend detection, and actionable recommendations baked into one workflow.",
    tags: ["React", "Java", "Spring Boot", "Data Analysis"],
    category: "Productivity Tool",
    period: "Jan — Mar 2026",
    image: projectDevperf,
    accent: "#EC4899",
    metrics: [
      { label: "Engineers tracked", value: "120+" },
      { label: "Reports / week", value: "300" },
    ],
    stageTools: [
      { name: "Plan", Icon: SiJira, color: "#4F8FE0" },
      { name: "Design", Icon: SiFigma, color: "#F24E1E" },
      { name: "Code", Icon: SiGitlab, color: "#FC6D26" },
      { name: "Deploy", Icon: SiDocker, color: "#2496ED" },
    ],
    aiTools: [
      { name: "ChatGPT", usage: "Generating complex data aggregation scripts and optimizing heavy SQL queries for Spring Boot execution.", Icon: ChatGPTIcon as IconType },
      { name: "Copilot", usage: "Inline autocomplete for writing repetitive Java boilerplate and constructing precise Data Transfer Objects.", Icon: CopilotIcon as IconType }
    ],
    hrefLabel: "Enterprise · Private",
  },
  {
    title: "Developer Sprint Flow",
    subtitle: "End-to-end sprint command center",
    description:
      "A complete sprint operations dashboard — date-wise sprint planning, live progress burndown, team worklog tracking, threaded collaboration on tickets, and AI-generated + manually authored Jira tickets in one unified view.",
    tags: ["React", "SCSS", "Jira API", "Dashboards", "AI Tickets"],
    category: "Dashboard",
    period: "Feb 2025",
    image: projectSprint,
    accent: "#A855F7",
    metrics: [
      { label: "Sprint views", value: "6" },
      { label: "Live charts", value: "9" },
      { label: "AI tickets", value: "150+" },
    ],
    stageTools: [
      { name: "Plan", Icon: SiJira, color: "#4F8FE0" },
      { name: "Design", Icon: SiFigma, color: "#F24E1E" },
      { name: "Build", Icon: SiReact, color: "#61DBFB" },
      { name: "Review", Icon: SiBruno, color: "#F37021" },
      { name: "Ship", Icon: SiGithub, color: "#E5E5E5" },
    ],
    aiTools: [
      { name: "DeepSeek", usage: "Structuring the complex custom mathematical logic for live progress burndown charts.", Icon: DeepseekIcon as IconType },
      { name: "Gemini", usage: "Analyzing system test logs and formatting robust JSON validation schemas used for the Jira API payloads.", Icon: GeminiIcon as IconType },
      { name: "ChatGPT", usage: "Generating modular React dashboard components and refining SCSS grid layouts.", Icon: ChatGPTIcon as IconType }
    ],
    hrefLabel: "Enterprise · Private",
  },
  {
    title: "Web-Based Career Site",
    subtitle: "Career platform",
    description:
      "A comprehensive career website built from scratch with HTML, CSS, and JavaScript — focused on user experience, accessibility, and a confident, clean interface.",
    tags: ["HTML", "CSS", "JavaScript", "Java"],
    category: "Web App",
    period: "Oct — Mar 2023",
    image: projectCareer,
    accent: "#06B6D4",
    metrics: [
      { label: "Pages", value: "14" },
      { label: "Lighthouse", value: "98" },
    ],
    stageTools: [
      { name: "Design", Icon: SiCanva, color: "#00C4CC" },
      { name: "Build", Icon: SiGithub, color: "#E5E5E5" },
    ],
    aiTools: [
      { name: "Bolt.new", usage: "Instant initial scaffolding of the static multi-page architecture and baseline CSS class injection.", Icon: BoltIcon as IconType },
      { name: "Kling AI", usage: "Generating rich, high-fidelity hero banner mockup assets used for site visuals.", Icon: KlingIcon as IconType },
      { name: "ChatGPT", usage: "Brainstorming semantic HTML structuring and highly optimized JavaScript patterns.", Icon: ChatGPTIcon as IconType }
    ],
    hrefLabel: "Enterprise · Private",

  },
];

export const heroStats = [
  { value: "3+", label: "Years building", Icon: LuRocket },
  { value: "9.0", label: "Master's CGPA", Icon: LuMedal },
  { value: "40+", label: "Tools mastered", Icon: LuZap },
  { value: "7", label: "Certifications", Icon: LuTrophy },
];
