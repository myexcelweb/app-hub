# App Library

A single website that lists every Android app you ship (Birthday Pro, Calendar
Plus, and anything you add later), each with its own live version check and
direct APK download — no Play Store needed.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL. Vite hot-reloads as you edit.

## Build for deployment

```bash
npm run build
```

This outputs a static site to `dist/`. Deploy `dist/` to Netlify (drag-and-drop
the folder onto app.netlify.com, or connect the repo and set the build command
to `npm run build` and publish directory to `dist`).

## Add or edit an app

Everything about which apps show up lives in **`src/apps.config.js`**. To add
a third app, copy one of the existing objects in the `APPS` array and change:

- `id` — used internally, must be unique
- `name`, `tagline`, `description` — shown on the page
- `icon` — any icon name from [lucide-react](https://lucide.dev/icons/)
- `accent`, `accent2` — the two colors used for that app's icon tile
- `updateJsonUrl` — where this app's `update.json` lives
- `fallbackApkUrl` — used only if the update feed can't be reached

Nothing else needs to change — the dock on the left and the detail pane both
render from this list automatically.

## The `update.json` format

Each app has its own JSON file (see `public/update/*.json` for working
examples). Shape:

```json
{
  "versionName": "1.4",
  "versionCode": 14,
  "apkUrl": "https://YOUR-SITE.netlify.app/apks/Calendar-Plus-v1.4.apk",
  "sizeMb": 6.8,
  "minSdk": "Android 8.0+",
  "releasedOn": "2026-08-01",
  "changelog": [
    { "version": "1.4", "date": "Aug 1", "notes": ["Faster update check", "Bug fixes"] }
  ]
}
```

This is the same file format your Android app's own update checker reads —
so releasing a new version only ever means:

1. Build the new APK
2. Drop it in `public/apks/`
3. Bump `versionName` / `versionCode` in that app's `update.json`
4. Push — Netlify redeploys, the website *and* every installed copy of the
   app both see the new version automatically.

## Folder structure

```
app-library/
├── public/
│   ├── apks/                 ← put your .apk files here
│   └── update/
│       ├── calendar-plus.json
│       └── birthday-pro.json
├── src/
│   ├── apps.config.js        ← the list of apps (edit this to add/change apps)
│   ├── App.jsx                ← page layout
│   ├── index.css
│   ├── main.jsx
│   ├── components/
│   │   ├── AppDock.jsx        ← left-side app switcher
│   │   ├── ReleaseDetail.jsx  ← download button, changelog, status
│   │   └── InstallSteps.jsx   ← "how to sideload" instructions
│   └── hooks/
│       └── useRelease.js      ← fetches + normalizes one app's update.json
├── index.html
├── package.json
└── vite.config.js
```

## About the "auto popup asking for update" on Android

That part lives in your **Android app**, not this website — the website only
hosts the files the app checks against. The website is complete and ready to
deploy on its own; the Android-side `UpdateChecker.kt` (which reads this same
`update.json`, compares `versionCode`, and shows the Update Available dialog
in-app) is a separate, small addition to each app's Kotlin project. Ask for it
whenever you're ready and it can be wired up to point at exactly these JSON
files.
