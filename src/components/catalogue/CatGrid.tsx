"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { CatCard } from "./CatCard";
import { CatFilters, type CatFilterState } from "./CatFilters";
import type { Cat } from "@/sanity/types";

interface CatGridProps {
  cats: Cat[];
}

export function CatGrid({ cats }: CatGridProps) {
  const [filters, setFilters] = useState<CatFilterState>({
    gender: "all",
    travelReady: "all",
    specialNeeds: "all",
    search: "",
  });

  const filtered = useMemo(() => {
    return cats.filter((cat) => {
      if (filters.gender !== "all" && cat.gender !== filters.gender) return false;
      if (filters.travelReady === "yes" && !cat.readyToTravelAbroad) return false;
      if (filters.travelReady === "no" && cat.readyToTravelAbroad) return false;
      if (
        filters.specialNeeds === "yes" &&
        (!cat.specialNeeds || cat.specialNeeds.toLowerCase() === "none")
      )
        return false;
      if (
        filters.specialNeeds === "no" &&
        cat.specialNeeds &&
        cat.specialNeeds.toLowerCase() !== "none"
      )
        return false;
      if (
        filters.search &&
        !cat.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [cats, filters]);

  return (
    <div>
      <CatFilters
        filters={filters}
        onChange={setFilters}
        totalCount={cats.length}
        filteredCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😿</div>
          <h3 className="font-display text-2xl font-bold text-dark mb-2">
            No cats found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters — there are plenty of furry friends waiting!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((cat) => (
              <CatCard key={cat._id} cat={cat} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
