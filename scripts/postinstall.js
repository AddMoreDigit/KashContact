#!/usr/bin/env node

/**
 * Post-Install Script
 * Shows helpful next steps after npm install completes
 */

import fs from 'fs';

console.log('\n' + '═'.repeat(60));
console.log('  ✅ Dependencies installed successfully!');
console.log('═'.repeat(60) + '\n');

// Check if this is first install
const isFirstInstall = !fs.existsSync('.setup-complete');

if (isFirstInstall) {
  console.log('👋 Welcome to Campaign Management Application!\n');
  console.log('📚 First time setup? Check these guides:\n');
  console.log('   • GETTING_STARTED_CHECKLIST.md - Complete setup guide');
  console.log('   • QUICK_SETUP.md - 5-minute quick start');
  console.log('   • VSCODE_GUIDE.md - VS Code tips\n');
  
  // Create marker file
  try {
    fs.writeFileSync('.setup-complete', new Date().toISOString());
  } catch (e) {
    // Ignore errors
  }
} else {
  console.log('📦 Dependencies updated!\n');
}

console.log('🚀 Next Steps:\n');
console.log('   1. Start development server:');
console.log('      \x1b[36mnpm run dev\x1b[0m\n');
console.log('   2. Open browser at:');
console.log('      \x1b[36mhttp://localhost:3000\x1b[0m\n');
console.log('   3. Verify setup (optional):');
console.log('      \x1b[36mnpm run verify\x1b[0m\n');

console.log('💡 Quick Tips:\n');
console.log('   • Save files to trigger hot reload');
console.log('   • Press F12 in browser for DevTools');
console.log('   • Use Ctrl+~ in VS Code for terminal\n');

console.log('📖 Available Commands:\n');
console.log('   \x1b[32mnpm run dev\x1b[0m      - Start development server');
console.log('   \x1b[32mnpm run build\x1b[0m    - Build for production');
console.log('   \x1b[32mnpm run preview\x1b[0m  - Preview production build');
console.log('   \x1b[32mnpm run verify\x1b[0m   - Verify setup');
console.log('   \x1b[32mnpm run lint\x1b[0m     - Check code quality\n');

console.log('═'.repeat(60));
console.log('  🎉 Ready to start building!');
console.log('═'.repeat(60) + '\n');
