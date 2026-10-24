# nicheleap

A weekly pill-planner portfolio for [nicheleap.com](https://nicheleap.com). Sunday through Saturday each open into a project: education, The Memory Thread, Wristed, HealthScout, Fluxo, Peachy Clean, and a Saturday about page.

The pill box is a floating 3D scene built with React Three Fiber and drei. It uses toon-shaded pastel lids, ink outlines, and a soft contact shadow. Drag to spin it within a limited arc, scroll or pinch to zoom, and hover a lid to lift it. Click a lid and it hinges open, pills spill out, and that day's card slides into the panel below. Click empty space, press Escape, or pick another day to close it. The day chips under the box do the same thing from the keyboard.

| Day | Lid | Opens |
| --- | --- | --- |
| Sunday | sage | Education & resume |
| Monday | lavender | The Memory Thread |
| Tuesday | peach | Wristed |
| Wednesday | sky blue | HealthScout |
| Thursday | rose | Fluxo |
| Friday | butter cream | Peachy Clean |
| Saturday | mint | About me |

The scene lives in [`components/pill-box-3d`](components/pill-box-3d). Browsers without WebGL get the flat illustrated planner instead. Reduced-motion settings stop the idle float and make lid changes instant.

## Run it

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:4721](http://127.0.0.1:4721).

```bash
npm run lint
npm run build
```

## Swap a project

All copy, links, colors, and images live in [`data/projects.ts`](data/projects.ts).

- `screenshot` is a path in `public/` or a remote image URL. Remove it to show the illustrated stand-in.
- `theme` recolors that day's lid, well, and pills.
- `liveUrl` turns on the visit link and the live-metadata panel.
- Saturday gallery tiles use `image` the same way. Leave it unset to keep the illustration.
- Peachy Clean has its own warm cream-and-sage card (`components/peachy-clean-card.tsx`), with brief and palette in [`data/peachy-clean.ts`](data/peachy-clean.ts).
- Fluxo has its own graphite-and-turquoise card (`components/fluxo-card.tsx`) with an illustrative schedule-recovery panel and a collapsible case study. Copy, projections, and stack live in [`data/fluxo.ts`](data/fluxo.ts).
- HealthScout has its own clinical emerald card (`components/healthscout-card.tsx`), with copy and stack in [`data/healthscout.ts`](data/healthscout.ts).
- The Memory Thread has its own candlelit card (`components/memory-thread-card.tsx`), with copy, stats, and stack in [`data/memory-thread.ts`](data/memory-thread.ts).
- Wristed has its own dark, on-brand card (`components/wristed-card.tsx`). Its colors, case-study copy, and stack list live in [`data/wristed.ts`](data/wristed.ts).

## Live metadata

`GET` or `POST` `/api/scrape` reads public Open Graph tags and returns pastel brand tokens.

```bash
curl "http://127.0.0.1:4721/api/scrape?url=https://thememorythread.org"
```

```bash
curl -X POST http://127.0.0.1:4721/api/scrape \
  -H "content-type: application/json" \
  -d '{"url":"https://wristed.app"}'
```

The route only fetches public `http` and `https` pages. It refuses localhost, link-local, and private addresses, follows a few redirects, and caps the response size. Cards keep the curated copy in `data/projects.ts`. The live panel can swap in the page's preview image without rewriting that file.

Opening Monday, Tuesday, or Friday fetches that project's live page once and caches it in the browser session.
