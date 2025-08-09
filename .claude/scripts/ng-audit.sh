#!/bin/bash

PROJECT_PATH="${1:-.}"
cd "$PROJECT_PATH" || exit 1

# Create audits directory if it doesn't exist
mkdir -p audits

REPORT_FILE="audits/ng-audit-report.md"

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
    grep -v "^[[:space:]]*//\|^[[:space:]]*\*")

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
    "$PROJECT_PATH" 2>/dev/null)

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
    "$PROJECT_PATH" 2>/dev/null)

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
    grep ":[^;]*!important")

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
    grep -v "^[[:space:]]*//")

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
    grep -v "^[[:space:]]*//")

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
    grep -v "mat-mdc-text-field-wrapper")

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
    "$PROJECT_PATH" 2>/dev/null)

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
# HIGH: Dark Mode Compatibility Issues
# =============================================================================
echo -e "\n${YELLOW}Checking for dark mode compatibility issues...${NC}"

# Check for missing color properties (elements that won't adapt)
MISSING_COLOR_PROPS=$(grep -r 'style="[^"]*background:[^"]*var(--md-sys-' \
    --include="*.ts" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.angular \
    . 2>/dev/null | \
    grep -v 'color:' | \
    grep -v '// \|/\*')

# Check for surface-on-surface without proper hierarchy
SURFACE_HIERARCHY=$(grep -r 'var(--md-sys-color-surface).*var(--md-sys-color-surface)' \
    --include="*.ts" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.angular \
    . 2>/dev/null | \
    grep -v 'surface-container')

# Check for opacity/transparency issues that break in dark mode
OPACITY_ISSUES=$(grep -r 'style="[^"]*\(opacity:\s*0\.[0-5]\|rgba([^)]*,\s*0\.[0-5]\))' \
    --include="*.ts" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.angular \
    . 2>/dev/null | \
    grep -v 'var(--')

# Check for white/black text without using tokens
HARDCODED_TEXT=$(grep -r 'style="[^"]*color:\s*\(white\|black\|#fff\|#000\|rgb(255,\s*255,\s*255)\|rgb(0,\s*0,\s*0)\)' \
    --include="*.ts" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.angular \
    . 2>/dev/null)

# Count issues
DARK_MODE_ISSUES=0
if [ -n "$MISSING_COLOR_PROPS" ]; then
    ((DARK_MODE_ISSUES++))
fi
if [ -n "$SURFACE_HIERARCHY" ]; then
    ((DARK_MODE_ISSUES++))
fi
if [ -n "$OPACITY_ISSUES" ]; then
    ((DARK_MODE_ISSUES++))
fi
if [ -n "$HARDCODED_TEXT" ]; then
    ((DARK_MODE_ISSUES++))
fi

cat >> "$REPORT_FILE" << 'EOF'

## 🌙 HIGH: Dark Mode Compatibility

**Impact**: Poor contrast, invisible text, broken UI in dark mode
EOF

