import { EditIcon } from "@sanity/icons";
import type { DocumentActionComponent } from "sanity";

type MaybeSlug = { current?: string } | undefined;

export const editInPageBuilderAction: DocumentActionComponent = (props) => {
  const draftSlug = (props.draft?.slug as MaybeSlug)?.current;
  const publishedSlug = (props.published?.slug as MaybeSlug)?.current;
  const slug = draftSlug || publishedSlug;

  return {
    label: "Open in Page Builder",
    icon: EditIcon,
    disabled: !slug,
    onHandle: () => {
      if (slug) window.open(`/admin/editor/${slug}`, "_blank", "noopener,noreferrer");
      props.onComplete();
    },
  };
};
