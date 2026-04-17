import type { Config, Data } from "@puckeditor/core";
import { Hero, type HeroProps } from "./blocks/Hero";
import { FeatureGrid, type FeatureGridProps } from "./blocks/FeatureGrid";
import { CTABand, type CTABandProps } from "./blocks/CTABand";

export type Props = {
  Hero: HeroProps;
  FeatureGrid: FeatureGridProps;
  CTABand: CTABandProps;
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
      },
      defaultProps: {
        eyebrow: "Guardians of Goodness",
        heading: "A headline that moves people to care.",
        subheading:
          "Add a short paragraph here to set the scene for this campaign or page.",
        ctaLabel: "Support our work",
        ctaHref: "/support",
        tone: "cream",
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
  },
};

export type PuckData = Data<Props>;

export const emptyPuckData: PuckData = {
  content: [],
  root: { props: {} },
};
