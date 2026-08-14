<#
  push-to-github.ps1
  Initializes git (if needed), commits everything in this folder,
  and pushes it to https://github.com/myexcelweb/app-hub on branch "main".

  USAGE:
    1. Open PowerShell in this project folder (app-library/)
    2. Run:  .\push-to-github.ps1
    3. When prompted, sign in to GitHub (browser popup or token)

  After the first push, connect the repo in Netlify:
    Netlify → Add new site → Import from GitHub → myexcelweb/app-hub
    Build command: npm run build
    Publish directory: dist
  (netlify.toml already sets this automatically.)
#>

param(
    [string]$RepoUrl = "https://github.com/myexcelweb/app-hub.git",
    [string]$Branch  = "main",
    [string]$Message = "Deploy: App Library site"
)

$ErrorActionPreference = "Stop"

function Write-Step($text) {
    Write-Host ""
    Write-Host "==> $text" -ForegroundColor Cyan
}

# 1. Check git is installed
try {
    git --version | Out-Null
} catch {
    Write-Host "Git is not installed or not on PATH. Install it from https://git-scm.com/downloads" -ForegroundColor Red
    exit 1
}

# 2. Init repo if not already one
if (-not (Test-Path ".git")) {
    Write-Step "Initializing git repository"
    git init
} else {
    Write-Step "Git repository already initialized"
}

# 3. Make sure branch is named correctly
Write-Step "Setting branch to '$Branch'"
git branch -M $Branch

# 4. Stage and commit
Write-Step "Staging files"
git add .

Write-Step "Committing"
$hasChanges = git status --porcelain
if ($hasChanges) {
    git commit -m "$Message"
} else {
    Write-Host "Nothing new to commit — continuing to push." -ForegroundColor Yellow
}

# 5. Set/replace remote
Write-Step "Setting remote 'origin' to $RepoUrl"
$remoteExists = git remote | Select-String -Pattern "^origin$"
if ($remoteExists) {
    git remote set-url origin $RepoUrl
} else {
    git remote add origin $RepoUrl
}

# 6. Push
Write-Step "Pushing to $RepoUrl ($Branch)"
git push -u origin $Branch

Write-Host ""
Write-Host "Done. Repo: https://github.com/myexcelweb/app-hub" -ForegroundColor Green
Write-Host "Now connect it in Netlify: Add new site -> Import from GitHub -> myexcelweb/app-hub" -ForegroundColor Green
