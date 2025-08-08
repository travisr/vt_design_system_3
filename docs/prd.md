# Product Requirements Document: Design System Implementation
## Angular 18 + Material Design 3 Custom Theming

### Executive Summary

This document outlines the requirements and specifications for implementing a comprehensive design system using Angular 18 and Material Design 3 (stable as of Angular Material 18), featuring custom theming that emulates modern, minimalist design principles with an 8px grid foundation. The system will support both light and dark modes with a primary black and secondary green color palette inspired by OpenAI's interface design, while leveraging M3's token-based theming system.

---

## 1. Project Overview

### 1.1 Objective
Create a robust, scalable design system distributed as a **private npm package** that provides:
- **Cross-application consistency** through reusable Material components, classes, and design tokens
- **Centralized design governance** enabling updates to propagate across all consuming applications
- Consistent visual language across all application interfaces
- Accessibility-first approach with WCAG 2.1 AA compliance
- Performance-optimized theming with minimal runtime overhead
- Seamless light/dark mode switching

### 1.2 Technology Stack
- **Framework**: Angular 18.2+ (latest stable)
- **UI Library**: Angular Material 18+ (Material Design 3 - stable)
- **Theming**: M3 token-based system with CSS custom properties
- **Styling**: SCSS with CSS Custom Properties
- **Build System**: Angular CLI with ng-packagr for library builds
- **Typography**: Inter font (with Roboto fallback)
- **Package Management**: Private npm registry or GitHub Packages
- **Versioning**: Semantic versioning with automated releases

### 1.3 Package Architecture
The design system will be structured as an Angular library package containing:
- **Core Module**: Base styles, theme configurations, and design tokens
- **Components Module**: Extended Material components with custom styling
- **Utilities Module**: Helper classes, mixins, and functions
- **Services Module**: Theme service, responsive service, and other utilities
- **Assets**: Icons, fonts, and other static resources

**Package Name**: `@venntier/design-system`  
**Distribution**: Private npm package for internal organization use

---

## 2. Design Foundations

### 2.1 Grid System
**8px Base Unit Foundation**
- Primary grid: 8px baseline
- Spacing scale: 0, 4px, 8px, 16px, 24px, 32px, 40px, 48px, 56px, 64px, 80px, 96px
- Component padding: Multiples of 8px
- Icon sizes: 16px, 20px, 24px, 32px, 40px
- Border radius scale: 0, 4px, 8px, 12px, 16px, 24px, full

### 2.2 Layout Principles
- **Container widths**: 
  - Mobile: 100% - 32px padding
  - Tablet: 768px max
  - Desktop: 1280px max
  - Wide: 1440px max
- **Breakpoints**:
  - xs: 0-599px
  - sm: 600-959px
  - md: 960-1279px
  - lg: 1280-1919px
  - xl: 1920px+

---

## 3. Color System

### 3.1 Core Palette

#### Primary Colors (Black/Neutral-based)
```scss
$primary-palette: (
  50: #ffffff,
  100: #fafafa,
  200: #f7f7f8,
  300: #ececf1,
  400: #d9d9e3,
  500: #c5c5d2,
  600: #9b9bab,
  700: #6e6e80,
  800: #565869,
  900: #2d2d3a,
  950: #000000
);
```

#### Secondary Colors (Green-based - OpenAI Accent)
```scss
$secondary-palette: (
  50: #e6f9f0,
  100: #c0f0da,
  200: #96e6c2,
  300: #6cdcaa,
  400: #4dd397,
  500: #10a37f,  // OpenAI Green
  600: #0e9672,
  700: #0c8764,
  800: #0a7857,
  900: #07624a,
  950: #054c3a
);
```

#### Semantic Colors
```scss
$semantic-colors: (
  error: #ef4444,   // Red for destructive actions
  warning: #f59e0b, // Amber for warnings
  success: #10a37f, // Green (matching OpenAI accent)
  info: #3b82f6,    // Blue for informational
  purple: #8b5cf6   // Purple for charts/data viz (as seen in dashboard)
);
```

### 3.2 Theme Configurations

#### Light Theme
```scss
$light-theme: (
  // Backgrounds (based on OpenAI screenshots)
  background-primary: #ffffff,
  background-secondary: #f7f7f8,  // Light gray background seen in panels
  background-tertiary: #ececf1,   // Slightly darker for sections
  background-elevated: #ffffff,
  background-hover: #f7f7f8,
  
  // Surfaces
  surface-primary: #ffffff,
  surface-secondary: #fafafa,
  surface-card: #ffffff,          // Cards have white background
  surface-modal: #ffffff,
  
  // Text (OpenAI uses high contrast)
  text-primary: #000000,           // Pure black for primary text
  text-secondary: #6e6e80,         // Gray for secondary text
  text-tertiary: #9b9bab,          // Lighter gray for hints
  text-disabled: #c5c5d2,
  text-link: #10a37f,              // Green for links
  
  // Borders (subtle borders seen in screenshots)
  border-primary: #ececf1,         // Main border color
  border-secondary: #f7f7f8,       // Very subtle borders
  border-input: #d9d9e3,           // Input field borders
  
  // Actions
  action-primary: #10a37f,         // Green for primary CTAs only
  action-secondary: #000000,       // Black secondary action
  action-hover: #f7f7f8,           // Light gray hover background
  action-selected: #ececf1,        // Darker gray for selected
  action-focus: #6e6e80,           // Darker border/text on focus
  action-disabled: #c5c5d2
);
```

#### Dark Theme
```scss
$dark-theme: (
  // Backgrounds (OpenAI dark mode palette)
  background-primary: #000000,     // Pure black primary
  background-secondary: #171717,   // Slightly elevated
  background-tertiary: #212121,    // Panel backgrounds
  background-elevated: #2a2a2a,    // Elevated surfaces
  background-hover: #2a2a2a,
  
  // Surfaces
  surface-primary: #171717,
  surface-secondary: #212121,
  surface-card: #171717,
  surface-modal: #212121,
  
  // Text
  text-primary: #ffffff,            // Pure white for primary
  text-secondary: #c5c5d2,          // Muted text
  text-tertiary: #9b9bab,           // Even more muted
  text-disabled: #6e6e80,
  text-link: #10a37f,               // Green links maintained
  
  // Borders
  border-primary: #2d2d3a,          // Subtle borders
  border-secondary: #212121,
  border-input: #565869,
  
  // Actions
  action-primary: #10a37f,          // Green for primary CTAs only
  action-secondary: #ffffff,
  action-hover: #2a2a2a,            // Subtle gray hover background
  action-selected: #2d2d3a,         // Darker gray for selected
  action-focus: #9b9bab,            // Lighter border/text on focus
  action-disabled: #6e6e80
);
```

