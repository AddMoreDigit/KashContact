# 🔧 Troubleshooting Guide

Common issues and their solutions when running the Campaign Management App locally.

---

## 🚫 Installation Issues

### Error: "npm: command not found" or "node: command not found"

**Problem:** Node.js is not installed or not in PATH

**Solution:**
1. Download Node.js from https://nodejs.org/ (v18 or higher)
2. Install it
3. Restart your terminal/VS Code
4. Verify: `node --version` and `npm --version`

---

### Error: "EACCES: permission denied"

**Problem:** npm doesn't have write permissions

**Solution (Mac/Linux):**
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

**Solution (Windows):**
Run terminal as Administrator

---

### Error: "Cannot find module"

**Problem:** Dependencies not installed properly

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install

# Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 🌐 Server Issues

### Error: "Port 3000 is already in use"

**Problem:** Another app is using port 3000

**Solution 1 - Kill the process:**
```bash
# Mac/Linux
npx kill-port 3000

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2 - Use different port:**
```bash
npm run dev -- --port 3001
```

---

### Error: "Failed to fetch" or "Network request failed"

**Problem:** Supabase connection issues

**Solution:**
1. Check your internet connection
2. Verify Supabase credentials in `/utils/supabase/info.tsx`
3. Try accessing: https://nzfmijbcuwnlkdglsmus.supabase.co/functions/v1/make-server-5eb0ec17/health
4. The app will fallback to localStorage if Supabase is unavailable

---

### Browser doesn't open automatically

**Problem:** Auto-open failed

**Solution:**
Manually open: http://localhost:3000

---

### White screen in browser

**Problem:** JavaScript errors or build issues

**Solution:**
1. Open browser console (`F12`)
2. Check for error messages
3. Look for import errors or missing files
4. Clear browser cache (`Ctrl+Shift+Delete`)
5. Hard reload (`Ctrl+Shift+R`)

---

## 💻 Build Issues

### Error: "Cannot find module 'path'" or similar

**Problem:** TypeScript configuration issue

**Solution:**
```bash
# Make sure you have @types packages
npm install --save-dev @types/node
```

---

### Error: "JSX element implicitly has type 'any'"

**Problem:** TypeScript strict mode

**Solution:**
Already configured in `tsconfig.json`. If still occurring:
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run dev
```

---

### Error: "Module not found: Can't resolve 'react'"

**Problem:** React dependencies issue

**Solution:**
```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
```

---

## 🎨 Styling Issues

### Bootstrap styles not loading

**Problem:** Bootstrap CDN not loading or CSS not imported

**Solution:**
1. Check internet connection (Bootstrap loads from CDN)
2. Verify `index.html` has Bootstrap link
3. Check browser console for 404 errors
4. Try clearing cache

---

### Custom styles not applying

**Problem:** CSS not loaded or specificity issues

**Solution:**
1. Verify `import './styles/globals.css'` in `main.tsx`
2. Check browser DevTools → Elements → Styles
3. Use `!important` if Bootstrap overrides your styles
4. Ensure CSS file exists and has no syntax errors

---

## 🗄️ Data/Storage Issues

### Data not persisting

**Problem:** localStorage disabled or cleared

**Solution:**
1. Check if browser allows localStorage
2. Open DevTools → Application → Local Storage
3. Verify data is being saved
4. Check for privacy/incognito mode restrictions

---

### Supabase sync not working

**Problem:** Network or authentication issues

**Solution:**
1. Check browser console for errors
2. Verify Supabase credentials
3. Check network tab in DevTools
4. Data still works via localStorage even if Supabase fails

---

### Cart/campaigns not loading

**Problem:** localStorage data corruption

**Solution:**
```javascript
// Open browser console and run:
localStorage.clear()
// Then refresh page
```

---

## 🔍 TypeScript Errors

### Red squiggly lines everywhere

**Problem:** TypeScript can't find types

**Solution:**
1. Close and reopen VS Code
2. Run: `npm install`
3. Click "Restart TS Server" in VS Code status bar
4. Check `tsconfig.json` exists and is valid

---

### Error: "Cannot use JSX unless..."

