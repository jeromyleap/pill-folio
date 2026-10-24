"use client";

import { use, useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, RoundedBox } from "@react-three/drei";
import type { PerspectiveCamera } from "three";

import type { Project } from "@/data/projects";
import { Compartment } from "@/components/pill-box-3d/compartment";
import { InkHull } from "@/components/pill-box-3d/ink-hull";
import {
  SCENE_H,
  TRAY_COLOR,
  TRAY_D,
  TRAY_H,
  TRAY_W,
} from "@/components/pill-box-3d/dimensions";
import {
  createPlateLabel,
  createToonGradient,
  fontsReady,
} from "@/components/pill-box-3d/textures";

/** Camera direction: slightly above the tray, looking down at the lids. */
const VIEW = { y: 0.48, z: 1 };

function useFitDistance(): number {
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  return useMemo(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const vfov = (camera.fov * Math.PI) / 180;
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
    const fitWidth = (TRAY_W * 0.64) / Math.tan(hfov / 2);
    const fitHeight = (SCENE_H * 0.5) / Math.tan(vfov / 2);
    return Math.max(fitWidth, fitHeight);
  }, [size.width, size.height, camera.fov]);
}

function CameraRig({ distance }: { distance: number }) {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls) as { update?: () => void } | null;

  useEffect(() => {
    const length = Math.hypot(VIEW.y, VIEW.z);
    camera.position.set(0, (VIEW.y / length) * distance, (VIEW.z / length) * distance);
    camera.lookAt(0, 0, 0);
    controls?.update?.();
  }, [camera, controls, distance]);

  return null;
}

function Tray({
  projects,
  activeId,
  reduce,
  onSelect,
  onReady,
}: {
  projects: Project[];
  activeId: string | null;
  reduce: boolean;
  onSelect: (id: string) => void;
  onReady: () => void;
}) {
  use(fontsReady);
  useEffect(() => onReady(), [onReady]);
  const gradient = useMemo(() => createToonGradient(), []);
  const plate = useMemo(() => createPlateLabel("nicheleap · weekly"), []);
  useEffect(
    () => () => {
      gradient.dispose();
      plate.dispose();
    },
    [gradient, plate],
  );

  return (
    <group position={[0, -0.2, 0]}>
      <RoundedBox args={[TRAY_W, TRAY_H, TRAY_D]} radius={0.22} smoothness={5} receiveShadow castShadow>
        <meshToonMaterial color={TRAY_COLOR} gradientMap={gradient} />
        <InkHull args={[TRAY_W, TRAY_H, TRAY_D]} radius={0.22} thickness={0.035} />
      </RoundedBox>
      <RoundedBox
        args={[3.2, 0.34, 0.06]}
        radius={0.1}
        position={[0, -0.04, TRAY_D / 2 + 0.01]}
      >
        <meshToonMaterial color="#fffaf3" gradientMap={gradient} />
        <InkHull args={[3.2, 0.34, 0.06]} radius={0.1} thickness={0.014} />
      </RoundedBox>
      <mesh position={[0, -0.04, TRAY_D / 2 + 0.045]}>
        <planeGeometry args={[3.0, 0.375]} />
        <meshBasicMaterial map={plate} transparent toneMapped={false} />
      </mesh>
      {projects.map((project, index) => (
        <Compartment
          key={project.id}
          project={project}
          index={index}
          open={project.id === activeId}
          reduce={reduce}
          gradient={gradient}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

export function PillBoxScene({
  projects,
  activeId,
  reduce,
  onSelect,
  onReady,
}: {
  projects: Project[];
  activeId: string | null;
  reduce: boolean;
  onSelect: (id: string) => void;
  onReady: () => void;
}) {
  const distance = useFitDistance();

  return (
    <>
      <CameraRig distance={distance} />
      <ambientLight intensity={0.55} color="#fff6ea" />
      <hemisphereLight args={["#fffaf3", "#e4cdae", 0.45]} />
      <directionalLight
        position={[3.5, 7, 4.5]}
        intensity={2.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />

      <Float
        enabled={!reduce}
        speed={1.3}
        rotationIntensity={0.18}
        floatIntensity={0.45}
        floatingRange={[-0.07, 0.07]}
      >
        <Tray
          projects={projects}
          activeId={activeId}
          reduce={reduce}
          onSelect={onSelect}
          onReady={onReady}
        />
      </Float>

      <ContactShadows
        position={[0, -0.85, 0]}
        scale={TRAY_W * 1.5}
        blur={2.6}
        far={2.2}
        opacity={0.32}
        resolution={512}
        color="#6d5e52"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        zoomSpeed={0.6}
        minDistance={distance * 0.72}
        maxDistance={distance * 1.3}
        minPolarAngle={0.55}
        maxPolarAngle={1.45}
        minAzimuthAngle={-0.75}
        maxAzimuthAngle={0.75}
        target={[0, 0, 0]}
      />
    </>
  );
}
