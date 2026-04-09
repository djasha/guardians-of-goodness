"use client";

import { useState, useEffect, useRef } from "react";

type ScrollDirection = "up" | "down";

const THRESHOLD = 80;

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateDirection = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY.current) < THRESHOLD) {
        return;
      }

      setDirection(scrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateDirection);
  }, []);

  return direction;
}