**Problem:** JSX not enabled

**Solution:**
Already configured. If still occurring:
1. Verify file has `.tsx` extension (not `.ts`)
2. Check `tsconfig.json` has `"jsx": "react-jsx"`

---

## 🐛 Runtime Errors

### Error: "Cannot read property of undefined"

**Problem:** Accessing data before it loads

**Solution:**
Use optional chaining and nullish coalescing:
```typescript
// Instead of:
const name = user.profile.name

// Use:
const name = user?.profile?.name ?? 'Guest'
```

---

### Error: "Maximum update depth exceeded"

**Problem:** Infinite render loop

**Solution:**
1. Check for setState calls in render
2. Use `useEffect` dependencies properly
3. Add missing dependency array

---

### Error: "Hooks can only be called inside..."

**Problem:** React hooks used incorrectly

**Solution:**
1. Only call hooks at top level of component
2. Don't call hooks inside loops/conditions
3. Only call hooks from React functions

---

## 📱 Browser-Specific Issues

### Works in Chrome but not Firefox/Edge

**Problem:** Browser compatibility

**Solution:**
1. Clear cache in problem browser
2. Check console for specific errors
3. Update browser to latest version
4. Check if localStorage is enabled

---

### Mobile/responsive issues

**Problem:** Layout breaks on small screens

**Solution:**
1. Use browser DevTools → Toggle device toolbar
2. Check Bootstrap breakpoints
3. Test different viewport sizes
4. Add responsive CSS as needed

---

## 🔐 Authentication Issues

### Can't login / stays on login page

**Problem:** Auth state not persisting

**Solution:**
1. Check localStorage for 'auth' key
2. Clear auth data: `localStorage.removeItem('auth')`
3. Try signing up with a new account
4. Check browser console for errors

---

### Session expires immediately

**Problem:** Time/cookie issues

**Solution:**
1. Check system date/time is correct
2. Clear browser cookies
3. Check if third-party cookies are blocked

---

## 🆘 Still Having Issues?

### Diagnostic Steps:

1. **Run verification script:**
   ```bash
   npm run verify
   ```

2. **Check all files exist:**
   - package.json
   - index.html
   - main.tsx
   - App.tsx
   - vite.config.ts

3. **Fresh install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

4. **Check browser console:**
   - Press `F12`
   - Look for red errors
   - Read error messages carefully

5. **Check terminal output:**
   - Look for compilation errors
   - Note any warnings
   - Check for port conflicts

---

## 📊 Debugging Tools

### Browser DevTools (F12)
- **Console**: Error messages
- **Network**: API calls
- **Application**: localStorage data
- **Elements**: HTML/CSS inspection

### VS Code Debugging
- Set breakpoints (click left of line number)
- Press `F5` to start debugging
- Inspect variables and state

### React DevTools
Install browser extension:
- Chrome: https://chrome.google.com/webstore
- Firefox: https://addons.mozilla.org
- Search: "React Developer Tools"

---

## ✅ Quick Health Check

Run these commands to verify everything works:

```bash
# Check Node version
node --version        # Should be v18+

# Check npm version
npm --version        # Should be 9+

# Verify setup
npm run verify

# Install dependencies
npm install

# Start server
npm run dev
```

---

## 📞 Getting More Help

If you've tried everything and still have issues:

1. **Document the error:**
   - Full error message
   - What you were doing
   - Browser/OS version
   - Node.js version

2. **Check documentation:**
   - SETUP_INSTRUCTIONS.md
   - VSCODE_GUIDE.md
   - README.md

3. **Review code:**
   - Check recent changes
   - Compare with working version
   - Use version control (git)

---

## 💡 Prevention Tips

### To avoid future issues:

1. **Keep dependencies updated:**
   ```bash
   npm update
   ```

2. **Use version control:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Regular cleanup:**
   ```bash
   # Weekly
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Backup data:**
   - Export localStorage periodically
   - Keep Supabase as backup
   - Test on different browsers

5. **Monitor console:**
   - Check for warnings
   - Fix errors promptly
   - Keep DevTools open while developing

---

**Happy coding! 🎉**
