# 🔧 Quick Fix: Import Error

## Error
```
Failed to resolve import "./assets/placeholder.png" from "App.tsx"
```

---

## ⚡ Quick Fix (30 seconds)

### Windows
```bash
clear-cache.bat
npm run dev
```

### Mac/Linux
```bash
chmod +x clear-cache.sh
./clear-cache.sh
npm run dev
```

---

## 📋 What This Does

1. ✅ Deletes `.vite` cache
2. ✅ Deletes `dist` folder
3. ✅ Clears Vite build artifacts
4. ✅ Forces fresh build

---

## 🎯 Alternative Manual Fix

**If scripts don't work:**

### Windows
```bash
rmdir /s /q node_modules\.vite
rmdir /s /q dist
rmdir /s /q .vite
npm run dev
```

### Mac/Linux
```bash
rm -rf node_modules/.vite dist .vite
npm run dev
```

---

## ✅ Verify It Worked

After running the fix:

1. **Dev server starts** → No errors in terminal
2. **Browser opens** → http://localhost:3000
3. **No console errors** → Press F12, check Console tab
4. **App loads** → You see the UI

---

## 🚨 If Still Broken

### Nuclear Option (Full Reinstall)

**Windows:**
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
npm run dev
```

**Mac/Linux:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Time: 2-3 minutes

---

## 💡 Why This Error Happens

**Root Cause:** Vite cached an old version of App.tsx that tried to import from `./assets/placeholder.png` (which doesn't exist).

**Solution:** Clear cache so Vite rebuilds from current files.

---

## 📖 More Details

See full troubleshooting guide: **[CLEAR_CACHE_AND_FIX.md](./CLEAR_CACHE_AND_FIX.md)**

---

**🎯 TL;DR:** Run `clear-cache.bat` (Windows) or `./clear-cache.sh` (Mac/Linux), then `npm run dev`
