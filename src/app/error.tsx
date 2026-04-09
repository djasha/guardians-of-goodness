"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-24 h-24 neo-border neo-shadow bg-white mb-6">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg leading-relaxed text-dark/50 mb-8">
          An unexpected error occurred. Please try again, and if the problem
          persists, let us know.
        </p>
        <button
          onClick={reset}
          className="neo-border-sm neo-shadow-sm neo-hover bg-primary text-white font-bold px-6 py-3 inline-flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>

        {/* Paw decoration */}
        <div className="mt-10 flex justify-center">
          <svg className="w-5 h-5 text-primary/20" viewBox="0 0 40 44" fill="currentColor">
            <ellipse cx="20" cy="30" rx="10" ry="9" />
            <circle cx="8" cy="16" r="4.5" />
            <circle cx="17" cy="10" r="4" />
            <circle cx="27" cy="10" r="4" />
            <circle cx="35" cy="16" r="4.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
