import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "nodejs";
export const alt =
  "Prepmate - JAMB CBT, WAEC past questions and exam prep app";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f4f2ff 55%, #ece9ff 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "14px",
            background: "linear-gradient(90deg, #6466f2 0%, #923cf6 100%)",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #6466f2 0%, #923cf6 100%)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            📚
          </div>
          <div
            style={{ fontSize: "52px", fontWeight: 800, color: "#6466f2" }}
          >
            Prepmate
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#0c0c0c",
            maxWidth: "900px",
          }}
        >
          JAMB CBT, WAEC Past Questions &amp; Exam Prep
        </div>

        {/* Subtext */}
        <div
          style={{
            marginTop: "28px",
            fontSize: "30px",
            fontWeight: 500,
            color: "#4c4c4c",
            maxWidth: "880px",
          }}
        >
          Practice offline on Android, iOS, Windows &amp; macOS: study notes,
          novels, syllabus and thousands of questions.
        </div>

        {/* Platform pills */}
        <div style={{ display: "flex", gap: "14px", marginTop: "44px" }}>
          {["Android", "iOS", "Windows", "macOS"].map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1px solid #dde5ed",
                fontSize: "26px",
                fontWeight: 600,
                color: "#262626",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
