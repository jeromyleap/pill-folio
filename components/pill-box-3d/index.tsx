"use client";

import { Component, Suspense, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import type { Project } from "@/data/projects";
import { PillBoxScene } from "@/components/pill-box-3d/scene";

/** Pointer travel (px) on empty canvas that still counts as a click rather than an orbit. */
const MISS_TOLERANCE = 6;

function hasWebGL(): boolean {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    return false;
  }
}

class WebGLBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function PillBox3D({
  projects,
  activeId,
  reduce,
  onSelect,
  onClear,
  fallback,
}: {
  projects: Project[];
  activeId: string | null;
  reduce: boolean;
  onSelect: (id: string) => void;
  onClear: () => void;
  fallback: ReactNode;
}) {
  const [supported] = useState(hasWebGL);
  const [ready, setReady] = useState(false);
  const down = useRef<{ x: number; y: number } | null>(null);
  const overlay = useRef<HTMLDivElement>(null);

  if (!supported) return fallback;

  return (
    <WebGLBoundary fallback={fallback}>
      <div
        ref={overlay}
        className="relative h-full w-full"
        onPointerDown={(event) => {
          down.current = { x: event.clientX, y: event.clientY };
        }}
      >
        <Canvas
          dpr={[1, 2]}
          shadows="percentage"
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ fov: 30, near: 0.1, far: 80, position: [0, 4, 10] }}
          aria-label="Weekly pill box. Drag to spin, scroll or pinch to zoom, click a lid to open that day."
          onPointerMissed={(event) => {
            const start = down.current;
            if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > MISS_TOLERANCE) {
              return;
            }
            onClear();
          }}
        >
          {/* Html stays mounted with a fixed portal: remounting its DOM root mid-render throws under React 19. */}
          <Html center portal={overlay as RefObject<HTMLElement>}>
            {ready ? null : (
              <p className="rounded-full border-2 border-ink bg-paper px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink shadow-[3px_3px_0_rgba(60,51,43,0.12)]">
                Setting out the week…
              </p>
            )}
          </Html>
          <Suspense fallback={null}>
            <PillBoxScene
              projects={projects}
              activeId={activeId}
              reduce={reduce}
              onSelect={onSelect}
              onReady={() => setReady(true)}
            />
          </Suspense>
        </Canvas>
      </div>
    </WebGLBoundary>
  );
}
