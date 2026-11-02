# Polaris — A new orbit

A dark, scroll-driven website for Polaris Enterprises Group LLC. Built with Next.js, React and Three.js, exported as static assets for the existing Netlify project.

## Local development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
```

The static output is `out/`. `netlify.toml` declares the build command and publish directory. The existing Netlify project deploys the `main` branch.

## Experience

- One original GPU particle scene morphs through a galaxy, connected AI agents, software modules and a storefront.
- Geometry is generated locally: no third-party 3D embeds, models, textures or video downloads.
- The scene adapts particle count and rendering resolution for mobile, suspends rendering off-screen or in a hidden tab, respects reduced motion, and includes an animation pause control.
- A CSS illustration remains visible if WebGL is unavailable. All business content and navigation work independently of the 3D scene.
- Service tabs support keyboard navigation; enquiries use a native accessible dialog with validated inputs.
- The enquiry form opens a prefilled email draft to `info@polaris-enterprises.com`. The visitor sends it from their email app. No server submission or simulated success message is used.

## Main files

- `components/polaris-experience.tsx`: content, navigation, service explorer and enquiry dialog.
- `components/orbit-scene.tsx`: procedural geometry, GPU morphing, rendering and lifecycle cleanup.
- `app/globals.css`: responsive visual identity and motion preferences.
- `app/layout.tsx`, `app/icon.tsx`, `app/opengraph-image.tsx`: metadata and brand assets.

The previous site remains in Git history. The previous production revision before this redesign was `25db14c34f97e4d121dffb1628ade10f5f4b51d3`.
