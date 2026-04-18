import type { Config } from "@puckeditor/core";
import { ArticleGrid } from "./blocks/ArticleGrid";
import { Columns } from "./blocks/Columns";
import { ContactInfo } from "./blocks/ContactInfo";
import { CTABand } from "./blocks/CTABand";
import { FeatureGrid } from "./blocks/FeatureGrid";
import { Hero } from "./blocks/Hero";
import { Image } from "./blocks/Image";
import { ImpactStats } from "./blocks/ImpactStats";
import { PageHero } from "./blocks/PageHero";
import { PartnersStrip } from "./blocks/PartnersStrip";
import { Quote } from "./blocks/Quote";
import { RichText } from "./blocks/RichText";
import { SocialLinks } from "./blocks/SocialLinks";
import { Stats } from "./blocks/Stats";
import { client } from "@/sanity/client";
import type { Props } from "./types";

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

export const puckServerConfig: Config<Props> = {
  components: {
    PageHero: {
      render: PageHero,
      resolveData: ({ props }) => ({
        props: {
          ...props,
          overlay:
            typeof props.overlay === "string" ? props.overlay === "true" : props.overlay,
        },
      }),
    },
    Hero: { render: Hero },
    FeatureGrid: { render: FeatureGrid },
    CTABand: { render: CTABand },
    Image: { render: Image },
    RichText: { render: RichText },
    Stats: { render: Stats },
    Quote: { render: Quote },
    Columns: {
      fields: {
        layout: {
          type: "select",
          options: [
            { label: "2 columns", value: "two" },
            { label: "3 columns", value: "three" },
            { label: "Sidebar left", value: "sidebar-left" },
            { label: "Sidebar right", value: "sidebar-right" },
          ],
        },
        gap: {
          type: "select",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
        tone: {
          type: "select",
          options: [
            { label: "Cream", value: "cream" },
            { label: "Dark", value: "dark" },
          ],
        },
        left: { type: "slot" },
        middle: { type: "slot" },
        right: { type: "slot" },
      },
      render: Columns,
    },
    SocialLinks: { render: SocialLinks },
    ContactInfo: { render: ContactInfo },
    ArticleGrid: {
      resolveData: async ({ props }) => {
        const limit = Math.min(Math.max(Number(props.limit) || 6, 1), 12);
        try {
          const articles = await client.fetch(
            ARTICLES_FOR_GRID_QUERY,
            { limit },
            { next: { tags: ["article"], revalidate: 300 } }
          );
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
      resolveData: async ({ props }) => {
        try {
          const partners = await client.fetch(
            PARTNERS_FOR_STRIP_QUERY,
            {},
            { next: { tags: ["partner"], revalidate: 300 } }
          );
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
    ImpactStats: { render: ImpactStats },
  },
};
