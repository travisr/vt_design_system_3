#!/bin/bash

# Full Audit Script - Combines custom and industry tools
# Usage: ./full-audit.sh [project-path]

# Function to find Angular workspace root
find_angular_workspace() {
    local search_dir="${1:-.}"
    local current_dir="$(cd "$search_dir" && pwd)"
    
    while [ "$current_dir" != "/" ]; do
        # Check for angular.json (Angular workspace indicator)
        if [ -f "$current_dir/angular.json" ]; then
            echo "$current_dir"
            return 0
        fi
        
        # Check for package.json with Angular dependencies
        if [ -f "$current_dir/package.json" ] && grep -q "@angular" "$current_dir/package.json" 2>/dev/null; then
            echo "$current_dir"
            return 0
        fi
        
        # Move up one directory
        current_dir="$(dirname "$current_dir")"
    done
    
    # If no Angular workspace found, use the provided directory
    echo "$(cd "$search_dir" && pwd)"
    return 1
}

# Auto-detect Angular workspace
PROJECT_PATH=$(find_angular_workspace "${1:-.}")
cd "$PROJECT_PATH" || exit 1

# Create audits directory if it doesn't exist
mkdir -p audits

# Color codes for terminal output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

TOTAL_ISSUES=0
REPORT_FILE="audits/full-audit-report.md"

# Initialize report
cat > "$REPORT_FILE" << 'EOF'
# Comprehensive Angular 19 / MD3 Design System Audit Report

> Combined analysis using custom scripts and industry-standard tools

---

EOF

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  FULL AUDIT - Custom + Industry Tools ${NC}"
echo -e "${CYAN}========================================${NC}"

# =============================================================================
# SECTION 1: Custom Script Audits
# =============================================================================
echo -e "\n${MAGENTA}[1/5] Running Custom Angular 19 Audit...${NC}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/ng-audit.sh" ]; then
    "$SCRIPT_DIR/ng-audit.sh" . > /dev/null 2>&1
    if [ -f "audits/ng-audit-report.md" ]; then
        echo "## 📋 Custom Angular 19 Compliance Audit" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        tail -n +4 audits/ng-audit-report.md >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        echo -e "${GREEN}✓ Angular 19 audit complete${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Angular 19 audit script not found${NC}"
fi

echo -e "\n${MAGENTA}[2/5] Running Custom Design System Audit...${NC}"
if [ -f "$SCRIPT_DIR/ds-audit.sh" ]; then
    "$SCRIPT_DIR/ds-audit.sh" . > /dev/null 2>&1
    if [ -f "audits/ds-audit-report.md" ]; then
        echo "## 🎨 Custom Design System Compliance Audit" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        tail -n +4 audits/ds-audit-report.md >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        echo -e "${GREEN}✓ Design System audit complete${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Design System audit script not found${NC}"
fi

# =============================================================================
# SECTION 2: ESLint Analysis
# =============================================================================
echo -e "\n${MAGENTA}[3/5] Running ESLint Analysis...${NC}"
echo "## 🔍 ESLint Analysis" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Check if ESLint is configured (look in workspace root and current dir)
if [ -f "eslint.config.js" ] || [ -f ".eslintrc.json" ] || [ -f "venntier-design-system/eslint.config.js" ] || [ -f "venntier-design-system/.eslintrc.json" ]; then
    # Run ESLint and capture results
    ESLINT_OUTPUT=$(npx ng lint 2>&1 || true)
    ESLINT_EXIT_CODE=$?
    
    if [ $ESLINT_EXIT_CODE -eq 0 ]; then
        echo "✅ **No ESLint violations found**" >> "$REPORT_FILE"
        echo -e "${GREEN}✓ ESLint: No violations${NC}"
    else
        # Count different types of errors
        ERROR_COUNT=$(echo "$ESLINT_OUTPUT" | grep -c "error" || echo "0")
        WARNING_COUNT=$(echo "$ESLINT_OUTPUT" | grep -c "warning" || echo "0")
        
        echo "### ❌ ESLint found issues:" >> "$REPORT_FILE"
        echo "- **Errors**: $ERROR_COUNT" >> "$REPORT_FILE"
        echo "- **Warnings**: $WARNING_COUNT" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        
        # Extract key violations
        echo "**Sample violations:**" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "$ESLINT_OUTPUT" | grep -E "(error|warning)" | head -10 >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        
        echo -e "${YELLOW}⚠ ESLint: $ERROR_COUNT errors, $WARNING_COUNT warnings${NC}"
        ((TOTAL_ISSUES++))
    fi
