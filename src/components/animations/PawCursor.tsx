"use client";

import { useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Static touch detection via useSyncExternalStore — no cascading renders.
const subscribeNoop = () => () => {};
const getTouchSnapshot = () => "ontouchstart" in window;
const getTouchServerSnapshot = () => false;

interface PawTrail {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  id: number;
}

// Classic cat paw print — 1 big oval pad + 4 round toe beans in arc above
const PAW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/></svg>`;

export function PawCursor() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<PawTrail[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const idCounter = useRef(0);
  const distanceRef = useRef(0);

  const createPaw = useCallback((x: number, y: number, isClick = false) => {
    const paw: PawTrail = {
      x,
      y,
      rotation: Math.random() * 40 - 20,
      scale: isClick ? 1.8 : 0.6 + Math.random() * 0.3,
      opacity: isClick ? 1 : 0.5,
      id: idCounter.current++,
    };
    trailsRef.current.push(paw);

    if (!canvasRef.current) return;

    const el = document.createElement("div");
    el.innerHTML = PAW_SVG;
    el.style.cssText = `
      position: fixed;
      left: ${x - 12 * paw.scale}px;
      top: ${y - 12 * paw.scale}px;
      width: ${24 * paw.scale}px;
      height: ${24 * paw.scale}px;
      transform: rotate(${paw.rotation}deg);
      opacity: ${paw.opacity};
      color: ${isClick ? "var(--color-primary)" : "var(--color-secondary)"};
      pointer-events: none;
      z-index: 9999;
      transition: opacity 0.8s ease, transform 0.8s ease;
    `;
    canvasRef.current.appendChild(el);

    requestAnimationFrame(() => {
      el.style.opacity = "0";
      el.style.transform = `rotate(${paw.rotation}deg) scale(${isClick ? 1.5 : 0.3})`;
    });

    setTimeout(() => {
      el.remove();
      trailsRef.current = trailsRef.current.filter((p) => p.id !== paw.id);
    }, 800);
  }, []);

  useEffect(() => {
    if (reduced) return;

    // Hide default cursor globally
    document.body.style.cursor = "none";
    const styleEl = document.createElement("style");
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; } a, button, [role=button] { cursor: none !important; }";
    document.head.appendChild(styleEl);

    // Custom cursor element
    const cursor = document.createElement("div");
    cursor.innerHTML = PAW_SVG;
    cursor.style.cssText = `
      position: fixed;
      width: 28px;
      height: 28px;
      pointer-events: none;
      z-index: 10000;
      color: var(--color-primary);
      transform: translate(-14px, -14px) rotate(-25deg);
      transition: transform 0.1s ease;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
    `;
    document.body.appendChild(cursor);

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      distanceRef.current += dist;

      // Drop a paw trail every ~60px of movement
      if (distanceRef.current > 60) {
        createPaw(e.clientX, e.clientY);
        distanceRef.current = 0;
      }

      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onClick = (e: MouseEvent) => {
      cursor.style.transform = "translate(-14px, -14px) rotate(-25deg) scale(1.3)";
      setTimeout(() => {
        cursor.style.transform = "translate(-14px, -14px) rotate(-25deg) scale(1)";
      }, 150);
      createPaw(e.clientX, e.clientY, true);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.body.style.cursor = "";
      styleEl.remove();
      cursor.remove();
    };
  }, [reduced, createPaw]);

  // Detect touch devices without setState-in-effect
  const isTouch = useSyncExternalStore(
    subscribeNoop,
    getTouchSnapshot,
    getTouchServerSnapshot
  );

  if (reduced || isTouch) return null;

  return <div ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
