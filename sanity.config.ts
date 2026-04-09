import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";
import { structure } from "@/sanity/structure";
import { dashboardPlugin } from "@/sanity/plugins/dashboard";
import { statusBoardPlugin } from "@/sanity/plugins/statusBoard";
import { bulkAddPlugin } from "@/sanity/plugins/bulkAdd";

const theme = buildLegacyTheme({
  "--black": "#1a1a2e",
  "--white": "#faf8f5",
  "--gray-base": "#1a1a2e",
  "--gray": "#6b7280",
  "--component-bg": "#faf8f5",
  "--component-text-color": "#1a1a2e",

  // Brand colors
  "--brand-primary": "#9b4dca",
  "--focus-color": "#9b4dca",
  "--default-button-primary-color": "#9b4dca",

  // State colors
  "--default-button-success-color": "#4ecdc4",
  "--state-success-color": "#4ecdc4",
  "--state-info-color": "#4ecdc4",
  "--default-button-warning-color": "#ff8c42",
  "--state-warning-color": "#ff8c42",
  "--default-button-danger-color": "#ff6b6b",
  "--state-danger-color": "#ff6b6b",

  // Navigation
  "--main-navigation-color": "#1a1a2e",
  "--main-navigation-color--inverted": "#faf8f5",

  // Buttons
  "--default-button-color": "#6b7280",

  // Fonts
  "--font-family-base": '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  "--font-family-monospace": '"JetBrains Mono", "SF Mono", "Fira Code", monospace',
});

export default defineConfig({
  name: "guardians-of-goodness",
  title: "Guardians of Goodness",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    dashboardPlugin(),
    statusBoardPlugin(),
    bulkAddPlugin(),
    structureTool({ structure }),
    visionTool(),
  ],

  theme,

  schema: {
    types: schemaTypes,
  },
});
