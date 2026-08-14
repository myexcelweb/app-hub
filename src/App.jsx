import React, { useState } from "react";
import { Github, ArrowUpRight, Layers } from "lucide-react";
import { APPS } from "./apps.config.js";
import AppDock from "./components/AppDock.jsx";
import ReleaseDetail from "./components/ReleaseDetail.jsx";

export default function App() {
  const [activeId, setActiveId] = useState(APPS[0]?.id);
  const activeApp = APPS.find((a) => a.id === activeId) || APPS[0];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "28px 24px 80px" }}>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 0 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 19,
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "linear-gradient(155deg, #F5B942, #FF6F59)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#201530",
              }}
            >
              <Layers size={16} />
            </span>
            App Library
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <Github size={15} /> Source <ArrowUpRight size={13} />
          </a>
        </nav>

        <div
          className="app-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          <AppDock apps={APPS} activeId={activeApp?.id} onSelect={setActiveId} />
          {activeApp ? (
            <ReleaseDetail app={activeApp} />
          ) : (
            <div style={{ color: "var(--muted)" }}>
              Add an app to src/apps.config.js to get started.
            </div>
          )}
        </div>

        <footer
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid var(--hairline)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          <span>App Library · built for Android</span>
          <span>No accounts required · no ads · no tracking</span>
        </footer>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .app-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
