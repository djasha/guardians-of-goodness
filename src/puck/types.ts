import type { Data } from "@puckeditor/core";
import type { ArticleGridProps } from "./blocks/ArticleGrid";
import type { ColumnsProps } from "./blocks/Columns";
import type { ContactInfoProps } from "./blocks/ContactInfo";
import type { CTABandProps } from "./blocks/CTABand";
import type { FeatureGridProps } from "./blocks/FeatureGrid";
import type { HeroProps } from "./blocks/Hero";
import type { ImageProps } from "./blocks/Image";
import type { ImpactStatsProps } from "./blocks/ImpactStats";
import type { PageHeroProps } from "./blocks/PageHero";
import type { PartnersStripProps } from "./blocks/PartnersStrip";
import type { QuoteProps } from "./blocks/Quote";
import type { RichTextProps } from "./blocks/RichText";
import type { SocialLinksProps } from "./blocks/SocialLinks";
import type { StatsProps } from "./blocks/Stats";

export type Props = {
  PageHero: PageHeroProps;
  Hero: HeroProps;
  FeatureGrid: FeatureGridProps;
  CTABand: CTABandProps;
  Image: ImageProps;
  RichText: RichTextProps;
  Stats: StatsProps;
  Quote: QuoteProps;
  Columns: ColumnsProps;
  SocialLinks: SocialLinksProps;
  ContactInfo: ContactInfoProps;
  ArticleGrid: ArticleGridProps;
  PartnersStrip: PartnersStripProps;
  ImpactStats: ImpactStatsProps;
};

export type PuckData = Data<Props>;

export const emptyPuckData: PuckData = {
  content: [],
  root: { props: {} },
};