---

## 4. Typography System

### 4.1 Font Stack
```scss
$font-family-sans: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 
                    'Segoe UI', 'Helvetica Neue', Arial, sans-serif, 
                    'Apple Color Emoji', 'Segoe UI Emoji';

$font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 
                   'Roboto Mono', Consolas, 'Courier New', 
                   monospace;
```

### 4.2 Font Loading
```scss
// Import Inter font (self-hosted or from Google Fonts)
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

// Or self-hosted with @font-face
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/Inter-Regular.woff2') format('woff2');
}
// Additional weights: 500, 600, 700
```

### 4.3 Type Scale
Based on Material Design 3 type scale with Inter font characteristics:

```scss
$type-scale: (
  // Display
  display-large: (
    size: 57px,
    line-height: 64px,
    weight: 400,
    letter-spacing: -0.25px
  ),
  display-medium: (
    size: 45px,
    line-height: 52px,
    weight: 400,
    letter-spacing: 0
  ),
  display-small: (
    size: 36px,
    line-height: 44px,
    weight: 400,
    letter-spacing: 0
  ),
  
  // Headlines
  headline-large: (
    size: 32px,
    line-height: 40px,
    weight: 500,
    letter-spacing: 0
  ),
  headline-medium: (
    size: 28px,
    line-height: 36px,
    weight: 500,
    letter-spacing: 0
  ),
  headline-small: (
    size: 24px,
    line-height: 32px,
    weight: 500,
    letter-spacing: 0
  ),
  
  // Titles
  title-large: (
    size: 22px,
    line-height: 28px,
    weight: 500,
    letter-spacing: 0
  ),
  title-medium: (
    size: 16px,
    line-height: 24px,
    weight: 600,
    letter-spacing: 0.15px
  ),
  title-small: (
    size: 14px,
    line-height: 20px,
    weight: 600,
    letter-spacing: 0.1px
  ),
  
  // Body
  body-large: (
    size: 16px,
    line-height: 24px,
    weight: 400,
    letter-spacing: 0.5px
  ),
  body-medium: (
    size: 14px,
    line-height: 20px,
    weight: 400,
    letter-spacing: 0.25px
  ),
  body-small: (
    size: 12px,
    line-height: 16px,
    weight: 400,
    letter-spacing: 0.4px
  ),
  
  // Labels
  label-large: (
    size: 14px,
    line-height: 20px,
    weight: 500,
    letter-spacing: 0.1px
  ),
  label-medium: (
    size: 12px,
    line-height: 16px,
    weight: 500,
    letter-spacing: 0.5px
  ),
  label-small: (
    size: 11px,
    line-height: 16px,
    weight: 500,
    letter-spacing: 0.5px
  )
);
```

---

## 5. Component Specifications

### 5.1 Elevation System
Following Material Design 3 elevation levels:

```scss
$elevations: (
  0: none,
  1: 0px 1px 2px rgba(0, 0, 0, 0.05),
  2: 0px 2px 4px rgba(0, 0, 0, 0.08),
  3: 0px 4px 8px rgba(0, 0, 0, 0.10),
  4: 0px 6px 12px rgba(0, 0, 0, 0.12),
  5: 0px 8px 16px rgba(0, 0, 0, 0.14)
);

// Dark mode elevations (surface tint overlay)
$dark-elevations: (
  0: none,
  1: 0px 1px 2px rgba(0, 0, 0, 0.3),
  2: 0px 2px 4px rgba(0, 0, 0, 0.35),
  3: 0px 4px 8px rgba(0, 0, 0, 0.40),
  4: 0px 6px 12px rgba(0, 0, 0, 0.45),
  5: 0px 8px 16px rgba(0, 0, 0, 0.50)
);
```

### 5.2 Component Tokens (Based on OpenAI Interface)

#### Buttons
```scss
$button-config: (
  // Primary filled button (green CTA buttons)
  filled: (
    height: 36px,
    padding: 0 16px,
    border-radius: 6px,      // OpenAI uses subtle radius
    font-size: 14px,
    font-weight: 500,
    min-width: 64px,
    background: #10a37f,
    color: #ffffff
  ),
  
  // Secondary button (black/white depending on theme)
  secondary: (
    height: 36px,
    padding: 0 16px,
    border-radius: 6px,
    border-width: 1px,
    font-size: 14px,
    font-weight: 500
  ),
  
  // Ghost button (text only, no background)
  ghost: (
    height: 36px,
    padding: 0 12px,
    font-size: 14px,
    font-weight: 400,
    border-radius: 6px
  ),
  
  // Icon button (seen in UI controls)
  icon: (
    size: 32px,
    icon-size: 20px,
    border-radius: 6px
  ),
  
  // Small button variant
  small: (
    height: 28px,
    padding: 0 12px,
    font-size: 12px,
    border-radius: 4px
  )
);
```

#### Cards
```scss
$card-config: (
  padding: 24px,              // Generous padding seen in screenshots
  border-radius: 8px,         // Subtle rounded corners
  border-width: 1px,
  border-color: #ececf1,      // Light border
  background: #ffffff,
  elevation-default: 0,       // Flat design approach
  elevation-hover: 0,         // Minimal elevation changes
  transition: all 150ms ease-in-out,
  
  // Variants
  compact: (
    padding: 16px,
    border-radius: 6px
  ),
  
  metric: (                  // KPI cards
    padding: 20px,
    min-height: 120px,
    display: flex,
    flex-direction: column,
    gap: 8px
  ),
  
  feature: (                  // Feature cards with icons
    padding: 32px,
    text-align: left,
    icon-size: 24px,
    icon-margin-bottom: 16px
  )
);
```

#### Input Fields
```scss
$input-config: (
  // Default input (as seen in forms)
  height: 40px,
  padding: 8px 12px,
  border-radius: 6px,
  border-width: 1px,
  border-color: #d9d9e3,
  font-size: 14px,
  background: #ffffff,
  transition: all 150ms ease-in-out,
  
  // Focus state
  focus: (
    border-color: #6e6e80,    // Darker gray border on focus
    outline: none,
    box-shadow: none          // No glow, just border color change
  ),
  
  // Label styling
  label: (
    font-size: 14px,
    font-weight: 500,
    margin-bottom: 6px,
    color: #000000
  ),
  
  // Helper/error text
  helper: (
    font-size: 12px,
    margin-top: 4px,
    color: #6e6e80
  ),
  
  // Select/dropdown (as seen in screenshots)
  select: (
    height: 40px,
    padding-right: 32px,     // Space for dropdown arrow
    appearance: none,
    background-image: url('chevron-down.svg'),
    background-position: right 12px center,
    background-repeat: no-repeat
  ),
  
  // Textarea
  textarea: (
    padding: 12px,
    min-height: 100px,
    resize: vertical
  )
);
```

