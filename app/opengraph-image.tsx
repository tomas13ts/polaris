import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt =
  "Polaris. A new orbit for your business. AI, software and digital commerce.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#050908",
        color: "#ecede6",
        padding: "60px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: -30,
          top: 120,
          width: 550,
          height: 390,
          border: "1px solid #718f69",
          borderRadius: "50%",
          transform: "rotate(-25deg)",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 0,
          top: 140,
          width: 500,
          height: 340,
          border: "1px solid #314e37",
          borderRadius: "50%",
          transform: "rotate(20deg)",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 110,
          top: 195,
          width: 245,
          height: 245,
          border: "2px solid #97b590",
          borderRadius: "50%",
          background: "linear-gradient(135deg,#284a32,#050908 55%)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 34,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#cedfc1",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 40 40">
            <path
              d="M20 1.5 23.7 15.3 38.5 20 23.7 23.7 20 38.5 16.3 23.7 1.5 20 16.3 15.3Z"
              fill="#d5e3c7"
            />
          </svg>
          <span>polaris.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 90,
            letterSpacing: -5,
            lineHeight: 1.05,
            marginTop: 66,
          }}
        >
          <span>A new orbit.</span>
          <span>For your business.</span>
        </div>
        <div
          style={{
            marginTop: 55,
            color: "#9db297",
            fontSize: 17,
            letterSpacing: 3,
          }}
        >
          AI / SOFTWARE / DIGITAL COMMERCE
        </div>
      </div>
    </div>,
    size,
  );
}
