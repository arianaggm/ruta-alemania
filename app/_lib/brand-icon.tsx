import { ImageResponse } from "next/og";

export function brandIcon(size: number): ImageResponse {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: Math.round(size * 0.2), backgroundColor: "#005F9E", color: "#FFF5E8", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: Math.round(size * 0.72), lineHeight: 1 }}>
      b
    </div>,
    { width: size, height: size },
  );
}
