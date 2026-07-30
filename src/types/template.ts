// Template system types

export type TemplateCategory =
  | "modern"
  | "minimal"
  | "creative"
  | "executive"
  | "corporate"
  | "professional"
  | "elegant"
  | "ats"
  | "designer"
  | "developer"
  | "marketing"
  | "medical"
  | "student"
  | "teacher"
  | "sales"
  | "business"
  | "finance"
  | "engineering"
  | "simple"
  | "academic";

export type TemplateStyle =
  | "modern"
  | "minimal"
  | "professional"
  | "creative"
  | "elegant"
  | "corporate"
  | "ats-friendly"
  | "academic"
  | "two-column"
  | "one-column";

export type IndustryType =
  | "software-engineer"
  | "designer"
  | "marketing"
  | "teacher"
  | "business"
  | "medical"
  | "student"
  | "accounting"
  | "sales"
  | "hr"
  | "legal"
  | "engineering"
  | "general";

export type ExperienceLevel = "entry" | "mid" | "senior";

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  style: TemplateStyle;
  industries: IndustryType[];
  experienceLevels: ExperienceLevel[];
  atsScore: number; // 0-100
  isPremium: boolean;
  isFeatured: boolean;
  isNew: boolean;
  fonts: string[];
  sections: string[];
  layout: "one-column" | "two-column" | "sidebar-left" | "sidebar-right";
  colorDefault: string; // default color theme id
  tags?: string[];
}

export interface TemplateRegistryEntry {
  metadata: TemplateMetadata;
  // Component is loaded dynamically
  component: React.ComponentType<{ data: import("./cv").CVData; colorTheme: import("../lib/templates/colors").ColorTheme }>;
}
