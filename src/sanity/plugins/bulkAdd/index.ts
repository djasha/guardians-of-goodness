import { definePlugin } from "sanity";
import { BulkAddTool } from "./BulkAddTool";

export const bulkAddPlugin = definePlugin({
  name: "guardians-bulk-add",
  tools: [
    {
      name: "bulk-add",
      title: "Bulk Add",
      icon: () => "📦",
      component: BulkAddTool,
    },
  ],
});