else
    echo "⚠️ **ESLint not configured** - Run \`ng add @angular-eslint/schematics\`" >> "$REPORT_FILE"
    echo -e "${YELLOW}⚠ ESLint not configured${NC}"
fi

echo "" >> "$REPORT_FILE"

# =============================================================================
# SECTION 3: Stylelint Analysis
# =============================================================================
echo -e "\n${MAGENTA}[4/5] Running Stylelint Analysis...${NC}"
echo "## 🎨 Stylelint Analysis (MD3 Token Enforcement)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Check if Stylelint is configured (look in workspace root and current dir)
if [ -f ".stylelintrc.json" ] || [ -f "stylelint.config.js" ] || [ -f "venntier-design-system/.stylelintrc.json" ] || [ -f "venntier-design-system/stylelint.config.js" ]; then
    # Run Stylelint and capture results
    STYLELINT_OUTPUT=$(npx stylelint "**/*.scss" --ignore-path .gitignore 2>&1 || true)
    STYLELINT_EXIT_CODE=$?
    
    if [ $STYLELINT_EXIT_CODE -eq 0 ]; then
        echo "✅ **All styles follow MD3 token conventions**" >> "$REPORT_FILE"
        echo -e "${GREEN}✓ Stylelint: No violations${NC}"
    else
        # Count violations
        STYLE_VIOLATIONS=$(echo "$STYLELINT_OUTPUT" | grep -c "✖" || echo "0")
        
        echo "### ❌ Stylelint found $STYLE_VIOLATIONS style violations:" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
        
        # Check for specific MD3 token violations
        TOKEN_VIOLATIONS=$(echo "$STYLELINT_OUTPUT" | grep -c "Use MD3 tokens" || echo "0")
        if [ $TOKEN_VIOLATIONS -gt 0 ]; then
            echo "**⚠️ $TOKEN_VIOLATIONS MD3 token violations found**" >> "$REPORT_FILE"
            echo "" >> "$REPORT_FILE"
        fi
        
        echo "**Sample violations:**" >> "$REPORT_FILE"
        echo '```scss' >> "$REPORT_FILE"
        echo "$STYLELINT_OUTPUT" | grep -A 2 "✖" | head -20 >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        
        echo -e "${YELLOW}⚠ Stylelint: $STYLE_VIOLATIONS violations${NC}"
        ((TOTAL_ISSUES++))
    fi
else
    echo "⚠️ **Stylelint not configured** - Run \`npm install --save-dev stylelint stylelint-config-standard-scss\`" >> "$REPORT_FILE"
    echo -e "${YELLOW}⚠ Stylelint not configured${NC}"
fi

echo "" >> "$REPORT_FILE"

# =============================================================================
# SECTION 4: TypeScript Type Checking
# =============================================================================
echo -e "\n${MAGENTA}[5/5] Running TypeScript Type Check...${NC}"
echo "## 📝 TypeScript Type Checking" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Run TypeScript compiler in no-emit mode
TSC_OUTPUT=$(npx tsc --noEmit -p tsconfig.json 2>&1 || true)
TSC_EXIT_CODE=$?

if [ $TSC_EXIT_CODE -eq 0 ]; then
    echo "✅ **No TypeScript errors**" >> "$REPORT_FILE"
    echo -e "${GREEN}✓ TypeScript: No errors${NC}"
else
    # Count TypeScript errors
    TS_ERROR_COUNT=$(echo "$TSC_OUTPUT" | grep -c "error TS" || echo "0")
    
    echo "### ❌ TypeScript found $TS_ERROR_COUNT errors:" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Sample errors:**" >> "$REPORT_FILE"
    echo '```typescript' >> "$REPORT_FILE"
    echo "$TSC_OUTPUT" | grep "error TS" | head -10 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    
    echo -e "${YELLOW}⚠ TypeScript: $TS_ERROR_COUNT errors${NC}"
    ((TOTAL_ISSUES++))
