#!/bin/bash

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

REPORT_FILE="audits/ds-audit-report.md"

# Initialize report
cat > "$REPORT_FILE" << 'EOF'
# Angular 19+ / MD3 Design System Audit Report

> Enforcing design system usage and separation of concerns

## Design System Philosophy
✅ **Colors, borders, spacing** → Use MD3 tokens only
✅ **Demo styles** → Layout and grids only  
✅ **Component styles** → Demonstration layouts only
❌ **Avoid** → Custom colors, spacing, or visual styling

---

EOF

# Color codes for terminal output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

TOTAL_ISSUES=0
DESIGN_VIOLATIONS=0

# =============================================================================
# CRITICAL: Design System Token Usage Analysis
# =============================================================================
echo -e "\n${CYAN}Analyzing Design System Token Usage...${NC}"

cat >> "$REPORT_FILE" << 'EOF'
## 🎨 Design System Token Usage Analysis

**Goal**: All visual styling should use MD3 tokens exclusively
EOF

# Check demo component styles for non-layout properties
echo -e "${YELLOW}Checking demo components for style violations...${NC}"

# Find problematic style properties in demo components (SCSS/CSS)
DEMO_STYLE_VIOLATIONS=$(grep -r '\(color:\|background:\|background-color:\|border:\|border-color:\|box-shadow:\|font-family:\|font-weight:\)' \
    --include="*.scss" \
    --include="*.css" \
    "./projects/demo/src/app/pages" 2>/dev/null | \
    grep -v "var(--md-sys-" | \
    grep -v "var(--mat-sys-" | \
    grep -v "// \|/\*" | \
    grep -v "grid\|flex\|display\|position\|margin\|padding\|width\|height\|gap")

# Check for inline style violations in TypeScript templates and HTML files
# Look for hardcoded colors and non-token styles
INLINE_STYLE_VIOLATIONS=$(grep -r 'style="[^"]*\(#[0-9a-fA-F]\{3,8\}\|rgba\?([^)]*)\|hsla\?([^)]*)\)' \
    --include="*.ts" \
    --include="*.html" \
    --include="*.component.ts" \
    "./projects/demo/src/app" 2>/dev/null | \
    grep -v "var(--md-sys-" | \
    grep -v "// \|/\*")

# Combine both types of violations
ALL_STYLE_VIOLATIONS=""
if [ -n "$DEMO_STYLE_VIOLATIONS" ]; then
    ALL_STYLE_VIOLATIONS="$DEMO_STYLE_VIOLATIONS"
fi
if [ -n "$INLINE_STYLE_VIOLATIONS" ]; then
    if [ -n "$ALL_STYLE_VIOLATIONS" ]; then
        ALL_STYLE_VIOLATIONS="$ALL_STYLE_VIOLATIONS\n$INLINE_STYLE_VIOLATIONS"
    else
        ALL_STYLE_VIOLATIONS="$INLINE_STYLE_VIOLATIONS"
    fi
fi

if [ -z "$ALL_STYLE_VIOLATIONS" ]; then
    echo "**✅ Demo components use design tokens correctly**" >> "$REPORT_FILE"
else
    echo "**⚠️ Demo components have custom styling (should use tokens):**" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    # Show SCSS violations if any
    if [ -n "$DEMO_STYLE_VIOLATIONS" ]; then
        echo "**SCSS/CSS violations:**" >> "$REPORT_FILE"
        echo '```scss' >> "$REPORT_FILE"
        echo "$DEMO_STYLE_VIOLATIONS" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi
    
    # Show inline style violations if any
    if [ -n "$INLINE_STYLE_VIOLATIONS" ]; then
        echo "**Inline style violations:**" >> "$REPORT_FILE"
        echo '```typescript' >> "$REPORT_FILE"
        echo "$INLINE_STYLE_VIOLATIONS" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi
    
    echo "**Fix**: Replace with MD3 tokens:" >> "$REPORT_FILE"
    echo '```scss' >> "$REPORT_FILE"
    echo '// For SCSS files:' >> "$REPORT_FILE"
    echo 'color: var(--md-sys-color-on-surface);' >> "$REPORT_FILE"
    echo 'background: var(--md-sys-color-surface);' >> "$REPORT_FILE"
    echo 'border: 1px solid var(--md-sys-color-outline);' >> "$REPORT_FILE"
    echo '' >> "$REPORT_FILE"
    echo '// For inline styles:' >> "$REPORT_FILE"
    echo 'style="background: var(--md-sys-color-surface); color: var(--md-sys-color-on-surface);"' >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((DESIGN_VIOLATIONS++))
