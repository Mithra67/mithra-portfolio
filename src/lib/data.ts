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
  LuGem,
  LuZap,
  LuBrain,
  LuTrophy,
  LuMedal,
  LuRocket,
} from "react-icons/lu";
import type { IconType } from "react-icons";
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
    github: "https://github.com/",
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
    period: "Oct — Mar 2023",
    description:
      "Contributed to scalable web solutions. Drove UI optimization, architectural modeling, and mission-critical bug fixing.",
    type: "Junior",
    highlights: [
      "Refactored legacy components into a modern React stack",
      "Cut critical-path bug count by 40% in two sprints",
    ],
    stack: ["React", "SCSS", "JavaScript"],
  },
  {
    company: "Freelance",
    role: "Digital Strategist & Blogger",
    period: "Nov — Dec 2024",
    description:
      "Authored high-impact SEO content and presentations for international clients, focused on conversion architecture and brand visibility.",
    type: "Contract",
    highlights: [
      "SEO content powering inbound for 4 international clients",
      "Crafted decks closing pilot engagements",
    ],
    stack: ["SEO", "Content", "Brand"],
  },
];

export const education = [
  {
    school: "SNMV CAS",
    degree: "Gold Medalist — Bachelor's",
    score: "9.014 GPA",
    accent: true,
  },
  {
    school: "Bharathiar University",
    degree: "Master's",
    score: "9.0 / 10 CGPA",
    accent: false,
  },
];

export const certifications = [
  { name: "Full Stack Developer", issuer: "Stark Institutions", year: "2024", Icon: LuAward, accent: "#A855F7" },
  { name: "Data Analytics", issuer: "Self-paced", year: "2024", Icon: SiPostgresql, accent: "#06B6D4" },
  { name: "Diamond Grading", issuer: "Diamonds India", year: "2023", Icon: LuGem, accent: "#F59E0B" },
  { name: "Python Certification", issuer: "Self-paced", year: "2024", Icon: SiPython, accent: "#3B82F6" },
  { name: "React Advanced Patterns", issuer: "Self-paced · 2025", year: "2025", Icon: SiReact, accent: "#61DBFB" },
  { name: "TypeScript Mastery", issuer: "Self-paced · 2025", year: "2025", Icon: SiTypescript, accent: "#3178C6" },
  { name: "Prompt Engineering for Devs", issuer: "Anthropic Academy", year: "2025", Icon: SiAnthropic, accent: "#D97757" },
];

export type SkillCategory =
  | "frontend"
  | "architecture"
  | "devops"
  | "backend"
  | "productivity"
  | "ai";
export type Skill = { name: string; Icon: IconType; color: string; category: SkillCategory };

