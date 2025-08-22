#!/bin/bash

echo "🔧 Fixing syntax errors caused by sed replacements..."

# Fix all the "else if" statements that should be "if" statements
find projects/ -name "*.spec.ts" -exec sed -i '' 's/else if (property\.startsWith/if (property.startsWith/g' {} \;

# Fix the mdTokenCount variable declaration
sed -i '' 's/let mdTokenCount = 0;/const mdTokenCount = 0;/g' projects/demo/src/app/foundation/design-system-foundation.spec.ts

# Remove empty lines that might have been left by sed
find projects/ -name "*.spec.ts" -exec sed -i '' '/^[[:space:]]*\/\/ Migration complete - only checking for mat-sys tokens$/d' {} \;

echo "✅ Syntax errors fixed!"

# Run a quick syntax check
echo "🔍 Checking for remaining syntax issues..."
npm run lint:ts --silent 2>&1 | grep -E "(error|Error)" | head -5 || echo "✅ No major syntax errors found!"
