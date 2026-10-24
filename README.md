# nicheleap

A weekly pill-planner portfolio for [nicheleap.com](https://nicheleap.com). Sunday through Saturday each open into a project: education, The Memory Thread, Wristed, HealthScout, Fluxo, Peachy Clean, and a Saturday about page.

The page is a cozy, cel-shaded box. Click a lid and it swings open, pastel pills spill out, and a project card slides up. Click outside, press Escape, or pick another day to close it.

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
