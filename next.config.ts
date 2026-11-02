import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits a fully static site to ./out,
  // which Netlify serves directly (see netlify.toml). The site has no
  // server runtime — every route is prerendered.
  output: "export",
  // next/image optimization needs a server; disable it for static export.
  // The procedural Three.js scene does not need an image optimization server.
  images: { unoptimized: true },
};

export default nextConfig;
