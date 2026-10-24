"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Outlines, RoundedBox, useCursor } from "@react-three/drei";
import {
  Color,
  MathUtils,
  type DataTexture,
  type Group,
  type MeshToonMaterial,
} from "three";

import type { Project } from "@/data/projects";
import {
  CELL_W,
  INK,
  LID_D,
  LID_H,
  LID_OPEN,
  LID_PEEK,
  PITCH,
  TOP,
} from "@/components/pill-box-3d/dimensions";
import { Pills } from "@/components/pill-box-3d/pills";
import { createLidLabel } from "@/components/pill-box-3d/textures";

const WHITE = new Color("#ffffff");
/** Pointer travel (px) between down and up beyond which a click counts as an orbit drag. */
const DRAG_TOLERANCE = 6;

export function Compartment({
  project,
  index,
  open,
  reduce,
  gradient,
  onSelect,
}: {
  project: Project;
  index: number;
  open: boolean;
  reduce: boolean;
  gradient: DataTexture;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const lift = useRef<Group>(null);
  const hinge = useRef<Group>(null);
  const lidMaterial = useRef<MeshToonMaterial>(null);

  const base = useMemo(() => new Color(project.theme.lid), [project.theme.lid]);
  const bright = useMemo(() => base.clone().lerp(WHITE, 0.28), [base]);
  const label = useMemo(
    () => createLidLabel(project.shortLabel, project.lidName, project.theme.deep),
    [project.shortLabel, project.lidName, project.theme.deep],
  );
  useEffect(() => () => label.dispose(), [label]);

  const lit = hovered || open;

  useFrame((_, delta) => {
    const angle = open ? LID_OPEN : hovered ? LID_PEEK : 0;
    const raise = hovered && !open ? 0.07 : 0;
    if (hinge.current) {
      hinge.current.rotation.x = reduce
        ? angle
        : MathUtils.damp(hinge.current.rotation.x, angle, open ? 6 : 10, delta);
    }
    if (lift.current) {
      lift.current.position.y = reduce
        ? raise
        : MathUtils.damp(lift.current.position.y, raise, 10, delta);
    }
    lidMaterial.current?.color.lerp(lit ? bright : base, 1 - Math.exp(-10 * delta));
  });

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    if (event.delta > DRAG_TOLERANCE) return;
    onSelect(project.id);
  }

  return (
    <group
      position={[(index - 3) * PITCH, 0, 0]}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <RoundedBox
        args={[CELL_W - 0.1, 0.05, LID_D - 0.14]}
        radius={0.02}
        position={[0, TOP + 0.005, 0]}
        receiveShadow
      >
        <meshToonMaterial color={project.theme.well} gradientMap={gradient} />
      </RoundedBox>

      <group ref={lift}>
        <group ref={hinge} position={[0, TOP + 0.03, -LID_D / 2]}>
          <RoundedBox
            args={[CELL_W, LID_H, LID_D]}
            radius={0.07}
            smoothness={4}
            position={[0, LID_H / 2, LID_D / 2]}
            castShadow
            receiveShadow
          >
            <meshToonMaterial ref={lidMaterial} color={project.theme.lid} gradientMap={gradient} />
            <Outlines
              thickness={lit ? 0.05 : 0.034}
              color={lit ? project.theme.deep : INK}
            />
          </RoundedBox>
          <mesh position={[0, LID_H + 0.002, LID_D / 2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[CELL_W * 0.86, LID_D * 0.86]} />
            <meshBasicMaterial map={label} transparent toneMapped={false} />
          </mesh>
          <RoundedBox
            args={[0.32, 0.08, 0.12]}
            radius={0.03}
            position={[0, LID_H * 0.35, LID_D + 0.04]}
          >
            <meshToonMaterial color={project.theme.deep} gradientMap={gradient} />
            <Outlines thickness={0.022} color={INK} />
          </RoundedBox>
        </group>
      </group>

      <Pills open={open} colors={project.theme.pills} gradient={gradient} reduce={reduce} />
    </group>
  );
}
