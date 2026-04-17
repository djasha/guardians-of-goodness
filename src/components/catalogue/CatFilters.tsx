"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogueStats } from "@/sanity/types";

export interface CatFilterState {
  search: string;
  status: "all" | "available" | "pending";
  gender: "all" | "male" | "female";
  ageCategory: "all" | "kitten" | "young" | "adult" | "senior";
  travelReady: "all" | "yes" | "no";
  specialNeeds: "all" | "yes" | "no";
  tags: string[];
  bondedOnly: boolean;
  sort: "featured" | "newest" | "name";
}

export const defaultFilters: CatFilterState = {
  search: "",
  status: "all",
  gender: "all",
  ageCategory: "all",
  travelReady: "all",
  specialNeeds: "all",
  tags: [],
  bondedOnly: false,
  sort: "featured",
};

const PERSONALITY_TAGS = [
  "playful", "shy", "calm", "curious", "affectionate", "independent",
  "energetic", "gentle", "talkative", "lap cat", "good with kids",
  "good with dogs", "good with cats", "needs patience", "food lover",
];

interface CatFiltersProps {
  filters: CatFilterState;
  onChange: (filters: CatFilterState) => void;
  totalCount: number;
  filteredCount: number;
  stats?: CatalogueStats;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "px-3 py-2 text-sm font-bold transition-all duration-200 neo-border-sm min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        active
          ? "bg-primary text-white neo-shadow-sm"
          : "bg-white text-dark/70 hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}

function TagChip({
  tag,
  active,
  onClick,
}: {
  tag: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "px-3 py-2 rounded-full text-xs font-bold transition-all border-2 min-h-[40px] sm:min-h-[36px] touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        active
          ? "bg-secondary text-white border-dark"
          : "bg-warm-gray text-gray-600 border-transparent hover:border-secondary/40"
      )}
    >
      {tag}
    </button>
  );
}

