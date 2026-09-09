"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

type Spark = {
  id: number;
  x: number;
  y: number;
};

const TAP_SLOP = 12;
const SPARK_MS = 700;

function isControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("a, button, input, textarea, select, label"));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GoldSparks({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tapRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const nextId = useRef(0);
  const [sparks, setSparks] = useState<Spark[]>([]);

  function spawn(clientX: number, clientY: number) {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const box = root.getBoundingClientRect();
    const spark: Spark = {
      id: ++nextId.current,
      x: clientX - box.left,
      y: clientY - box.top,
    };

    setSparks((current) => [...current.slice(-5), spark]);
    window.setTimeout(() => {
      setSparks((current) => current.filter((item) => item.id !== spark.id));
    }, SPARK_MS);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isControl(event.target)) {
      tapRef.current = null;
      return;
    }
    tapRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const tap = tapRef.current;
    tapRef.current = null;
    if (!tap || tap.id !== event.pointerId) return;
    if (isControl(event.target)) return;
    const dx = event.clientX - tap.x;
    const dy = event.clientY - tap.y;
    if (Math.hypot(dx, dy) > TAP_SLOP) return;
    spawn(tap.x, tap.y);
  }

  function onPointerCancel() {
    tapRef.current = null;
  }

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {children}
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="invite-spark"
          style={{ left: spark.x, top: spark.y }}
          aria-hidden
        >
          <svg viewBox="0 0 32 32" width="22" height="22">
            <path
              fill="#c4a06a"
              d="M16 1.2 18.4 13.6 30.8 16 18.4 18.4 16 30.8 13.6 18.4 1.2 16 13.6 13.6Z"
            />
            <path fill="#fff8f1" opacity="0.85" d="M16 9.5 16.8 15.2 22.5 16 16.8 16.8 16 22.5 15.2 16.8 9.5 16 15.2 15.2Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
