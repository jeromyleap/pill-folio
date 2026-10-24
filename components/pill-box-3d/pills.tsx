"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, MathUtils, type DataTexture, type Group } from "three";

import { INK, TOP } from "@/components/pill-box-3d/dimensions";

const SPILL = [
  { p: [-0.2, 0.5, 0.25], r: [0.3, 0.4, 1.3], tone: 0 },
  { p: [0.18, 0.62, 0.05], r: [1.1, 0.2, -0.6], tone: 1 },
  { p: [0.02, 0.44, 0.55], r: [0.2, 1.2, 0.2], tone: 2 },
  { p: [-0.08, 0.78, -0.12], r: [0.9, -0.5, 0.9], tone: 1 },
  { p: [0.24, 0.42, 0.62], r: [-0.4, 0.8, 1.6], tone: 0 },
] as const;

const R = 0.092;
const LEN = 0.19;

/**
 * Same visual language as the 2D `Capsule` on project cards:
 * flat solid fill (no lighting), thick ink border, and a white gloss fleck.
 */
function CapsulePill({ color }: { color: string }) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* Ink rim via inverted hull — matches border-2 border-ink */}
      <mesh scale={1.18} raycast={() => null}>
        <capsuleGeometry args={[R, LEN, 6, 16]} />
        <meshBasicMaterial color={INK} side={BackSide} toneMapped={false} />
      </mesh>

      {/* Flat graphic body — matches the unlit CSS capsule fill */}
      <mesh castShadow>
        <capsuleGeometry args={[R, LEN, 6, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      {/* Specular gloss fleck — matches the white oval on `Capsule` */}
      <mesh
        position={[0.05, 0.028, 0.07]}
        rotation={[0.4, 0.2, 0.55]}
        scale={[0.9, 0.42, 0.5]}
        raycast={() => null}
      >
        <sphereGeometry args={[0.058, 12, 12]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </group>
  );
}

export function Pills({
  open,
  colors,
  reduce,
}: {
  open: boolean;
  colors: readonly [string, string, string];
  gradient: DataTexture;
  reduce: boolean;
}) {
  const refs = useRef<(Group | null)[]>([]);
  const openedAt = useRef<number | null>(null);

  useFrame(({ clock }, delta) => {
    if (open && openedAt.current === null) openedAt.current = clock.elapsedTime;
    if (!open) openedAt.current = null;
    const since = openedAt.current === null ? 0 : clock.elapsedTime - openedAt.current;

    SPILL.forEach((pill, index) => {
      const group = refs.current[index];
      if (!group) return;
      const released = open && since > 0.12 + index * 0.05;
      const lambda = reduce ? 40 : 7 + index;
      const x = released ? pill.p[0] : 0;
      const y = released ? TOP + pill.p[1] : TOP - 0.08;
      const z = released ? pill.p[2] : 0;
      group.position.set(
        MathUtils.damp(group.position.x, x, lambda, delta),
        MathUtils.damp(group.position.y, y, lambda, delta),
        MathUtils.damp(group.position.z, z, lambda, delta),
      );
      const [rx, ry, rz] = released ? pill.r : [0, 0, Math.PI / 2];
      group.rotation.set(
        MathUtils.damp(group.rotation.x, rx, lambda, delta),
        MathUtils.damp(group.rotation.y, ry, lambda, delta),
        MathUtils.damp(group.rotation.z, rz, lambda, delta),
      );
      const scale = MathUtils.damp(group.scale.x, released ? 1 : 0.001, lambda + 4, delta);
      group.scale.setScalar(scale);
      group.visible = scale > 0.01;
    });
  });

  return (
    <group>
      {SPILL.map((pill, index) => (
        <group
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          position={[0, TOP - 0.08, 0]}
          scale={0.001}
          visible={false}
        >
          <CapsulePill color={colors[pill.tone]} />
        </group>
      ))}
    </group>
  );
}
