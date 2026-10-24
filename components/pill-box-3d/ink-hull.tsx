"use client";

import { RoundedBox } from "@react-three/drei";
import { BackSide } from "three";

import { INK } from "@/components/pill-box-3d/dimensions";

/**
 * Inverted-hull ink outline for a RoundedBox: a slightly larger box that only
 * draws its back faces, so the ink peeks out around the silhouette.
 */
export function InkHull({
  args,
  radius,
  thickness,
  color = INK,
}: {
  args: [number, number, number];
  radius: number;
  thickness: number;
  color?: string;
}) {
  const [w, h, d] = args;
  return (
    <RoundedBox
      args={[w + thickness * 2, h + thickness * 2, d + thickness * 2]}
      radius={radius + thickness}
      smoothness={4}
      raycast={() => null}
    >
      <meshBasicMaterial color={color} side={BackSide} toneMapped={false} />
    </RoundedBox>
  );
}