#### Navigation
```scss
$nav-config: (
  // Side navigation (as seen in OpenAI dashboard)
  sidenav: (
    width: 220px,             // Narrower than typical
    background: #f7f7f8,      // Light gray background
    padding: 16px 8px,
    item-height: 36px,
    item-padding: 8px 12px,
    item-border-radius: 6px,  // Subtle rounding
    item-margin-bottom: 2px,
    section-spacing: 24px,
    section-title: (
      font-size: 11px,
      font-weight: 600,
      text-transform: uppercase,
      letter-spacing: 0.5px,
      color: #6e6e80,
      padding: 8px 12px,
      margin-bottom: 4px
    ),
    active-item: (
      background: #ececf1,      // Rounded gray background
      color: #000000,            // Darkest text for selected
      font-weight: 500
    ),
    hover-item: (
      background: #f7f7f8,       // Lighter shade than selected
      color: #2d2d3a,            // Darker than default gray
      font-weight: 400
    )
  ),
  
  // Top app bar (minimal design)
  appbar: (
    height: 48px,            // Compact height
    padding: 0 24px,
    background: #ffffff,
    border-bottom: 1px solid #ececf1,
    elevation: 0,
    
    // Breadcrumb navigation
    breadcrumb: (
      separator: '/',
      separator-margin: 0 8px,
      font-size: 14px,
      color: #6e6e80
    )
  ),
  
  // Tab navigation (as seen in dashboard)
  tabs: (
    height: 40px,
    border-bottom: 1px solid #ececf1,
    item-padding: 0 16px,
    item-margin-right: 4px,
    active-indicator-height: 2px,
    active-indicator-color: #000000,
    font-size: 14px,
    font-weight: 500
  ),
  
  // Dropdown menus
  dropdown: (
    min-width: 200px,
    padding: 4px,
    border-radius: 8px,
    border: 1px solid #ececf1,
    background: #ffffff,
    shadow: 0 4px 12px rgba(0, 0, 0, 0.08),
    item: (
      height: 36px,
      padding: 8px 12px,
      border-radius: 4px,
      font-size: 14px,
      color: #6e6e80,              // Default gray text
      hover-background: #f7f7f8,   // Light gray on hover
      hover-color: #2d2d3a,         // Darker text on hover
      selected-background: #ececf1, // Darker gray when selected
      selected-color: #000000       // Black text when selected
    )
  )
);
```

#### Modals & Overlays
```scss
$modal-config: (
  // Modal container
  backdrop: rgba(0, 0, 0, 0.5),
  max-width: 600px,
  border-radius: 12px,
  padding: 24px,
  background: #ffffff,
  
  // Modal header
  header: (
    font-size: 18px,
    font-weight: 600,
    margin-bottom: 16px,
    padding-bottom: 16px,
    border-bottom: 1px solid #ececf1
  ),
  
  // Close button
  close-button: (
    position: absolute,
    top: 16px,
    right: 16px,
    size: 32px,
    icon-size: 16px,
    border-radius: 6px,
    background: transparent,
    hover-background: #f7f7f8
  )
);
```

#### Charts & Data Visualization
```scss
$chart-config: (
  // Based on dashboard screenshots
  colors: (
    primary: #8b5cf6,    // Purple for primary data
    secondary: #10a37f,  // Green for secondary
    tertiary: #3b82f6,   // Blue for tertiary
    quaternary: #f59e0b, // Amber for additional
    gray: #9b9bab        // Gray for inactive
  ),
  
  // Bar chart styling
  bar: (
    width: 100%,
    height: 200px,
    bar-spacing: 4px,
    bar-radius: 2px,
    grid-color: #f7f7f8,
    axis-color: #d9d9e3,
    label-size: 11px,
    label-color: #6e6e80
  ),
  
  // Metric display
  metric: (
    value-size: 32px,
    value-weight: 600,
    value-color: #000000,
    label-size: 14px,
    label-color: #6e6e80,
    change-positive: #10a37f,
    change-negative: #ef4444
  )
);
```

#### Badge & Pills
```scss
$badge-config: (
  // Status badges (as seen in dashboard)
  default: (
    height: 24px,
    padding: 4px 8px,
    border-radius: 12px,
    font-size: 12px,
    font-weight: 500,
    background: #f7f7f8,
    color: #6e6e80
  ),
  
  // State variants
  success: (
    background: rgba(16, 163, 127, 0.1),
    color: #10a37f
  ),
  
  failed: (
    background: rgba(239, 68, 68, 0.1),
    color: #ef4444
  ),
  
  pending: (
    background: rgba(245, 158, 11, 0.1),
    color: #f59e0b
  )
);
```

#### Search & Filters
```scss
$search-config: (
  // Search input (as seen in sidenav)
  input: (
    height: 36px,
    padding: 8px 12px 8px 36px,  // Left padding for icon
    border-radius: 6px,
    border: 1px solid #d9d9e3,
    font-size: 14px,
    placeholder-color: #9b9bab,
    icon-left: 12px,
    icon-size: 16px,
    icon-color: #6e6e80
  ),
  
  // Filter pills
  filter: (
    height: 32px,
    padding: 6px 12px,
    border-radius: 16px,
    border: 1px solid #d9d9e3,
    font-size: 13px,
    background: #ffffff,
    active-background: #000000,
    active-color: #ffffff,
    margin-right: 8px
  )
);
```

---

## 6. OpenAI-Inspired Design Principles

