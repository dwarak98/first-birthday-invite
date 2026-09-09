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
const LAUNCH_EVERY_MS = 900;

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

  function spawnBurst(x: number, y: number, radius: number) {
    const next: Bit[] = [
      {
        id: ++nextId.current,
        kind: "core",
        x,
        y,
        color: "#fff8f1",
        rot: 0,
        dist: 0,
        length: 16,
        delay: 0,
        duration: 640,
      },
    ];

    for (let s = 0; s < 24; s += 1) {
      next.push({
        id: ++nextId.current,
        kind: "streak",
        x,
        y,
        color: COLORS[s % COLORS.length],
        rot: (s / 24) * 360,
        dist: radius * (0.82 + (s % 3) * 0.08),
        length: 16 + (s % 4) * 3,
        delay: 0,
        duration: 980 + (s % 5) * 40,
      });
    }

    for (let s = 0; s < 16; s += 1) {
      next.push({
        id: ++nextId.current,
        kind: "streak",
        x,
        y,
        color: COLORS[(s + 2) % COLORS.length],
        rot: (s / 16) * 360 + 11,
        dist: radius * 0.48,
        length: 10,
        delay: 40,
        duration: 820,
      });
    }

    for (let s = 0; s < 10; s += 1) {
      next.push({
        id: ++nextId.current,
        kind: "spark",
        x,
        y,
        color: COLORS[s % 4],
        rot: (s / 10) * 360,
        dist: radius * 0.7,
        length: 13,
        delay: 30,
        duration: 900,
      });
    }

    setBits((current) => [...current, ...next].slice(-160));
    const last = next[next.length - 1].id;
    const first = next[0].id;
    window.setTimeout(() => {
      setBits((current) => current.filter((item) => item.id < first || item.id > last));
    }, 1200);
  }

  function launchRockets(count: number) {
    const poster = host ?? rootRef.current?.querySelector("[data-invite-poster]");
    if (!(poster instanceof HTMLElement) || prefersReducedMotion()) return;

    const w = poster.clientWidth;
    const h = poster.clientHeight;
    const pad = 78;
    const next: Bit[] = [];

    for (let i = 0; i < count; i += 1) {
      const x = pad + Math.random() * Math.max(w - pad * 2, 48);
      const y1 = h - 22;
      const y2 = 96 + Math.random() * 36;
      const flight = 1280 + Math.random() * 280;
      const radius = Math.min(w * 0.36, h * 0.24, x - 12, w - x - 12, 108);
      const rocket: Bit = {
        id: ++nextId.current,
        kind: "rocket",
        x,
        y: y1,
        color: "#c4a06a",
        rot: 0,
        dist: y2 - y1,
        length: 20,
        delay: i * 120,
        duration: flight,
      };
      next.push(rocket);
      window.setTimeout(() => spawnBurst(x, y2, Math.max(radius, 64)), rocket.delay + flight);
    }

    setBits((current) => [...current, ...next].slice(-160));
    const first = next[0]?.id;
    const last = next[next.length - 1]?.id;
    if (first === undefined || last === undefined) return;
    window.setTimeout(() => {
      setBits((current) => current.filter((item) => item.id < first || item.id > last));
    }, 1800);
  }

  function startShow(pointer: number) {
    if (prefersReducedMotion()) return;
    stopShow();
    pressId.current = pointer;
    launchRockets(1);
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
                  width: bit.kind === "rocket" ? 3 : bit.kind === "core" ? 16 : bit.length,
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
