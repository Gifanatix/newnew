// Color & typography design tokens shared across all scenes
export const COLORS = {
  bg: "#0a0a14",
  bgCard: "#12122a",
  accent: "#6c63ff",
  accentGlow: "#a78bfa",
  gold: "#fbbf24",
  goldGlow: "#fde68a",
  white: "#f8fafc",
  muted: "#94a3b8",
  bar1: "#6c63ff",
  bar2: "#a78bfa",
} as const;

export const FONT_FAMILY = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// Video spec
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_FRAMES = 30 * FPS; // 900 frames

// Scene boundaries (in frames)
export const INTRO_START = 0;
export const INTRO_END = 3 * FPS; // frame 90

export const CARDS_START = 3 * FPS; // frame 90
export const CARDS_END = 25 * FPS; // frame 750
export const CARD_DURATION = (CARDS_END - CARDS_START) / 5; // 132 frames ≈ 4.4 s per card

export const OUTRO_START = 25 * FPS; // frame 750
export const OUTRO_END = 30 * FPS; // frame 900

// Country data
export interface Country {
  rank: number;
  name: string;
  flag: string; // emoji
  gdp: number; // USD per capita (thousands)
  barPct: number; // 0-1 relative width
}

export const COUNTRIES: Country[] = [
  { rank: 5, name: "Norway", flag: "🇳🇴", gdp: 108_728, barPct: 0.72 },
  { rank: 4, name: "Switzerland", flag: "🇨🇭", gdp: 116_936, barPct: 0.77 },
  { rank: 3, name: "Ireland", flag: "🇮🇪", gdp: 124_596, barPct: 0.82 },
  { rank: 2, name: "Singapore", flag: "🇸🇬", gdp: 133_108, barPct: 0.88 },
  { rank: 1, name: "Luxembourg", flag: "🇱🇺", gdp: 150_967, barPct: 1.0 },
];
