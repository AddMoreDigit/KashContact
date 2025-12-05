# 💻 VS Code Quick Guide for Your Project

## 🎯 Starting Your App

### Method 1: Using Tasks (Easiest)
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Run Task"
3. Select "🚀 Start Dev Server"
4. Your app will open at http://localhost:3000

### Method 2: Using Terminal
1. Press `Ctrl+~` (or `Cmd+~` on Mac) to open terminal
2. Type: `npm run dev`
3. Press Enter

### Method 3: Using Debug (F5)
1. Press `F5` to start debugging
2. Choose "🌐 Launch Chrome" or "🌐 Launch Edge"
3. App opens with debugger attached

---

## ⌨️ Essential Keyboard Shortcuts

### General
- `Ctrl+~` - Toggle Terminal
- `Ctrl+B` - Toggle Sidebar
- `Ctrl+Shift+E` - Explorer
- `Ctrl+Shift+F` - Search in files
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+P` - Command Palette

### Editing
- `Alt+Up/Down` - Move line up/down
- `Shift+Alt+Up/Down` - Copy line up/down
- `Ctrl+D` - Select next occurrence
- `Ctrl+Shift+L` - Select all occurrences
- `Ctrl+/` - Toggle comment
- `Alt+Z` - Toggle word wrap

### Navigation
- `Ctrl+Click` - Go to definition
- `Alt+Left/Right` - Navigate back/forward
- `Ctrl+G` - Go to line
- `Ctrl+Tab` - Switch between open files

### Multi-Cursor
- `Alt+Click` - Add cursor
- `Ctrl+Alt+Up/Down` - Add cursor above/below
- `Ctrl+Shift+L` - Add cursor to all selections

---

## 🛠️ Available Tasks

Press `Ctrl+Shift+P` → "Run Task" → Select:

- **🚀 Start Dev Server** - Start development (default)
- **📦 Install Dependencies** - Run npm install
- **🏗️ Build Production** - Build for deployment
- **👀 Preview Production** - Test production build
- **🔍 Lint Code** - Check code quality
- **🧹 Clean Install** - Fresh install of dependencies

---

## 📁 Quick File Navigation

Use `Ctrl+P` and type:

### Pages
- `App.tsx` - Main app component
- `main.tsx` - Entry point
- `index.html` - HTML template

### User Pages
- `user/Dashboard` - User dashboard
- `user/Profile` - User profile
- `features/campaigns/` - Campaign pages

### Vendor Pages
- `vendor/Dashboard` - Vendor dashboard
- `vendor/Services` - Vendor services
- `features/vendor/` - Vendor features

### Corporate Pages
- `corporate/Dashboard` - Corporate dashboard
- `corporate/Campaigns` - Corporate campaigns
- `features/corporate/` - Corporate features

### Utilities
- `utils/hybridStorage.ts` - Hybrid storage system
- `utils/serviceStorage.ts` - Service provider data
- `styles/globals.css` - Global styles

---

## 🐛 Debugging Tips

### Browser DevTools
1. App opens automatically
2. Press `F12` to open DevTools
3. Check Console for errors
4. Network tab for API calls

### VS Code Debugger
1. Set breakpoints (click left of line number)
2. Press `F5` to start debugging
3. Use Debug panel on left sidebar
4. Inspect variables and call stack

### Common Issues

**Port in use:**
```bash
# In terminal
npx kill-port 3000
```

**Module errors:**
```bash
# In terminal
npm install
```

**Cache issues:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🎨 Extensions to Install

Already recommended in your project:
1. **ESLint** - Code quality
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense**
4. **Auto Rename Tag**
5. **React Snippets**
6. **Path Intellisense**

Install by clicking the Extensions icon (`Ctrl+Shift+X`) or when prompted.

---

## 💡 Pro Tips

### Search Across All Files
- `Ctrl+Shift+F` - Search
- `Ctrl+Shift+H` - Find and replace

### Split Editor
- `Ctrl+\` - Split editor
- `Ctrl+1/2/3` - Focus different editor groups

### Zen Mode (Distraction-free)
- `Ctrl+K Z` - Toggle Zen Mode
- Press `Esc` twice to exit

### Toggle Terminal Size
- Drag terminal border up/down
- `Ctrl+~` to toggle visibility

### Multiple Terminals
- Click `+` in terminal panel
- Or `Ctrl+Shift+~` to create new terminal

---

## 📊 Viewing Your App Data

### Browser Console
1. Open app in browser
2. Press `F12`
3. Go to Console tab
4. Run commands:

```javascript
// View localStorage data
localStorage.getItem('campaigns')
localStorage.getItem('userProfile')
localStorage.getItem('cart')

// Clear localStorage
localStorage.clear()

// Check Supabase connection
fetch('https://nzfmijbcuwnlkdglsmus.supabase.co/functions/v1/make-server-5eb0ec17/health')
  .then(r => r.json())
  .then(console.log)
```

### Application Tab (DevTools)
1. Open DevTools (`F12`)
2. Go to "Application" tab
3. Left sidebar → Storage → Local Storage
4. View/edit data directly

---

## 🔄 Live Reload

Your app automatically reloads when you save files:
- Save any `.tsx` file - instant reload
- Save `.css` file - instant style update
- Terminal shows "page reload" message

---

## 📝 Git Integration (Optional)

### VS Code Git Features
- `Ctrl+Shift+G` - Open Source Control
- View changes, stage files, commit
- Sync with remote repository

### Terminal Git Commands
```bash
git status              # Check status
git add .              # Stage all changes
git commit -m "message" # Commit changes
git push               # Push to remote
```

---

## 🚀 Ready to Code!

**Quick Start Checklist:**
- [ ] Installed Node.js
- [ ] Ran `npm install`
- [ ] Started server with `npm run dev`
- [ ] App opened at http://localhost:3000
- [ ] Installed recommended extensions

**You're all set! Happy coding! 🎉**

Need help? Check:
- `SETUP_INSTRUCTIONS.md` - Full setup guide
- `QUICK_SETUP.md` - 5-minute guide
- `README.md` - Project overview
