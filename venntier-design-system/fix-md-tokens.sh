#!/bin/bash

# Script to fix all md-sys-* tokens to mat-sys-* tokens in the design system

echo "🔧 Fixing all md-sys-* tokens to mat-sys-* tokens..."

# Fix the main core theme file
echo "📝 Updating _core-refined.scss..."
sed -i '' 's/md-sys-/mat-sys-/g' projects/design-system/src/styles/themes/_core-refined.scss

# Fix any remaining test files that might have md-sys references in comments or strings
echo "📝 Updating test files..."
find projects/ -name "*.spec.ts" -exec sed -i '' 's/md-sys-/mat-sys-/g' {} \;

# Fix any remaining TypeScript files
echo "📝 Updating TypeScript files..."
find projects/ -name "*.ts" -not -name "*.spec.ts" -exec sed -i '' 's/md-sys-/mat-sys-/g' {} \;

# Fix any remaining SCSS files
echo "📝 Updating SCSS files..."
find projects/ -name "*.scss" -not -name "*.backup*" -exec sed -i '' 's/md-sys-/mat-sys-/g' {} \;

echo "✅ All md-sys-* tokens have been updated to mat-sys-* tokens!"

# Verify the changes
echo "🔍 Verification - checking for any remaining md-sys tokens (excluding backups):"
remaining=$(grep -r "md-sys" projects/ --include="*.scss" --include="*.ts" --include="*.html" | grep -v backup | wc -l)
if [ "$remaining" -eq 0 ]; then
    echo "✅ Perfect! No remaining md-sys tokens found."
else
    echo "⚠️  Found $remaining remaining md-sys tokens:"
    grep -r "md-sys" projects/ --include="*.scss" --include="*.ts" --include="*.html" | grep -v backup | head -5
fi

echo "🎉 Migration to Angular Material 20 tokens complete!"
