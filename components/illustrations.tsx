import type { ReactNode } from "react";

import type { GalleryIllustration, IllustrationId } from "@/data/projects";

const ink = "#3c332b";

function Scene({
  children,
  background,
  label,
}: {
  children: ReactNode;
  background: string;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={label}
      className="h-full w-full"
    >
      <rect width="640" height="400" fill={background} />
      {children}
    </svg>
  );
}

export function ProjectIllustration({ id }: { id: IllustrationId }) {
  switch (id) {
    case "education":
      return <EducationArt />;
    case "memory":
      return <MemoryArt />;
    case "wristed":
      return <WristedArt />;
    case "healthscout":
      return <HealthScoutArt />;
    case "fluxo":
      return <FluxoArt />;
    case "peachy":
      return <PeachyArt />;
    case "about":
      return <AboutArt />;
  }
}

export function GalleryArt({
  id,
}: {
  id: GalleryIllustration;
}) {
  switch (id) {
    case "crowd":
      return <CrowdArt />;
    case "azul":
      return <AzulArt />;
    case "cooking":
      return <CookingArt />;
  }
}

function EducationArt() {
  return (
    <Scene background="#e7f2e1" label="Illustrated diploma, book, and pharmacy bottle">
      <ellipse cx="320" cy="332" rx="230" ry="36" fill="#d5e8cc" stroke={ink} strokeWidth="3" />
      <path d="M150 250c40-70 90-78 170-78s130 8 170 78v28H150v-28z" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <path d="M168 214h304" stroke={ink} strokeWidth="3" />
      <path d="M210 214c18 26 40 36 110 36s92-10 110-36" fill="none" stroke={ink} strokeWidth="3" />
      <circle cx="320" cy="168" r="16" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <path d="M250 118h140l-18 28H268l-18-28z" fill="#3c332b" />
      <path d="M268 146h104v10H268z" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <rect x="455" y="168" width="46" height="78" rx="16" fill="#f8cbb3" stroke={ink} strokeWidth="3" />
      <rect x="464" y="188" width="28" height="22" rx="4" fill="#fffaf3" stroke={ink} strokeWidth="2" />
      <path d="M478 160c8-18 16-18 22 0" fill="#6f9468" stroke={ink} strokeWidth="3" />
      <path d="M188 292h120M188 308h86" stroke={ink} strokeWidth="3" opacity="0.45" />
    </Scene>
  );
}

function MemoryArt() {
  return (
    <Scene background="#f3ecfb" label="Illustrated photos connected by a memory thread">
      <path d="M70 250c80-20 120 40 190 20s120-70 210-30 90 40 120 20" fill="none" stroke="#8d74b5" strokeWidth="4" />
      <g>
        <rect x="96" y="78" width="130" height="150" rx="10" fill="#fffaf3" stroke={ink} strokeWidth="3" transform="rotate(-6 161 153)" />
        <rect x="112" y="98" width="98" height="78" rx="6" fill="#d9c8f0" stroke={ink} strokeWidth="3" transform="rotate(-6 161 137)" />
        <circle cx="150" cy="128" r="12" fill="#f6dc8e" stroke={ink} strokeWidth="2" />
      </g>
      <g>
        <rect x="250" y="96" width="140" height="160" rx="10" fill="#fffaf3" stroke={ink} strokeWidth="3" />
        <rect x="268" y="114" width="104" height="86" rx="6" fill="#b9d7e8" stroke={ink} strokeWidth="3" />
        <path d="M278 186l28-32 22 20 16-14 22 26H278z" fill="#c5dbb8" stroke={ink} strokeWidth="2" />
      </g>
      <g>
        <rect x="420" y="86" width="128" height="146" rx="10" fill="#fffaf3" stroke={ink} strokeWidth="3" transform="rotate(5 484 159)" />
        <circle cx="484" cy="150" r="28" fill="#f3c3cf" stroke={ink} strokeWidth="3" />
      </g>
      <rect x="292" y="286" width="56" height="70" rx="18" fill="#3c332b" />
      <rect x="306" y="270" width="28" height="28" rx="8" fill="#6d5e52" stroke={ink} strokeWidth="3" />
    </Scene>
  );
}

