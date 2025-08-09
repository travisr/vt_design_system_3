# full-review
---
description: Comprehensive audit of Angular best practices AND design system compliance
argument-hint: [path=.]
allowed-tools: Bash(bash:*), Bash(./*)
model: sonnet
---

## Context

- Project root: `$ARGUMENTS` (defaults to `.`)
- This command will create or overwrite `audits/full-audit-report.md` in the audits directory
- Uses reusable audit script at `.claude/scripts/full-audit.sh`
- **Combines**: Angular 19+ patterns, Material Design 3 compliance, AND design system usage

## Run the audit

!bash -lc '
# Run the comprehensive audit script with the provided arguments
.claude/scripts/full-audit.sh "${ARGUMENTS:-.}"
'

## Your task

Using the outputs above, provide a comprehensive assessment covering BOTH aspects:

### Part 1: Angular & Material Best Practices
- **Modern Angular patterns**: Are they using @if/@for, standalone components, signals?
- **Material Design 3**: Proper theming with system variables, avoiding deprecated patterns
- **Performance**: Following Angular 19 optimization guidelines

### Part 2: Design System Compliance (Key Goals)

#### Visual Consistency Goal
- **Principle**: Colors, borders, spacing should come EXCLUSIVELY from MD3 tokens
- **Benefit**: Maximum visual impact with minimal developer effort
- **Check**: Are developers using tokens or creating custom styles?

#### Demo Pattern Goal  
- **Principle**: Demo styles should be LIMITED to reusable layout utilities
- **Benefit**: Consistent look across all demo pages automatically
- **Check**: Is `_demo-utilities.scss` focused on layout, not visual styling?

#### Separation of Concerns Goal
- **Principle**: Demo component styles for demonstration layout ONLY
- **Benefit**: Design system controls appearance; demos just arrange components
- **Check**: Are demo pages modifying component appearance or just organizing them?

### Part 3: Overall Assessment
Provide a health score and prioritized action plan:

1. **Critical Issues** (breaks functionality)
   - Legacy Angular patterns that won't work in v19+
   - Deprecated APIs

2. **Design System Violations** (breaks consistency)
   - Custom colors/spacing instead of tokens
   - Demo pages with visual styling
   - Component appearance overrides

3. **Optimization Opportunities**
   - Better token coverage
   - More reusable utilities
   - Improved separation of concerns

### Success Criteria
The ideal codebase should allow developers to:
- Build UIs using ONLY design tokens and utilities
- Create consistent demos without writing custom styles
- Maintain visual consistency with zero effort

Evaluate whether the project achieves this "maximum impact, minimal effort" goal.