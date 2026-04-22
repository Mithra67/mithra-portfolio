// High-fidelity brand SVG icons for AI/vibe coding tools
import type { SVGAttributes } from "react";
import lovableLogo from "@/assets/tool-logos/lovable.png";
import claudeLogo from "@/assets/tool-logos/claude.webp";
import geminiLogo from "@/assets/tool-logos/gemini.webp";
import chatgptLogo from "@/assets/tool-logos/chatgpt.webp";
import deepseekLogo from "@/assets/tool-logos/deepseek.webp";
import copilotLogo from "@/assets/tool-logos/copilot.webp";
import klingLogo from "@/assets/tool-logos/kling.webp";
import wordLogo from "@/assets/tool-logos/word.webp";
import excelLogo from "@/assets/tool-logos/excel.webp";
import powerpointLogo from "@/assets/tool-logos/powerpoint.webp";
import javaLogo from "@/assets/tool-logos/java.webp";
import postgresqlLogo from "@/assets/tool-logos/postgresql.webp";
import figmaLogo from "@/assets/tool-logos/figma.webp";
import threejsLogo from "@/assets/tool-logos/three-js.webp";
import javascriptLogo from "@/assets/tool-logos/javascript.webp";

// Lovable (Custom PNG)
export function LovableIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={lovableLogo} alt="Lovable" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Bolt.new (Pure Vector SVG)
export function BoltIcon({ className, style, ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ ...style, fill: "#FFB020" }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path d="M13 2L3 14h8l-2 8 10-12h-8z" />
    </svg>
  );
}

// Claude (Custom Image)
export function ClaudeIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={claudeLogo} alt="Claude" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Cursor
export function CursorIcon({ className, style, ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#000000" />
      <path d="M8 6l3 12 2-4 2.5 4.5L17 17l-2.5-4.5L17 11H8z" fill="#FFFFFF" />
    </svg>
  );
}

// Stitch
export function StitchIcon({ className, style, ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path d="M5 8c0-2.5 2-4 4-4s4 1.5 4 4-2 4-4 4-4 1.5-4 4 2 4 4 4 4-1.5 4-4" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M19 8c0-2.5-2-4-4-4" opacity="0.4" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M19 16c0 2.5-2 4-4 4" opacity="0.4" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Figma (Custom Image)
export function FigmaIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={figmaLogo} alt="Figma" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Three.js (Custom Image)
export function ThreeJsIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={threejsLogo} alt="Three.js" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Gemini (Custom Image)
export function GeminiIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={geminiLogo} alt="Gemini" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// ChatGPT (Custom Image)
export function ChatGPTIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={chatgptLogo} alt="ChatGPT" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Deepseek
export function DeepseekIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={deepseekLogo} alt="Deepseek" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Copilot
export function CopilotIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={copilotLogo} alt="Copilot" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Kling AI
export function KlingIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={klingLogo} alt="Kling AI" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Word
export function WordIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={wordLogo} alt="Word" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Excel
export function ExcelIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={excelLogo} alt="Excel" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// PowerPoint
export function PowerPointIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={powerpointLogo} alt="PowerPoint" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// Java
export function JavaIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={javaLogo} alt="Java" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// PostgreSQL
export function PostgreSQLIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={postgresqlLogo} alt="PostgreSQL" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}

// JavaScript
export function JavascriptIcon({ className, style, ...props }: any) {
  return <img suppressHydrationWarning src={javascriptLogo} alt="JavaScript" className={className} style={{ ...style, objectFit: "contain" }} {...props} />;
}
