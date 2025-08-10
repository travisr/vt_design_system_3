# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Venntier Design System v3 - Angular 19 + Material Design 3 library creating a private npm package (`@venntier/design-system`) for cross-application UI consistency. Implements OpenAI-inspired minimalist design with monochromatic interaction states.

## Current Status

**Phase**: Active Development  
- Workspace setup complete with Angular 19.2, Material 19.2, Inter fonts
- Project structure: `venntier-design-system/` workspace with library and demo app
- Token system implemented: `projects/venntier/design-system/src/styles/tokens/`
- Theme service created: `projects/venntier/design-system/src/lib/theme.service.ts`
- Comprehensive PRD with M3 specifications: `docs/prd.md`
- Visual reference: `openai_reference_screenshots/`
- Design refinements identified: `venntier-design-system/REFINEMENTS_NEEDED.md`

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

**Working Directory**: Always work from `venntier-design-system/` directory

```bash
# Concurrent development (recommended)
ng build @venntier/design-system --watch &
ng serve demo

# Individual commands
ng build @venntier/design-system --watch         # Watch library builds
ng serve demo                                    # Demo app dev server
ng build demo                                    # Build demo app

# Testing
ng test @venntier/design-system                  # Library unit tests
ng test demo                                     # Demo app tests

# Production builds
ng build @venntier/design-system --configuration=production
ng build demo --configuration=production

# Package for distribution
cd dist/venntier/design-system && npm pack

# Visual testing (requires built demo)
node capture-screenshot.js                      # Screenshots for reference
node detailed-analysis.js                       # Component analysis
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

## Angular 19 Patterns

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

## Project Structure

```
venntier-design-system/
├── projects/
│   ├── venntier/design-system/          # Library source
│   │   ├── src/
│   │   │   ├── lib/theme.service.ts     # Theme management
│   │   │   ├── styles/                  # SCSS token system
│   │   │   │   ├── tokens/              # M3 design tokens
│   │   │   │   ├── themes/              # Light/dark themes  
│   │   │   │   └── components/          # Component overrides
│   │   │   └── public-api.ts           # Library exports
│   │   └── package.json                # Library metadata
│   └── demo/                           # Demo application
│       └── src/app/                    # Demo components
├── dist/venntier/design-system/        # Build output
└── node_modules/                       # Dependencies
```

## M3 Implementation Notes

- Angular Material 19.2 has stable M3 support with token system
- Using `use-system-variables: true` approach for M3 tokens
- Token overrides via SCSS mixins, not CSS selector specificity
- Component customization through `md-sys-*` variable prefixes

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
5. **Signals over RxJS** - Angular 19 reactive patterns
6. **M3 tokens** - Follow md-sys-* naming convention

## Key Implementation Refinements

Based on `REFINEMENTS_NEEDED.md` analysis, critical improvements needed:

### High Priority Fixes
- **Soften color palette**: Use #fafafa backgrounds instead of harsh whites
- **Reduce font weights**: Display 200-300, body 400, labels 400-450
- **Fix button colors**: Tertiary buttons use #565869, improve disabled states
- **Increase spacing**: 32px card padding, 24-32px section gaps

### Medium Priority Polish
- **Input pattern**: Labels above (not floating), 44-48px height
- **Focus states**: Subtle shadows instead of border color changes
- **Background hierarchy**: body (#fafafa) → cards (#ffffff) → inputs (#f9f9f9)
- **Icon sizing**: 16-18px instead of 24px

## Reference Files

- **Full Requirements**: `docs/prd.md` (comprehensive M3 spec)
- **Visual Reference**: `openai_reference_screenshots/`
- **Implementation Issues**: `venntier-design-system/REFINEMENTS_NEEDED.md`
- **Package README**: `venntier-design-system/README.md`
- **M3 Docs**: https://m3.material.io/
- **Angular Material**: https://material.angular.io/

## Design Principles

- **CSS Usage**: 
  - Never use !important

## Best Practices

- Always use md tokens instead of hard coded values
- never use !important per md3 best practices
- always use npm run dev for complete build of libary and demo