fi

# =============================================================================
# HIGH: Demo Layout Patterns Check
# =============================================================================
echo -e "\n${YELLOW}Checking demo layout patterns...${NC}"

cat >> "$REPORT_FILE" << 'EOF'

## 📐 Demo Layout Patterns

**Goal**: Demo styles should be limited to reusable layout utilities
**Allowed**: Grid systems, flexbox layouts, spacing utilities, responsive helpers
**Not Allowed**: Colors, typography, borders, shadows (use tokens instead)
EOF

# Check if demo-utilities.scss exists and follows patterns
if [ -f "$PROJECT_PATH/venntier-design-system/projects/demo/src/_demo-utilities.scss" ]; then
    # Count layout utilities vs visual styles
    LAYOUT_UTILS=$(grep -c '\(grid\|flex\|display\|position\|margin\|padding\|width\|height\|gap\|align\|justify\)' \
        "$PROJECT_PATH/venntier-design-system/projects/demo/src/_demo-utilities.scss" 2>/dev/null || echo "0")
    
    # Count visual styles that DON'T use tokens (actual violations)
    VISUAL_STYLES=$(grep '\(color:\|background:\|border:\|font-family:\|font-weight:\)' \
        "$PROJECT_PATH/venntier-design-system/projects/demo/src/_demo-utilities.scss" 2>/dev/null | \
        grep -v "var(--md-sys-" | \
        grep -v "transparent\|inherit\|currentColor\|none" | \
        wc -l || echo "0")
    
    echo "" >> "$REPORT_FILE"
    echo "**Demo Utilities Analysis:**" >> "$REPORT_FILE"
    echo "- Layout utilities: $LAYOUT_UTILS ✅" >> "$REPORT_FILE"
    echo "- Visual styles: $VISUAL_STYLES $([ $VISUAL_STYLES -gt 0 ] && echo '⚠️ Should use tokens' || echo '✅')" >> "$REPORT_FILE"
fi

# =============================================================================
# HIGH: Spacing Consistency Check
# =============================================================================
echo -e "\n${YELLOW}Checking spacing consistency...${NC}"

cat >> "$REPORT_FILE" << 'EOF'

## 📏 Spacing Consistency

**Goal**: All spacing should use MD3 spacing tokens (8px grid system)
EOF

# Find hard-coded spacing values (exclude 0, structural values, and comments)
HARDCODED_SPACING=$(grep -r '\(margin:\|padding:\|gap:\)\s*[0-9]\+px' \
    --include="*.scss" \
    --include="*.css" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    "$PROJECT_PATH/projects/demo" 2>/dev/null | \
    grep -v "var(--md-sys-spacing" | \
    grep -v '\s0px\|0\s\|//\|/\*' | \
    grep -v 'calc\|min\|max\|clamp')

if [ -z "$HARDCODED_SPACING" ]; then
    echo "**✅ All spacing uses MD3 tokens**" >> "$REPORT_FILE"
else
    echo "**⚠️ Found hard-coded spacing values:**" >> "$REPORT_FILE"
    echo '```scss' >> "$REPORT_FILE"
    echo "$HARDCODED_SPACING" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Use MD3 spacing tokens instead:**" >> "$REPORT_FILE"
    echo '```scss' >> "$REPORT_FILE"
    echo '// 8px grid system' >> "$REPORT_FILE"
    echo 'padding: var(--md-sys-spacing-2);  // 16px' >> "$REPORT_FILE"
    echo 'margin: var(--md-sys-spacing-3);   // 24px' >> "$REPORT_FILE"
    echo 'gap: var(--md-sys-spacing-4);      // 32px' >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    ((DESIGN_VIOLATIONS++))
