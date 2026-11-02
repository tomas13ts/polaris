import { ImageResponse } from "next/og";

// Prerender the generated icon at build time so it works with output: "export"
export const dynamic = "force-static";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

// A north star for the Polaris orbital identity.
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#08120c",
        borderRadius: 14,
        color: "#d5e3c7",
        fontSize: 48,
        fontWeight: 700,
        fontFamily: "sans-serif",
        letterSpacing: -1,
      }}
    >
      <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 1.5 23.7 15.3 38.5 20 23.7 23.7 20 38.5 16.3 23.7 1.5 20 16.3 15.3Z"
          fill="#d5e3c7"
        />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