### 6.1 Visual Hierarchy
- **High Contrast**: Pure black (#000000) on white (#ffffff) for maximum readability
- **Minimal Color**: Green (#10a37f) reserved exclusively for primary CTAs
- **Monochromatic States**: All interactive states use gray shades, not colors
- **Clear Sections**: Use of subtle gray backgrounds (#f7f7f8) to define areas
- **Flat Design**: Minimal use of shadows and elevations

### 6.2 Spacing Philosophy
- **Generous Whitespace**: Large padding in cards (24px) and sections
- **Consistent Gaps**: 8px base unit with multiples (16px, 24px, 32px)
- **Compact Controls**: Smaller heights for inputs (40px) and buttons (36px)
- **Breathing Room**: Ample margins between sections (24px minimum)

### 6.3 Component Characteristics
- **Subtle Borders**: Light gray borders (#ececf1) instead of shadows
- **Minimal Border Radius**: Small radius (4-8px) for modern feel
- **Clean Typography**: Inter font with clear weight hierarchy (400, 500, 600)
- **Restrained Animation**: Quick transitions (150ms) with subtle effects

### 6.4 Interaction Patterns
- **Focus States**: Darker gray borders (#6e6e80) without glows or color changes
- **Hover Feedback**: Light gray rounded background (#f7f7f8) with darker text
- **Selected/Active States**: Darker gray background (#ececf1) with black text
- **Visual Hierarchy**: Progressive darkening - lightest for hover, medium for focus, darkest for selected
- **Loading States**: Skeleton screens with subtle animation

---

## 7. Angular 18 Features to Leverage

### 7.1 Core Features
- **Standalone Components**: All components should be standalone by default
- **Signals**: Use for reactive state management instead of BehaviorSubjects
- **New Control Flow**: Use @if, @for, @switch instead of *ngIf, *ngFor
- **Defer Blocks**: Lazy load heavy components with @defer
- **Inject Function**: Use inject() in constructor-less services
- **DestroyRef**: Use for cleanup instead of OnDestroy

### 7.2 Control Flow Syntax
```angular
<!-- Old (Angular 17 and below) -->
<div *ngIf="isVisible">Content</div>
<div *ngFor="let item of items; track item.id">{{item.name}}</div>

<!-- New (Angular 18) -->
@if (isVisible) {
  <div>Content</div>
}

@for (item of items; track item.id) {
  <div>{{item.name}}</div>
} @empty {
  <div>No items found</div>
}

@defer (on viewport) {
  <heavy-component />
} @placeholder {
  <div>Loading...</div>
} @loading (minimum 100ms) {
  <skeleton-loader />
}
```

### 7.3 Component Example with Angular 18 Features
```typescript
import { Component, signal, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'vt-data-table',
  standalone: true,
  template: `
    @if (loading()) {
      <vt-skeleton-table />
    } @else {
      <table>
        @for (row of sortedData(); track row.id) {
          <tr>
            <td>{{ row.name }}</td>
            <td>{{ row.value }}</td>
          </tr>
        } @empty {
          <tr><td colspan="2">No data available</td></tr>
        }
      </table>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtDataTableComponent {
  // Signals for reactive state
  data = signal<DataRow[]>([]);
  sortField = signal<string>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  loading = signal(false);
  
  // Computed signal for sorted data
  sortedData = computed(() => {
    const field = this.sortField();
    const dir = this.sortDirection();
    return [...this.data()].sort((a, b) => {
      const result = a[field] > b[field] ? 1 : -1;
      return dir === 'asc' ? result : -result;
    });
  });
  
  // Inject services
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  
  constructor() {
    // Load data on init
    this.loadData();
    
    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      // Cleanup logic here
    });
  }
}
```

---

## 8. Implementation Guidelines

### 8.1 NPM Package Structure

#### 8.1.1 Library Setup
```json
// package.json
{
  "name": "@venntier/design-system",
  "version": "1.0.0",
  "private": true,
  "peerDependencies": {
    "@angular/animations": "^18.0.0",
    "@angular/cdk": "^18.0.0",
    "@angular/common": "^18.0.0",
    "@angular/core": "^18.0.0",
    "@angular/material": "^18.0.0"
  },
  "exports": {
    "./theme": {
      "sass": "./src/styles/_index.scss"
    },
    "./styles": {
      "sass": "./src/styles/_all.scss",
      "css": "./dist/styles/design-system.css"
    }
  },
  "ng-package": {
    "dest": "dist",
    "lib": {
      "entryFile": "src/public-api.ts",
      "styleIncludePaths": ["src/styles"]
    },
    "assets": [
      "src/styles/**/*.scss",
      "src/assets/**/*"
    ]
  }
}
```

#### 8.1.2 Public API
```typescript
// src/public-api.ts
// Standalone Component exports
export * from './lib/components/button/button.component';
export * from './lib/components/card/card.component';
export * from './lib/components/input/input.component';
export * from './lib/components/navigation/navigation.component';

// Service exports
export * from './lib/services/theme.service';
export * from './lib/services/responsive.service';
export * from './lib/services/breakpoint.service';

// Directive exports
export * from './lib/directives/ripple.directive';
export * from './lib/directives/elevation.directive';

// Token exports
export * from './lib/tokens/theme.token';
export * from './lib/tokens/config.token';

// Type exports
export * from './lib/types/theme.types';
export * from './lib/types/component.types';

// Provider functions for app.config.ts
export * from './lib/providers/design-system.providers';

// SCSS mixins and functions (via package.json exports field)
// These are exported via ng-package.json assets configuration
```

#### 8.1.3 Component Structure (Angular 18 Standalone)
```typescript
// src/lib/components/button/button.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'vt-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatRippleModule],
  template: `
    <button 
      mat-button
      [class]="buttonClass"
      [disabled]="disabled"
      [type]="type">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class VtButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  private theme = inject(ThemeService);
  
  get buttonClass(): string {
    return `vt-button vt-button--${this.variant} vt-button--${this.size}`;
  }
}

// For backwards compatibility, also export a module
@NgModule({
  imports: [VtButtonComponent],
  exports: [VtButtonComponent]
})
export class VtButtonModule { }
```

### 8.2 Angular Material Configuration

#### 8.2.1 Material Design 3 Theme Setup
```scss
// styles/themes/_core.scss
@use '@angular/material' as mat;

// Create M3 theme with design tokens
@function create-vt-theme($type: light, $density: 0) {
  @return mat.define-theme((
    color: (
      theme-type: $type,
      primary: mat.$green-palette,     // Will be overridden with tokens
      tertiary: mat.$violet-palette,   // For data viz
      use-system-variables: true,
      system-variables-prefix: md-sys-color,
    ),
    typography: (
      use-system-variables: true, 
      system-variables-prefix: md-sys-typescale,
      brand-family: 'Inter',
      plain-family: 'Inter',
    ),
    density: (
      scale: $density  // -2 compact, 0 default, 2 comfortable
    ),
  ));
}

// styles/tokens/_sys-color.scss
// OpenAI-inspired color tokens for M3
:root {
  // Primary colors (monochrome)
  --md-sys-color-primary: #000000;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #2d2d3a;
  --md-sys-color-on-primary-container: #ffffff;
  
  // Secondary colors (green accent)
  --md-sys-color-secondary: #10a37f;
  --md-sys-color-on-secondary: #ffffff;
  --md-sys-color-secondary-container: #e6f9f0;
  --md-sys-color-on-secondary-container: #07624a;
  
  // Tertiary colors (purple for data viz)
  --md-sys-color-tertiary: #8b5cf6;
  --md-sys-color-on-tertiary: #ffffff;
  --md-sys-color-tertiary-container: #f3efff;
  --md-sys-color-on-tertiary-container: #3d1e8f;
  
  // Surface colors
  --md-sys-color-surface: #ffffff;
  --md-sys-color-on-surface: #000000;
  --md-sys-color-surface-variant: #f7f7f8;
  --md-sys-color-on-surface-variant: #6e6e80;
  
  // Background
  --md-sys-color-background: #ffffff;
  --md-sys-color-on-background: #000000;
  
  // Outline
  --md-sys-color-outline: #ececf1;
  --md-sys-color-outline-variant: #d9d9e3;
  
  // Error, Warning colors
  --md-sys-color-error: #ef4444;
  --md-sys-color-on-error: #ffffff;
  --md-sys-color-error-container: #fef2f2;
  --md-sys-color-on-error-container: #7f1d1d;
}

// Dark theme tokens
.dark-theme {
  --md-sys-color-primary: #ffffff;
  --md-sys-color-on-primary: #000000;
  --md-sys-color-primary-container: #d9d9e3;
  --md-sys-color-on-primary-container: #000000;
  
  --md-sys-color-surface: #171717;
  --md-sys-color-on-surface: #ffffff;
  --md-sys-color-surface-variant: #212121;
  --md-sys-color-on-surface-variant: #c5c5d2;
  
  --md-sys-color-background: #000000;
  --md-sys-color-on-background: #ffffff;
  
  --md-sys-color-outline: #2d2d3a;
  --md-sys-color-outline-variant: #565869;
}

// styles/tokens/_sys-typescale.scss
:root {
  // Display styles
  --md-sys-typescale-display-large-font: 'Inter';
  --md-sys-typescale-display-large-size: 57px;
  --md-sys-typescale-display-large-line-height: 64px;
  --md-sys-typescale-display-large-weight: 400;
  
  // Headline styles
  --md-sys-typescale-headline-large-font: 'Inter';
  --md-sys-typescale-headline-large-size: 32px;
  --md-sys-typescale-headline-large-line-height: 40px;
  --md-sys-typescale-headline-large-weight: 500;
  
  // Body styles
  --md-sys-typescale-body-large-font: 'Inter';
  --md-sys-typescale-body-large-size: 16px;
  --md-sys-typescale-body-large-line-height: 24px;
  --md-sys-typescale-body-large-weight: 400;
  
  // Label styles
  --md-sys-typescale-label-large-font: 'Inter';
  --md-sys-typescale-label-large-size: 14px;
  --md-sys-typescale-label-large-line-height: 20px;
  --md-sys-typescale-label-large-weight: 500;
}

// styles/_m3-theme.scss
@use '@angular/material' as mat;
@use './themes/core' as core;

// Generate themes
$light-theme: core.create-vt-theme($type: light);
$dark-theme: core.create-vt-theme($type: dark);

// Apply themes
:root {
  @include mat.all-component-themes($light-theme);
  
  // Import token files
  @import './tokens/sys-color';
  @import './tokens/sys-typescale';
}

.dark-theme {
  @include mat.all-component-colors($dark-theme);
}

// Component overrides using M3 tokens
@import './overrides/button';
@import './overrides/card';
@import './overrides/input';
```

#### 8.2.2 Component Token Overrides (M3 Approach)
```scss
// styles/overrides/_button.scss
@use '@angular/material' as mat;

// Override Material button tokens for OpenAI aesthetic
@include mat.button-overrides((
  // Filled button (primary CTA)
  filled-container-color: var(--md-sys-color-secondary),        // Green
  filled-label-text-color: var(--md-sys-color-on-secondary),
  filled-hover-state-layer-color: rgba(16, 163, 127, 0.08),
  filled-pressed-state-layer-color: rgba(16, 163, 127, 0.12),
  filled-container-height: 36px,
  filled-container-shape: 6px,
  
  // Outlined button (secondary)
  outlined-container-color: transparent,
  outlined-outline-color: var(--md-sys-color-outline),
  outlined-label-text-color: var(--md-sys-color-on-surface),
  outlined-hover-state-layer-color: var(--md-sys-color-surface-variant),
  outlined-container-height: 36px,
  outlined-outline-width: 1px,
  
  // Text button (ghost)
  text-label-text-color: var(--md-sys-color-on-surface-variant),
  text-hover-state-layer-color: rgba(0, 0, 0, 0.04),
  text-pressed-state-layer-color: rgba(0, 0, 0, 0.08),
  text-container-height: 36px,
  
  // Icon button
  icon-size: 20px,
  icon-container-height: 32px,
  icon-container-width: 32px,
  icon-container-shape: 6px,
  
  // Common tokens
  label-text-font: var(--md-sys-typescale-label-large-font),
  label-text-size: var(--md-sys-typescale-label-large-size),
  label-text-weight: var(--md-sys-typescale-label-large-weight),
  container-elevation: 0,
  disabled-container-opacity: 0.38,
  focus-indicator-color: transparent,  // No colored focus rings
));

// Custom button class using tokens
.vt-button {
  // Primary variant (green CTA)
  &--primary {
    --mdc-filled-button-container-color: var(--md-sys-color-secondary);
    --mdc-filled-button-label-text-color: var(--md-sys-color-on-secondary);
  }
  
  // Secondary variant (monochrome)
  &--secondary {
    --mdc-outlined-button-outline-color: var(--md-sys-color-outline);
    --mdc-outlined-button-label-text-color: var(--md-sys-color-on-surface);
    
    &:hover {
      --mdc-outlined-button-outline-color: var(--md-sys-color-outline-variant);
    }
  }
  
  // Ghost variant
  &--ghost {
    --mdc-text-button-label-text-color: var(--md-sys-color-on-surface-variant);
    
    &:hover {
      background-color: var(--md-sys-color-surface-variant);
    }
  }
}
```

#### 8.2.3 Using System Variables
```scss
// styles/overrides/_card.scss
@use '@angular/material' as mat;

// Card component tokens
@include mat.card-overrides((
  container-color: var(--md-sys-color-surface),
  container-elevation: 0,
  container-shadow-color: transparent,
  container-shape: 8px,
  outlined-container-color: var(--md-sys-color-surface),
  outlined-outline-color: var(--md-sys-color-outline),
  outlined-outline-width: 1px,
));

// Custom card styles with tokens
.vt-card {
  background: var(--md-sys-color-surface);
  border: 1px solid var(--md-sys-color-outline);
  border-radius: 8px;
  padding: 24px;
  
  &--elevated {
    border: none;
    background: var(--md-sys-color-surface-variant);
  }
  
  &__title {
    color: var(--md-sys-color-on-surface);
    font: var(--md-sys-typescale-headline-medium);
  }
  
  &__content {
    color: var(--md-sys-color-on-surface-variant);
    font: var(--md-sys-typescale-body-large);
  }
}
```

### 8.3 CSS Custom Properties Strategy

```scss
// styles/_variables.scss
:root {
  // Spacing
  --spacing-0: 0;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 16px;
  --spacing-4: 24px;
  --spacing-5: 32px;
  --spacing-6: 40px;
  --spacing-7: 48px;
  --spacing-8: 56px;
  --spacing-9: 64px;
  --spacing-10: 80px;
  --spacing-11: 96px;
  
  // Border radius
  --radius-0: 0;
  --radius-1: 4px;
  --radius-2: 8px;
  --radius-3: 12px;
  --radius-4: 16px;
  --radius-5: 24px;
  --radius-full: 9999px;
  
  // Transitions
  --transition-fast: 150ms ease-in-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
  
  // Z-index layers
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

// Light theme variables
:root,
.light-theme {
  --color-background: #ffffff;
  --color-surface: #fafafa;
  --color-surface-variant: #f5f5f5;
  --color-on-surface: rgba(0, 0, 0, 0.87);
  --color-on-surface-variant: rgba(0, 0, 0, 0.60);
  --color-outline: rgba(0, 0, 0, 0.12);
  --color-outline-variant: rgba(0, 0, 0, 0.06);
}

// Dark theme variables
.dark-theme {
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-surface-variant: #242424;
  --color-on-surface: rgba(255, 255, 255, 0.87);
  --color-on-surface-variant: rgba(255, 255, 255, 0.60);
  --color-outline: rgba(255, 255, 255, 0.12);
  --color-outline-variant: rgba(255, 255, 255, 0.06);
}
```

### 8.4 Component Architecture

#### 8.4.1 Theme Service (Angular 18 Signals)
```typescript
// services/theme.service.ts
import { Injectable, signal, effect, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signals for reactive state
  private readonly _isDarkMode = signal(false);
  private readonly _primaryColor = signal('#10a37f');
  private readonly _density = signal<-2 | -1 | 0 | 1>(0);
  
  // Public readonly signals
  readonly isDarkMode = this._isDarkMode.asReadonly();
  readonly primaryColor = this._primaryColor.asReadonly();
  readonly density = this._density.asReadonly();
  
  // Computed values
  readonly themeClass = computed(() => 
    this._isDarkMode() ? 'dark-theme' : 'light-theme'
  );
  
  // Observable interop for backwards compatibility
  readonly isDarkMode$ = toObservable(this._isDarkMode);
  
  constructor() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('vt-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this._isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    
    // Apply theme to document with effect
    effect(() => {
      const isDark = this._isDarkMode();
      const themeClass = this.themeClass();
      
      document.documentElement.classList.remove('light-theme', 'dark-theme');
      document.documentElement.classList.add(themeClass);
      
      // Update CSS custom properties
      document.documentElement.style.setProperty('--vt-density', `${this._density()}`);
      
      // Persist preference
      localStorage.setItem('vt-theme', isDark ? 'dark' : 'light');
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('vt-theme')) {
          this._isDarkMode.set(e.matches);
        }
      });
  }
  
  toggleTheme(): void {
    this._isDarkMode.update(value => !value);
  }
  
  setTheme(isDark: boolean): void {
    this._isDarkMode.set(isDark);
  }
  
  setDensity(density: -2 | -1 | 0 | 1): void {
    this._density.set(density);
  }
}
```

#### 8.4.2 Responsive Helper Service (Signals-based)
```typescript
// services/responsive.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);
  
  // Breakpoint definitions
  private readonly breakpointQueries = {
    xs: '(max-width: 599px)',
    sm: '(min-width: 600px) and (max-width: 959px)',
    md: '(min-width: 960px) and (max-width: 1279px)',
    lg: '(min-width: 1280px) and (max-width: 1919px)',
    xl: '(min-width: 1920px)'
  } as const;
  
  // Convert observables to signals
  private readonly breakpointStates = Object.entries(this.breakpointQueries).reduce(
    (acc, [key, query]) => ({
      ...acc,
      [key]: toSignal(
        this.breakpointObserver.observe(query).pipe(
          map(result => result.matches)
        ),
        { initialValue: false }
      )
    }),
    {} as Record<keyof typeof this.breakpointQueries, ReturnType<typeof signal<boolean>>>
  );
  
  // Current breakpoint as computed signal
  readonly currentBreakpoint = computed(() => {
    for (const [key, signal] of Object.entries(this.breakpointStates)) {
      if (signal()) return key;
    }
    return 'lg'; // default
  });
  
  // Computed device type signals
  readonly isHandset = computed(() => this.breakpointStates.xs());
  readonly isTablet = computed(() => this.breakpointStates.sm());
  readonly isDesktop = computed(() => 
    this.breakpointStates.md() || 
    this.breakpointStates.lg() || 
    this.breakpointStates.xl()
  );
  
  // Helper method for custom breakpoint queries
  observeBreakpoint(query: string) {
    return toSignal(
      this.breakpointObserver.observe(query).pipe(
        map(result => result.matches)
      ),
      { initialValue: false }
    );
  }
}
```

---

## 9. Package Usage & Integration

### 9.1 Installation in Consuming Applications
```bash
# Install from private registry
npm install @venntier/design-system --save

# Or using GitHub Packages
npm install @venntier/design-system --registry=https://npm.pkg.github.com
```

### 9.2 Application Setup (Angular 18)
```typescript
// main.ts - Bootstrap with standalone components
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideVenntierDesignSystem } from '@venntier/design-system';

bootstrapApplication(AppComponent, {
  providers: [
    provideVenntierDesignSystem({
      theme: 'light',
      ripple: true,
      animations: true
    }),
    // other providers
  ]
});

// Or in app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideVenntierDesignSystem } from '@venntier/design-system';

export const appConfig: ApplicationConfig = {
  providers: [
    provideVenntierDesignSystem(),
    // other providers
  ]
};
```

### 9.3 Style Integration
```scss
// styles.scss
// Import the complete theme
@use '@venntier/design-system/theme' as vt-theme;

// Or import specific parts
@use '@venntier/design-system/theme/colors';
@use '@venntier/design-system/theme/typography';
@use '@venntier/design-system/theme/spacing';

// Apply the theme
@include vt-theme.apply-theme();

// Optional: Override specific tokens
:root {
  --vt-primary-color: #{vt-theme.$primary-500};
}
```

### 9.4 Component Usage
```typescript
// component.ts - Standalone component approach
import { Component } from '@angular/core';
import { VtButtonComponent, VtCardComponent } from '@venntier/design-system';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [VtButtonComponent, VtCardComponent],
  template: `
    <vt-card>
      <h2>Example Card</h2>
      <vt-button variant="primary" size="medium">
        Primary Action
      </vt-button>
      <vt-button variant="secondary" size="medium">
        Secondary Action
      </vt-button>
    </vt-card>
  `
})
export class ExampleComponent { }
```

---

## 10. Material 3 Migration Considerations

### 10.1 M3 vs M2 Differences
- **Token-based theming**: M3 uses CSS custom properties instead of SASS maps
- **Palette limitations**: Currently only predefined M3 palettes (no custom palette generation yet)
- **Component styling**: Use override mixins instead of deep selectors
- **Color roles**: New container/on-container pattern for accessibility
- **Elevation**: Replaced with surface tints and outlines

### 10.2 Backward Compatibility
```scss
// For gradual migration, prefix M2 APIs with 'm2-'
@use '@angular/material' as mat;

// M2 palette (if needed for migration)
$m2-palette: mat.$m2-indigo-palette;

// Can mix M2 and M3 approaches during migration
```

### 10.3 Known Limitations (Angular Material 18)
- Custom color palette generation not yet available
- Some components may not fully support all M3 tokens
- Override API still evolving (check Angular Material docs)
- Performance impact of many CSS custom properties

### 10.4 Migration Path
1. **Phase 1**: Update to Angular 18, keep existing M2 themes working
2. **Phase 2**: Introduce M3 tokens alongside M2 (parallel run)
3. **Phase 3**: Migrate components to use M3 tokens
4. **Phase 4**: Remove M2 dependencies

---

## 11. Migration Strategy

### 11.1 Phase 1: Library Foundation (Week 1-2)
- Set up Angular library project with ng-packagr
- Configure Material Design 3 integration
- Establish build pipeline for npm package
- Set up private npm registry or GitHub Packages
- Create base theme configuration and tokens

### 11.2 Phase 2: Core Components (Week 3-4)
- Extend Material components with custom theming
- Create reusable component wrappers
- Implement form controls suite
- Build layout and container components
- Export all components through public API

### 11.3 Phase 3: Package Features (Week 5-6)
- Add utility classes and mixins
- Create service providers
- Implement theme switching mechanism
- Add schematic for easy installation
- Create migration tools for existing apps

### 11.4 Phase 4: Documentation & Release (Week 7-8)
- Create comprehensive API documentation
- Build Storybook for component showcase
- Write migration guides
- Set up automated release pipeline
- Publish initial version to private registry

---

## 12. Performance Considerations

### 12.1 Bundle Size Optimization
- Use Angular's tree-shaking for unused Material components
- Implement lazy loading for theme variations
- Use CSS containment for complex components
- Minimize CSS custom property usage in hot paths

### 12.2 Runtime Performance
- Use OnPush change detection strategy by default
- Leverage Angular 18 signals for fine-grained reactivity
- Implement virtual scrolling for large lists (CDK Virtual Scroll)
- Use track-by functions in @for loops (new control flow)
- Debounce theme switching animations
- Use defer blocks for lazy loading heavy components

### 12.3 Build Optimization
```json
// angular.json optimizations
{
  "optimization": {
    "scripts": true,
    "styles": {
      "minify": true,
      "inlineCritical": true
    },
    "fonts": true
  },
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kb",
      "maximumError": "4kb"
    }
  ]
}
```

---

## 13. Accessibility Requirements

### 13.1 WCAG 2.1 AA Compliance
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text
- Focus indicators: Visible and high contrast
- Keyboard navigation: All interactive elements accessible
- Screen reader support: Proper ARIA labels and roles

### 13.2 Motion & Animation
```scss
// Respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 14. Testing Strategy

### 14.1 Visual Regression Testing
- Implement Chromatic or Percy for visual testing
- Test all components in both themes
- Verify responsive behavior at all breakpoints
- Check high contrast mode compatibility

### 14.2 Unit Testing
```typescript
// Example component test
describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let themeService: ThemeService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [ThemeService]
    });
    
    component = TestBed.createComponent(ThemeToggleComponent).componentInstance;
    themeService = TestBed.inject(ThemeService);
  });
  
  it('should toggle theme on click', () => {
    spyOn(themeService, 'toggleTheme');
    component.handleClick();
    expect(themeService.toggleTheme).toHaveBeenCalled();
  });
});
```

### 14.3 E2E Testing
- Test theme persistence across sessions
- Verify responsive breakpoints
- Check accessibility with axe-core
- Test keyboard navigation flows

---

## 15. Documentation Requirements

### 15.1 Developer Documentation
- Component API documentation
- Theme customization guide
- Migration guide from previous versions
- Best practices and patterns

### 15.2 Design Documentation
- Design tokens reference
- Component usage guidelines
- Accessibility guidelines
- Brand guidelines integration

### 15.3 Tools & Resources
- Figma design library
- Storybook component explorer
- Code snippets and templates
- CLI generators for common patterns

---

## 16. Success Metrics

### 16.1 Technical Metrics
- Bundle size < 500KB initial load
- Lighthouse score > 95
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s

### 16.2 Quality Metrics
- 100% accessibility audit pass
- Zero console errors/warnings
- 90%+ code coverage
- All visual regression tests passing

### 16.3 Developer Experience
- Component creation time reduced by 50%
- Design-to-development handoff time reduced by 40%
- Consistent code patterns across team
- Positive developer satisfaction scores

---

## 17. Development Setup & Commands

### 17.1 Initial Project Setup
```bash
# Create workspace
ng new venntier-design-system --no-create-application --package-manager=npm
cd venntier-design-system

