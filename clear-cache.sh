#!/bin/bash

echo ""
echo "========================================"
echo "  Clear Vite Cache"
echo "========================================"
echo ""

echo "[1/3] Clearing Vite cache directory..."
if [ -d "node_modules/.vite" ]; then
    rm -rf node_modules/.vite
    echo "      ✓ Cleared node_modules/.vite"
else
    echo "      - node_modules/.vite not found (already clean)"
fi

echo "[2/3] Clearing dist directory..."
if [ -d "dist" ]; then
    rm -rf dist
    echo "      ✓ Cleared dist"
else
    echo "      - dist not found (already clean)"
fi

echo "[3/3] Clearing .vite directory..."
if [ -d ".vite" ]; then
    rm -rf .vite
    echo "      ✓ Cleared .vite"
else
    echo "      - .vite not found (already clean)"
fi

echo ""
echo "========================================"
echo "  Cache Cleared Successfully!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Restart your dev server with: npm run dev"
echo "  2. Refresh your browser (Ctrl+Shift+R)"
echo ""
