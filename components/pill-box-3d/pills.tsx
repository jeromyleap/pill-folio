"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import { MathUtils, type DataTexture, type Group } from "three";

import { INK, TOP } from "@/components/pill-box-3d/dimensions";

const SPILL = [
  { p: [-0.2, 0.5, 0.25], r: [0.3, 0.4, 1.3], tone: 0 },
  { p: [0.18, 0.62, 0.05], r: [1.1, 0.2, -0.6], tone: 1 },
  { p: [0.02, 0.44, 0.55], r: [0.2, 1.2, 0.2], tone: 2 },
  { p: [-0.08, 0.78, -0.12], r: [0.9, -0.5, 0.9], tone: 1 },
  { p: [0.24, 0.42, 0.62], r: [-0.4, 0.8, 1.6], tone: 0 },
] as const;

export function Pills({
  open,
  colors,
  gradient,
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
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.075, 0.17, 4, 12]} />
            <meshToonMaterial color={colors[pill.tone]} gradientMap={gradient} />
            <Outlines thickness={0.018} color={INK} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