# Generate library
ng generate library @venntier/design-system --prefix=vt

# Generate demo app
ng generate application demo --style=scss --routing --ssr=false

# Add Angular Material with M3
ng add @angular/material
# Choose: Custom theme, typography: yes, animations: yes

# Install additional dependencies
npm install @fontsource/inter --save
```

### 17.2 Development Commands
```bash
# Serve demo app with library watch
ng build @venntier/design-system --watch &
ng serve demo

# Run tests
ng test @venntier/design-system
ng test demo --watch=false

# Lint
ng lint

# Build library for production
ng build @venntier/design-system --configuration=production

# Build demo app
ng build demo --configuration=production
```

### 17.3 Library Publishing
```bash
# Build library
ng build @venntier/design-system --configuration=production

# Navigate to dist
cd dist/venntier/design-system

# Pack for local testing
npm pack

# Publish to registry (private)
npm publish --registry=https://your-registry.com

# Or publish to GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

### 17.4 Schematic Support (Future)
```json
// ng-package.json
{
  "schematics": "./schematics/collection.json",
  "ng-add": {
    "save": "dependencies"
  }
}
```

---

## 18. Maintenance & Governance

### 18.1 Version Control
- Semantic versioning for releases
- Changelog maintenance
- Breaking change communication
- Deprecation policy (6-month notice)

