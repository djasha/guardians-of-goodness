import type { Config } from "@puckeditor/core";
import { Hero } from "./blocks/Hero";
import { FeatureGrid } from "./blocks/FeatureGrid";
import { CTABand } from "./blocks/CTABand";
import { Image } from "./blocks/Image";
import { RichText } from "./blocks/RichText";
import { Stats } from "./blocks/Stats";
import { Quote } from "./blocks/Quote";
import { PageHero } from "./blocks/PageHero";
import { Columns } from "./blocks/Columns";
import { SocialLinks } from "./blocks/SocialLinks";
import { ContactInfo } from "./blocks/ContactInfo";
import { ArticleGrid } from "./blocks/ArticleGrid";
import { PartnersStrip } from "./blocks/PartnersStrip";
import { ImpactStats } from "./blocks/ImpactStats";
import { ImagePickerField } from "./fields/ImagePickerField";
import type { Props } from "./types";
import { client } from "@/sanity/client";

export type { Props, PuckData } from "./types";
export { emptyPuckData } from "./types";

const ARTICLES_FOR_GRID_QUERY = `*[_type == "article" && defined(publishedAt)] | order(publishedAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "coverImage": { "url": coverImage.asset->url, "alt": coverImage.alt }
}`;

const PARTNERS_FOR_STRIP_QUERY = `*[_type == "partner"] | order(order asc, name asc){
  _id,
  name,
  website,
  "logo": { "url": logo.asset->url, "alt": logo.alt }
}`;

