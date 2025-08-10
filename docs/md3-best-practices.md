# Angular 20 + Material Design 3 (MD3) Theming — Best Practices

Last reviewed: 2025-08-08

## Highlights after late 2024

- Use `mat.theme` (v19+) for MD3; legacy M2 theming is under `m2-*` APIs. Don’t rely on internal M2 maps.
- Tokens emit in-place under the selector where you include `mat.theme`. If you override right after, wrap in `& {}` to ensure specificity.
- Light/dark is driven by CSS `color-scheme`. Recommended: `html { color-scheme: light dark; }` so MD3 uses CSS `light-dark()`.
- Prefer `mat.theme-overrides` and per-component `*-overrides` mixins over direct CSS class overrides. DOM structure/classes aren’t public API.
- System variables use the `--mat-sys-*` prefix; many components align to system colors in 20.x.

## Setup

- Create one Sass theme targeting `html` and include `mat.theme` with:
  - color: single palette or color map (primary/tertiary). Use prebuilt palettes or generate custom.
  - typography: single family (e.g., Roboto) or a map (plain/brand families + weights).
  - density: 0 to -5. Stay ≥ -1 for accessibility unless there’s strong reason.
- App defaults:
  - `body { background: var(--mat-sys-surface); color: var(--mat-sys-on-surface); }`

## Light/dark & multiple themes

- OS-driven default: `color-scheme: light dark` on `html`.
- Class toggle: `html { color-scheme: light; } body.dark { color-scheme: dark; }`
- Context accents: call `mat.theme` again on container selectors with a different palette.

## Customization

- System tweaks: `mat.theme-overrides` or `$overrides` on `mat.theme` (e.g., `primary-container`, `outline-variant`, `surface-container` tokens).
- Component tweaks: use each component’s `*-overrides` mixin per docs Styling tab.
- Avoid deep CSS and private classes; prefer tokens/overrides.

## Angular 20 specifics

- v20.1 tightened reliance on system tokens and overrides. Ripples/elevation/state layers use tokenized colors; migrate CSS hacks to overrides.
- Schematics set the generated font family on `body`; keep global fonts consistent with theme typography.
- Shadow DOM: load theme CSS inside each shadow root or via Constructable Stylesheets.

## “Clean, modern, OpenAI-like” look with MD3

- Neutral-first: rely on `surface`, `on-surface`, `outline-variant`; keep elevation low.
- Moderate rounding via component shape tokens (cards, menus, dialogs).
- Sparse color: reserve `primary/tertiary` for actions/highlights; keep content on neutral text.
- Density `0` or `-1`; don’t densify popups (menus/datepickers).
- Typography: Inter/Roboto/system-ui 400/500/700.

## Packaging for reuse

- Publish SCSS sources plus a prebuilt CSS artifact.
- Export a global `apply()` mixin and an `apply-context($selector, ...)` helper.
- Mark `@angular/material` `^20` as a peerDependency; ship no deep component CSS.

## Quick checklist

- [ ] `html` sets `color-scheme` and includes `mat.theme`
- [ ] `body` uses `surface`/`on-surface`
- [ ] Light/dark via `color-scheme` or class toggle
- [ ] Customizations via `$overrides` or component overrides
- [ ] No private DOM/class overrides
- [ ] Typography and density defined
- [ ] Package exports SCSS + CSS

## Angular 20+ extras (succinct)

- Signals for theme state: keep mode/density in a signal-based service; toggle classes via HostBinding instead of DOM writes.
- Avoid !important and ::ng-deep: prefer `mat.theme-overrides` and per-component `*-overrides`; scope narrowly if direct CSS is unavoidable.
- Limit `mat.theme` calls: emit tokens at root and a few scoped contexts only to avoid CSS bloat.
- Prefer DI defaults: set component defaults via providers (e.g., button color) rather than CSS hacks.
- Use tokens/palettes over hex: customize system/component tokens; don’t scatter raw hex values.
- Test with harnesses: verify visual states/a11y; mixin override names are validated and will catch typos in CI.
- Signals-first, RxJS optional: default to Signals/Resources for app state and async. Use RxJS selectively (true streams or interop). When needed, bridge via rxjs-interop helpers (toSignal/fromObservable) instead of wiring both systems manually.
- Non-CLI builds: import `zone.js` (or opt into zoneless change detection) when bootstrapping with Vite/custom setups; without it, apps may render blank. Ensure polyfills load before `bootstrapApplication`.

References: Angular Material Theming (v19+), Angular Components CHANGELOG (v19–v20.2).
