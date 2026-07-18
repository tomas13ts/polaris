import { ImageResponse } from 'next/og'

// Prerender the generated icon at build time so it works with output: "export"
export const dynamic = 'force-static'

export const size = {
  width: 64,
  height: 64,
}
export const contentType = 'image/png'

// Favicon placeholder com as iniciais "PE" — substituir por um logótipo
// definitivo da Polaris Enterprises quando existir.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
          borderRadius: 14,
          color: '#ffffff',
          fontSize: 30,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          letterSpacing: -1,
        }}
      >
        PE
      </div>
    ),
    {
      ...size,
    }
  )
}