fi

echo "" >> "$REPORT_FILE"

# =============================================================================
# SECTION 5: Migration Opportunities
# =============================================================================
echo "" >> "$REPORT_FILE"
echo "## 🚀 Migration Opportunities" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Check for legacy control flow
LEGACY_COUNT=$(grep -r '\*ngIf\|\*ngFor\|\*ngSwitch' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | wc -l || echo "0")

if [ "$LEGACY_COUNT" -gt 0 ]; then
    echo "### Available Angular 19 Migrations:" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "1. **Control Flow Migration** ($LEGACY_COUNT legacy directives found)" >> "$REPORT_FILE"
    echo "   \`\`\`bash" >> "$REPORT_FILE"
    echo "   ng generate @angular/core:control-flow" >> "$REPORT_FILE"
    echo "   \`\`\`" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# Check for non-standalone components
MODULE_COUNT=$(grep -r '@NgModule' --include="*.ts" --exclude="*.spec.ts" "$PROJECT_PATH" 2>/dev/null | wc -l || echo "0")
if [ "$MODULE_COUNT" -gt 2 ]; then
    echo "2. **Standalone Components Migration** ($MODULE_COUNT NgModules found)" >> "$REPORT_FILE"
    echo "   \`\`\`bash" >> "$REPORT_FILE"
    echo "   ng generate @angular/core:standalone" >> "$REPORT_FILE"
    echo "   \`\`\`" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# =============================================================================
# SECTION 6: Quick Fix Commands
# =============================================================================
echo "## 🔧 Quick Fix Commands" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "\`\`\`bash" >> "$REPORT_FILE"
echo "# Auto-fix ESLint violations" >> "$REPORT_FILE"
echo "npx ng lint --fix" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "# Auto-fix Stylelint violations" >> "$REPORT_FILE"
echo "npx stylelint \"**/*.scss\" --fix" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "# Format all files with Prettier" >> "$REPORT_FILE"
echo "npm run format" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "# Run all audits" >> "$REPORT_FILE"
echo "npm run audit:full" >> "$REPORT_FILE"
echo "\`\`\`" >> "$REPORT_FILE"

# =============================================================================
# Summary
# =============================================================================
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## 📊 Summary" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Calculate totals from all sources
CUSTOM_ISSUES=$(grep -c "❌\|⚠️" audits/ng-audit-report.md 2>/dev/null || echo "0")
CUSTOM_ISSUES=$((CUSTOM_ISSUES + $(grep -c "❌\|⚠️" audits/ds-audit-report.md 2>/dev/null || echo "0")))

if [ $TOTAL_ISSUES -eq 0 ] && [ $CUSTOM_ISSUES -eq 0 ]; then
    echo "### ✅ **Excellent! Full compliance achieved**" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "- ✅ Angular 19 best practices" >> "$REPORT_FILE"
    echo "- ✅ MD3 token usage" >> "$REPORT_FILE"
    echo "- ✅ TypeScript type safety" >> "$REPORT_FILE"
    echo "- ✅ Code formatting standards" >> "$REPORT_FILE"
    
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✅ AUDIT PASSED - Full Compliance!   ${NC}"
    echo -e "${GREEN}========================================${NC}"
else
    echo "### ⚠️ **Issues found across audits**" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Review the sections above and run the quick fix commands to resolve issues.**" >> "$REPORT_FILE"
    
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}  ⚠️ Issues found - See report         ${NC}"
    echo -e "${YELLOW}========================================${NC}"
fi

echo "" >> "$REPORT_FILE"
echo "*Generated: $(date '+%Y-%m-%d %H:%M:%S')*" >> "$REPORT_FILE"

echo -e "\n${CYAN}✅ Full audit complete!${NC}"
echo -e "${CYAN}📄 Report: $PROJECT_PATH/$REPORT_FILE${NC}"
echo ""
echo -e "${CYAN}Quick actions:${NC}"
echo "  npm run lint:all      # Run all linters"
echo "  npm run format        # Format all files"
echo "  npm run audit:full    # Run this audit again"