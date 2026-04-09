"use client";

import { cn } from "@/lib/utils";

export interface CatFilterState {
  gender: "all" | "male" | "female";
  travelReady: "all" | "yes" | "no";
  specialNeeds: "all" | "yes" | "no";
  search: string;
}

interface CatFiltersProps {
  filters: CatFilterState;
  onChange: (filters: CatFilterState) => void;
  totalCount: number;
  filteredCount: number;
}

function FilterPill({
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
      className={cn(
        "px-4 py-2 text-sm font-bold transition-all duration-200 neo-border-sm",
        active
          ? "bg-primary text-white neo-shadow-sm"
          : "bg-white text-dark/50 hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}

export function CatFilters({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: CatFiltersProps) {
  const update = (partial: Partial<CatFilterState>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="neo-border neo-shadow bg-white p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 neo-border-sm bg-white outline-none focus:border-primary transition-all text-sm"
          />
        </div>

        {/* Count */}
        <p className="text-sm text-gray-400 whitespace-nowrap">
          Showing{" "}
          <span className="text-dark font-semibold">{filteredCount}</span> of{" "}
          {totalCount} cats
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Gender */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Gender
          </p>
          <div className="flex gap-2">
            <FilterPill
              active={filters.gender === "all"}
              onClick={() => update({ gender: "all" })}
            >
              All
            </FilterPill>
            <FilterPill
              active={filters.gender === "male"}
              onClick={() => update({ gender: "male" })}
            >
              ♂ Male
            </FilterPill>
            <FilterPill
              active={filters.gender === "female"}
              onClick={() => update({ gender: "female" })}
            >
              ♀ Female
            </FilterPill>
          </div>
        </div>

        {/* Travel Ready */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Travel Ready
          </p>
          <div className="flex gap-2">
            <FilterPill
              active={filters.travelReady === "all"}
              onClick={() => update({ travelReady: "all" })}
            >
              All
            </FilterPill>
            <FilterPill
              active={filters.travelReady === "yes"}
              onClick={() => update({ travelReady: "yes" })}
            >
              ✈️ EU Ready
            </FilterPill>
            <FilterPill
              active={filters.travelReady === "no"}
              onClick={() => update({ travelReady: "no" })}
            >
              Local
            </FilterPill>
          </div>
        </div>

        {/* Special Needs */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Special Needs
          </p>
          <div className="flex gap-2">
            <FilterPill
              active={filters.specialNeeds === "all"}
              onClick={() => update({ specialNeeds: "all" })}
            >
              All
            </FilterPill>
            <FilterPill
              active={filters.specialNeeds === "yes"}
              onClick={() => update({ specialNeeds: "yes" })}
            >
              Special Care
            </FilterPill>
            <FilterPill
              active={filters.specialNeeds === "no"}
              onClick={() => update({ specialNeeds: "no" })}
            >
              No Special Needs
            </FilterPill>
          </div>
        </div>
      </div>
    </div>
  );
}
