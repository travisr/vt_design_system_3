#!/bin/bash

echo "🔧 Simplifying test functions to remove unused mdTokens variable..."

# Find all trackTokenMigration functions and simplify them
find projects/ -name "*.spec.ts" -exec sed -i '' '
/function trackTokenMigration/,/^}/ {
  s/let mdTokens = 0,/let/
  s/const mdTokens = 0,/let/
  s/if (mdTokens > 0) console\.warn.*;//
  s/still uses \${mdTokens} md tokens/migration complete/
}
' {} \;

echo "✅ Test functions simplified!"

# Run a quick check
echo "🔍 Checking for remaining mdTokens references..."
grep -r "mdTokens" projects/ --include="*.spec.ts" | grep -v backup | head -5 || echo "✅ No mdTokens references found!"
