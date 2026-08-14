import React from "react";

const STEPS = [
  {
    title: "Allow this source",
    body: "When the download finishes, Android will ask to allow installs from your browser. Tap Settings, then turn it on for this app only.",
  },
  {
    title: "Open the APK",
    body: "Open the downloaded file from your notification shade or Downloads folder, then tap Install.",
  },
  {
    title: "Stay current automatically",
    body: "The app checks for new versions on its own and will let you know right inside the app when one is ready.",
  },
];

export default function InstallSteps() {
  return (
    <div style={{ marginTop: 40 }}>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 600,
          margin: "0 0 18px",
        }}
      >
        Installing from outside the Play Store
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
        }}
        className="install-steps-grid"
      >
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            style={{
              background: "var(--panel)",
              border: "1px solid var(--hairline)",
              borderRadius: 14,
              padding: "18px 18px 20px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12.5,
                color: "var(--muted)",
                marginBottom: 8,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 6 }}>
              {step.title}
            </div>
            <div
              style={{
                fontSize: 13.3,
                color: "var(--muted)",
                lineHeight: 1.55,
              }}
            >
              {step.body}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 720px) {
          .install-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