if [ $DARK_MODE_ISSUES -eq 0 ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    if [ -n "$MISSING_COLOR_PROPS" ]; then
        echo "**⚠️ Elements with background but no text color:**" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "$MISSING_COLOR_PROPS" | head -5 >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "**Fix**: Always pair background with color property" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi
    
    if [ -n "$SURFACE_HIERARCHY" ]; then
        echo "**⚠️ Nested surfaces without proper hierarchy:**" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "$SURFACE_HIERARCHY" | head -5 >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "**Fix**: Use surface-container variants for nested elements" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi
    
    if [ -n "$OPACITY_ISSUES" ]; then
        echo "**⚠️ Low opacity values that may cause issues:**" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "$OPACITY_ISSUES" | head -3 >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "**Fix**: Use MD3 state layers or proper tokens" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi
    
    if [ -n "$HARDCODED_TEXT" ]; then
        echo "**❌ Hardcoded text colors (will break in dark mode):**" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "$HARDCODED_TEXT" | head -3 >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "**Fix**: Use var(--md-sys-color-on-surface) or appropriate token" >> "$REPORT_FILE"
    fi
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# HIGH: Hard-coded colors in inline styles (TypeScript templates)
# =============================================================================
echo -e "\n${YELLOW}Checking for hard-coded colors in inline styles...${NC}"

# Check for inline style attributes with hardcoded colors
ALL_INLINE_ISSUES=$(grep -r 'style="[^"]*#[0-9a-fA-F]' \
    --include="*.ts" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.angular \
    --exclude="*.spec.ts" \
    . 2>/dev/null | \
    grep -v "var(--")

# Count total and get samples from different files
if [ -z "$ALL_INLINE_ISSUES" ]; then
    INLINE_COUNT=0
else
    INLINE_COUNT=$(echo "$ALL_INLINE_ISSUES" | grep -c . 2>/dev/null || echo "0")
fi

# Show all inline style issues without limiting
INLINE_STYLE_ISSUES=""
if [ "$INLINE_COUNT" -gt 0 ]; then
    INLINE_STYLE_ISSUES="$ALL_INLINE_ISSUES"
fi

cat >> "$REPORT_FILE" << 'EOF'

## ⚠️ HIGH: Hard-coded colors in inline styles

**Impact**: Breaks dark mode, inconsistent theming, maintenance burden
EOF

if [ -z "$INLINE_STYLE_ISSUES" ] || [ "$INLINE_COUNT" -eq 0 ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    echo "**❌ Found $INLINE_COUNT hard-coded colors in inline styles:**" >> "$REPORT_FILE"
    echo '```typescript' >> "$REPORT_FILE"
    echo "$INLINE_STYLE_ISSUES" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Replace with CSS custom properties:" >> "$REPORT_FILE"
    echo '```typescript' >> "$REPORT_FILE"
    echo '// ❌ WRONG:' >> "$REPORT_FILE"
    echo 'style="background: #fafafa; color: #333;"' >> "$REPORT_FILE"
    echo '' >> "$REPORT_FILE"
    echo '// ✅ CORRECT:' >> "$REPORT_FILE"
    echo 'style="background: var(--md-sys-color-surface); color: var(--md-sys-color-on-surface);"' >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# LOW: Hard-coded colors in SCSS/CSS files (including color names)
# =============================================================================
echo -e "\n${YELLOW}Checking for hard-coded colors in SCSS/CSS...${NC}"

# More precise color detection - only in property values
# We're looking for violations in DEMO files only, not the design system itself
# The design system needs to define base values, but demos should only use tokens
# First find hex colors, rgba/hsla in property values
HEX_COLORS=$(grep -r ':[^;]*#[0-9a-fA-F]\{3,8\}' \
    --include="*.scss" \
    --include="*.css" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir="*tokens*" \
    --exclude-dir="*themes*" \
    --exclude="*_color.scss" \
    --exclude="*_palette*.scss" \
    --exclude="*button.component.scss" \
    "$PROJECT_PATH/projects/demo" 2>/dev/null | \
    grep -v "var(--" | \
    grep -v "^[[:space:]]*//" | \
    grep -v "@import\|@use")

# Find rgba/hsla in property values (only in demo files)
RGBA_COLORS=$(grep -r ':[^;]*\(rgba\?\|hsla\?\)([^)]*)' \
    --include="*.scss" \
    --include="*.css" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH/projects/demo" 2>/dev/null | \
    grep -v "var(--" | \
    grep -v "^[[:space:]]*//")

# Find color keywords ONLY in property values (after a colon) in demo files
# Exclude transparent since it's often legitimate for resets
COLOR_KEYWORDS=$(grep -r ':[^;]*\(\bwhite\b\|\bblack\b\|\bred\b\|\bblue\b\|\bgreen\b\|\byellow\b\|\borange\b\|\bpurple\b\)' \
    --include="*.scss" \
    --include="*.css" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH/projects/demo" 2>/dev/null | \
    grep -v "var(--" | \
    grep -v "^[[:space:]]*//" | \
    grep -v "white-space" | \
    grep -v "\.white\|\.black\|\.gray\|\.red\|\.blue\|\.green")

# Combine all color issues
COLOR_ISSUES=""
if [ -n "$HEX_COLORS" ]; then
    COLOR_ISSUES="$HEX_COLORS"
fi
if [ -n "$RGBA_COLORS" ]; then
    if [ -n "$COLOR_ISSUES" ]; then
        COLOR_ISSUES="$COLOR_ISSUES"$'\n'"$RGBA_COLORS"
    else
        COLOR_ISSUES="$RGBA_COLORS"
    fi
fi
if [ -n "$COLOR_KEYWORDS" ]; then
    if [ -n "$COLOR_ISSUES" ]; then
        COLOR_ISSUES="$COLOR_ISSUES"$'\n'"$COLOR_KEYWORDS"
    else
        COLOR_ISSUES="$COLOR_KEYWORDS"
    fi
fi

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
# HIGH: Accessibility Issues
# =============================================================================
echo -e "\n${YELLOW}Checking for accessibility issues...${NC}"

# Check for images without alt text
MISSING_ALT=$(grep -r '<img[^>]*src=' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v 'alt=' | \
    grep -v 'aria-label')

# Check for form inputs without labels (exclude Material inputs which have mat-label)
MISSING_LABELS=$(grep -r '<input\|<select\|<textarea' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.angular \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v 'aria-label\|aria-labelledby\|placeholder\|mat-label\|matInput' | \
    grep -v '// \|/\*')

# Check for buttons without accessible text
EMPTY_BUTTONS=$(grep -r '<button[^>]*>\s*</button>' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null)

# Check for semantic HTML5 landmarks AND ARIA role landmarks
# Count files that have at least one landmark
FILES_WITH_LANDMARKS=$(find "$PROJECT_PATH/projects" -name "*.html" -o -name "*.component.html" 2>/dev/null | \
    xargs grep -l '<main\|<nav\|<header\|<footer\|<aside\|role="main"\|role="navigation"\|role="banner"\|role="contentinfo"\|role="complementary"' 2>/dev/null | wc -l)

# Count total HTML component files
TOTAL_HTML_FILES=$(find "$PROJECT_PATH/projects" -name "*.component.html" -o -name "app.component.html" 2>/dev/null | wc -l)

cat >> "$REPORT_FILE" << 'EOF'

## ♿ HIGH: Accessibility Issues

**Impact**: Poor user experience for assistive technology users
EOF

A11Y_ISSUES=0
if [ -n "$MISSING_ALT" ]; then
    echo "**⚠️ Images without alt text:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$MISSING_ALT" | head -3 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((A11Y_ISSUES++))
fi

if [ -n "$MISSING_LABELS" ]; then
    echo "**⚠️ Form inputs without labels:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$MISSING_LABELS" | head -3 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((A11Y_ISSUES++))
fi

if [ -n "$EMPTY_BUTTONS" ]; then
    echo "**⚠️ Buttons without accessible text:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$EMPTY_BUTTONS" | head -3 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((A11Y_ISSUES++))
fi

# Only warn if we have HTML files but no landmarks
if [ "$TOTAL_HTML_FILES" -gt 0 ] && [ "$FILES_WITH_LANDMARKS" -eq 0 ]; then
    echo "**⚠️ No ARIA landmarks found (main, nav, header, footer)**" >> "$REPORT_FILE"
    ((A11Y_ISSUES++))
fi

if [ $A11Y_ISSUES -eq 0 ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# MEDIUM: Performance Anti-patterns
# =============================================================================
echo -e "\n${YELLOW}Checking for performance anti-patterns...${NC}"

# Check for large inline styles (> 200 chars)
LARGE_INLINE_STYLES=$(grep -r 'style="[^"]\{200,\}"' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null)

# Check for excessive DOM nesting (> 10 levels deep in templates)
DEEP_NESTING=$(grep -r '>\s*<.*>\s*<.*>\s*<.*>\s*<.*>\s*<.*>\s*<.*>\s*<.*>\s*<.*>\s*<.*>\s*<' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null)

# Check for non-lazy loaded images
NON_LAZY_IMAGES=$(grep -r '<img[^>]*src=' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v 'loading="lazy"' | \
    grep -v 'icon\|logo\|avatar')

cat >> "$REPORT_FILE" << 'EOF'

## ⚡ MEDIUM: Performance Anti-patterns

**Impact**: Slow rendering, poor user experience
EOF

PERF_ISSUES=0
if [ -n "$LARGE_INLINE_STYLES" ]; then
    echo "**⚠️ Large inline styles (> 200 chars):**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$LARGE_INLINE_STYLES" | head -2 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Move to CSS classes" >> "$REPORT_FILE"
    ((PERF_ISSUES++))
fi

if [ -n "$DEEP_NESTING" ]; then
    echo "**⚠️ Excessive DOM nesting detected**" >> "$REPORT_FILE"
    echo "**Fix**: Simplify component structure" >> "$REPORT_FILE"
    ((PERF_ISSUES++))
fi

if [ -n "$NON_LAZY_IMAGES" ]; then
    NON_LAZY_COUNT=$(echo "$NON_LAZY_IMAGES" | wc -l)
    if [ $NON_LAZY_COUNT -gt 5 ]; then
        echo "**⚠️ $NON_LAZY_COUNT images without lazy loading**" >> "$REPORT_FILE"
        echo "**Fix**: Add loading=\"lazy\" to images below the fold" >> "$REPORT_FILE"
        ((PERF_ISSUES++))
    fi
fi

if [ $PERF_ISSUES -eq 0 ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# MEDIUM: Responsive Design Issues
# =============================================================================
echo -e "\n${YELLOW}Checking for responsive design issues...${NC}"

# Check for fixed pixel widths
FIXED_WIDTHS=$(grep -r 'width:\s*[0-9]\{3,\}px' \
    --include="*.scss" \
    --include="*.css" \
    --include="*.ts" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v 'max-width\|min-width' | \
    grep -v '// \|/\*')

# Check for non-responsive tables
NON_RESPONSIVE_TABLES=$(grep -r '<table' \
    --include="*.html" \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null | \
    grep -v 'mat-table\|responsive\|overflow')

# Check for viewport meta tag in all index.html files
# First check if there are any index.html files
INDEX_FILES=$(find "$PROJECT_PATH" -path "*/src/index.html" -not -path "*/node_modules/*" 2>/dev/null)
if [ -n "$INDEX_FILES" ]; then
    VIEWPORT_META=$(echo "$INDEX_FILES" | xargs grep -l 'name="viewport"' 2>/dev/null)
else
    VIEWPORT_META=""
fi

cat >> "$REPORT_FILE" << 'EOF'

## 📱 MEDIUM: Responsive Design Issues

**Impact**: Poor mobile experience, horizontal scrolling
EOF

RESPONSIVE_ISSUES=0
if [ -n "$FIXED_WIDTHS" ]; then
    echo "**⚠️ Fixed pixel widths (may break on mobile):**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$FIXED_WIDTHS" | head -3 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Use relative units (%, vw, rem) or max-width" >> "$REPORT_FILE"
    ((RESPONSIVE_ISSUES++))
fi

if [ -n "$NON_RESPONSIVE_TABLES" ]; then
    echo "**⚠️ Tables without responsive wrapper:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$NON_RESPONSIVE_TABLES" | head -2 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Use mat-table or add overflow-x wrapper" >> "$REPORT_FILE"
    ((RESPONSIVE_ISSUES++))
fi

if [ -z "$VIEWPORT_META" ]; then
    echo "**❌ Missing viewport meta tag in index.html**" >> "$REPORT_FILE"
    echo "**Fix**: Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" >> "$REPORT_FILE"
    ((RESPONSIVE_ISSUES++))
fi

if [ $RESPONSIVE_ISSUES -eq 0 ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    ((TOTAL_ISSUES++))
fi

# =============================================================================
# HIGH: Security Concerns
# =============================================================================
echo -e "\n${YELLOW}Checking for security concerns...${NC}"

# Check for innerHTML usage
INNER_HTML=$(grep -r 'innerHTML\|outerHTML' \
    --include="*.ts" \
    --include="*.js" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.angular \
    --exclude="*.spec.ts" \
    --exclude="debug-*.js" \
    "$PROJECT_PATH" 2>/dev/null)

# Check for bypassing Angular sanitization
BYPASS_SECURITY=$(grep -r 'bypassSecurity\|DomSanitizer' \
    --include="*.ts" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude="*.spec.ts" \
    "$PROJECT_PATH" 2>/dev/null)

# Check for eval usage
EVAL_USAGE=$(grep -r '\beval\s*(' \
    --include="*.ts" \
    --include="*.js" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH" 2>/dev/null)

cat >> "$REPORT_FILE" << 'EOF'

## 🔒 HIGH: Security Concerns

**Impact**: XSS vulnerabilities, code injection risks
EOF

SECURITY_ISSUES=0
if [ -n "$INNER_HTML" ]; then
    echo "**⚠️ Direct innerHTML manipulation:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$INNER_HTML" | head -3 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Use Angular template binding or sanitize content" >> "$REPORT_FILE"
    ((SECURITY_ISSUES++))
fi

if [ -n "$BYPASS_SECURITY" ]; then
    echo "**⚠️ Security bypass detected:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$BYPASS_SECURITY" | head -3 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Ensure content is trusted or use safer alternatives" >> "$REPORT_FILE"
    ((SECURITY_ISSUES++))
fi

if [ -n "$EVAL_USAGE" ]; then
    echo "**❌ eval() usage detected:**" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$EVAL_USAGE" | head -2 >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "**Fix**: Use safer alternatives like JSON.parse or Function constructor" >> "$REPORT_FILE"
    ((SECURITY_ISSUES++))
fi

if [ $SECURITY_ISSUES -eq 0 ]; then
    echo "**✅ None found**" >> "$REPORT_FILE"
else
    ((TOTAL_ISSUES++))
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
    grep -v "^[[:space:]]*//")

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