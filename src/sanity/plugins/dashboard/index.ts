import { definePlugin } from "sanity";
import { DashboardTool } from "./DashboardTool";

export const dashboardPlugin = definePlugin({
  name: "guardians-dashboard",
  tools: [
    {
      name: "dashboard",
      title: "Dashboard",
      icon: () => "🏠",
      component: DashboardTool,
    },
  ],
});
