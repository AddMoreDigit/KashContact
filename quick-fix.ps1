# fix-import-paths.ps1
Write-Host "=== Fixing Import Paths ==="

# 1. First, let's check what packages are actually installed
Write-Host "`n1. Checking installed packages..." -ForegroundColor Yellow

$packages = @("next-themes", "class-variance-authority", "react-day-picker")
foreach ($pkg in $packages) {
    $installed = npm list $pkg --depth=0 2>$null
    if ($installed -like "*$pkg*") {
        Write-Host "  ✓ $pkg is installed" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $pkg is NOT installed - installing..." -ForegroundColor Red
        npm install --save $pkg
    }
}

# 2. Fix all figma import paths
Write-Host "`n2. Fixing figma import paths..." -ForegroundColor Yellow

# Get all files with figma imports from the error list
$filesToFix = @(
    "components/ui/sonner.tsx",
    "components/layout/Logo.tsx",
    "components/layout/Sidebar.tsx",
    "components/SelectedServicesPage.tsx",
    "components/ServiceDetailPage.tsx",
    "components/ui/badge.tsx",
    "components/SelectCampaignDialog.tsx",
    "components/user/ProfilePage.tsx",
    "features/messaging/MessagingPage.tsx",
    "features/contributors/ContributorDetailPage.tsx",
    "features/campaigns/components/LeaveReviewDialog.tsx",
    "features/corporate/components/CorporateSidebar.tsx",
    "components/ui/calendar.tsx"
)

foreach ($file in $filesToFix) {
    if (Test-Path $file) {
        Write-Host "  Fixing $file..." -ForegroundColor Gray
        $content = Get-Content $file -Raw
        
        # Fix different patterns
        # Pattern 1: from 'figma:asset/...'
        $content = $content -replace "from ['\""]figma:asset/", "from '../../imports/figma/asset/"
        # Pattern 2: from "figma:asset/...
        $content = $content -replace 'from ["'']figma:asset/', 'from "../../imports/figma/asset/"'
        # Pattern 3: from 'figma/asset/...' (already fixed but double-check)
        $content = $content -replace "from ['\""]figma/asset/", "from '../../imports/figma/asset/'"
        
        $content | Set-Content $file -Encoding UTF8
    }
}

# 3. Also search for any other files with figma imports
Write-Host "`n3. Searching for other files with figma imports..." -ForegroundColor Yellow

Get-ChildItem -Path . -Recurse -Include *.tsx, *.ts -ErrorAction SilentlyContinue | Where-Object {
    $content = Get-Content $_ -Raw
    $content -match 'from ["'']figma[:/]'
} | ForEach-Object {
    if ($filesToFix -notcontains $_.FullName) {
        Write-Host "  Found in: $($_.Name)" -ForegroundColor Cyan
        $content = Get-Content $_ -Raw
        $newContent = $content -replace 'from ["'']figma[:/]asset/', 'from "../../imports/figma/asset/"'
        $newContent | Set-Content $_
    }
}

# 4. Fix the specific import for next-themes in sonner.tsx
Write-Host "`n4. Fixing next-themes import..." -ForegroundColor Yellow

$sonnerFile = "components/ui/sonner.tsx"
if (Test-Path $sonnerFile) {
    $content = Get-Content $sonnerFile -Raw
    # Make sure next-themes import is correct
    if ($content -match "from ['\""]next-themes@") {
        $content = $content -replace "from ['\""]next-themes@[^'\""]+['\""]", "from 'next-themes'"
        $content | Set-Content $sonnerFile -Encoding UTF8
        Write-Host "  Fixed next-themes import" -ForegroundColor Green
    }
}

# 5. Create a simple alias in vite.config.ts to handle figma:asset
Write-Host "`n5. Updating vite.config.ts..." -ForegroundColor Yellow

if (Test-Path "vite.config.ts") {
    $viteConfig = Get-Content "vite.config.ts" -Raw
    if (-not $viteConfig.Contains("figma:asset")) {
        # Add path import and alias
        $viteConfig = @'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  root: ".",
  resolve: {
    alias: {
      "figma:asset": path.resolve(__dirname, "imports/figma/asset"),
    },
  },
})
'@
        $viteConfig | Set-Content "vite.config.ts" -Encoding UTF8
        Write-Host "  Updated vite.config.ts with alias" -ForegroundColor Green
    }
}

Write-Host "`n=== IMPORT PATHS FIXED ==="
Write-Host "Now run: npm run dev" -ForegroundColor Cyan