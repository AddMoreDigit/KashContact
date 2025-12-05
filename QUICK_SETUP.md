# ⚡ Quick Setup (5 Minutes)

## Step 1: Install Node.js
Download and install from: https://nodejs.org/ (v18 or higher)

## Step 2: Open in VS Code
```bash
cd path/to/your/project
code .
```

## Step 3: Install Dependencies
Open terminal in VS Code (`Ctrl + ~`) and run:
```bash
npm install
```

## Step 4: Start Development Server
```bash
npm run dev
```

## ✅ Done!
Your app should open automatically at http://localhost:3000

---

## Common Issues

**Error: "Port 3000 already in use"**
```bash
npx kill-port 3000
npm run dev
```

**Error: "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Need help?** See full guide: `SETUP_INSTRUCTIONS.md`
