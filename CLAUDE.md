# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Venntier Design System v3 - Angular 18 + Material Design 3 library creating a private npm package (`@venntier/design-system`) for cross-application UI consistency. Implements OpenAI-inspired minimalist design with monochromatic interaction states.

## Current Status

**Phase**: Requirements Complete, Ready for Implementation
- Comprehensive PRD with M3 specifications: `docs/prd.md`
- Reference designs: `openai_reference_screenshots/`
- No code implementation yet

## Initial Setup Commands

```bash
# Create workspace and library
ng new venntier-design-system --no-create-application --package-manager=npm
cd venntier-design-system
ng generate library @venntier/design-system --prefix=vt
ng generate application demo --style=scss --routing --ssr=false

# Add Angular Material 18 with M3
ng add @angular/material
# Choose: Custom theme, yes to typography, yes to animations

# Install required dependencies
npm install @fontsource/inter --save
```

## Development Commands

```bash
# Concurrent development
ng build @venntier/design-system --watch &
ng serve demo

# Testing
ng test @venntier/design-system
ng test demo --watch=false

# Production build
ng build @venntier/design-system --configuration=production

# Package for distribution
cd dist/venntier/design-system && npm pack
```

## Material Design 3 Architecture

### Token Structure
```
styles/
├── tokens/                    # M3 design tokens
│   ├── _sys-color.scss       # System colors (md-sys-color-*)
│   ├── _sys-typescale.scss   # Typography (md-sys-typescale-*)
│   ├── _sys-motion.scss      # Motion tokens
│   └── _sys-shape.scss       # Shape tokens
├── themes/
│   ├── _light.scss           # Light theme
│   ├── _dark.scss            # Dark theme
│   └── _core.scss            # Theme function
└── overrides/                # Component token overrides
    ├── _button.scss
    ├── _card.scss
    └── _input.scss
```

### M3 Theme Configuration
```scss
// Use system variables approach
mat.define-theme((
  color: (
    theme-type: light,
    use-system-variables: true,
    system-variables-prefix: md-sys-color,
  ),
  typography: (
    use-system-variables: true,
    system-variables-prefix: md-sys-typescale,
  )
))
```

## Critical Design Specifications

### OpenAI-Inspired Color System
- **Primary**: Monochrome (#000000 to #ffffff)
- **Accent**: Green (#10a37f) - ONLY for primary CTAs
- **Purple**: (#8b5cf6) - Data visualization only
- **Interactions**: Gray scale only, no colored states
  - Hover: #f7f7f8
  - Selected: #ececf1 with black text
  - Focus: #6e6e80 border, no glows

### Component Specifications
- **Heights**: Buttons 36px, Inputs 40px (compact vs Material defaults)
- **Border Radius**: 4-8px (minimal)
- **Borders**: #ececf1 (no shadows/elevation)
- **Padding**: Cards 24px, Sections 16-24px
- **Typography**: Inter primary, Roboto fallback

## Angular 18 Patterns

### Use Signals (not Observables)
```typescript
// Services use signals
private _isDarkMode = signal(false);
readonly isDarkMode = this._isDarkMode.asReadonly();

// Components use computed
readonly sortedData = computed(() => {...});
```

### New Control Flow
```angular
@if (loading()) {
  <skeleton />
} @else {
  @for (item of items(); track item.id) {
    <div>{{ item }}</div>
  }
}
```

### Standalone Components
All components are standalone. No NgModules except for backwards compatibility.

## M3 Migration Notes

- Angular Material 18 has stable M3 support (not experimental)
- Custom palette generation not yet available - use predefined palettes
- Override components using token mixins, not deep selectors
- Can maintain M2 compatibility with `m2-` prefix during migration

## Package Distribution

Build as `@venntier/design-system` for:
- Private npm registry
- GitHub Packages  
- Local testing via `npm pack`

## Key Implementation Rules

1. **Monochromatic interactions** - No color except green CTAs
2. **Flat design** - Use borders not shadows
3. **8px grid** - All spacing multiples of 8
4. **Token-based theming** - Use CSS custom properties
5. **Signals over RxJS** - Angular 18 reactive patterns
6. **M3 tokens** - Follow md-sys-* naming convention

## Reference Files

- **Full Requirements**: `docs/prd.md` (91KB comprehensive spec)
- **Visual Reference**: `openai_reference_screenshots/`
- **M3 Docs**: https://m3.material.io/
- **Angular Material**: https://material.angular.io/