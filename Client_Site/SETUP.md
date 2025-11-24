# Quick Setup Guide

## Step-by-Step Instructions

### 1. Prerequisites
Make sure you have installed:
- **Node.js** (v18 or higher) - Download from https://nodejs.org/
- **VS Code** - Download from https://code.visualstudio.com/

### 2. Open Project in VS Code
1. Open VS Code
2. File → Open Folder
3. Select this project folder

### 3. Open Terminal in VS Code
- Go to: Terminal → New Terminal (or press `` Ctrl + ` ``)

### 4. Install Dependencies
In the terminal, run:
```bash
npm install
```

Wait for all packages to install (this may take a few minutes).

### 5. Start Development Server
Run:
```bash
npm run dev
```

### 6. Open in Browser
The terminal will show a URL like:
```
➜  Local:   http://localhost:5173/
```

Click on the URL or open your browser and go to `http://localhost:5173`

### 7. Install Recommended VS Code Extensions (Optional)
When you open the project, VS Code will prompt you to install recommended extensions. Click "Install All" for the best development experience.

Manual installation:
1. Open Extensions (Ctrl+Shift+X)
2. Search and install:
   - **ESLint**
   - **Prettier - Code formatter**
   - **Tailwind CSS IntelliSense**
   - **ES7+ React/Redux/React-Native snippets**

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Restart VS Code after installation

### Port 5173 Already in Use
- Vite will automatically use the next available port
- Check the terminal for the actual URL

### Module Errors After Installation
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Showing
- Make sure `styles/globals.css` exists
- Check that you ran `npm install`
- Restart the dev server

## Project Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Default Login/User
The app uses mock data stored in localStorage:
- **Name**: Vukona revelation hlayisi
- **Email**: Vukonahlayisi@gmail.com

You can edit this in the Profile page.

## Next Steps
1. Explore the app in your browser
2. Check the README.md for full documentation
3. Start editing components in the `/components` folder
4. Changes will hot-reload automatically

## Need Help?
- Check README.md for detailed documentation
- Review browser console for errors (F12)
- Check terminal output for build errors

---

**Happy Coding! 🚀**
