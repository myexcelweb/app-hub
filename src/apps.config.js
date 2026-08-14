// ─────────────────────────────────────────────────────────────────────────
// Add a new app by adding another object to this array.
// Nothing else in the project needs to change — the UI reads this list.
//
// Each app's `updateJsonUrl` should point at a JSON file shaped like:
// {
//   "versionName": "1.4",
//   "versionCode": 14,
//   "apkUrl": "https://app-store-hp.netlify.app/apks/Calendar-Plus-v1.4.apk",
//   "sizeMb": 6.8,
//   "minSdk": "Android 8.0+",
//   "releasedOn": "2026-08-01",
//   "changelog": [
//     { "version": "1.4", "date": "Aug 1", "notes": ["Faster update check", "Bug fixes"] }
//   ]
// }
// ─────────────────────────────────────────────────────────────────────────

export const APPS = [
  {
    id: "calendar-plus",
    name: "Calendar Plus",
    tagline: "Never miss a birthday again.",
    description:
      "Reminds you before the day arrives, not on it. Import contacts, set gift notes, get a nudge every year.",
    icon: "CalendarDays",
    accent: "#F5B942",
    accent2: "#FF6F59",
    updateJsonUrl: "https://app-store-hp.netlify.app/update/calendar-plus.json",
    fallbackApkUrl: "https://app-store-hp.netlify.app/apks/Calendar-Plus-v1.4.apk",
  },
  {
    id: "birthday-pro",
    name: "Birthday Pro",
    tagline: "Birthdays, handled properly.",
    description:
      "A dedicated birthday tracker with countdowns, gift ideas, and yearly recap cards for the people you care about.",
    icon: "PartyPopper",
    accent: "#FF4FA3",
    accent2: "#2FD9C4",
    updateJsonUrl: "https://app-store-hp.netlify.app/update/birthday-pro.json",
    fallbackApkUrl: "https://app-store-hp.netlify.app/apks/Birthday-Pro-v2.1.apk",
  },

  // Example of a third app — copy this block and edit to add more:
  // {
  //   id: "your-next-app",
  //   name: "Your Next App",
  //   tagline: "One line description.",
  //   description: "A couple more sentences about what it does.",
  //   icon: "Smartphone",       // any icon name from lucide-react
  //   accent: "#7C9EFF",
  //   accent2: "#4CD3C2",
  //   updateJsonUrl: "https://app-store-hp.netlify.app/update/your-next-app.json",
  //   fallbackApkUrl: "https://app-store-hp.netlify.app/download/your-next-app",
  // },
];
