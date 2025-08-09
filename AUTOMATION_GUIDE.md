# Automation & IDE Integration Guide

## 📊 When Tools Run

| Tool | On Save | On Build | On Commit | Manual | VS Code Real-time |
|------|---------|----------|-----------|---------|-------------------|
| **TypeScript** | ❌ | ✅ | ❌ | ✅ | ✅ (built-in) |
| **ESLint** | ✅* | ❌ | ✅* | ✅ | ✅ (with extension) |
| **Stylelint** | ✅* | ❌ | ✅* | ✅ | ✅ (with extension) |
| **Prettier** | ✅* | ❌ | ✅* | ✅ | ✅ (with extension) |
| **Custom Audits** | ❌ | ❌ | ❌ | ✅ | ❌ |

*With configuration

## 🎯 VS Code Setup

### 1. Install Required Extensions
```bash
# Open VS Code and install recommended extensions:
code --install-extension dbaeumer.vscode-eslint
code --install-extension stylelint.vscode-stylelint
code --install-extension esbenp.prettier-vscode
code --install-extension angular.ng-template
```

### 2. Features After Setup
- **Real-time error highlighting** as you type
- **Auto-fix on save** for fixable issues
- **Format on save** with Prettier
- **Hover tooltips** explaining issues
- **Quick fixes** via lightbulb menu (Cmd+.)

## 🔄 Automation Options

### Option 1: VS Code Auto-Fix on Save (Configured)
```json
// Already configured in .vscode/settings.json
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": "explicit",
  "source.fixAll.stylelint": "explicit"
}
```
**Status:** ✅ Ready to use

### Option 2: Git Pre-Commit Hooks
```bash
# Install husky and set up pre-commit hook
npx husky init
npx husky add .husky/pre-commit "npx lint-staged"
```
**Status:** ⚠️ Needs git repo at parent level

### Option 3: File Watchers (npm scripts)
```json
// Add to package.json scripts:
"watch:lint": "nodemon --watch 'src/**/*.ts' --exec 'npm run lint:ts'",
"watch:scss": "nodemon --watch 'src/**/*.scss' --exec 'npm run lint:scss'",
"watch:all": "concurrently \"npm run watch:lint\" \"npm run watch:scss\""
```
**Status:** ❌ Not configured (requires nodemon)

### Option 4: Build-time Checks
```json
// Add to angular.json build options:
"builder": "@angular-devkit/build-angular:browser",
"options": {
  "lint": true  // Not a real option, would need custom builder
}
```
**Status:** ❌ Angular doesn't support this natively

### Option 5: CI/CD Pipeline
```yaml
# Example GitHub Actions workflow
name: Quality Checks
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run audit:full
      - run: npm run lint:all
      - run: npm run typecheck
```
**Status:** ❌ Not configured

## 🚀 Quick Setup Commands

### Enable Everything in VS Code
```bash
# 1. Open VS Code
code .

# 2. Install extensions (if VS Code prompts, click "Install All")
# Or manually:
code --install-extension dbaeumer.vscode-eslint
code --install-extension stylelint.vscode-stylelint
code --install-extension esbenp.prettier-vscode

# 3. Reload VS Code window
# Cmd+Shift+P -> "Developer: Reload Window"
```

### Test It's Working
1. Open any `.ts` file
2. Add an unused import: `import { signal } from '@angular/core';`
3. You should see:
   - Yellow squiggly line under `signal`
   - Problems panel shows the issue
   - Save the file → import auto-removed

## 📋 Current Configuration Summary

### ✅ **What's Working Now:**
- Manual commands (`npm run lint:all`, etc.)
- VS Code real-time linting (with extensions)
- VS Code format/fix on save (with extensions)
- TypeScript checking on build

### ⚠️ **What Needs Git Repo:**
- Pre-commit hooks with Husky
- Lint-staged automation

### ❌ **What's Not Set Up:**
- File watchers for continuous linting
- Build-time linting enforcement
- CI/CD pipeline integration

## 🎨 VS Code Visual Indicators

When properly configured, you'll see:

1. **Red squiggles** - Errors that must be fixed
2. **Yellow squiggles** - Warnings to consider
3. **Problems tab** - Full list of issues (Cmd+Shift+M)
4. **Status bar** - ESLint/Prettier status indicators
5. **Lightbulb** - Quick fix suggestions (Cmd+.)

## 🔧 Troubleshooting

### ESLint not working in VS Code?
```bash
# Check ESLint output
# View -> Output -> ESLint

# Restart ESLint server
# Cmd+Shift+P -> "ESLint: Restart ESLint Server"
```

### Stylelint not working?
```bash
# Check if stylelint can run
npx stylelint "**/*.scss"

# Check VS Code output
# View -> Output -> Stylelint
```

### Format on save not working?
```bash
# Check default formatter
# Cmd+Shift+P -> "Format Document With..."
# Select "Prettier - Code formatter"
```

## 📈 Progressive Enhancement Path

1. **Start with:** VS Code extensions (immediate benefit)
2. **Then add:** Git hooks when in main repo
3. **Consider:** File watchers if needed
4. **Finally:** CI/CD for team enforcement

## 🎯 Recommended Workflow

1. **While coding:** VS Code shows issues in real-time
2. **On save:** Auto-format and fix what's possible
3. **Before commit:** Run `npm run lint:all` to catch everything
4. **Periodically:** Run `npm run audit:full` for comprehensive check
5. **Before PR:** Fix all issues shown by tools

This setup balances automation with performance, giving immediate feedback without overwhelming the system.