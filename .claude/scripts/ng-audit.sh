#!/bin/bash

PROJECT_PATH="${1:-.}"
cd "$PROJECT_PATH" || exit 1

REPORT_FILE="ng-audit-report.md"

# Initialize report
cat > "$REPORT_FILE" << 'EOF'
# Angular 19+ / MD3 Audit Report

> Focused on finding violations, not celebrating compliance

EOF

# Color codes for terminal output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

TOTAL_ISSUES=0

# =============================================================================
# CRITICAL: Legacy Angular Control Flow
# =============================================================================
echo -e "\n${YELLOW}Checking for legacy control flow...${NC}"
LEGACY_FLOW=$(grep -r '\*ngIf\|\*ngFor\|\*ngSwitch' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.angular \
    --exclude="*.spec.ts" \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v "^[[:space:]]*//\|^[[:space:]]*\*" | \
    head -20)

LEGACY_COUNT=$(echo "$LEGACY_FLOW" | grep -c . 2>/dev/null || echo "0")

cat >> "$REPORT_FILE" << 'EOF'
## 🚨 CRITICAL: Legacy template control flow (*ngIf/*ngFor/*ngSwitch)

**Impact**: Breaks Angular 19 optimizations
EOF

if [ -z "$LEGACY_FLOW" ] || [ "$LEGACY_COUNT" -eq 0 ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**❌ Found $LEGACY_COUNT instances:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$LEGACY_FLOW" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Auto-fix**: \`ng generate @angular/core:control-flow\`" >> "$REPORT_FILE"
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# CRITICAL: Mixed Control Flow (partial migration)
# =============================================================================
echo -e "\n${YELLOW}Checking for mixed control flow syntax...${NC}"

cat >> "$REPORT_FILE" << 'EOF'

## 🚨 CRITICAL: Mixed control flow syntax

**Impact**: Incomplete migration, inconsistent codebase
EOF

MIXED_FILES=""
FILES_WITH_NEW=$(grep -l '@if\|@for\|@switch' --include="*.html" --include="*.ts" "$PROJECT_PATH" 2>/dev/null || true)
for file in $FILES_WITH_NEW; do
    if grep -q '\*ngIf\|\*ngFor\|\*ngSwitch' "$file" 2>/dev/null; then
        MIXED_FILES="${MIXED_FILES}${file}\n"
    fi
done

if [ -z "$MIXED_FILES" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**❌ Files with BOTH old and new syntax:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo -e "$MIXED_FILES" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Complete migration in these files" >> "$REPORT_FILE"
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# HIGH: ViewEncapsulation.None usage
# =============================================================================
echo -e "\n${YELLOW}Checking for ViewEncapsulation.None...${NC}"

ENCAPSULATION_NONE=$(grep -r "ViewEncapsulation\.None" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    head -10)

cat >> "$REPORT_FILE" << 'EOF'

## ⚠️ HIGH: ViewEncapsulation.None usage

**Impact**: Breaks component style isolation, causes global style leaks
EOF

if [ -z "$ENCAPSULATION_NONE" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**❌ Found dangerous encapsulation:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$ENCAPSULATION_NONE" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Use \`:host\` and \`:host-context\` instead" >> "$REPORT_FILE"
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# HIGH: Direct querySelector on Material components
# =============================================================================
echo -e "\n${YELLOW}Checking for querySelector on Material components...${NC}"

QUERY_SELECTOR=$(grep -r "querySelector.*['\"]\.mat-\|querySelector.*['\"]\.mdc-" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    head -10)

cat >> "$REPORT_FILE" << 'EOF'

## ⚠️ HIGH: Direct DOM queries on Material components

**Impact**: Fragile code that breaks with Material updates
EOF

if [ -z "$QUERY_SELECTOR" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**❌ Found direct DOM manipulation:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$QUERY_SELECTOR" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Use Angular APIs and template references instead" >> "$REPORT_FILE"
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# HIGH: Real !important usage (excluding comments)
# =============================================================================
echo -e "\n${YELLOW}Checking for !important usage...${NC}"

IMPORTANT_USAGE=$(grep -r '!important' \
    --include="*.scss" \
    --include="*.css" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v "//.*!important" | \
    grep -v "/\*.*!important" | \
    grep ":[^;]*!important" | \
    head -20)

cat >> "$REPORT_FILE" << 'EOF'

## ⚠️ HIGH: !important CSS overrides

**Impact**: Breaks cascade, makes styles unmaintainable
EOF

if [ -z "$IMPORTANT_USAGE" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**❌ Found !important usage:**" >> "$REPORT_FILE"
    echo '```scss' >> "$REPORT_FILE"
    echo "$IMPORTANT_USAGE" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# HIGH: ::ng-deep usage (deprecated)
# =============================================================================
echo -e "\n${YELLOW}Checking for ::ng-deep usage...${NC}"

NG_DEEP_USAGE=$(grep -r '::ng-deep' \
    --include="*.scss" \
    --include="*.css" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v "^[[:space:]]*//" | \
    head -10)

cat >> "$REPORT_FILE" << 'EOF'

## ⚠️ HIGH: ::ng-deep usage (deprecated)

**Impact**: Will be removed in future Angular versions
EOF

if [ -z "$NG_DEEP_USAGE" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**❌ Found ::ng-deep usage:**" >> "$REPORT_FILE"
    echo '```scss' >> "$REPORT_FILE"
    echo "$NG_DEEP_USAGE" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# HIGH: :host-context abuse
# =============================================================================
echo -e "\n${YELLOW}Checking for :host-context overuse...${NC}"

HOST_CONTEXT=$(grep -r ":host-context" \
    --include="*.scss" \
    --include="*.css" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v "^[[:space:]]*//" | \
    head -10)

cat >> "$REPORT_FILE" << 'EOF'

## ⚠️ HIGH: :host-context usage

**Impact**: Can cause performance issues and unexpected style inheritance
EOF

if [ -z "$HOST_CONTEXT" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    HOST_COUNT=$(echo "$HOST_CONTEXT" | wc -l)
    if [ "$HOST_COUNT" -gt 5 ]; then
        echo "**⚠️ Found $HOST_COUNT uses (consider alternatives):**" >> "$REPORT_FILE"
        echo '```scss' >> "$REPORT_FILE"
        echo "$HOST_CONTEXT" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        ((TOTAL_ISSUES++))
    else
        echo "**✅ Minimal usage ($HOST_COUNT instances)**" >> "$REPORT_FILE"
    fi
fi

# =============================================================================
# MEDIUM: Problematic Material selectors (internal/private only)
# =============================================================================
echo -e "\n${YELLOW}Checking for problematic Material selectors...${NC}"

# More precise detection - only truly internal selectors
INTERNAL_SELECTORS=$(grep -r '\.\(mdc-button__\|mdc-fab__\|mat-button-wrapper\|mat-.*-ripple\|mat-.*-touch-target\|mat-.*-persistent\)' \
    --include="*.scss" \
    --include="*.css" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v "^[[:space:]]*//" | \
    grep -v "mdc-notched-outline" | \
    grep -v "mat-mdc-form-field" | \
    grep -v "mat-mdc-text-field-wrapper" | \
    head -10)

cat >> "$REPORT_FILE" << 'EOF'

## 📝 MEDIUM: Internal Material CSS selectors

**Impact**: Will break when Material updates internal structure
EOF

if [ -z "$INTERNAL_SELECTORS" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**❌ Found internal Material selectors:**" >> "$REPORT_FILE"
    echo '```scss' >> "$REPORT_FILE"
    echo "$INTERNAL_SELECTORS" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# MEDIUM: Heavy NgModule usage
# =============================================================================
echo -e "\n${YELLOW}Checking for NgModule usage...${NC}"

MODULE_USAGE=$(grep -r '@NgModule' \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude="*.spec.ts" \
    --exclude="app.module.ts" \
    --exclude="*test*.ts" \
    "$PROJECT_PATH" 2>/dev/null | \
    head -10)

cat >> "$REPORT_FILE" << 'EOF'

## 📝 MEDIUM: NgModule usage

**Impact**: Not using modern standalone components
EOF

if [ -z "$MODULE_USAGE" ]; then
    echo "**✅ Using standalone components**" >> "$REPORT_FILE"
else
    MODULE_COUNT=$(echo "$MODULE_USAGE" | wc -l)
    if [ "$MODULE_COUNT" -le 2 ]; then
        echo "**✅ Minimal module usage**" >> "$REPORT_FILE"
    else
        echo "**⚠️ Found $MODULE_COUNT NgModules (migrate to standalone):**" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "$MODULE_USAGE" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "**Auto-fix**: \`ng generate @angular/core:standalone\`" >> "$REPORT_FILE"
        ((TOTAL_ISSUES++))
    fi
fi

# =============================================================================
# LOW: Hard-coded colors (including color names)
# =============================================================================
echo -e "\n${YELLOW}Checking for hard-coded colors...${NC}"

# Enhanced to catch more color patterns
COLOR_ISSUES=$(grep -r '\(#[0-9a-fA-F]\{3,8\}\|rgba\?\([^)]*\)\|hsla\?\([^)]*\)\|\bwhite\b\|\bblack\b\|\bgray\b\|\bgrey\b\|\bred\b\|\bblue\b\|\bgreen\b\)' \
    --include="*.scss" \
    --include="*.css" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude="*token*" \
    --exclude="*theme*" \
    --exclude="*palette*" \
    --exclude="*color*" \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v "var(--" | \
    grep -v "^[[:space:]]*//" | \
    grep -v "@import\|@use" | \
    head -15)

cat >> "$REPORT_FILE" << 'EOF'

## 💡 LOW: Hard-coded colors & shadows

**Impact**: Inconsistent theming, maintenance burden
EOF

if [ -z "$COLOR_ISSUES" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**⚠️ Found hard-coded colors:**" >> "$REPORT_FILE"
    echo '```scss' >> "$REPORT_FILE"
    echo "$COLOR_ISSUES" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Use \`var(--md-sys-color-*)\` tokens" >> "$REPORT_FILE"
fi

# =============================================================================
# LOW: Hard-coded URLs (excluding constants files)
# =============================================================================
echo -e "\n${YELLOW}Checking for hard-coded URLs...${NC}"

URL_ISSUES=$(grep -r 'https\?://' \
    --include="*.ts" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude="*.spec.ts" \
    --exclude="*constant*" \
    --exclude="*config*" \
    --exclude="*environment*" \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v "^[[:space:]]*//" | \
    head -10)

cat >> "$REPORT_FILE" << 'EOF'

## 💡 LOW: Hard-coded URLs

**Impact**: Harder to maintain and configure
EOF

if [ -z "$URL_ISSUES" ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**⚠️ Consider moving to constants:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$URL_ISSUES" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
fi

# =============================================================================
# Summary - Minimal, focused on violations only
# =============================================================================
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## Summary" >> "$REPORT_FILE"

if [ $TOTAL_ISSUES -eq 0 ]; then
    echo "### ✅ No violations found - Angular 19/MD3 compliant" >> "$REPORT_FILE"
    echo -e "${GREEN}✅ Audit passed - no violations!${NC}"
else
    echo "### Found $TOTAL_ISSUES violation type(s)" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Available migrations:**" >> "$REPORT_FILE"
    echo "- Control flow: \`ng generate @angular/core:control-flow\`" >> "$REPORT_FILE"
    echo "- Standalone: \`ng generate @angular/core:standalone\`" >> "$REPORT_FILE"
    echo -e "${YELLOW}⚠️ Found $TOTAL_ISSUES violation(s) - see report${NC}"
fi

echo "" >> "$REPORT_FILE"
echo "*Generated: $(date '+%Y-%m-%d %H:%M:%S')*" >> "$REPORT_FILE"

echo "✅ Audit complete! Report written to: $PROJECT_PATH/$REPORT_FILE"