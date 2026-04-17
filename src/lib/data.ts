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
  SiSonarqube,
  SiSonatype,
  SiJfrog,
  SiSpringboot,
  SiPostgresql,
  SiFirebase,
  SiJira,
  SiFigma,
  SiGithub,
  SiOpenai,
  SiAnthropic,
  SiGoogle,
  SiPython,
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
} from "react-icons/lu";
import type { IconType } from "react-icons";

export const profile = {
  name: "Sangamithra D",
  role: "Product Developer",
  bio: "Strategic Product Developer dedicated to engineering high-performance, scalable enterprise applications with a core emphasis on role-based security architectures and seamless user experiences.",
  email: "sangamithra.d@example.com",
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
};

export const experience: ExperienceItem[] = [
  {
    company: "DEVOPSLABS",
    role: "Product Developer",
    period: "Dec 2024 - Present",
    description:
      "Spearheading the development of responsive and interactive enterprise user interfaces. Expertly collaborating with cross-functional teams to implement React hooks and sophisticated state management for high-availability systems.",
    type: "Full-time",
    active: true,
  },
  {
    company: "Stark Institutions",
    role: "Full Stack Developer Intern",
    period: "Jul - Sep, 2024",
    description:
      "Engineered web applications using modern full-stack technologies. Focused on optimizing frontend responsiveness and architecting robust backend integrations.",
    type: "Intern",
  },
  {
    company: "Computira Soft Solutions",
    role: "Junior Web Developer",
    period: "Oct - Mar, 2023",
    description:
      "Assisted in building scalable web-based solutions. Actively involved in UI optimization, architectural modeling, and mission-critical bug fixing.",
    type: "Junior",
  },
  {
    company: "Freelance",
    role: "Digital Strategist & Blogger",
    period: "Nov - Dec, 2024",
    description:
      "Authored high-impact SEO content and presentations for international clients, focusing on conversion architecture and brand visibility.",
    type: "Contract",
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
  { name: "Full Stack Developer", issuer: "DevOpsLabs", year: "2024", Icon: LuAward },
  { name: "Data Analytics", issuer: "Bharathiar University", year: "2024", Icon: SiPostgresql },
  { name: "Certified Diamond Grading", issuer: "IGI", year: "2023", Icon: LuGem },
  { name: "Python Certification", issuer: "Stark Institutions", year: "2024", Icon: SiPython },
];

export type SkillCategory = "frontend" | "architecture" | "devops" | "backend" | "productivity" | "ai";
export type Skill = { name: string; Icon: IconType; color: string; category: SkillCategory };

export const skills: Skill[] = [
  { name: "React", Icon: SiReact, color: "#61DBFB", category: "frontend" },
  { name: "TypeScript", Icon: SiJavascript, color: "#3178C6", category: "frontend" },
  { name: "Redux Toolkit", Icon: SiRedux, color: "#764ABC", category: "frontend" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF", category: "frontend" },
  { name: "Apache ECharts", Icon: SiApacheecharts, color: "#AA0201", category: "frontend" },
  { name: "Chart.js", Icon: SiChartdotjs, color: "#FF6384", category: "frontend" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
  { name: "SCSS", Icon: SiSass, color: "#CC6699", category: "frontend" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3", category: "frontend" },

  { name: "RBAC", Icon: LuShieldCheck, color: "#3B82F6", category: "architecture" },
  { name: "ABAC", Icon: LuShieldAlert, color: "#8B5CF6", category: "architecture" },
  { name: "Permission Modeling", Icon: LuUsers, color: "#06B6D4", category: "architecture" },
  { name: "Access Control", Icon: LuLock, color: "#F43F5E", category: "architecture" },
  { name: "API Gateway", Icon: LuGlobe, color: "#10B981", category: "architecture" },

  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5", category: "devops" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", category: "devops" },
  { name: "Kafka", Icon: SiApachekafka, color: "#E30022", category: "devops" },
  { name: "SonarQube", Icon: SiSonarqube, color: "#4E9BCD", category: "devops" },
  { name: "Nexus", Icon: SiSonatype, color: "#00BFFF", category: "devops" },
  { name: "JFrog", Icon: SiJfrog, color: "#40BE46", category: "devops" },

  { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F", category: "backend" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4F8FBF", category: "backend" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", category: "backend" },

  { name: "Word", Icon: LuFileText, color: "#4A8FD8", category: "productivity" },
  { name: "Excel", Icon: LuFileSpreadsheet, color: "#3FAE6E", category: "productivity" },
  { name: "PowerPoint", Icon: LuPresentation, color: "#E8754A", category: "productivity" },
  { name: "Jira", Icon: SiJira, color: "#4F8FE0", category: "productivity" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E", category: "productivity" },
  { name: "GitHub", Icon: SiGithub, color: "#E5E5E5", category: "productivity" },

  { name: "ChatGPT", Icon: SiOpenai, color: "#74aa9c", category: "ai" },
  { name: "Claude", Icon: SiAnthropic, color: "#D97757", category: "ai" },
  { name: "Gemini", Icon: SiGoogle, color: "#4285F4", category: "ai" },
];

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend & Viz" },
  { id: "architecture", label: "Architecture & Security" },
  { id: "devops", label: "DevOps & Systems" },
  { id: "backend", label: "Backend" },
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
  stageTools: StageTool[];
};

export const projects: Project[] = [
  {
    title: "DevPerf Analyser Automation Tool",
    subtitle: "Insights for Productivity",
    description:
      "A performance analysis tool built to track developer productivity and system insights, focusing on real-time metrics and actionable optimizations.",
    tags: ["React", "Java", "Spring Boot", "Data Analysis"],
    category: "Productivity Tool",
    period: "Jan - Mar, 2026",
    stageTools: [
      { name: "Plan", Icon: SiJira, color: "#4F8FE0" },
      { name: "Design", Icon: SiFigma, color: "#F24E1E" },
      { name: "Code", Icon: SiGithub, color: "#E5E5E5" },
      { name: "Deploy", Icon: SiDocker, color: "#2496ED" },
    ],
  },
  {
    title: "Developer Sprint Flow",
    subtitle: "Flow Dashboards",
    description:
      "Developed responsive and interactive user interfaces using React.js, focusing on data visualization and filtering systems.",
    tags: ["React JS", "SCSS", "UI/UX"],
    period: "Feb 2025",
    stageTools: [
      { name: "Wireframe", Icon: SiFigma, color: "#F24E1E" },
      { name: "Develop", Icon: SiReact, color: "#61DBFB" },
      { name: "Commit", Icon: SiGithub, color: "#E5E5E5" },
    ],
  },
  {
    title: "Web-Based Career Site",
    subtitle: "Career Platform",
    description:
      "Built a comprehensive career website using HTML, CSS, and JavaScript. Focused on user experience and clean interface.",
    tags: ["HTML", "CSS", "JavaScript"],
    period: "Oct - Mar, 2023",
    stageTools: [
      { name: "Design", Icon: SiFigma, color: "#F24E1E" },
      { name: "Frontend", Icon: SiGithub, color: "#E5E5E5" },
    ],
  },
];
