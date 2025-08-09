# ng-review
---
description: Audit repo for Angular 19+ & MD3 violations (smart filtering to reduce false positives)
argument-hint: [path=.]
allowed-tools: Bash(bash:*), Bash(./*)
model: sonnet
---

## Context

- Project root: `$ARGUMENTS` (defaults to `.`)
- This command will create or overwrite `ng-audit-report.md` in the target directory
- Uses reusable audit script at `.claude/scripts/ng-audit.sh`
- **Smart filtering**: Ignores comments, distinguishes Material public API from internals

## Run the audit

!bash -lc '
# Run the audit script with the provided arguments
.claude/scripts/ng-audit.sh "${ARGUMENTS:-.}"
'

## Your task

Using the outputs above, if the audit ran successfully:
- **Focus on ACTIONABLE issues only** (not Material public API usage)
- Group issues by severity: CRITICAL > HIGH > MEDIUM > LOW
- For each issue type, explain:
  - WHY it matters for this specific project
  - HOW to fix it (with code examples)
  - WHETHER it actually needs fixing (some .mat-* classes are fine!)
- Ignore false positives like:
  - Comments mentioning !important
  - URLs in constants files  
  - Material's documented public selectors