function WristedArt() {
  return (
    <Scene background="#fff6dc" label="Illustrated watch face beside outfit color chips">
      <rect x="70" y="70" width="210" height="270" rx="28" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <rect x="86" y="108" width="178" height="150" rx="16" fill="#f3ecfb" stroke={ink} strokeWidth="3" />
      <circle cx="132" cy="160" r="22" fill="#f3c3cf" stroke={ink} strokeWidth="3" />
      <rect x="168" y="140" width="70" height="86" rx="12" fill="#b9d7e8" stroke={ink} strokeWidth="3" />
      <rect x="118" y="276" width="28" height="28" rx="8" fill="#3c332b" />
      <rect x="156" y="276" width="28" height="28" rx="8" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <rect x="194" y="276" width="28" height="28" rx="8" fill="#c5dbb8" stroke={ink} strokeWidth="3" />
      <rect x="360" y="118" width="70" height="150" rx="28" fill="#d7c2a6" stroke={ink} strokeWidth="3" />
      <circle cx="395" cy="196" r="48" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <circle cx="395" cy="196" r="36" fill="#d9c8f0" stroke={ink} strokeWidth="3" />
      <path d="M395 172v26l16 10" fill="none" stroke={ink} strokeWidth="3" />
      <circle cx="520" cy="150" r="34" fill="#f8cbb3" stroke={ink} strokeWidth="3" />
      <circle cx="548" cy="230" r="26" fill="#c5dbb8" stroke={ink} strokeWidth="3" />
    </Scene>
  );
}

function HealthScoutArt() {
  return (
    <Scene background="#e7f4fa" label="Illustrated clinic cottage and compass">
      <ellipse cx="330" cy="328" rx="240" ry="42" fill="#c5dbb8" stroke={ink} strokeWidth="3" />
      <path d="M230 214 330 132l100 82v112H230V214z" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <path d="M214 214 330 116l116 98" fill="#f3c3cf" stroke={ink} strokeWidth="3" />
      <rect x="306" y="248" width="48" height="78" rx="8" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <circle cx="344" cy="288" r="3" fill={ink} />
      <rect x="252" y="236" width="36" height="30" rx="4" fill="#b9d7e8" stroke={ink} strokeWidth="3" />
      <rect x="372" y="236" width="36" height="30" rx="4" fill="#b9d7e8" stroke={ink} strokeWidth="3" />
      <circle cx="500" cy="250" r="46" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <path d="M500 214l8 28-28-8 20-20z" fill="#5e93ad" stroke={ink} strokeWidth="2" />
      <circle cx="500" cy="250" r="5" fill="#f3c3cf" stroke={ink} strokeWidth="2" />
      <ellipse cx="180" cy="318" rx="22" ry="9" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <ellipse cx="230" cy="340" rx="22" ry="9" fill="#fffaf3" stroke={ink} strokeWidth="3" />
    </Scene>
  );
}

function FluxoArt() {
  return (
    <Scene background="#fdeef2" label="Illustrated envelopes, an open calendar slot, and coins">
      <rect x="78" y="92" width="200" height="130" rx="14" fill="#fffaf3" stroke={ink} strokeWidth="3" transform="rotate(-4 178 157)" />
      <path d="M86 110l92 58 92-58" fill="none" stroke={ink} strokeWidth="3" />
      <rect x="150" y="150" width="210" height="140" rx="14" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <path d="M162 170l84 52 84-52" fill="none" stroke={ink} strokeWidth="3" />
      <rect x="400" y="86" width="160" height="150" rx="16" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <path d="M418 124h124M418 156h124M418 188h124M450 100v112" stroke={ink} strokeWidth="2" opacity="0.35" />
      <rect x="452" y="158" width="36" height="28" rx="6" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <circle cx="150" cy="320" r="28" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <circle cx="196" cy="308" r="22" fill="#f8cbb3" stroke={ink} strokeWidth="3" />
      <text x="150" y="326" textAnchor="middle" fontSize="16" fontFamily="inherit" fill={ink}>
        $
      </text>
    </Scene>
  );
}

