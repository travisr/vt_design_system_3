#!/bin/bash

# Full Audit Script - Combines Angular best practices and Design System compliance
# Usage: ./full-audit.sh [path]

PROJECT_PATH="${1:-.}"
cd "$PROJECT_PATH" || exit 1

# Create audits directory if it doesn't exist
mkdir -p audits

REPORT_FILE="audits/full-audit-report.md"

# Color codes for terminal output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Initialize report
cat > "$REPORT_FILE" << 'EOF'
# Full Project Audit Report

> Comprehensive analysis of Angular best practices and Design System compliance

**Generated**: 
EOF
echo "*$(date '+%Y-%m-%d %H:%M:%S')*" >> "$REPORT_FILE"

cat >> "$REPORT_FILE" << 'EOF'

---

## 📋 Audit Scope

This report combines:
1. **Angular 19+ Best Practices** - Modern Angular patterns and performance
2. **Material Design 3 Compliance** - Proper use of Material components and theming
3. **Design System Usage** - Token adoption and separation of concerns

---

EOF

echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}           Running Full Project Audit${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"

# =============================================================================
# PART 1: Angular & MD3 Best Practices
# =============================================================================
echo -e "\n${MAGENTA}[1/3] Running Angular 19+ and Material Design 3 audit...${NC}"
echo "" >> "$REPORT_FILE"
echo "# Part 1: Angular 19+ & Material Design 3 Analysis" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Run the ng-audit script and capture key findings
SCRIPT_DIR="$(dirname "$0")"
if [ -f "$SCRIPT_DIR/ng-audit.sh" ]; then
    # Run ng-audit and capture its output
    NG_AUDIT_OUTPUT=$("$SCRIPT_DIR/ng-audit.sh" "$PROJECT_PATH" 2>&1)
    
    # Parse the ng-audit-report.md if it exists
    if [ -f "$PROJECT_PATH/audits/ng-audit-report.md" ]; then
        # Extract key sections from ng-audit report
        sed -n '/## 🚨 CRITICAL:/,/^##/p' "$PROJECT_PATH/audits/ng-audit-report.md" | head -n -1 >> "$REPORT_FILE" 2>/dev/null
        sed -n '/## ⚠️ HIGH:/,/^##/p' "$PROJECT_PATH/audits/ng-audit-report.md" | head -n -1 >> "$REPORT_FILE" 2>/dev/null
        sed -n '/## 📝 MEDIUM:/,/^##/p' "$PROJECT_PATH/audits/ng-audit-report.md" | head -n -1 >> "$REPORT_FILE" 2>/dev/null
        
        # Count issues (ensure single value output)
        NG_CRITICAL=$(grep -c "❌" "$PROJECT_PATH/audits/ng-audit-report.md" 2>/dev/null | head -1 || echo "0")
        NG_WARNINGS=$(grep -c "⚠️ Found" "$PROJECT_PATH/audits/ng-audit-report.md" 2>/dev/null | head -1 || echo "0")
        
        echo -e "${GREEN}✓${NC} Angular audit complete: $NG_CRITICAL critical, $NG_WARNINGS warnings"
    fi
else
    echo "**⚠️ Angular audit script not found**" >> "$REPORT_FILE"
    NG_CRITICAL=0
    NG_WARNINGS=0
fi

# =============================================================================
# PART 2: Design System Compliance
# =============================================================================
echo -e "\n${MAGENTA}[2/3] Running Design System compliance audit...${NC}"
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "# Part 2: Design System Compliance" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

if [ -f "$SCRIPT_DIR/ds-audit.sh" ]; then
    # Run ds-audit and capture its output
    DS_AUDIT_OUTPUT=$("$SCRIPT_DIR/ds-audit.sh" "$PROJECT_PATH" 2>&1)
    
    # Parse the ds-audit-report.md if it exists
    if [ -f "$PROJECT_PATH/audits/ds-audit-report.md" ]; then
        # Extract design system sections
        sed -n '/## 🎨 Design System Token Usage/,/^##/p' "$PROJECT_PATH/audits/ds-audit-report.md" | head -n -1 >> "$REPORT_FILE" 2>/dev/null
        sed -n '/## 📐 Demo Layout Patterns/,/^##/p' "$PROJECT_PATH/audits/ds-audit-report.md" | head -n -1 >> "$REPORT_FILE" 2>/dev/null
        sed -n '/## 📊 Design System Coverage/,/^##/p' "$PROJECT_PATH/audits/ds-audit-report.md" | head -n -1 >> "$REPORT_FILE" 2>/dev/null
        
        # Count design violations (ensure single value output)
        DS_VIOLATIONS=$(grep -c "design system violation" "$PROJECT_PATH/audits/ds-audit-report.md" 2>/dev/null | head -1 || echo "0")
        
        echo -e "${GREEN}✓${NC} Design system audit complete: $DS_VIOLATIONS violations"
    fi
else
    echo "**⚠️ Design system audit script not found**" >> "$REPORT_FILE"
    DS_VIOLATIONS=0
fi

# =============================================================================
# PART 3: Combined Analysis & Recommendations
# =============================================================================
echo -e "\n${MAGENTA}[3/3] Generating combined analysis...${NC}"
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "# Part 3: Overall Assessment" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Calculate overall health score
TOTAL_ISSUES=$((NG_CRITICAL + NG_WARNINGS + DS_VIOLATIONS))

cat >> "$REPORT_FILE" << 'EOF'
## 📊 Project Health Score

EOF

# Determine health status
if [ $TOTAL_ISSUES -eq 0 ]; then
    HEALTH_STATUS="🟢 EXCELLENT"
    HEALTH_MSG="Your project follows all best practices!"
elif [ $TOTAL_ISSUES -le 3 ]; then
    HEALTH_STATUS="🟡 GOOD"
    HEALTH_MSG="Minor improvements needed"
elif [ $TOTAL_ISSUES -le 10 ]; then
    HEALTH_STATUS="🟠 FAIR"
    HEALTH_MSG="Several areas need attention"
else
    HEALTH_STATUS="🔴 NEEDS WORK"
    HEALTH_MSG="Significant improvements required"
fi

echo "### Status: $HEALTH_STATUS" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "$HEALTH_MSG" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Issue breakdown
echo "**Issue Breakdown:**" >> "$REPORT_FILE"
echo "- Angular critical issues: $NG_CRITICAL" >> "$REPORT_FILE"
echo "- Angular/MD3 warnings: $NG_WARNINGS" >> "$REPORT_FILE"
echo "- Design system violations: $DS_VIOLATIONS" >> "$REPORT_FILE"
echo "- **Total issues: $TOTAL_ISSUES**" >> "$REPORT_FILE"

# Priority recommendations
cat >> "$REPORT_FILE" << 'EOF'

## 🎯 Priority Recommendations

Based on the analysis, here are your top priorities:

EOF

if [ $NG_CRITICAL -gt 0 ]; then
    echo "### 🚨 Critical (Fix immediately)" >> "$REPORT_FILE"
    echo "- Migrate legacy control flow to @if/@for syntax" >> "$REPORT_FILE"
    echo "- Remove deprecated patterns (::ng-deep, etc.)" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

if [ $DS_VIOLATIONS -gt 0 ]; then
    echo "### ⚠️ High Priority" >> "$REPORT_FILE"
    echo "- Replace custom styles with design tokens" >> "$REPORT_FILE"
    echo "- Move visual styling to design system" >> "$REPORT_FILE"
    echo "- Use layout utilities for demo components" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

if [ $NG_WARNINGS -gt 0 ]; then
    echo "### 📝 Medium Priority" >> "$REPORT_FILE"
    echo "- Adopt Material 19 system variables" >> "$REPORT_FILE"
    echo "- Migrate to standalone components" >> "$REPORT_FILE"
    echo "- Use proper Material theming APIs" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# Quick wins section
cat >> "$REPORT_FILE" << 'EOF'
## ⚡ Quick Wins

Automated fixes you can run now:
```bash
# Migrate to new control flow
ng generate @angular/core:control-flow

# Convert to standalone components
ng generate @angular/core:standalone

# Generate Material 3 theme
ng generate @angular/material:m3-theme
```

## 📚 Best Practices Checklist

### Angular 19+
- [ ] Use @if/@for/@switch control flow
- [ ] Prefer standalone components
- [ ] Use signals over observables
- [ ] Implement OnPush change detection

### Material Design 3
- [ ] Enable system variables (`use-system-variables: true`)
- [ ] Use theme overrides instead of CSS overrides
- [ ] Leverage Material elevation mixins
- [ ] Follow Material component guidelines

### Design System
- [ ] All colors from MD3 tokens
- [ ] All spacing from 8px grid tokens
- [ ] Demo styles for layout only
- [ ] Component customization in library, not demos

EOF

# Summary message
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## 📈 Next Steps" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

if [ $TOTAL_ISSUES -eq 0 ]; then
    echo "1. Continue following best practices ✅" >> "$REPORT_FILE"
    echo "2. Consider documenting your patterns" >> "$REPORT_FILE"
    echo "3. Set up pre-commit hooks to maintain quality" >> "$REPORT_FILE"
else
    echo "1. Address critical issues first" >> "$REPORT_FILE"
    echo "2. Run automated migrations where available" >> "$REPORT_FILE"
    echo "3. Update design token usage in components" >> "$REPORT_FILE"
    echo "4. Re-run this audit after fixes to track progress" >> "$REPORT_FILE"
fi

echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "*End of Full Audit Report*" >> "$REPORT_FILE"

# Terminal output summary
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}                    Audit Complete!${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "Project Health: $HEALTH_STATUS"
echo -e "Total Issues Found: ${YELLOW}$TOTAL_ISSUES${NC}"
echo ""
echo -e "Full report written to: ${GREEN}$PROJECT_PATH/$REPORT_FILE${NC}"
echo ""
echo "Run individual audits for detailed analysis:"
echo "  • ng-audit.sh    - Angular & Material best practices"
echo "  • ds-audit.sh    - Design system compliance"
echo ""