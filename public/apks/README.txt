Use STABLE, version-less filenames — the Android app hardcodes this URL,
so the filename must never change between releases:
  Calendar-Plus.apk
  Birthday-Pro.apk

Every time you release a new version, just overwrite these same files
with the new build. Don't rename them.

(Optional) You can also keep a dated/versioned copy alongside for your
own archive, e.g. Calendar-Plus-v1.4.apk — just don't link to it from
apkUrl or the Android app.

The "apkUrl" field in each app's update.json (in /public/update/) and
the Android app's UpdateChecker.kt should both point at:
  https://app-store-hp.netlify.app/apks/Calendar-Plus.apk
