import React from "react";
import * as Icons from "lucide-react";
import { useRelease } from "../hooks/useRelease.js";
import InstallSteps from "./InstallSteps.jsx";

function Icon({ name, size = 22 }) {
  const Cmp = Icons[name] || Icons.Smartphone;
  return <Cmp size={size} />;
}

export default function ReleaseDetail({ app }) {
  const { status, data } = useRelease(app);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 18,
        }}
      >
        <span
          style={{
            width: 56,
            height: 56,
            flexShrink: 0,
            borderRadius: 15,
            background: `linear-gradient(155deg, ${app.accent}, ${app.accent2})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#201530",
          }}
        >
          <Icon name={app.icon} size={26} />
        </span>
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: app.accent,
              marginBottom: 4,
            }}
          >
            Android APK · direct download
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 38px)",
              fontWeight: 700,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {app.name}
          </h1>
        </div>
      </div>

      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--muted)",
          maxWidth: "52ch",
          margin: "0 0 26px",
        }}
      >
        {app.description}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <a
          href={data?.apkUrl || app.fallbackApkUrl}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: app.accent,
            color: "#201530",
            fontWeight: 700,
            fontSize: 15,
            padding: "14px 22px",
            borderRadius: 12,
            textDecoration: "none",
          }}
        >
          <Icons.Download size={18} />
          {status === "loading"
            ? "Download APK"
            : `Download APK · v${data.versionName}`}
        </a>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--muted)" }}>
          {status !== "loading" && data.sizeMb ? `${data.sizeMb} MB · ` : ""}
          {status !== "loading" && data.minSdk ? data.minSdk : "Android 8.0+"}
        </div>
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12.5,
          color: "var(--muted)",
          marginTop: 14,
        }}
      >
        {status === "loading" && (
          <>
            <Icons.RefreshCw size={13} className="spin" /> Checking latest version…
          </>
        )}
        {status === "live" && (
          <>
            <Icons.ShieldCheck size={13} /> Live from update feed · build{" "}
            {data.versionCode}
          </>
        )}
        {status === "fallback" && (
          <>
            <Icons.AlertTriangle size={13} /> Update feed unreachable — point
            apps.config.js at a real update.json
          </>
        )}
      </div>

      <InstallSteps />

      <div style={{ marginTop: 40 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 600,
            margin: "0 0 6px",
          }}
        >
          What's changed
        </h3>
        <div>
          {(data?.changelog || []).map((entry, idx) => (
            <div
              key={`${entry.version}-${idx}`}
              style={{
                display: "grid",
                gridTemplateColumns: "84px 1fr",
                gap: 20,
                padding: "20px 0",
                borderTop: "1px solid var(--hairline)",
              }}
              className="changelog-row"
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--muted)",
                  fontSize: 13,
                  paddingTop: 3,
                }}
              >
                {entry.date}
                <b
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    color: "var(--text)",
                    fontSize: 19,
                    fontWeight: 600,
                  }}
                >
                  v{entry.version}
                </b>
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {entry.notes.map((note, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      fontSize: 14.5,
                      lineHeight: 1.5,
                    }}
                  >
                    <Icons.CheckCircle2
                      size={15}
                      style={{ flexShrink: 0, marginTop: 3, color: app.accent }}
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .changelog-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