function PeachyArt() {
  return (
    <Scene background="#fff1e8" label="Illustrated cleaning schedule and a peach">
      <rect x="70" y="70" width="280" height="250" rx="22" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      {["M", "T", "W", "T", "F"].map((day, index) => (
        <g key={day + index} transform={`translate(${96 + index * 48} 108)`}>
          <rect width="36" height="64" rx="10" fill={index === 4 ? "#f8cbb3" : "#fff6dc"} stroke={ink} strokeWidth="3" />
          <text x="18" y="28" textAnchor="middle" fontSize="16" fontFamily="inherit" fill={ink}>
            {day}
          </text>
          {index !== 2 && <path d="M10 44l6 6 12-14" fill="none" stroke={ink} strokeWidth="3" />}
        </g>
      ))}
      <rect x="96" y="200" width="228" height="86" rx="14" fill="#fff6dc" stroke={ink} strokeWidth="3" />
      <path d="M116 232h120M116 256h80" stroke={ink} strokeWidth="3" opacity="0.4" />
      <path d="M430 250c-10-70 20-120 70-130 10 50 10 90-20 140-30 8-46 4-50-10z" fill="#f8cbb3" stroke={ink} strokeWidth="3" />
      <path d="M500 120c10-20 24-16 20 6" fill="#6f9468" stroke={ink} strokeWidth="3" />
      <rect x="430" y="250" width="34" height="78" rx="10" fill="#b9d7e8" stroke={ink} strokeWidth="3" />
      <rect x="438" y="236" width="18" height="20" rx="6" fill="#fffaf3" stroke={ink} strokeWidth="3" />
    </Scene>
  );
}

function AboutArt() {
  return (
    <Scene background="#f3fbf7" label="Illustrated camera, dog, and cooking pot">
      <circle cx="160" cy="200" r="90" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <rect x="118" y="168" width="84" height="58" rx="12" fill="#3c332b" />
      <circle cx="160" cy="196" r="16" fill="#b9d7e8" stroke="#fffaf3" strokeWidth="4" />
      <circle cx="390" cy="210" r="70" fill="#8eacbf" stroke={ink} strokeWidth="3" />
      <ellipse cx="390" cy="250" rx="48" ry="28" fill="#d7efe4" stroke={ink} strokeWidth="3" />
      <circle cx="368" cy="198" r="6" fill={ink} />
      <circle cx="412" cy="198" r="6" fill={ink} />
      <path d="M378 220c8 10 18 10 26 0" fill="none" stroke={ink} strokeWidth="3" />
      <ellipse cx="540" cy="250" rx="60" ry="18" fill="#e7d3b8" stroke={ink} strokeWidth="3" />
      <path d="M500 250c0-40 80-40 80 0" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <path d="M524 200c8-24 12-24 16-8" fill="none" stroke={ink} strokeWidth="3" />
    </Scene>
  );
}

function Portrait({
  children,
  background,
  label,
}: {
  children: ReactNode;
  background: string;
  label: string;
}) {
  return (
    <svg viewBox="0 0 320 400" role="img" aria-label={label} className="h-full w-full">
      <rect width="320" height="400" fill={background} />
      {children}
    </svg>
  );
}

function CrowdArt() {
  return (
    <Portrait background="#f8e7c8" label="Illustrated crowd with a camera at the side">
      <rect width="320" height="150" fill="#d9c8f0" />
      <circle cx="70" cy="40" r="16" fill="#fffaf3" opacity="0.8" />
      <circle cx="160" cy="28" r="10" fill="#fffaf3" opacity="0.7" />
      <circle cx="240" cy="48" r="8" fill="#fffaf3" opacity="0.8" />
      <path d="M20 70c30 16 40-10 70-4s40 20 70 8 40-16 70-6 40 18 70 6" fill="none" stroke="#f6dc8e" strokeWidth="4" />
      {[40, 92, 144, 196, 248].map((x, index) => (
        <g key={x}>
          <circle cx={x} cy={210 - (index % 2) * 16} r="22" fill={index % 2 ? "#f3c3cf" : "#c5dbb8"} stroke={ink} strokeWidth="3" />
          <rect x={x - 20} y={232 - (index % 2) * 16} width="40" height="70" rx="16" fill={index % 2 ? "#b9d7e8" : "#f6dc8e"} stroke={ink} strokeWidth="3" />
        </g>
      ))}
      <g transform="translate(18 250)">
        <rect width="54" height="36" rx="8" fill="#3c332b" />
        <circle cx="34" cy="18" r="9" fill="#d9c8f0" stroke="#fffaf3" strokeWidth="3" />
        <rect x="8" y="12" width="10" height="8" rx="2" fill="#f6dc8e" />
      </g>
    </Portrait>
  );
}