### 18.2 Review Process
- Design system committee reviews
- Quarterly design audits
- Performance monitoring
- User feedback integration

### 18.3 Contribution Guidelines
- Pull request templates
- Code review checklist
- Design review process
- Documentation requirements

---

## Appendix A: NPM Package Benefits

### Cross-Application Consistency
- **Single Source of Truth**: All design tokens, components, and styles managed in one place
- **Version Control**: Controlled updates across all applications with semantic versioning
- **Reduced Duplication**: No need to copy styles between projects
- **Consistent Updates**: Design changes propagate to all apps with a simple package update

### Developer Efficiency
- **Rapid Development**: Pre-built, tested components ready to use
- **Type Safety**: Full TypeScript support with exported types
- **IDE Support**: IntelliSense and autocomplete for all components and services
- **Reduced Onboarding**: New developers familiar with one app can work on any app

### Maintenance Benefits
- **Centralized Bug Fixes**: Fix once, update everywhere
- **Automated Testing**: Components tested in isolation before distribution
- **Documentation**: Single documentation source for all teams
- **Dependency Management**: Material Design updates handled centrally

---

## Appendix B: File Structure (Angular 18 Best Practices)

```
projects/
├── @venntier/design-system/        # Main library project
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/         # Standalone components
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.component.ts
│   │   │   │   │   ├── button.component.spec.ts
│   │   │   │   │   └── button.component.scss
│   │   │   │   ├── card/
│   │   │   │   ├── input/
│   │   │   │   └── navigation/
│   │   │   ├── services/
│   │   │   │   ├── theme.service.ts
│   │   │   │   ├── theme.service.spec.ts
│   │   │   │   ├── responsive.service.ts
│   │   │   │   └── breakpoint.service.ts
│   │   │   ├── directives/          # Standalone directives
│   │   │   │   ├── ripple.directive.ts
│   │   │   │   └── elevation.directive.ts
│   │   │   ├── tokens/              # Injection tokens & providers
│   │   │   │   ├── theme.token.ts
│   │   │   │   └── config.token.ts
│   │   │   └── types/
│   │   │       ├── theme.types.ts
│   │   │       └── component.types.ts
│   │   ├── styles/                  # Global styles (exported separately)
│   │   │   ├── index.scss           # Main entry point
│   │   │   ├── _m3-theme.scss       # M3 theme configuration
│   │   │   ├── tokens/              # Design tokens (M3 approach)
│   │   │   │   ├── _sys-color.scss     # System color tokens (md-sys-color)
│   │   │   │   ├── _sys-typescale.scss # Typography tokens (md-sys-typescale)
│   │   │   │   ├── _ref-palette.scss   # Reference palette
│   │   │   │   ├── _sys-motion.scss    # Motion tokens
│   │   │   │   └── _sys-shape.scss     # Shape tokens
│   │   │   ├── themes/              # Theme definitions
│   │   │   │   ├── _light.scss     # Light theme
│   │   │   │   ├── _dark.scss      # Dark theme
│   │   │   │   └── _core.scss      # Core theme function
│   │   │   ├── overrides/           # Component token overrides
│   │   │   │   ├── _button.scss    # Button component tokens
│   │   │   │   ├── _card.scss      # Card component tokens
│   │   │   │   └── _input.scss     # Input component tokens
│   │   │   └── utilities/
│   │   │       ├── _functions.scss
│   │   │       ├── _mixins.scss
│   │   │       └── _helpers.scss
│   │   ├── assets/
│   │   │   └── fonts/
│   │   │       ├── inter/
│   │   │       └── roboto/
│   │   └── public-api.ts           # Public exports
│   ├── ng-package.json              # Library configuration
│   ├── package.json
│   ├── tsconfig.lib.json
│   ├── tsconfig.lib.prod.json
│   └── tsconfig.spec.json
│
├── demo/                            # Demo/test application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts    # Standalone root component
│   │   │   ├── app.config.ts       # Application configuration
│   │   │   └── examples/
│   │   ├── styles.scss
│   │   └── main.ts
│   ├── angular.json
│   └── tsconfig.app.json
│
├── dist/                            # Build output
├── node_modules/
├── angular.json                     # Workspace configuration
├── package.json                     # Workspace dependencies
├── tsconfig.json                    # Base TypeScript config
├── .npmrc                           # NPM configuration
├── .nvmrc                           # Node version
└── README.md
```

