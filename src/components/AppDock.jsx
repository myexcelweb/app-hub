import React from "react";
import * as Icons from "lucide-react";
import { useRelease } from "../hooks/useRelease.js";

function DockIcon({ name, size = 20 }) {
  const Cmp = Icons[name] || Icons.Smartphone;
  return <Cmp size={size} />;
}

function DockItem({ app, active, onSelect }) {
  const { status, data } = useRelease(app);

  return (
    <button
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "left",
        background: active ? "var(--panel-raised)" : "transparent",
        border: "1px solid",
        borderColor: active ? "var(--hairline)" : "transparent",
        borderRadius: 14,
        padding: "10px 12px",
        cursor: "pointer",
        transition: "background 0.15s ease, border-color 0.15s ease",
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 11,
          background: `linear-gradient(155deg, ${app.accent}, ${app.accent2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#201530",
        }}
      >
        <DockIcon name={app.icon} />
      </span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span
          style={{
            display: "block",
            fontWeight: 600,
            fontSize: 14.5,
            color: "var(--text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {app.name}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--muted)",
            marginTop: 2,
          }}
        >
          {status === "loading" ? "checking…" : `v${data.versionName}`}
        </span>
      </span>
    </button>
  );
}

export default function AppDock({ apps, activeId, onSelect }) {
  return (
    <nav
      className="app-dock"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--hairline)",
        borderRadius: 18,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        height: "fit-content",
        position: "sticky",
        top: 24,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          padding: "6px 12px 10px",
        }}
      >
        {apps.length} app{apps.length === 1 ? "" : "s"}
      </div>
      {apps.map((app) => (
        <DockItem
          key={app.id}
          app={app}
          active={app.id === activeId}
          onSelect={() => onSelect(app.id)}
        />
      ))}
    </nav>
  );
}
