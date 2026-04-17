import type { Config, Data } from "@puckeditor/core";
import { Hero, type HeroProps } from "./blocks/Hero";
import { FeatureGrid, type FeatureGridProps } from "./blocks/FeatureGrid";
import { CTABand, type CTABandProps } from "./blocks/CTABand";
import { Image, type ImageProps } from "./blocks/Image";
import { RichText, type RichTextProps } from "./blocks/RichText";
import { Stats, type StatsProps } from "./blocks/Stats";
import { Quote, type QuoteProps } from "./blocks/Quote";
import { ImagePickerField } from "./fields/ImagePickerField";

export type Props = {
  Hero: HeroProps;
  FeatureGrid: FeatureGridProps;
  CTABand: CTABandProps;
  Image: ImageProps;
  RichText: RichTextProps;
  Stats: StatsProps;
  Quote: QuoteProps;
};

export const puckConfig: Config<Props> = {
  components: {
    Hero: {
      label: "Hero",
      fields: {
        eyebrow: { type: "text", label: "Small label above heading" },
        heading: { type: "text", label: "Heading" },
        subheading: { type: "textarea", label: "Subheading" },
        ctaLabel: { type: "text", label: "Button label" },
        ctaHref: { type: "text", label: "Button link (e.g. /support)" },
        tone: {
          type: "select",
          label: "Background tone",
          options: [
            { label: "Cream", value: "cream" },
            { label: "Dark", value: "dark" },
            { label: "Primary", value: "primary" },
          ],
        },
        image: {
          type: "custom",
          label: "Image (optional)",
          render: ({ value, onChange, id }) => (
            <ImagePickerField
              id={id}
              value={(value as string) ?? ""}
              onChange={(next) => onChange(next)}
            />
          ),
        },
        imageAlt: { type: "text", label: "Image alt text" },
      },
      defaultProps: {
        eyebrow: "Guardians of Goodness",
        heading: "A headline that moves people to care.",
        subheading:
          "Add a short paragraph here to set the scene for this campaign or page.",
        ctaLabel: "Support our work",
        ctaHref: "/support",
        tone: "cream",
        image: "",
        imageAlt: "",
      },
      render: Hero,
    },

    FeatureGrid: {
      label: "Feature Grid",
      fields: {
        heading: { type: "text", label: "Section heading" },
        items: {
          type: "array",
          label: "Features",
          getItemSummary: (item) => item.title || "Feature",
          arrayFields: {
            title: { type: "text", label: "Title" },
            body: { type: "textarea", label: "Body" },
            icon: {
              type: "select",
              label: "Icon",
              options: [
                { label: "Heart", value: "Heart" },
                { label: "Paw Print", value: "PawPrint" },
                { label: "Home", value: "Home" },
                { label: "Sparkles", value: "Sparkles" },
                { label: "Shield", value: "Shield" },
                { label: "Users", value: "Users" },
              ],
            },
          },
        },
      },
      defaultProps: {
        heading: "What we do",
        items: [
          {
            title: "Rescue",
            body: "We pull cats from the street and emergencies.",
            icon: "Heart",
          },
          {
            title: "Rehabilitate",
            body: "Vet care, socialization, and a calm place to heal.",
            icon: "PawPrint",
          },
          {
            title: "Rehome",
            body: "We match each cat with the right guardian family.",
            icon: "Home",
          },
        ],
      },
      render: FeatureGrid,
    },

    CTABand: {
      label: "Call to Action",
      fields: {
        heading: { type: "text", label: "Heading" },
        body: { type: "textarea", label: "Body" },
        primaryLabel: { type: "text", label: "Primary button" },
        primaryHref: { type: "text", label: "Primary link" },
        secondaryLabel: { type: "text", label: "Secondary button (optional)" },
        secondaryHref: { type: "text", label: "Secondary link" },
      },
      defaultProps: {
        heading: "Ready to help?",
        body: "Every donation and adoption changes a life.",
        primaryLabel: "Donate",
        primaryHref: "/support",
        secondaryLabel: "Adopt",
        secondaryHref: "/catalogue",
      },
      render: CTABand,
    },

    Image: {
      label: "Image",
      fields: {
        src: {
          type: "custom",
          label: "Image",
          render: ({ value, onChange, id }) => (
            <ImagePickerField
              id={id}
              value={(value as string) ?? ""}
              onChange={(next) => onChange(next)}
            />
          ),
        },
        alt: { type: "text", label: "Alt text (describe the image)" },
        width: {
          type: "select",
          label: "Width",
          options: [
            { label: "Contained", value: "contained" },
            { label: "Full bleed", value: "full" },
          ],
        },
        ratio: {
          type: "select",
          label: "Aspect ratio",
          options: [
            { label: "16:9", value: "16:9" },
            { label: "4:3", value: "4:3" },
            { label: "1:1", value: "1:1" },
            { label: "3:4", value: "3:4" },
          ],
        },
        tone: {
          type: "select",
          label: "Background tone",
          options: [
            { label: "Cream", value: "cream" },
            { label: "Dark", value: "dark" },
          ],
        },
      },
      defaultProps: {
        src: "",
        alt: "",
        width: "contained",
        ratio: "16:9",
        tone: "cream",
      },
      render: Image,
    },

    RichText: {
      label: "Rich Text",
      fields: {
        heading: { type: "text", label: "Heading (optional)" },
        body: {
          type: "textarea",
          label: "Body (use blank lines to separate paragraphs)",
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
          ],
        },
        tone: {
          type: "select",
          label: "Background tone",
          options: [
            { label: "Cream", value: "cream" },
            { label: "Dark", value: "dark" },
          ],
        },
      },
      defaultProps: {
        heading: "",
        body: "Write your story here.\n\nLeave a blank line between paragraphs to create spacing.",
        align: "left",
        tone: "cream",
      },
      render: RichText,
    },

    Stats: {
      label: "Stats",
      fields: {
        heading: { type: "text", label: "Heading (optional)" },
        items: {
          type: "array",
          label: "Stats",
          getItemSummary: (item) => `${item.value || "—"} ${item.label || ""}`.trim(),
          arrayFields: {
            value: { type: "text", label: "Value (e.g. 120+)" },
            label: { type: "text", label: "Label (e.g. cats rescued)" },
          },
        },
        tone: {
          type: "select",
          label: "Background tone",
          options: [
            { label: "Cream", value: "cream" },
            { label: "Dark", value: "dark" },
            { label: "Primary", value: "primary" },
          ],
        },
      },
      defaultProps: {
        heading: "Our impact",
        items: [
          { value: "120+", label: "Cats rescued" },
          { value: "80", label: "Forever homes" },
          { value: "15", label: "Vet partners" },
          { value: "6", label: "Years running" },
        ],
        tone: "cream",
      },
      render: Stats,
    },

    Quote: {
      label: "Quote",
      fields: {
        body: { type: "textarea", label: "Quote body" },
        attribution: { type: "text", label: "Attribution (name)" },
        role: { type: "text", label: "Role or organisation (optional)" },
        tone: {
          type: "select",
          label: "Background tone",
          options: [
            { label: "Cream", value: "cream" },
            { label: "Dark", value: "dark" },
            { label: "Primary", value: "primary" },
          ],
        },
      },
      defaultProps: {
        body: "Adopting changed my life — and saved a cat's.",
        attribution: "A volunteer",
        role: "Guardians of Goodness",
        tone: "cream",
      },
      render: Quote,
    },
  },
};

export type PuckData = Data<Props>;

export const emptyPuckData: PuckData = {
  content: [],
  root: { props: {} },
};
