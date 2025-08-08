/*
 * Public API Surface of @venntier/design-system
 * 
 * Venntier Design System v3 - Angular 19 + Material Design 3
 * OpenAI-inspired minimalist design with monochromatic interaction states
 */

// Service exports
export * from './lib/theme.service';

// Component exports
export * from './lib/components';

// Type exports
export type VenntierTheme = 'light' | 'dark';

// Constants
export const VENNTIER_THEME_CONFIG = {
  defaultTheme: 'light' as const,
  storageKey: 'vt-theme-preference',
  cssVariablePrefix: 'md-sys',
  themes: {
    light: 'vt-theme-light',
    dark: 'vt-theme-dark'
  }
} as const;

// Design tokens access (for runtime usage)
export const VENNTIER_TOKENS = {
  colors: {
    primary: 'var(--md-sys-color-primary)',
    secondary: 'var(--md-sys-color-secondary)',
    tertiary: 'var(--md-sys-color-tertiary)',
    surface: 'var(--md-sys-color-surface)',
    background: 'var(--md-sys-color-background)',
    error: 'var(--md-sys-color-error)',
    hover: 'var(--md-sys-color-hover)',
    selected: 'var(--md-sys-color-selected)',
    focusRing: 'var(--md-sys-color-focus-ring)'
  },
  spacing: {
    xs: 'var(--md-sys-spacing-1)',
    sm: 'var(--md-sys-spacing-2)',
    md: 'var(--md-sys-spacing-4)',
    lg: 'var(--md-sys-spacing-6)',
    xl: 'var(--md-sys-spacing-8)'
  },
  shape: {
    sm: 'var(--md-sys-shape-corner-small)',
    md: 'var(--md-sys-shape-corner-medium)',
    lg: 'var(--md-sys-shape-corner-large)',
    full: 'var(--md-sys-shape-corner-full)'
  },
  motion: {
    short: 'var(--md-sys-motion-duration-short)',
    medium: 'var(--md-sys-motion-duration-medium)',
    long: 'var(--md-sys-motion-duration-long)',
    standard: 'var(--md-sys-motion-easing-standard)'
  }
} as const;

/*
 * SCSS Theme Usage
 * 
 * Import the theme in your styles.scss:
 * @use '@venntier/design-system/theme' as vt-theme;
 * 
 * Or import tokens directly:
 * @use '@venntier/design-system/tokens' as vt-tokens;
 * 
 * Access design tokens:
 * .my-component {
 *   color: vt-tokens.color('primary');
 *   padding: vt-tokens.spacing(4);
 *   border-radius: vt-tokens.shape('medium');
 * }
 */
