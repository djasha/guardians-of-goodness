import { definePlugin } from "sanity";
import { StatusBoardTool } from "./StatusBoardTool";

export const statusBoardPlugin = definePlugin({
  name: "guardians-status-board",
  tools: [
    {
      name: "status-board",
      title: "Status Board",
      icon: () => "📋",
      component: StatusBoardTool,
    },
  ],
});
