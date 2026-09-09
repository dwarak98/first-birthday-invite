"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

type Cracker = {
  id: number;
  kind: "streak" | "core";
  x: number;
  y: number;
  color: string;
  rot: number;
  dist: number;
  length: number;
  delay: number;
  duration: number;
};

const TAP_SLOP = 12;
const HOLD_MS = 280;
const HOLD_EVERY_MS = 850;
const COLORS = ["#c4a06a", "#9c3d45", "#fff8f1", "#8b3a42", "#f6e4d8", "#c4a06a"];

function isControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("a, button, input, textarea, select, label"));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pointOnRoundedRect(
  width: number,
  height: number,
  radius: number,
  t: number,
): { x: number; y: number } {
  const r = Math.min(radius, width / 2, height / 2);
  const h = width - 2 * r;
  const v = height - 2 * r;
  const arc = (Math.PI / 2) * r;
  const segs = [h, arc, v, arc, h, arc, v, arc];
  const total = segs.reduce((sum, len) => sum + len, 0);
  let d = (((t % 1) + 1) % 1) * total;

  if (d <= segs[0]) return { x: r + d, y: 0 };
  d -= segs[0];
  if (d <= segs[1]) {
    const a = -Math.PI / 2 + d / r;
    return { x: width - r + r * Math.cos(a), y: r + r * Math.sin(a) };
  }
  d -= segs[1];
  if (d <= segs[2]) return { x: width, y: r + d };
  d -= segs[2];
  if (d <= segs[3]) {
    const a = d / r;
    return { x: width - r + r * Math.cos(a), y: height - r + r * Math.sin(a) };
  }
  d -= segs[3];
  if (d <= segs[4]) return { x: width - r - d, y: height };
  d -= segs[4];
  if (d <= segs[5]) {
    const a = Math.PI / 2 + d / r;
    return { x: r + r * Math.cos(a), y: height - r + r * Math.sin(a) };
  }
  d -= segs[5];
  if (d <= segs[6]) return { x: 0, y: height - r - d };
  d -= segs[6];
  const a = Math.PI + d / r;
  return { x: r + r * Math.cos(a), y: r + r * Math.sin(a) };
}

export function PosterCrackers({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<{ id: number; x: number; y: number; bursted: boolean } | null>(null);
  const holdTimer = useRef(0);
  const holdLoop = useRef(0);
  const nextId = useRef(0);
  const [crackers, setCrackers] = useState<Cracker[]>([]);

  function clearHold() {
    window.clearTimeout(holdTimer.current);
    window.clearInterval(holdLoop.current);
    holdTimer.current = 0;
    holdLoop.current = 0;
  }

  function burst() {
    const root = rootRef.current;
    const poster = root?.querySelector("[data-invite-poster]");
    if (!root || !(poster instanceof HTMLElement) || prefersReducedMotion()) return;

    const stage = root.getBoundingClientRect();
    const card = poster.getBoundingClientRect();
    const radius = parseFloat(getComputedStyle(poster).borderTopLeftRadius) || 28;
    const cx = card.left - stage.left + card.width / 2;
    const cy = card.top - stage.top + card.height / 2;
    const shift = Math.random();
    const next: Cracker[] = [];

    for (let i = 0; i < 10; i += 1) {
      const { x, y } = pointOnRoundedRect(card.width, card.height, radius, shift + i / 10);
      const ox = card.left - stage.left + x;
      const oy = card.top - stage.top + y;
      const outward = Math.atan2(oy - cy, ox - cx);
      const delay = i * 18;

      next.push({
        id: ++nextId.current,
        kind: "core",
        x: ox,
        y: oy,
        color: COLORS[i % 2 === 0 ? 0 : 1],
        rot: 0,
        dist: 0,
        length: 7,
        delay,
        duration: 420,
      });

      for (let s = 0; s < 6; s += 1) {
        const angle = outward + (Math.random() - 0.5) * 1.15;
        next.push({
          id: ++nextId.current,
          kind: "streak",
          x: ox,
          y: oy,
          color: COLORS[(i + s) % COLORS.length],
          rot: (angle * 180) / Math.PI,
          dist: 22 + Math.random() * 34,
          length: 8 + Math.random() * 10,
          delay: delay + s * 12,
          duration: 520 + Math.random() * 220,
        });
      }
    }

    setCrackers((current) => [...current, ...next].slice(-120));
    const life = 900;
    window.setTimeout(() => {
      const first = next[0]?.id;
      if (first === undefined) return;
      setCrackers((current) => current.filter((item) => item.id < first || item.id > next[next.length - 1].id));
    }, life);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isControl(event.target)) {
      pressRef.current = null;
      clearHold();
      return;
    }

    pressRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, bursted: false };
    clearHold();
    holdTimer.current = window.setTimeout(() => {
      const press = pressRef.current;
      if (!press) return;
      press.bursted = true;
      burst();
      holdLoop.current = window.setInterval(burst, HOLD_EVERY_MS);
    }, HOLD_MS);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const press = pressRef.current;
    if (!press || press.id !== event.pointerId) return;
    if (Math.hypot(event.clientX - press.x, event.clientY - press.y) <= TAP_SLOP) return;
    pressRef.current = null;
    clearHold();
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const press = pressRef.current;
    clearHold();
    pressRef.current = null;
    if (!press || press.id !== event.pointerId || press.bursted) return;
    if (isControl(event.target)) return;
    if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > TAP_SLOP) return;
    burst();
  }

  function onPointerCancel() {
    pressRef.current = null;
    clearHold();
  }

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {children}
      {crackers.map((cracker) => (
        <span
          key={cracker.id}
          className={cracker.kind === "core" ? "invite-cracker-core" : "invite-cracker-streak"}
          style={{
            left: cracker.x,
            top: cracker.y,
            background: cracker.color,
            width: cracker.kind === "core" ? 6 : cracker.length,
            ["--rot" as string]: `${cracker.rot}deg`,
            ["--dist" as string]: `${cracker.dist}px`,
            ["--delay" as string]: `${cracker.delay}ms`,
            ["--dur" as string]: `${cracker.duration}ms`,
          }}
          aria-hidden
        />
      ))}
    </div>
  );
}
