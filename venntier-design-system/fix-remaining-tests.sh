#!/bin/bash

echo "🔧 Fixing remaining test files to remove mdTokens..."

# List of files that need fixing
files=(
  "projects/demo/src/app/pages/actions/chips/chips.component.spec.ts"
  "projects/demo/src/app/pages/actions/fab/fab.component.spec.ts"
  "projects/demo/src/app/pages/actions/segmented-buttons/segmented-buttons.component.spec.ts"
  "projects/demo/src/app/pages/forms/text-fields/text-fields.component.spec.ts"
  "projects/demo/src/app/pages/foundation/colors/colors.component.spec.ts"
  "projects/demo/src/app/pages/foundation/elevation/elevation.component.spec.ts"
  "projects/demo/src/app/pages/foundation/icons/icons.component.spec.ts"
  "projects/demo/src/app/pages/foundation/spacing/spacing.component.spec.ts"
  "projects/demo/src/app/pages/foundation/typography/typography.component.spec.ts"
)

for file in "${files[@]}"; do
  echo "Fixing $file..."
  # Remove mdTokens variable and related code
  sed -i '' '
    s/let mdTokens = 0,/let/
    s/const mdTokens = 0,/let/
    /if (mdTokens > 0)/d
  ' "$file"
done

echo "✅ All test files fixed!"

# Verify
echo "🔍 Checking for remaining mdTokens references..."
grep -r "mdTokens" projects/ --include="*.spec.ts" | grep -v backup | wc -l