fi

# =============================================================================
# MEDIUM: Component Demo Patterns
# =============================================================================
echo -e "\n${YELLOW}Analyzing component demo patterns...${NC}"

cat >> "$REPORT_FILE" << 'EOF'

## 🧩 Component Demo Patterns

**Goal**: Demo component styles should ONLY handle demonstration layout
**Allowed**: Component grids, example containers, demo sections
**Not Allowed**: Modifying component appearance (that's the design system's job)
EOF

# Check for component style overrides in demos
COMPONENT_OVERRIDES=$(grep -r '\.mat-\|\.mdc-' \
    --include="*.scss" \
    "$PROJECT_PATH/venntier-design-system/projects/demo/src/app/pages" 2>/dev/null | \
    grep -v "// \|/\*" | \
    grep ':[^;]*\(#[0-9a-fA-F]\|rgba\?\|hsla\?\|px\|em\|rem\)' | \
    grep -v "var(--")

if [ -z "$COMPONENT_OVERRIDES" ]; then
    echo "**✅ No component style overrides in demos**" >> "$REPORT_FILE"
else
    echo "**❌ Demo pages are overriding component styles:**" >> "$REPORT_FILE"
    echo '```scss' >> "$REPORT_FILE"
    echo "$COMPONENT_OVERRIDES" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Fix**: Move visual customizations to the design system library, not demo pages" >> "$REPORT_FILE"
    ((DESIGN_VIOLATIONS++))
fi

# =============================================================================
# Check for proper demo patterns
# =============================================================================
echo -e "\n${CYAN}Checking for recommended demo patterns...${NC}"

cat >> "$REPORT_FILE" << 'EOF'

## ✅ Recommended Demo Patterns

Check for these reusable layout utilities:
EOF

# Look for good patterns
GOOD_PATTERNS=""

# Check for demo-grid classes
if grep -q "demo-grid" "$PROJECT_PATH/venntier-design-system/projects/demo/src/_demo-utilities.scss" 2>/dev/null; then
    GOOD_PATTERNS="${GOOD_PATTERNS}- ✅ Found reusable grid layouts (.demo-grid)\n"
fi

# Check for demo-section classes
if grep -q "demo-section" "$PROJECT_PATH/venntier-design-system/projects/demo/src/_demo-utilities.scss" 2>/dev/null; then
    GOOD_PATTERNS="${GOOD_PATTERNS}- ✅ Found section layouts (.demo-section)\n"
fi

# Check for responsive utilities
if grep -q "@media" "$PROJECT_PATH/venntier-design-system/projects/demo/src/_demo-utilities.scss" 2>/dev/null; then
    GOOD_PATTERNS="${GOOD_PATTERNS}- ✅ Found responsive utilities\n"
fi

if [ -n "$GOOD_PATTERNS" ]; then
    echo -e "$GOOD_PATTERNS" >> "$REPORT_FILE"
else
    echo "**⚠️ Consider adding reusable layout utilities**" >> "$REPORT_FILE"
fi

# =============================================================================
# Design System Coverage Report
# =============================================================================
echo -e "\n${CYAN}Generating Design System Coverage Report...${NC}"

cat >> "$REPORT_FILE" << 'EOF'

## 📊 Design System Coverage

Analyzing how well the codebase uses the design system:
EOF

# Count token usage
COLOR_TOKENS=$(grep -r "var(--md-sys-color-" --include="*.scss" --include="*.css" "$PROJECT_PATH" 2>/dev/null | wc -l)
SPACING_TOKENS=$(grep -r "var(--md-sys-spacing-" --include="*.scss" --include="*.css" "$PROJECT_PATH" 2>/dev/null | wc -l)
SHAPE_TOKENS=$(grep -r "var(--md-sys-shape-" --include="*.scss" --include="*.css" "$PROJECT_PATH" 2>/dev/null | wc -l)
TYPOGRAPHY_TOKENS=$(grep -r "var(--md-sys-typescale-" --include="*.scss" --include="*.css" "$PROJECT_PATH" 2>/dev/null | wc -l)

