import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits a fully static site to ./out,
  // which Cloudflare serves directly (see wrangler.jsonc). The site has no
  // server runtime — every route is prerendered.
  output: "export",
  // next/image optimization needs a server; disable it for static export.
  // (This project uses lucide-react icons and a Spline canvas, no next/image.)
  images: { unoptimized: true },
};

export default nextConfig;
