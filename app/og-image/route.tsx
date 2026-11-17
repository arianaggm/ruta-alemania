import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#FFF5E8", padding: "64px 76px", color: "#005F9E" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 116, fontWeight: 700, letterSpacing: -9, lineHeight: 1 }}>bej</span>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ width: 18, height: 18, borderRadius: 18, backgroundColor: "#E4007C" }} />
          <span style={{ width: 18, height: 18, borderRadius: 18, backgroundColor: "#D84315" }} />
          <span style={{ width: 18, height: 18, borderRadius: 18, backgroundColor: "#8E0038" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>Cada camino comienza con un paso.</span>
        <span style={{ marginTop: 26, fontSize: 30, lineHeight: 1.35, color: "#234A62" }}>Guías, becas y herramientas para estudiar en el extranjero.</span>
      </div>
      <div style={{ width: "100%", height: 8, display: "flex", backgroundColor: "#005F9E" }} />
    </div>,
    { width: 1200, height: 630 },
  );
}
