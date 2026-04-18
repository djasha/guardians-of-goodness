import { EditIcon } from "@sanity/icons";
import type { DocumentActionComponent } from "sanity";

export const editInPageBuilderAction: DocumentActionComponent = (props) => {
  const pageId = props.id?.replace(/^drafts\./, "");

  return {
    label: "Open in Page Builder",
    icon: EditIcon,
    disabled: !pageId,
    onHandle: () => {
      if (pageId) {
        window.open(
          `/admin/editor/${encodeURIComponent(pageId)}`,
          "_blank",
          "noopener,noreferrer"
        );
      }
      props.onComplete();
    },
  };
};
