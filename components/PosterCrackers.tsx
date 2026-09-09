"use client";

import { useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Bit = {
  id: number;
  kind: "rocket" | "streak" | "core" | "spark";
  x: number;
  y: number;
  color: string;
  rot: number;
  dist: number;
  length: number;
  delay: number;
  duration: number;
};

const COLORS = ["#c4a06a", "#9c3d45", "#fff8f1", "#8b3a42", "#f6e4d8", "#c4a06a"];
const LAUNCH_EVERY_MS = 260;

function isControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("a, button, input, textarea, select, label"));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PosterCrackers({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pressId = useRef<number | null>(null);
  const loopRef = useRef(0);
  const nextId = useRef(0);
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [bits, setBits] = useState<Bit[]>([]);

  useLayoutEffect(() => {
    const node = rootRef.current?.querySelector("[data-invite-poster]");
    if (node instanceof HTMLElement) setHost(node);
  }, []);

  function stopShow() {
    window.clearInterval(loopRef.current);
    loopRef.current = 0;
    pressId.current = null;
  }

  function spawnBurst(x: number, y: number) {
    const next: Bit[] = [
      {
        id: ++nextId.current,
        kind: "core",
        x,
        y,
        color: "#c4a06a",
        rot: 0,
        dist: 0,
        length: 8,
        delay: 0,
        duration: 480,
      },
    ];

    for (let s = 0; s < 12; s += 1) {
      next.push({
        id: ++nextId.current,
        kind: "streak",
        x,
        y,
        color: COLORS[s % COLORS.length],
        rot: (s / 12) * 360 + (Math.random() - 0.5) * 22,
        dist: 16 + Math.random() * 22,
        length: 7 + Math.random() * 8,
        delay: s * 8,
        duration: 480 + Math.random() * 160,
      });
    }

    for (let s = 0; s < 4; s += 1) {
      next.push({
        id: ++nextId.current,
        kind: "spark",
        x,
        y,
        color: COLORS[s % 4],
        rot: Math.random() * 360,
        dist: 10 + Math.random() * 16,
        length: 11,
        delay: 20 + s * 18,
        duration: 520,
      });
    }

    setBits((current) => [...current, ...next].slice(-140));
    const last = next[next.length - 1].id;
    const first = next[0].id;
    window.setTimeout(() => {
      setBits((current) => current.filter((item) => item.id < first || item.id > last));
    }, 780);
  }

  function launchRockets(count: number) {
    const poster = host ?? rootRef.current?.querySelector("[data-invite-poster]");
    if (!(poster instanceof HTMLElement) || prefersReducedMotion()) return;

    const w = poster.clientWidth;
    const h = poster.clientHeight;
    const next: Bit[] = [];

    for (let i = 0; i < count; i += 1) {
      const x1 = 28 + Math.random() * Math.max(w - 56, 40);
      const y1 = h - 18;
      const x2 = 32 + Math.random() * Math.max(w - 64, 40);
      const y2 = 52 + Math.random() * Math.max(h * 0.4, 80);
      const dx = x2 - x1;
      const dy = y2 - y1;
      const flight = 500 + Math.random() * 140;
      const delay = i * 40;
      const rocket: Bit = {
        id: ++nextId.current,
        kind: "rocket",
        x: x1,
        y: y1,
        color: i % 2 === 0 ? "#c4a06a" : "#9c3d45",
        rot: (Math.atan2(dy, dx) * 180) / Math.PI,
        dist: Math.hypot(dx, dy),
        length: 16 + Math.random() * 6,
        delay,
        duration: flight,
      };
      next.push(rocket);
      window.setTimeout(() => spawnBurst(x2, y2), delay + flight * 0.84);
    }

    setBits((current) => [...current, ...next].slice(-140));
    const first = next[0]?.id;
    const last = next[next.length - 1]?.id;
    if (first === undefined || last === undefined) return;
    window.setTimeout(() => {
      setBits((current) => current.filter((item) => item.id < first || item.id > last));
    }, 760);
  }

  function startShow(pointer: number) {
    if (prefersReducedMotion()) return;
    stopShow();
    pressId.current = pointer;
    launchRockets(2);
    loopRef.current = window.setInterval(() => {
      if (pressId.current === null) return;
      launchRockets(1);
    }, LAUNCH_EVERY_MS);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isControl(event.target)) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* capture is optional; pointerup still ends the show */
    }
    startShow(event.pointerId);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pressId.current !== event.pointerId) return;
    stopShow();
  }

  function onPointerCancel() {
    stopShow();
  }

  const overlay =
    host === null
      ? null
      : createPortal(
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[1.75rem]">
            {bits.map((bit) => (
              <span
                key={bit.id}
                className={
                  bit.kind === "rocket"
                    ? "invite-rocket"
                    : bit.kind === "core"
                      ? "invite-cracker-core"
                      : bit.kind === "spark"
                        ? "invite-sparkle"
                        : "invite-cracker-streak"
                }
                style={{
                  left: bit.x,
                  top: bit.y,
                  background: bit.color,
                  width: bit.kind === "core" ? 7 : bit.length,
                  ["--rot" as string]: `${bit.rot}deg`,
                  ["--dist" as string]: `${bit.dist}px`,
                  ["--delay" as string]: `${bit.delay}ms`,
                  ["--dur" as string]: `${bit.duration}ms`,
                }}
                aria-hidden
              />
            ))}
          </div>,
          host,
        );

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {children}
      {overlay}
    </div>
  );
}
