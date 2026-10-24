import {
  CanvasTexture,
  DataTexture,
  NearestFilter,
  RedFormat,
  SRGBColorSpace,
} from "three";

const INK = "#3c332b";

export const fontsReady: Promise<unknown> =
  typeof document === "undefined" ? Promise.resolve() : document.fonts.ready;

function displayFamily(): string {
  const family = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-fredoka")
    .trim();
  return family ? `${family}, ui-rounded, sans-serif` : "ui-rounded, sans-serif";
}

/** Three hard light bands give the meshToonMaterial its cel-shaded steps. */
export function createToonGradient(): DataTexture {
  const texture = new DataTexture(new Uint8Array([110, 190, 255]), 3, 1, RedFormat);
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

export function createLidLabel(short: string, name: string, accent: string): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const family = displayFamily();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = INK;
    ctx.font = `600 132px ${family}`;
    ctx.fillText(short, 128, 196);
    ctx.font = `700 34px ${family}`;
    ctx.fillText(name.toUpperCase().split("").join(" "), 128, 300);

    ctx.lineWidth = 7;
    ctx.strokeStyle = INK;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.roundRect(78, 360, 100, 40, 20);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(128, 360);
    ctx.lineTo(128, 400);
    ctx.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function createPlateLabel(text: string): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = INK;
    ctx.font = `600 72px ${displayFamily()}`;
    ctx.fillText(text, 512, 68);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
