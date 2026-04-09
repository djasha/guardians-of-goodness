"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { CatCard } from "./CatCard";
import { CatFilters, defaultFilters, type CatFilterState } from "./CatFilters";
import { Pagination } from "./Pagination";
import type { Cat, CatalogueStats } from "@/sanity/types";

const PAGE_SIZE = 24;

interface CatGridProps {
  cats: Cat[];
  stats?: CatalogueStats;
}

export function CatGrid({ cats, stats }: CatGridProps) {
  const [filters, setFilters] = useState<CatFilterState>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = cats.filter((cat) => {
      if (filters.status !== "all" && cat.adoptionStatus !== filters.status) return false;
      if (filters.gender !== "all" && cat.gender !== filters.gender) return false;
      if (filters.ageCategory !== "all" && cat.ageCategory !== filters.ageCategory) return false;
      if (filters.travelReady === "yes" && !cat.readyToTravelAbroad) return false;
      if (filters.travelReady === "no" && cat.readyToTravelAbroad) return false;
      if (filters.specialNeeds === "yes" && (!cat.specialNeeds || cat.specialNeeds.toLowerCase() === "none")) return false;
      if (filters.specialNeeds === "no" && cat.specialNeeds && cat.specialNeeds.toLowerCase() !== "none") return false;
      if (filters.bondedOnly && !cat.bond?.bondedCat) return false;
      if (filters.tags.length > 0) {
        const catTags = cat.tags || [];
        if (!filters.tags.some((tag) => catTags.includes(tag))) return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const searchable = [cat.name, cat.breed, cat.color].filter(Boolean).join(" ").toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });

    if (filters.sort === "featured") {
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime();
      });
    } else if (filters.sort === "newest") {
      result.sort((a, b) => new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime());
    } else if (filters.sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [cats, filters]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = (newFilters: CatFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Live region for screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {paged.length === 0
          ? "No cats found matching your filters."
          : `Showing ${paged.length} of ${filtered.length} cats, page ${currentPage} of ${totalPages || 1}.`}
      </div>

      <CatFilters
        filters={filters}
        onChange={handleFilterChange}
        totalCount={cats.length}
        filteredCount={filtered.length}
        stats={stats}
      />

      {paged.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-primary/30 mx-auto mb-4" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
            <ellipse cx="30" cy="20" rx="12" ry="18" />
            <ellipse cx="70" cy="20" rx="12" ry="18" />
            <circle cx="50" cy="55" r="30" />
            <circle cx="40" cy="48" r="4" opacity={0.4} />
            <circle cx="60" cy="48" r="4" opacity={0.4} />
          </svg>
          <h3 className="font-display text-2xl font-black text-dark mb-2">No cats found</h3>
          <p className="text-gray-500">Try adjusting your filters — there are plenty of furry friends waiting!</p>
          <button
            onClick={() => handleFilterChange(defaultFilters)}
            className="mt-4 px-6 py-2.5 bg-primary text-white font-bold neo-border-sm neo-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none p-0" role="list" aria-label="Cat listings">
            <AnimatePresence mode="popLayout">
              {paged.map((cat) => (
                <li key={cat._id}>
                  <CatCard cat={cat} />
                </li>
              ))}
            </AnimatePresence>
          </ul>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}