function AzulArt() {
  return (
    <Portrait background="#f4fafc" label="Illustrated blue-gray dog sitting on a rug">
      <ellipse cx="160" cy="338" rx="108" ry="24" fill="#f3c3cf" stroke={ink} strokeWidth="3" />
      <path d="M78 286c18 8 28-6 34 8" fill="none" stroke="#8eacbf" strokeWidth="10" strokeLinecap="round" />
      <path d="M78 286c18 8 28-6 34 8" fill="none" stroke={ink} strokeWidth="3" />
      <ellipse cx="168" cy="268" rx="70" ry="46" fill="#8eacbf" stroke={ink} strokeWidth="3" />
      <ellipse cx="168" cy="286" rx="36" ry="24" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <circle cx="168" cy="178" r="52" fill="#8eacbf" stroke={ink} strokeWidth="3" />
      <ellipse cx="118" cy="168" rx="16" ry="34" fill="#7e9aab" stroke={ink} strokeWidth="3" />
      <ellipse cx="218" cy="168" rx="16" ry="34" fill="#7e9aab" stroke={ink} strokeWidth="3" />
      <ellipse cx="186" cy="198" rx="28" ry="18" fill="#d7efe4" stroke={ink} strokeWidth="3" />
      <ellipse cx="196" cy="200" rx="10" ry="7" fill={ink} />
      <circle cx="148" cy="168" r="5" fill={ink} />
      <circle cx="176" cy="166" r="5" fill={ink} />
      <path d="M188 208c6 8 4 14-2 16" fill="#f3c3cf" stroke={ink} strokeWidth="3" />
      <path d="M132 250h28M176 252h28" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="128" cy="312" rx="16" ry="10" fill="#7e9aab" stroke={ink} strokeWidth="3" />
      <ellipse cx="208" cy="312" rx="16" ry="10" fill="#7e9aab" stroke={ink} strokeWidth="3" />
      <circle cx="150" cy="232" r="9" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <rect x="236" y="86" width="14" height="64" rx="7" fill="#6f9468" stroke={ink} strokeWidth="3" />
      <ellipse cx="243" cy="82" rx="26" ry="12" fill="#c5dbb8" stroke={ink} strokeWidth="3" />
    </Portrait>
  );
}

function CookingArt() {
  return (
    <Portrait background="#fff6dc" label="Illustrated pot on a stove with herbs and lemon">
      <rect x="40" y="230" width="240" height="120" rx="16" fill="#fffaf3" stroke={ink} strokeWidth="3" />
      <rect x="70" y="258" width="70" height="16" rx="8" fill="#3c332b" />
      <rect x="180" y="258" width="70" height="16" rx="8" fill="#3c332b" />
      <path d="M108 230c0-52 104-52 104 0" fill="#f3c3cf" stroke={ink} strokeWidth="3" />
      <path d="M128 230h64" stroke={ink} strokeWidth="3" />
      <path d="M196 200h46" stroke={ink} strokeWidth="6" strokeLinecap="round" />
      <path d="M140 150c6-28 8-28 10-4M168 142c6-28 8-28 10-4M154 128c4-24 8-22 8 0" fill="none" stroke="#fffaf3" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="86" cy="188" rx="36" ry="14" fill="#e7d3b8" stroke={ink} strokeWidth="3" />
      <path d="M70 188c6-20 10-28 16-18M92 170c4-16 12-16 12 2" fill="#6f9468" stroke={ink} strokeWidth="3" />
      <circle cx="230" cy="176" r="22" fill="#f6dc8e" stroke={ink} strokeWidth="3" />
      <path d="M230 160v32M214 176h32" stroke="#fffaf3" strokeWidth="3" />
    </Portrait>
  );
}
