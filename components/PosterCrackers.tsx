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
const ROCKETS = 10;

function isControl(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("a, button, input, textarea, select, label"));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function posterPoint(poster: HTMLElement, clientX: number, clientY: number) {
  const box = poster.getBoundingClientRect();
  const pad = 20;
  return {
    x: Math.min(box.width - pad, Math.max(pad, clientX - box.left)),
    y: Math.min(box.height - pad, Math.max(pad, clientY - box.top)),
  };
}

export function PosterCrackers({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<{ id: number; x: number; y: number } | null>(null);
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
    pressRef.current = null;
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

    setBits((current) => [...current, ...next].slice(-180));
    const last = next[next.length - 1].id;
    const first = next[0].id;
    window.setTimeout(() => {
      setBits((current) => current.filter((item) => item.id < first || item.id > last));
    }, 1200);
  }

  function launchAt(x: number, y: number) {
    const poster = host ?? rootRef.current?.querySelector("[data-invite-poster]");
    if (!(poster instanceof HTMLElement) || prefersReducedMotion()) return;

    const w = poster.clientWidth;
    const h = poster.clientHeight;
    const reach = Math.min(w, h) * 0.42;
    const next: Bit[] = [];
    let flight = 980;

    for (let i = 0; i < ROCKETS; i += 1) {
      const angle = (i / ROCKETS) * Math.PI * 2;
      let ox = x + Math.cos(angle) * reach;
      let oy = y + Math.sin(angle) * reach;
      ox = Math.min(w - 16, Math.max(16, ox));
      oy = Math.min(h - 16, Math.max(16, oy));
      const dx = x - ox;
      const dy = y - oy;
      const dist = Math.hypot(dx, dy);
      if (dist < 28) continue;
      flight = Math.max(flight, 880 + dist * 1.1);
      next.push({
        id: ++nextId.current,
        kind: "rocket",
        x: ox,
        y: oy,
        color: i % 2 === 0 ? "#c4a06a" : "#9c3d45",
        rot: (Math.atan2(dy, dx) * 180) / Math.PI,
        dist,
        length: 18,
        delay: i * 18,
        duration: 880 + dist * 1.1,
      });
    }

    if (next.length === 0) return;

    setBits((current) => [...current, ...next].slice(-180));
    const first = next[0].id;
    const last = next[next.length - 1].id;
    const radius = Math.min(w * 0.34, h * 0.26, x - 10, w - x - 10, y - 10, h - y - 10, 112);

    window.setTimeout(() => spawnBurst(x, y, Math.max(radius, 72)), flight);
    window.setTimeout(() => {
      setBits((current) => current.filter((item) => item.id < first || item.id > last));
    }, flight + 40);
  }

  function launchFromPress() {
    const press = pressRef.current;
    if (!press) return;
    launchAt(press.x, press.y);
  }

  function startShow(pointer: number, x: number, y: number) {
    if (prefersReducedMotion()) return;
    stopShow();
    pressRef.current = { id: pointer, x, y };
    launchFromPress();
    loopRef.current = window.setInterval(() => {
      if (pressRef.current === null) return;
      launchFromPress();
    }, LAUNCH_EVERY_MS);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isControl(event.target)) return;
    const poster = host ?? rootRef.current?.querySelector("[data-invite-poster]");
    if (!(poster instanceof HTMLElement)) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* capture is optional; pointerup still ends the show */
    }
    const point = posterPoint(poster, event.clientX, event.clientY);
    startShow(event.pointerId, point.x, point.y);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const press = pressRef.current;
    if (!press || press.id !== event.pointerId) return;
    const poster = host ?? rootRef.current?.querySelector("[data-invite-poster]");
    if (!(poster instanceof HTMLElement)) return;
    const point = posterPoint(poster, event.clientX, event.clientY);
    press.x = point.x;
    press.y = point.y;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pressRef.current?.id !== event.pointerId) return;
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
                  width: bit.kind === "core" ? 16 : bit.length,
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
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {children}
      {overlay}
    </div>
  );
}