echo "" >> "$REPORT_FILE"
echo "**Token Usage Statistics:**" >> "$REPORT_FILE"
echo "- Color tokens: $COLOR_TOKENS uses" >> "$REPORT_FILE"
echo "- Spacing tokens: $SPACING_TOKENS uses" >> "$REPORT_FILE"
echo "- Shape tokens: $SHAPE_TOKENS uses" >> "$REPORT_FILE"
echo "- Typography tokens: $TYPOGRAPHY_TOKENS uses" >> "$REPORT_FILE"

TOTAL_TOKENS=$((COLOR_TOKENS + SPACING_TOKENS + SHAPE_TOKENS + TYPOGRAPHY_TOKENS))

if [ $TOTAL_TOKENS -gt 100 ]; then
    echo "" >> "$REPORT_FILE"
    echo "**🎉 Excellent design system adoption!**" >> "$REPORT_FILE"
elif [ $TOTAL_TOKENS -gt 50 ]; then
    echo "" >> "$REPORT_FILE"
    echo "**✅ Good design system usage**" >> "$REPORT_FILE"
else
    echo "" >> "$REPORT_FILE"
    echo "**⚠️ Consider using more design tokens**" >> "$REPORT_FILE"
fi


# =============================================================================
# Provide Actionable Recommendations
# =============================================================================

cat >> "$REPORT_FILE" << 'EOF'

## 🎯 Actionable Recommendations

### For Demo Components:
```scss
// ❌ AVOID in demo components
.demo-component {
  color: #333;                    // Custom color
  background: #f5f5f5;            // Custom background
  border: 1px solid #ccc;         // Custom border
  padding: 20px;                  // Hard-coded spacing
}

// ✅ CORRECT approach
.demo-component {
  // Layout only
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--md-sys-spacing-3);
  
  // Visual styling comes from design system
  @include mat.elevation(1);
}
```

### For Demo Utilities:
```scss
// ✅ GOOD: Reusable layout utilities
.demo-grid {
  display: grid;
  gap: var(--md-sys-spacing-3);
  
  &--2-col { grid-template-columns: repeat(2, 1fr); }
  &--3-col { grid-template-columns: repeat(3, 1fr); }
}

.demo-section {
  margin-bottom: var(--md-sys-spacing-6);
  
  &--compact { margin-bottom: var(--md-sys-spacing-3); }
}
```

### For Component Customization:
```scss
// ❌ WRONG: Customizing in demo files
.mat-mdc-button {
  background: #custom;
}

// ✅ RIGHT: Use design system theme
// In design-system/styles/components/_button.scss
@mixin button-overrides() {
  .mat-mdc-button {
    // Customizations here
  }
}
```

EOF

# =============================================================================
# Summary
# =============================================================================
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## Summary" >> "$REPORT_FILE"

if [ $DESIGN_VIOLATIONS -eq 0 ] && [ $TOTAL_ISSUES -eq 0 ]; then
    echo "### 🎉 **Excellent! Following design system best practices**" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "Your codebase properly uses MD3 tokens and maintains separation of concerns." >> "$REPORT_FILE"
    echo -e "${GREEN}✅ Design system audit passed!${NC}"
else
    echo "### Found $DESIGN_VIOLATIONS design system violation(s)" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Key principles to follow:**" >> "$REPORT_FILE"
    echo "1. **Visual styling** → Use MD3 tokens exclusively" >> "$REPORT_FILE"
    echo "2. **Demo styles** → Layout utilities only" >> "$REPORT_FILE"
    echo "3. **Component demos** → Grid/layout for demonstration only" >> "$REPORT_FILE"
    echo "4. **Customization** → In design system, not demo files" >> "$REPORT_FILE"
    echo -e "${YELLOW}⚠️ Found $DESIGN_VIOLATIONS design system violations${NC}"
fi

echo "" >> "$REPORT_FILE"
echo "*Generated: $(date '+%Y-%m-%d %H:%M:%S')*" >> "$REPORT_FILE"

echo "✅ Audit complete! Report written to: $PROJECT_PATH/$REPORT_FILE"