export function CatFilters({
  filters,
  onChange,
  totalCount,
  filteredCount,
  stats,
}: CatFiltersProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const update = (partial: Partial<CatFilterState>) =>
    onChange({ ...filters, ...partial });

  const toggleTag = (tag: string) => {
    const current = filters.tags;
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    update({ tags: next });
  };

  const activeFilterCount =
    (filters.status !== "all" ? 1 : 0) +
    (filters.gender !== "all" ? 1 : 0) +
    (filters.ageCategory !== "all" ? 1 : 0) +
    (filters.travelReady !== "all" ? 1 : 0) +
    (filters.specialNeeds !== "all" ? 1 : 0) +
    filters.tags.length +
    (filters.bondedOnly ? 1 : 0) +
    (filters.search ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  const moreFilterCount =
    (filters.travelReady !== "all" ? 1 : 0) +
    (filters.specialNeeds !== "all" ? 1 : 0) +
    (filters.bondedOnly ? 1 : 0) +
    filters.tags.length;

  return (
    <div className="neo-border neo-shadow bg-white p-4 sm:p-6 mb-8">
      {/* Search + Count */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <label htmlFor="cat-search" className="sr-only">Search cats by name, breed, or color</label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2.5} aria-hidden="true" />
          <input
            id="cat-search"
            type="search"
            placeholder="Search by name, breed, color..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="w-full pl-11 pr-4 py-3 neo-border-sm bg-white outline-none focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-400 whitespace-nowrap font-bold">
            <span className="text-dark">{filteredCount}</span> of {totalCount} cats
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => onChange(defaultFilters)}
              className="text-xs font-bold text-primary hover:text-primary-dark underline underline-offset-2"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Primary filters */}
      <div className="flex flex-wrap gap-4 mb-4" role="search" aria-label="Filter cats">
        {/* Status */}
        <fieldset>
          <legend className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
            Status
          </legend>
          <div className="flex gap-1.5" role="group" aria-label="Filter by status">
            <Pill active={filters.status === "all"} onClick={() => update({ status: "all" })}>
              All ({totalCount})
            </Pill>
            <Pill active={filters.status === "available"} onClick={() => update({ status: "available" })}>
              Available {stats ? `(${stats.available})` : ""}
            </Pill>
            <Pill active={filters.status === "pending"} onClick={() => update({ status: "pending" })}>
              Pending {stats ? `(${stats.pending})` : ""}
            </Pill>
          </div>
        </fieldset>

        {/* Gender */}
        <fieldset>
          <legend className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
            Gender
          </legend>
          <div className="flex gap-1.5" role="group" aria-label="Filter by gender">
            <Pill active={filters.gender === "all"} onClick={() => update({ gender: "all" })}>All</Pill>
            <Pill active={filters.gender === "male"} onClick={() => update({ gender: "male" })}>&#9794; Male</Pill>
            <Pill active={filters.gender === "female"} onClick={() => update({ gender: "female" })}>&#9792; Female</Pill>
          </div>
        </fieldset>

        {/* Age */}
        <fieldset>
          <legend className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
            Age
          </legend>
          <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Filter by age">
            <Pill active={filters.ageCategory === "all"} onClick={() => update({ ageCategory: "all" })}>All</Pill>
            <Pill active={filters.ageCategory === "kitten"} onClick={() => update({ ageCategory: "kitten" })}>Kitten</Pill>
            <Pill active={filters.ageCategory === "young"} onClick={() => update({ ageCategory: "young" })}>Young</Pill>
            <Pill active={filters.ageCategory === "adult"} onClick={() => update({ ageCategory: "adult" })}>Adult</Pill>
            <Pill active={filters.ageCategory === "senior"} onClick={() => update({ ageCategory: "senior" })}>Senior</Pill>
          </div>
        </fieldset>

        {/* Sort */}
        <fieldset>
          <legend className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
            Sort
          </legend>
          <div className="flex gap-1.5" role="group" aria-label="Sort order">
            <Pill active={filters.sort === "featured"} onClick={() => update({ sort: "featured" })}>Featured</Pill>
            <Pill active={filters.sort === "newest"} onClick={() => update({ sort: "newest" })}>Newest</Pill>
            <Pill active={filters.sort === "name"} onClick={() => update({ sort: "name" })}>A-Z</Pill>
          </div>
        </fieldset>
      </div>

      {/* More Filters toggle */}
      <button
        onClick={() => setMoreOpen(!moreOpen)}
        aria-expanded={moreOpen}
        aria-controls="more-filters-panel"
        className={cn(
          "flex items-center gap-2 text-sm font-bold transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          moreOpen ? "text-primary" : "text-gray-500 hover:text-primary"
        )}
      >
        <svg
          className={cn("w-4 h-4 transition-transform", moreOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        More Filters
        {moreFilterCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px] font-black">
            {moreFilterCount}
          </span>
        )}
      </button>

      {/* Expanded filters */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            id="more-filters-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
            role="region"
            aria-label="Additional filters"
          >
            <div className="pt-4 mt-4 border-t-2 border-dashed border-gray-200 flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <fieldset>
                  <legend className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Travel Ready</legend>
                  <div className="flex gap-1.5" role="group" aria-label="Filter by travel readiness">
                    <Pill active={filters.travelReady === "all"} onClick={() => update({ travelReady: "all" })}>All</Pill>
                    <Pill active={filters.travelReady === "yes"} onClick={() => update({ travelReady: "yes" })}>EU Ready</Pill>
                    <Pill active={filters.travelReady === "no"} onClick={() => update({ travelReady: "no" })}>Local</Pill>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Special Needs</legend>
                  <div className="flex gap-1.5" role="group" aria-label="Filter by special needs">
                    <Pill active={filters.specialNeeds === "all"} onClick={() => update({ specialNeeds: "all" })}>All</Pill>
                    <Pill active={filters.specialNeeds === "yes"} onClick={() => update({ specialNeeds: "yes" })}>Special Care</Pill>
                    <Pill active={filters.specialNeeds === "no"} onClick={() => update({ specialNeeds: "no" })}>No Special Needs</Pill>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Bonded</legend>
                  <div className="flex gap-1.5" role="group" aria-label="Filter bonded pairs">
                    <Pill active={filters.bondedOnly} onClick={() => update({ bondedOnly: !filters.bondedOnly })}>
                      Bonded Pairs Only
                    </Pill>
                  </div>
                </fieldset>
              </div>
              <fieldset>
                <legend className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Personality</legend>
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by personality tags">
                  {PERSONALITY_TAGS.map((tag) => (
                    <TagChip key={tag} tag={tag} active={filters.tags.includes(tag)} onClick={() => toggleTag(tag)} />
                  ))}
                </div>
              </fieldset>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              &quot;{filters.search}&quot;
              <button onClick={() => update({ search: "" })} aria-label={`Remove search filter: ${filters.search}`} className="hover:text-primary-dark min-w-[32px] min-h-[32px] -mr-1.5 flex items-center justify-center text-base leading-none touch-manipulation focus-visible:outline-2 focus-visible:outline-primary">&times;</button>
            </span>
          )}
          {filters.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/10 text-secondary-dark text-xs font-bold border border-secondary/20">
              {tag}
              <button onClick={() => toggleTag(tag)} aria-label={`Remove ${tag} filter`} className="hover:text-secondary min-w-[32px] min-h-[32px] -mr-1.5 flex items-center justify-center text-base leading-none touch-manipulation focus-visible:outline-2 focus-visible:outline-primary">&times;</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
