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

export const experience = [
  {
    role: "React Product Development",
    company: "DEVOPSLABS",
    period: "Dec 2024 — Present",
    points: [
      "Architecting role-based access control systems for enterprise dashboards.",
      "Driving product velocity with reusable React 19 + TypeScript primitives.",
      "Collaborating across design, QA, and DevOps to ship production releases.",
    ],
  },
  {
    role: "Full Stack Intern",
    company: "Stark Institutions",
    period: "Jul — Sep 2024",
    points: [
      "Built end-to-end features across REST APIs and React frontends.",
      "Implemented secure auth flows and reusable UI components.",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "Computira",
    period: "Oct — Mar 2023",
    points: [
      "Delivered responsive web experiences across client engagements.",
      "Tuned performance budgets and accessibility baselines.",
    ],
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

import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiAmazonwebservices,
  SiFigma,
  SiDocker,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

export const skills = [
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
  { name: "Python", Icon: SiPython, color: "#3776ab" },
  { name: "Java", Icon: FaJava, color: "#f89820" },
  { name: "AWS", Icon: SiAmazonwebservices, color: "#ff9900" },
  { name: "Figma", Icon: SiFigma, color: "#f24e1e" },
  { name: "Docker", Icon: SiDocker, color: "#2496ed" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38bdf8" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Postgres", Icon: SiPostgresql, color: "#4169e1" },
  { name: "Git", Icon: SiGit, color: "#f05032" },
];

export const projects = [
  {
    title: "DevPerf Analyser",
    tagline: "Realtime engineering performance intelligence",
    description:
      "Aggregates Git, CI, and ticket data into a single role-aware dashboard that surfaces team velocity, review bottlenecks, and reliability signals.",
    tags: ["React 19", "TypeScript", "Charts", "RBAC"],
    workflow: ["jira", "figma", "github", "docker"] as const,
  },
  {
    title: "Developer Sprint Flow",
    tagline: "Sprint orchestration for distributed teams",
    description:
      "Opinionated planning surface that connects design intent to delivery — live boards, automation hooks, and tight Figma + GitHub integration.",
    tags: ["Next.js", "Node", "Postgres", "Realtime"],
    workflow: ["jira", "figma", "github", "docker"] as const,
  },
];