export const puckConfig: Config<Props> = {
  components: {
    PageHero: {
      label: "Page Hero",
      fields: {
        badge: { type: "text", label: "Small label above heading" },
        heading: { type: "text", label: "Heading" },
        subtext: { type: "textarea", label: "Sub-text" },
        image: {
          type: "custom",
          label: "Background image (optional)",
          render: ({ value, onChange, id }) => (
            <ImagePickerField
              id={id}
              value={(value as string) ?? ""}
              onChange={(next) => onChange(next)}
            />
          ),
        },
        imageAlt: { type: "text", label: "Image alt text" },
        overlay: {
          type: "select",
          label: "Darken image?",
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
        bgTone: {
          type: "select",
          label: "Background tone",
          options: [
            { label: "Dark", value: "dark" },
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Cream", value: "cream" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
          ],
        },
      },
      defaultProps: {
        badge: "",
        heading: "Your page heading",
        subtext: "A short description that sits under the heading.",
        image: "",
        imageAlt: "",
        overlay: true,
        bgTone: "dark",
        align: "left",
      },
      resolveData: ({ props }) => ({
        props: {
          ...props,
          overlay:
            typeof props.overlay === "string" ? props.overlay === "true" : props.overlay,
        },
      }),
      render: PageHero,
    },

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

    Columns: {
      label: "Columns",
      fields: {
        layout: {
          type: "select",
          label: "Layout",
          options: [
            { label: "2 columns", value: "two" },
            { label: "3 columns", value: "three" },
            { label: "Sidebar left", value: "sidebar-left" },
            { label: "Sidebar right", value: "sidebar-right" },
          ],
        },
        gap: {
          type: "select",
          label: "Gap",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
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
        left: { type: "slot" },
        middle: { type: "slot" },
        right: { type: "slot" },
      },
      defaultProps: {
        layout: "two",
        gap: "medium",
        tone: "cream",
        left: [],
        middle: [],
        right: [],
      },
      render: Columns,
    },

    SocialLinks: {
      label: "Social Links",
      fields: {
        heading: { type: "text", label: "Heading (optional)" },
        items: {
          type: "array",
          label: "Links",
          getItemSummary: (item) => item.label || "Link",
          arrayFields: {
            label: { type: "text", label: "Platform name" },
            handle: { type: "text", label: "Handle (optional)" },
            href: { type: "text", label: "URL" },
            icon: {
              type: "select",
              label: "Icon",
              options: [
                { label: "Facebook", value: "Facebook" },
                { label: "Instagram", value: "Instagram" },
                { label: "LinkedIn", value: "LinkedIn" },
              ],
            },
          },
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
        heading: "Follow us",
        items: [
          { label: "Facebook", handle: "@guardiansofgoodness", href: "https://www.facebook.com/guardiansofgoodness/", icon: "Facebook" },
          { label: "Instagram", handle: "@guardians_of_goodness", href: "https://www.instagram.com/guardians_of_goodness/", icon: "Instagram" },
          { label: "LinkedIn", handle: "Guardians of Goodness", href: "https://www.linkedin.com/company/guardians-of-goodness/", icon: "LinkedIn" },
        ],
        tone: "cream",
      },
      render: SocialLinks,
    },

    ArticleGrid: {
      label: "Article Grid",
      fields: {
        heading: { type: "text", label: "Heading" },
        limit: {
          type: "number",
          label: "How many articles?",
          min: 1,
          max: 12,
        },
        emptyHeading: { type: "text", label: "Empty-state heading" },
        emptyBody: { type: "textarea", label: "Empty-state body" },
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
        heading: "From the blog",
        limit: 6,
        emptyHeading: "No articles yet",
        emptyBody: "Check back soon for stories from the shelter.",
        tone: "cream",
      },
      resolveData: async ({ props }) => {
        const limit = Math.min(Math.max(Number(props.limit) || 6, 1), 12);
        try {
          const articles = await client.fetch(ARTICLES_FOR_GRID_QUERY, { limit });
          return {
            props: {
              ...props,
              _articles: Array.isArray(articles) ? articles : [],
            },
          };
        } catch {
          return { props: { ...props, _articles: [] } };
        }
      },
      render: ArticleGrid,
    },

    PartnersStrip: {
      label: "Partners Strip",
      fields: {
        heading: { type: "text", label: "Heading (optional)" },
        subtext: { type: "textarea", label: "Sub-text (optional)" },
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
        heading: "Our partners",
        subtext: "Clinics and organisations that help us rescue and care for cats.",
        tone: "cream",
      },
      resolveData: async ({ props }) => {
        try {
          const partners = await client.fetch(PARTNERS_FOR_STRIP_QUERY);
          return {
            props: {
              ...props,
              _partners: Array.isArray(partners) ? partners : [],
            },
          };
        } catch {
          return { props: { ...props, _partners: [] } };
        }
      },
      render: PartnersStrip,
    },

    ImpactStats: {
      label: "Impact Stats",
      fields: {
        heading: { type: "text", label: "Heading (optional)" },
        subtext: { type: "textarea", label: "Sub-text (optional)" },
        items: {
          type: "array",
          label: "Stats",
          getItemSummary: (item) => `${item.value || "—"} · ${item.label || ""}`.trim(),
          arrayFields: {
            value: { type: "text", label: "Value (e.g. 120+)" },
            label: { type: "text", label: "Label (e.g. Cats rescued)" },
            description: { type: "textarea", label: "Short description" },
            icon: {
              type: "select",
              label: "Icon",
              options: [
                { label: "Heart", value: "Heart" },
                { label: "Users", value: "Users" },
                { label: "Home", value: "Home" },
                { label: "Sparkles", value: "Sparkles" },
                { label: "Shield", value: "Shield" },
                { label: "Paw Print", value: "PawPrint" },
              ],
            },
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
        subtext: "Six years of rescuing, rehabilitating, and rehoming cats across Jordan.",
        items: [
          {
            value: "120+",
            label: "Cats rescued",
            description: "Pulled from streets, emergencies, and abandoned homes.",
            icon: "Heart",
          },
          {
            value: "80",
            label: "Forever homes",
            description: "Matched with guardian families across Jordan and abroad.",
            icon: "Home",
          },
          {
            value: "15",
            label: "Vet partners",
            description: "Clinics that provide medical care and surgeries.",
            icon: "Sparkles",
          },
        ],
        tone: "dark",
      },
      render: ImpactStats,
    },

    ContactInfo: {
      label: "Contact Info",
      fields: {
        heading: { type: "text", label: "Heading (optional)" },
        items: {
          type: "array",
          label: "Contact cards",
          getItemSummary: (item) => item.title || "Card",
          arrayFields: {
            icon: {
              type: "select",
              label: "Icon",
              options: [
                { label: "Email", value: "Mail" },
                { label: "Address", value: "MapPin" },
                { label: "Phone", value: "Phone" },
                { label: "Hours", value: "Clock" },
              ],
            },
            title: { type: "text", label: "Title (e.g. Email us)" },
            primary: { type: "text", label: "Primary line" },
            secondary: { type: "text", label: "Secondary line (optional)" },
            href: { type: "text", label: "Link (optional, e.g. mailto: or tel:)" },
          },
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
        heading: "Get in touch",
        items: [
          {
            icon: "Mail",
            title: "Email us",
            primary: "office@guardiansofgoodness.org",
            secondary: "We reply within 2 business days.",
            href: "mailto:office@guardiansofgoodness.org",
          },
          {
            icon: "MapPin",
            title: "Find us",
            primary: "Amman, Jordan",
            secondary: "Jabal Amman, 1st Circle",
            href: "",
          },
        ],
        tone: "cream",
      },
      render: ContactInfo,
    },
  },
};
