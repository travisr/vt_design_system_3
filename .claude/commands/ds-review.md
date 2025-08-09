# ds-review
---
description: Audit design system usage and separation of concerns
argument-hint: [path=.]
allowed-tools: Bash(bash:*), Bash(./*)
model: sonnet
---

## Context

- Project root: `$ARGUMENTS` (defaults to `.`)
- This command will create or overwrite `ng-audit-report.md` in the target directory
- Uses reusable audit script at `.claude/scripts/ds-audit.sh`
- **Focus**: Design system token usage, demo patterns, separation of concerns

## Run the audit

!bash -lc '
# Run the design system audit script with the provided arguments
.claude/scripts/ds-audit.sh "${ARGUMENTS:-.}"
'

## Your task

Using the outputs above, evaluate the project against these design system goals:

### 1. **Visual Styling from Design System Only**
- **Goal**: Colors, borders, spacing, and styling should come EXCLUSIVELY from MD3 tokens
- **Why**: Maximize visual consistency with minimal effort - just use the tokens!
- Identify any custom colors, spacing, or borders that should use tokens instead
- Provide specific token replacements (e.g., `#f5f5f5` → `var(--md-sys-color-surface-variant)`)

### 2. **Demo Styles Limited to Reusable Layouts**
- **Goal**: Demo utilities should ONLY provide layout patterns, not visual styling
- **Why**: Ensures consistent look across all demo pages
- Check `_demo-utilities.scss` for:
  - ✅ Good: Grid systems, flexbox layouts, responsive utilities
  - ❌ Bad: Custom colors, borders, shadows, typography
- Suggest moving any visual styling to use design tokens

### 3. **Demo Component Styles for Layout Only**
- **Goal**: Component demo pages should ONLY handle demonstration layout
- **Why**: The design system defines appearance; demos just arrange components
- Allowed in demo components:
  - ✅ Component grids (e.g., "show 3 buttons in a row")
  - ✅ Section spacing (using spacing tokens)
  - ✅ Example containers for demonstration
- NOT allowed:
  - ❌ Changing component colors, borders, or typography
  - ❌ Custom visual styling
  - ❌ Overriding Material component appearance

### Summary Focus
Emphasize whether the codebase achieves "maximum look with minimal effort" through proper token usage and separation of concerns. The ideal is that developers can create beautiful, consistent UIs just by using the design system tokens and utilities.