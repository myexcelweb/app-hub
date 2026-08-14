import { useEffect, useState } from "react";

const FALLBACK_CHANGELOG = [
  {
    version: "—",
    date: "",
    notes: ["No changelog available yet."],
  },
];

/**
 * Fetches an app's update.json and normalizes it, without ever
 * throwing to the UI — if the fetch fails, `status` becomes "fallback"
 * and the app still renders with whatever data is available.
 */
export function useRelease(app) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null });

    fetch(app.updateJsonUrl, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setState({
          status: "live",
          data: {
            versionName: json.versionName ?? "?",
            versionCode: json.versionCode ?? 0,
            apkUrl: json.apkUrl || app.fallbackApkUrl,
            sizeMb: json.sizeMb,
            minSdk: json.minSdk,
            releasedOn: json.releasedOn,
            changelog: json.changelog?.length ? json.changelog : FALLBACK_CHANGELOG,
          },
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({
          status: "fallback",
          data: {
            versionName: "?",
            versionCode: 0,
            apkUrl: app.fallbackApkUrl,
            sizeMb: undefined,
            minSdk: undefined,
            releasedOn: undefined,
            changelog: FALLBACK_CHANGELOG,
          },
        });
      });

    return () => {
      cancelled = true;
    };
  }, [app.updateJsonUrl, app.fallbackApkUrl]);

  return state;
}
