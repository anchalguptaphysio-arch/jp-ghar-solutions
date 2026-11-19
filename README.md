# JP Ghar Solutions

## Run locally

Requires Node.js 20.19+.

```sh
npm install
npm run dev
```

Vite prints the local URL when the development server starts.

## Production build

```sh
npm run build
npm run preview
```

The static production site is written to `dist/`. Tailwind CSS, fonts, and icons are bundled locally. Service gallery images are hosted by Unsplash and require an internet connection; the gallery displays a styled fallback if an image cannot load.
