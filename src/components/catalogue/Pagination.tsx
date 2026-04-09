"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "px-4 py-2.5 rounded-lg font-bold text-sm border-2 transition-all",
          currentPage === 1
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-dark bg-white text-dark hover:bg-primary hover:text-white hover:shadow-[2px_2px_0_0_#1a1a2e]"
        )}
      >
        &larr; Prev
      </button>
      <div className="flex gap-1">
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`dots-${i}`} className="px-3 py-2.5 text-gray-400 font-bold">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-10 h-10 rounded-lg font-bold text-sm border-2 transition-all",
                page === currentPage
                  ? "bg-primary text-white border-dark shadow-[2px_2px_0_0_#1a1a2e]"
                  : "bg-white text-dark border-gray-200 hover:border-primary hover:text-primary"
              )}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "px-4 py-2.5 rounded-lg font-bold text-sm border-2 transition-all",
          currentPage === totalPages
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-dark bg-white text-dark hover:bg-primary hover:text-white hover:shadow-[2px_2px_0_0_#1a1a2e]"
        )}
      >
        Next &rarr;
      </button>
    </nav>
  );
}
