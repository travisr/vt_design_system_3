# Audit Tools Setup

## Overview
This project now combines custom audit scripts with industry-standard tools for comprehensive quality enforcement.

## 🛠️ Tools Installed

### 1. **Custom Audit Scripts** (Original)
- `ng-audit.sh` - Angular 19 compliance checking
- `ds-audit.sh` - Design System token usage enforcement  
- `full-audit.sh` - Combined analysis with all tools

### 2. **ESLint + Angular-ESLint** (New)
- AST-based TypeScript/Angular linting
- Configured with Angular 19 best practices
- Includes `eslint-plugin-unused-imports` for clean imports
- Template accessibility rules enabled

### 3. **Stylelint** (New)
- CSS/SCSS linting with MD3 token enforcement
- Configured with `stylelint-config-standard-scss`
- Prettier integration for consistent formatting

### 4. **Prettier** (New)
- Code formatting for TS, HTML, SCSS, JSON, MD
- Configured with Angular-specific settings
- Integrated with lint-staged for pre-commit formatting

### 5. **Lint-staged** (New)
- Runs linters on staged files before commit
- Auto-fixes where possible
- Ensures code quality before commits

## 📋 Available Commands

```bash
# Custom audit scripts
npm run audit:ng      # Angular 19 compliance audit
npm run audit:ds      # Design System audit
npm run audit:full    # Combined custom + industry tools

# Industry standard linting
npm run lint:ts       # ESLint for TypeScript/Angular
npm run lint:scss     # Stylelint for SCSS
npm run lint:all      # Run all linters

# Formatting
npm run format        # Format all files with Prettier
npm run format:check  # Check formatting without changes

# Type checking
npm run typecheck     # TypeScript type checking
```

## 🚀 Quick Fixes

```bash
# Auto-fix ESLint issues
npx ng lint --fix

# Auto-fix Stylelint issues  
npx stylelint "**/*.scss" --fix

# Format all files
npm run format

# Run full audit and fixes
npm run audit:full && npm run lint:all --fix && npm run format
```

## 📊 Benefits of Hybrid Approach

### Custom Scripts
✅ **Pros:**
- Project-specific Angular 19 checks
- MD3 token coverage reporting
- Visual, easy-to-read reports
- No configuration overhead

### Industry Tools
✅ **Pros:**
- AST-based accuracy
- Auto-fix capabilities
- IDE integration
- Community support
- Git hooks integration

## 🔄 Workflow

1. **Development:** IDE integration catches issues in real-time
2. **Pre-commit:** Lint-staged runs formatters and linters
3. **CI/CD:** Run `npm run audit:full` for comprehensive check
4. **Migration:** Use Angular schematics for upgrades

## 📈 Migration Commands

When Angular 19 migrations are needed:

```bash
# Migrate to new control flow syntax
ng generate @angular/core:control-flow

# Convert to standalone components
ng generate @angular/core:standalone

# Add Material 3 theme
ng generate @angular/material:m3-theme
```

## 🎯 Key Configurations

### ESLint (`eslint.config.js`)
- Angular 19 best practices enforced
- Unused imports detection
- Accessibility rules enabled
- Template linting configured

### Stylelint (`.stylelintrc.json`)
- MD3 token enforcement (currently simplified)
- SCSS best practices
- Prettier integration
- Proper vendor prefix handling

### Prettier (`.prettierrc`)
- 100 character line width
- Single quotes
- Trailing commas
- Angular HTML parser

## 📝 Notes

- ESLint found real issues (component selectors, accessibility)
- Stylelint needs refinement for MD3 token rules
- Custom scripts remain valuable for project-specific checks
- Both approaches complement each other well

## 🔮 Future Enhancements

1. Add Sheriff or Nx for module boundaries
2. Enhance Stylelint rules for MD3 tokens
3. Add pre-push hooks with Husky
4. Integrate with CI/CD pipeline
5. Add performance budgets