# Claude Commands

Custom commands for Claude Code to perform specialized audits and checks.

## Available Commands

### `dm-review` - Dark Mode Visual Review

Comprehensive dark mode testing using Playwright to detect contrast issues, hierarchy problems, and accessibility concerns.

**Usage:**
```bash
dm-review [options]
```

**Options:**
- `--headless` - Run browser in headless mode (default: false)
- `--url=<URL>` - Base URL to test (default: http://localhost:4200)
- `--pages=<list>` - Comma-separated list of page paths to test
- `--fix` - Automatically attempt to fix found issues (experimental)
- `--help` - Show help message

**Examples:**
```bash
# Run interactive audit on localhost
dm-review

# Run headless audit for CI/CD
dm-review --headless

# Test different port
dm-review --url=http://localhost:4300

# Test specific pages only
dm-review --pages=/,/foundation/colors,/foundation/spacing
```

**What it checks:**
- ✅ Contrast ratios between text and backgrounds
- ✅ Surface hierarchy (proper use of container variants)
- ✅ Hardcoded colors that won't adapt to dark mode
- ✅ Missing color properties on elements with backgrounds
- ✅ Invisible or low-contrast text
- ✅ Nested surfaces without proper visual separation

**Output:**
- `audits/darkmode-audit-report.md` - Detailed markdown report
- `audits/darkmode-screenshots/` - Screenshots of each page in dark mode

## Related Scripts

### Static Audits (Fast)

These run without a browser and complete in < 1 second:

```bash
# Angular 19 & MD3 compliance audit
bash ../.claude/scripts/ng-audit.sh .

# Design system usage audit
bash ../.claude/scripts/ds-audit.sh .
```

### Visual Audits (Comprehensive)

These use Playwright for visual testing:

```bash
# Dark mode visual audit (called by dm-review)
node ../.claude/scripts/dark-mode-visual-audit.js

# With options
node ../.claude/scripts/dark-mode-visual-audit.js --headless --url=http://localhost:4200
```

## Audit Coverage

### Static Analysis (ng-audit.sh)
- ✅ Angular 19 patterns (control flow, signals)
- ✅ Material Design 3 compliance
- ✅ Dark mode compatibility
- ✅ Accessibility issues
- ✅ Performance anti-patterns
- ✅ Responsive design issues
- ✅ Security concerns

### Visual Testing (dm-review)
- ✅ Actual contrast ratios
- ✅ Visual hierarchy in dark mode
- ✅ Interactive state visibility
- ✅ Full-page screenshots
- ✅ Component-level issues

## Adding New Commands

To add a new Claude command:

1. Create the script in `.claude/commands/`
2. Make it executable: `chmod +x command-name`
3. Follow the naming convention: lowercase with hyphens
4. Include `--help` option with usage instructions
5. Update this README

## Best Practices

1. **Use static audits first** - They're fast and catch 80% of issues
2. **Run visual audits before releases** - They catch runtime issues
3. **Include in CI/CD** - Both audit types can run in headless mode
4. **Fix critical issues first** - Reports group issues by severity
5. **Re-run after fixes** - Ensure no regressions

## Troubleshooting

### Server not running
The commands will attempt to start the dev server if needed, but it's faster if you have it running:
```bash
ng serve demo
```

### Playwright not installed
The commands will auto-install Playwright if needed, but you can pre-install:
```bash
npm install --save-dev playwright
npx playwright install chromium
```

### Permission denied
Make sure commands are executable:
```bash
chmod +x ../.claude/commands/*
```

### Audit outputs
All audit reports and screenshots are saved to the `audits/` directory:
- `audits/ng-audit-report.md` - Angular & comprehensive checks
- `audits/ds-audit-report.md` - Design system compliance
- `audits/darkmode-audit-report.md` - Dark mode visual testing
- `audits/darkmode-screenshots/` - Dark mode screenshots

This directory is gitignored and can be safely deleted between runs.

## Exit Codes

- `0` - All checks passed
- `1` - Issues found (see report for details)
- `2` - Script error or missing dependencies