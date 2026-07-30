// Color theme system for resume templates
// Each theme provides colors that templates use for rendering

export interface ColorTheme {
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  headerBg: string;
  headerText: string;
  sidebarBg: string;
  sidebarText: string;
  sectionBorder: string;
  skillBg: string;
  skillText: string;
  dateBg: string;
  dateText: string;
}

export type ColorThemeId = "blue" | "black" | "green" | "red" | "purple" | "gray" | "navy" | "teal";

export const colorThemes: Record<ColorThemeId, ColorTheme> = {
  blue: {
    primary: "#2563eb",
    primaryLight: "#dbeafe",
    secondary: "#64748b",
    accent: "#3b82f6",
    headerBg: "#2563eb",
    headerText: "#ffffff",
    sidebarBg: "#1e3a5f",
    sidebarText: "#e2e8f0",
    sectionBorder: "#2563eb",
    skillBg: "#dbeafe",
    skillText: "#1d4ed8",
    dateBg: "#f1f5f9",
    dateText: "#64748b",
  },
  black: {
    primary: "#1f2937",
    primaryLight: "#f3f4f6",
    secondary: "#6b7280",
    accent: "#374151",
    headerBg: "#111827",
    headerText: "#ffffff",
    sidebarBg: "#1f2937",
    sidebarText: "#d1d5db",
    sectionBorder: "#1f2937",
    skillBg: "#f3f4f6",
    skillText: "#1f2937",
    dateBg: "#f3f4f6",
    dateText: "#6b7280",
  },
  green: {
    primary: "#059669",
    primaryLight: "#d1fae5",
    secondary: "#64748b",
    accent: "#10b981",
    headerBg: "#059669",
    headerText: "#ffffff",
    sidebarBg: "#064e3b",
    sidebarText: "#d1fae5",
    sectionBorder: "#059669",
    skillBg: "#d1fae5",
    skillText: "#065f46",
    dateBg: "#f0fdf4",
    dateText: "#64748b",
  },
  red: {
    primary: "#dc2626",
    primaryLight: "#fee2e2",
    secondary: "#64748b",
    accent: "#ef4444",
    headerBg: "#dc2626",
    headerText: "#ffffff",
    sidebarBg: "#7f1d1d",
    sidebarText: "#fecaca",
    sectionBorder: "#dc2626",
    skillBg: "#fee2e2",
    skillText: "#991b1b",
    dateBg: "#fef2f2",
    dateText: "#64748b",
  },
  purple: {
    primary: "#7c3aed",
    primaryLight: "#ede9fe",
    secondary: "#64748b",
    accent: "#8b5cf6",
    headerBg: "#7c3aed",
    headerText: "#ffffff",
    sidebarBg: "#4c1d95",
    sidebarText: "#ddd6fe",
    sectionBorder: "#7c3aed",
    skillBg: "#ede9fe",
    skillText: "#6d28d9",
    dateBg: "#f5f3ff",
    dateText: "#64748b",
  },
  gray: {
    primary: "#475569",
    primaryLight: "#f1f5f9",
    secondary: "#94a3b8",
    accent: "#64748b",
    headerBg: "#334155",
    headerText: "#ffffff",
    sidebarBg: "#1e293b",
    sidebarText: "#cbd5e1",
    sectionBorder: "#475569",
    skillBg: "#f1f5f9",
    skillText: "#334155",
    dateBg: "#f8fafc",
    dateText: "#94a3b8",
  },
  navy: {
    primary: "#1e3a5f",
    primaryLight: "#e0e7ff",
    secondary: "#64748b",
    accent: "#2563eb",
    headerBg: "#0f172a",
    headerText: "#ffffff",
    sidebarBg: "#0f172a",
    sidebarText: "#94a3b8",
    sectionBorder: "#1e3a5f",
    skillBg: "#e0e7ff",
    skillText: "#1e3a5f",
    dateBg: "#f1f5f9",
    dateText: "#64748b",
  },
  teal: {
    primary: "#0d9488",
    primaryLight: "#ccfbf1",
    secondary: "#64748b",
    accent: "#14b8a6",
    headerBg: "#0d9488",
    headerText: "#ffffff",
    sidebarBg: "#134e4a",
    sidebarText: "#99f6e4",
    sectionBorder: "#0d9488",
    skillBg: "#ccfbf1",
    skillText: "#0f766e",
    dateBg: "#f0fdfa",
    dateText: "#64748b",
  },
};

export const colorThemeNames: Record<ColorThemeId, string> = {
  blue: "Blue",
  black: "Black",
  green: "Green",
  red: "Red",
  purple: "Purple",
  gray: "Gray",
  navy: "Navy",
  teal: "Teal",
};

export const colorThemeOrder: ColorThemeId[] = ["blue", "black", "navy", "green", "purple", "teal", "red", "gray"];

export function getColorTheme(id: string): ColorTheme {
  return colorThemes[id as ColorThemeId] || colorThemes.blue;
}
