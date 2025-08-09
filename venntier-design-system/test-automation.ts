// Test file to verify VS Code automation
// Unused import - should be highlighted

const test = 'hello'; // Should use single quotes per Prettier config

function badlyFormatted() {
  const x = 1;
  const y = 2;
  return x + y;
}

// Missing semicolon
const noSemicolon = true;

// This should trigger prefer-const rule
const neverReassigned = 'test';

console.log('Save this file to see auto-formatting and fixes!');
