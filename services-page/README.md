# Services Page (React)

Scroll-driven, animated Services experience for Vertex Tech Io. Built with React, Tailwind CSS, and Framer Motion.

## Develop

```bash
npm install
npm run dev
```

## Build & deploy into Aivora

1. Build: `npm run build`
2. Copy `dist/assets/services-app/*` to `Aivora/assets/services-app/`
3. Update `Aivora/service.html`: set the `<link rel="stylesheet">` and `<script type="module">` `href`/`src` to the new hashed filenames from `dist/index.html` (or replace `service.html` with the built `dist/index.html` and adjust favicon/paths).

Service names and descriptions are defined in `src/data/services.js` and must not be changed per requirements.