### Secondary Entry Points (Optional)
```
projects/
├── @venntier/design-system/
│   ├── testing/                    # Secondary entry point
│   │   ├── src/
│   │   │   ├── harnesses/
│   │   │   └── test-utils.ts
│   │   ├── ng-package.json
│   │   └── public-api.ts
│   └── schematics/                 # Angular schematics
│       ├── ng-add/
│       ├── ng-update/
│       └── collection.json
```

---

## Appendix C: Quick Reference

### Spacing Classes
```scss
.spacing-0 { margin: 0; padding: 0; }
.spacing-1 { margin: 4px; padding: 4px; }
.spacing-2 { margin: 8px; padding: 8px; }
.spacing-3 { margin: 16px; padding: 16px; }
.spacing-4 { margin: 24px; padding: 24px; }
.spacing-5 { margin: 32px; padding: 32px; }
```

### Typography Classes
```scss
.display-large { /* 57px/64px */ }
.headline-large { /* 32px/40px */ }
.title-large { /* 22px/28px */ }
.body-large { /* 16px/24px */ }
.label-large { /* 14px/20px */ }
```

### Color Utilities
```scss
.bg-primary { background: var(--color-primary); }
.bg-secondary { background: var(--color-secondary); }
.text-primary { color: var(--color-on-surface); }
.text-secondary { color: var(--color-on-surface-variant); }
.border-primary { border-color: var(--color-outline); }
```

---

*Document Version: 1.0.0*  
*Last Updated: January 2025*  
*Status: Ready for Implementation*