@echo off
echo.
echo ========================================
echo   Clear Vite Cache
echo ========================================
echo.

echo [1/3] Clearing Vite cache directory...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo       ✓ Cleared node_modules\.vite
) else (
    echo       - node_modules\.vite not found (already clean)
)

echo [2/3] Clearing dist directory...
if exist "dist" (
    rmdir /s /q "dist"
    echo       ✓ Cleared dist
) else (
    echo       - dist not found (already clean)
)

echo [3/3] Clearing .vite directory...
if exist ".vite" (
    rmdir /s /q ".vite"
    echo       ✓ Cleared .vite
) else (
    echo       - .vite not found (already clean)
)

echo.
echo ========================================
echo   Cache Cleared Successfully!
echo ========================================
echo.
echo Next steps:
echo   1. Restart your dev server with: npm run dev
echo   2. Refresh your browser (Ctrl+Shift+R)
echo.
pause
