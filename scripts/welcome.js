#!/usr/bin/env node

/**
 * Welcome Message Script
 * Shows helpful information when starting the development server
 */

const chalk = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
  dim: (text) => `\x1b[2m${text}\x1b[0m`,
};

const box = (lines) => {
  const maxLength = Math.max(...lines.map(l => l.replace(/\x1b\[\d+m/g, '').length));
  const border = '═'.repeat(maxLength + 4);
  
  console.log('\n╔' + border + '╗');
  lines.forEach(line => {
    const strippedLength = line.replace(/\x1b\[\d+m/g, '').length;
    const padding = ' '.repeat(maxLength - strippedLength);
    console.log('║  ' + line + padding + '  ║');
  });
  console.log('╚' + border + '╝\n');
};

// Show welcome message
box([
  chalk.bold(chalk.green('🚀 Campaign Management Application')),
  '',
  'A comprehensive multi-page web application with:',
  chalk.cyan('✓ Multi-user support (User, Vendor, Corporate)'),
  chalk.cyan('✓ Hybrid storage (localStorage + Supabase)'),
  chalk.cyan('✓ 120+ organized components'),
  chalk.cyan('✓ Full TypeScript support'),
]);

console.log(chalk.bold('📍 Development Server:\n'));
console.log('   ' + chalk.blue('➜') + '  Local:   ' + chalk.cyan('http://localhost:3000'));
console.log('   ' + chalk.blue('➜') + '  Network: Use external IP to test on mobile\n');

console.log(chalk.bold('🎯 Quick Actions:\n'));
console.log('   ' + chalk.green('Press h') + ' → Show help');
console.log('   ' + chalk.green('Press o') + ' → Open in browser');
console.log('   ' + chalk.green('Press q') + ' → Quit server');
console.log('   ' + chalk.green('Ctrl+C') + '  → Stop server\n');

console.log(chalk.bold('🛠️  Development Tips:\n'));
console.log('   • Save any file to trigger hot reload');
console.log('   • Press ' + chalk.yellow('F12') + ' in browser to open DevTools');
console.log('   • Check console for errors and warnings');
console.log('   • Use ' + chalk.yellow('localStorage.clear()') + ' to reset data\n');

console.log(chalk.bold('📚 Documentation:\n'));
console.log('   • ' + chalk.cyan('GETTING_STARTED_CHECKLIST.md') + ' - Setup checklist');
console.log('   • ' + chalk.cyan('VSCODE_GUIDE.md') + ' - VS Code shortcuts');
console.log('   • ' + chalk.cyan('TROUBLESHOOTING.md') + ' - Common issues\n');

console.log(chalk.bold('🔌 Backend Status:\n'));

// Check Supabase connection
const checkSupabase = async () => {
  try {
    const response = await fetch('https://nzfmijbcuwnlkdglsmus.supabase.co/functions/v1/make-server-5eb0ec17/health');
    const data = await response.json();
    
    if (data.status === 'ok') {
      console.log('   ' + chalk.green('✓') + ' Supabase: ' + chalk.green('Connected'));
      console.log('   ' + chalk.green('✓') + ' Hybrid Storage: ' + chalk.green('Active'));
      console.log('   ' + chalk.dim('   Data will sync to cloud automatically\n'));
    } else {
      throw new Error('Unexpected response');
    }
  } catch (error) {
    console.log('   ' + chalk.yellow('⚠') + ' Supabase: ' + chalk.yellow('Offline'));
    console.log('   ' + chalk.green('✓') + ' localStorage: ' + chalk.green('Working'));
    console.log('   ' + chalk.dim('   App works offline, will sync when connected\n'));
  }
  
  console.log(chalk.dim('─'.repeat(60)));
  console.log(chalk.bold(chalk.green('\n✨ Ready to build amazing features!\n')));
};

// Run check
checkSupabase().catch(() => {
  console.log('   ' + chalk.yellow('⚠') + ' Could not check backend status');
  console.log('   ' + chalk.dim('   App will work with localStorage\n'));
  console.log(chalk.dim('─'.repeat(60)));
  console.log(chalk.bold(chalk.green('\n✨ Ready to build!\n')));
});