export const skills: Skill[] = [
  { name: "React", Icon: SiReact, color: "#61DBFB", category: "frontend" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", category: "frontend" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", category: "frontend" },
  { name: "Redux Toolkit", Icon: SiRedux, color: "#764ABC", category: "frontend" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF", category: "frontend" },
  { name: "Apache ECharts", Icon: SiApacheecharts, color: "#AA0201", category: "frontend" },
  { name: "Chart.js", Icon: SiChartdotjs, color: "#FF6384", category: "frontend" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
  { name: "SCSS", Icon: SiSass, color: "#CC6699", category: "frontend" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3", category: "frontend" },
  { name: "Vite", Icon: SiVite, color: "#646CFF", category: "frontend" },
  { name: "Framer Motion", Icon: SiFramer, color: "#E64BFF", category: "frontend" },

  { name: "RBAC", Icon: LuShieldCheck, color: "#3B82F6", category: "architecture" },
  { name: "ABAC", Icon: LuShieldAlert, color: "#8B5CF6", category: "architecture" },
  { name: "Permission Modeling", Icon: LuUsers, color: "#06B6D4", category: "architecture" },
  { name: "Access Control", Icon: LuLock, color: "#F43F5E", category: "architecture" },
  { name: "API Gateway", Icon: LuGlobe, color: "#10B981", category: "architecture" },

  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5", category: "devops" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", category: "devops" },
  { name: "Kafka", Icon: SiApachekafka, color: "#E30022", category: "devops" },
  { name: "SonarQube", Icon: SiSonarqubeserver, color: "#4E9BCD", category: "devops" },
  { name: "Nexus", Icon: SiSonatype, color: "#00BFFF", category: "devops" },
  { name: "JFrog", Icon: SiJfrog, color: "#40BE46", category: "devops" },
  { name: "GitLab", Icon: SiGitlab, color: "#FC6D26", category: "devops" },
  { name: "Bolt", Icon: LuZap, color: "#FFB020", category: "devops" },

  { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F", category: "backend" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4F8FBF", category: "backend" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", category: "backend" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37", category: "backend" },
  { name: "Bruno", Icon: SiBruno, color: "#F37021", category: "backend" },

  { name: "Word", Icon: LuFileText, color: "#4A8FD8", category: "productivity" },
  { name: "Excel", Icon: LuFileSpreadsheet, color: "#3FAE6E", category: "productivity" },
  { name: "PowerPoint", Icon: LuPresentation, color: "#E8754A", category: "productivity" },
  { name: "Jira", Icon: SiJira, color: "#4F8FE0", category: "productivity" },
  { name: "Confluence", Icon: SiConfluence, color: "#4F8FE0", category: "productivity" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E", category: "productivity" },
  { name: "Canva", Icon: SiCanva, color: "#00C4CC", category: "productivity" },
  { name: "GitHub", Icon: SiGithub, color: "#E5E5E5", category: "productivity" },

  { name: "Claude", Icon: SiAnthropic, color: "#D97757", category: "ai" },
  { name: "ChatGPT", Icon: SiOpenai, color: "#74aa9c", category: "ai" },
  { name: "Gemini", Icon: SiGoogle, color: "#4285F4", category: "ai" },
  { name: "Prompt Eng.", Icon: LuBrain, color: "#C084FC", category: "ai" },
];

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend & Viz" },
  { id: "architecture", label: "Architecture & Security" },
  { id: "devops", label: "DevOps & Systems" },
  { id: "backend", label: "Backend & API" },
  { id: "productivity", label: "Productivity & Collab" },
  { id: "ai", label: "AI" },
];

export type StageTool = { name: string; Icon: IconType; color: string };
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
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Guardian AI — Claude-powered Assistant",
    subtitle: "Conversational AI, built around your knowledge",
    description:
      "An AI co-pilot built on Claude that grounds answers in a private knowledge base. Streaming responses, tool-use, and a draggable floating UI make it feel like a true product surface, not a chat widget.",
    tags: ["Claude", "Anthropic API", "React 19", "Streaming", "RAG"],
    category: "AI Product",
    period: "Mar 2025",
    image: projectClaude,
    accent: "#D97757",
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
    accent: "#A855F7",
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
    accent: "#06B6D4",
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
  },
  {
    title: "Web-Based Career Site",
    subtitle: "Career platform",
    description:
      "A comprehensive career website built from scratch with HTML, CSS, and JavaScript — focused on user experience, accessibility, and a confident, clean interface.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Web App",
    period: "Oct — Mar 2023",
    image: projectCareer,
    accent: "#10B981",
    metrics: [
      { label: "Pages", value: "14" },
      { label: "Lighthouse", value: "98" },
    ],
    stageTools: [
      { name: "Design", Icon: SiCanva, color: "#00C4CC" },
      { name: "Build", Icon: SiGithub, color: "#E5E5E5" },
    ],
  },
];

export const heroStats = [
  { value: "3+", label: "Years building", Icon: LuRocket },
  { value: "9.0", label: "Master's CGPA", Icon: LuMedal },
  { value: "40+", label: "Tools mastered", Icon: LuZap },
  { value: "7", label: "Certifications", Icon: LuTrophy },
];
