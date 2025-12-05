#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if your development environment is properly configured
 */

import fs from 'fs';
import path from 'path';

console.log('\n🔍 Verifying Development Environment Setup...\n');

let hasErrors = false;
let warnings = 0;

// Check Node.js version
const checkNodeVersion = () => {
  const version = process.version;
  const major = parseInt(version.split('.')[0].substring(1));
  
  if (major >= 18) {
    console.log('✅ Node.js version:', version, '(OK)');
  } else {
    console.log('❌ Node.js version:', version, '(Need v18 or higher)');
    hasErrors = true;
  }
};

// Check if package.json exists
const checkPackageJson = () => {
  if (fs.existsSync('package.json')) {
    console.log('✅ package.json found');
    
    // Check if node_modules exists
    if (fs.existsSync('node_modules')) {
      console.log('✅ node_modules found (dependencies installed)');
    } else {
      console.log('⚠️  node_modules not found - run: npm install');
      warnings++;
    }
  } else {
    console.log('❌ package.json not found');
    hasErrors = true;
  }
};

// Check essential files
const checkEssentialFiles = () => {
  const essentialFiles = [
    'index.html',
    'main.tsx',
    'App.tsx',
    'vite.config.ts',
    'tsconfig.json',
  ];
  
  console.log('\n📄 Checking essential files:');
  
  essentialFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} not found`);
      hasErrors = true;
    }
  });
};

// Check directories
const checkDirectories = () => {
  const directories = [
    'components',
    'features',
    'utils',
    'styles',
    'supabase/functions/server',
  ];
  
  console.log('\n📁 Checking directories:');
  
  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`  ✅ ${dir}/`);
    } else {
      console.log(`  ⚠️  ${dir}/ not found`);
      warnings++;
    }
  });
};

// Check Supabase configuration
const checkSupabase = () => {
  console.log('\n🔌 Checking Supabase configuration:');
  
  if (fs.existsSync('utils/supabase/info.tsx')) {
    const content = fs.readFileSync('utils/supabase/info.tsx', 'utf8');
    if (content.includes('projectId') && content.includes('publicAnonKey')) {
      console.log('  ✅ Supabase credentials configured');
    } else {
      console.log('  ⚠️  Supabase credentials incomplete');
      warnings++;
    }
  } else {
    console.log('  ❌ Supabase info file not found');
    hasErrors = true;
  }
  
  if (fs.existsSync('supabase/functions/server/index.tsx')) {
    console.log('  ✅ Backend server file found');
  } else {
    console.log('  ❌ Backend server file not found');
    hasErrors = true;
  }
};

// Check VS Code configuration
const checkVSCode = () => {
  console.log('\n💻 Checking VS Code configuration:');
  
  const vscodeFiles = [
    '.vscode/settings.json',
    '.vscode/tasks.json',
    '.vscode/extensions.json',
  ];
  
  vscodeFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ⚠️  ${file} not found`);
      warnings++;
    }
  });
};

// Run all checks
checkNodeVersion();
checkPackageJson();
checkEssentialFiles();
checkDirectories();
checkSupabase();
checkVSCode();

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 Summary:');

if (hasErrors) {
  console.log('❌ Setup has critical errors that need to be fixed');
} else if (warnings > 0) {
  console.log(`⚠️  Setup is OK but has ${warnings} warning(s)`);
} else {
  console.log('✅ Everything looks good! Your setup is complete.');
}

console.log('\n' + '='.repeat(50));

// Next steps
if (!hasErrors) {
  console.log('\n🚀 Next Steps:');
  
  if (!fs.existsSync('node_modules')) {
    console.log('  1. Install dependencies: npm install');
    console.log('  2. Start dev server: npm run dev');
  } else {
    console.log('  1. Start dev server: npm run dev');
    console.log('  2. Open browser at: http://localhost:3000');
  }
  
  console.log('\n📖 Documentation:');
  console.log('  • Quick Setup: QUICK_SETUP.md');
  console.log('  • Full Guide: SETUP_INSTRUCTIONS.md');
  console.log('  • VS Code Tips: VSCODE_GUIDE.md');
}

console.log('\n');

// Exit with appropriate code
process.exit(hasErrors ? 1 : 0);
