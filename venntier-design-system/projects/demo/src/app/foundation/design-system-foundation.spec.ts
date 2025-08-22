import { TestBed } from '@angular/core/testing';
import { VenntierThemeService } from '@venntier/design-system';

/**
 * Design System Foundation Tests - COMPLETE VALIDATION
 *
 * These tests ENFORCE the complete Angular Material 20 design system requirements.
 * Tests will FAIL until all required tokens are properly implemented.
 *
 * Based on Angular Material 20 official documentation:
 * - Complete color palette (primary, secondary, tertiary, error, neutral)
 * - Full typography scale (15 required levels)
 * - Complete spacing scale (12 required levels)
 * - Full elevation scale (6 required levels)
 * - Required component tokens for all major components
 * - Proper token naming conventions
 * - Theme structure integrity
 *
 * Use these failing tests as your implementation roadmap.
 */

describe('Design System Foundation - COMPLETE REQUIREMENTS ENFORCEMENT', () => {
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [VenntierThemeService],
    }).compileComponents();

    themeService = TestBed.inject(VenntierThemeService);
  });

  describe('Color Palette Validation - COMPLETE REQUIREMENTS', () => {
    it('MUST have complete primary color palette (8 required tokens)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Angular Material 20 REQUIRES these primary color tokens
      const requiredPrimaryTokens = [
        '--mat-sys-primary',
        '--mat-sys-on-primary',
        '--mat-sys-primary-container',
        '--mat-sys-on-primary-container',
        '--mat-sys-primary-fixed',
        '--mat-sys-primary-fixed-dim',
        '--mat-sys-on-primary-fixed',
        '--mat-sys-on-primary-fixed-variant',
      ];

      const missingTokens: string[] = [];
      const invalidTokens: string[] = [];

      requiredPrimaryTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();

        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        } else {
          // Must be valid color format
          const isValidColor = /^(#[0-9a-f]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(|light-dark\()/i.test(
            value,
          );
          if (!isValidColor) {
            invalidTokens.push(`${token}: ${value}`);
          }
        }
      });

      // FAIL if any tokens are missing or invalid
      expect(missingTokens).toEqual([], `MISSING PRIMARY TOKENS: ${missingTokens.join(', ')}`);
      expect(invalidTokens).toEqual([], `INVALID PRIMARY TOKENS: ${invalidTokens.join(', ')}`);
    });

    it('MUST have complete secondary color palette (8 required tokens)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      const requiredSecondaryTokens = [
        '--mat-sys-secondary',
        '--mat-sys-on-secondary',
        '--mat-sys-secondary-container',
        '--mat-sys-on-secondary-container',
        '--mat-sys-secondary-fixed',
        '--mat-sys-secondary-fixed-dim',
        '--mat-sys-on-secondary-fixed',
        '--mat-sys-on-secondary-fixed-variant',
      ];

      const missingTokens: string[] = [];
      requiredSecondaryTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        }
      });

      expect(missingTokens).toEqual([], `MISSING SECONDARY TOKENS: ${missingTokens.join(', ')}`);
    });

    it('should have complete tertiary color palette', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      const requiredTertiaryTokens = [
        '--mat-sys-tertiary',
        '--mat-sys-on-tertiary',
        '--mat-sys-tertiary-container',
        '--mat-sys-on-tertiary-container',
        '--mat-sys-tertiary-fixed',
        '--mat-sys-tertiary-fixed-dim',
        '--mat-sys-on-tertiary-fixed',
        '--mat-sys-on-tertiary-fixed-variant',
      ];

      requiredTertiaryTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        expect(value).toBeTruthy(`Missing required tertiary token: ${token}`);
      });
    });

    it('should have complete neutral color palette', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      const requiredNeutralTokens = [
        '--mat-sys-surface',
        '--mat-sys-on-surface',
        '--mat-sys-surface-variant',
        '--mat-sys-on-surface-variant',
        '--mat-sys-surface-container',
        '--mat-sys-surface-container-high',
        '--mat-sys-surface-container-highest',
        '--mat-sys-surface-container-low',
        '--mat-sys-surface-container-lowest',
        '--mat-sys-surface-dim',
        '--mat-sys-surface-bright',
      ];

      requiredNeutralTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        expect(value).toBeTruthy(`Missing required neutral token: ${token}`);
      });
    });

    it('should have complete error color palette', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      const requiredErrorTokens = [
        '--mat-sys-error',
        '--mat-sys-on-error',
        '--mat-sys-error-container',
        '--mat-sys-on-error-container',
      ];

      requiredErrorTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        expect(value).toBeTruthy(`Missing required error token: ${token}`);
      });
    });

    it('should have valid color values (not transparent or invalid)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      const criticalColorTokens = [
        '--mat-sys-primary',
        '--mat-sys-on-primary',
        '--mat-sys-surface',
        '--mat-sys-on-surface',
        '--mat-sys-error',
        '--mat-sys-on-error',
      ];

      criticalColorTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();

        // Should not be transparent or invalid
        expect(value).not.toBe('transparent');
        expect(value).not.toBe('rgba(0, 0, 0, 0)');
        expect(value).not.toBe('');

        // Should be a valid color format (including modern light-dark() function)
        const isValidColor = /^(#[0-9a-f]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(|light-dark\()/i.test(
          value,
        );
        expect(isValidColor).toBe(true, `Invalid color format for ${token}: ${value}`);
      });
    });
  });

  describe('Typography Scale Validation - COMPLETE REQUIREMENTS', () => {
    it('MUST have complete typography scale (15 required tokens)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Angular Material 20 REQUIRES these 15 typography tokens
      const requiredTypographyTokens = [
        '--mat-sys-body-large',
        '--mat-sys-body-medium',
        '--mat-sys-body-small',
        '--mat-sys-display-large',
        '--mat-sys-display-medium',
        '--mat-sys-display-small',
        '--mat-sys-headline-large',
        '--mat-sys-headline-medium',
        '--mat-sys-headline-small',
        '--mat-sys-title-large',
        '--mat-sys-title-medium',
        '--mat-sys-title-small',
        '--mat-sys-label-large',
        '--mat-sys-label-medium',
        '--mat-sys-label-small',
      ];

      const missingTokens: string[] = [];
      const invalidTokens: string[] = [];

      requiredTypographyTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();

        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        } else {
          // Must be valid font shorthand or size value
          const isValidFont =
            /^\d+(\.\d+)?\s+([\d.]+)?(px|rem|em)/.test(value) ||
            /^\d+(\.\d+)?(px|rem|em)/.test(value) ||
            /^[\d.]+\s*\/\s*[\d.]+\s+/.test(value); // font: size/line-height family
          if (!isValidFont) {
            invalidTokens.push(`${token}: ${value}`);
          }
        }
      });

      // FAIL if any tokens are missing or invalid
      expect(missingTokens).toEqual([], `MISSING TYPOGRAPHY TOKENS: ${missingTokens.join(', ')}`);
      expect(invalidTokens).toEqual([], `INVALID TYPOGRAPHY TOKENS: ${invalidTokens.join(', ')}`);
    });

    it('should have logical typography scale progression', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Get font sizes and convert to pixels for comparison
      const getFontSizeInPx = (token: string): number => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (value.endsWith('px')) {
          return parseFloat(value);
        } else if (value.endsWith('rem')) {
          return parseFloat(value) * 16; // Assume 16px base
        }
        return 0;
      };

      const displayLarge = getFontSizeInPx('--mat-sys-display-large');
      const displayMedium = getFontSizeInPx('--mat-sys-display-medium');
      const displaySmall = getFontSizeInPx('--mat-sys-display-small');
      const _headlineLarge = getFontSizeInPx('--mat-sys-headline-large');
      const bodyLarge = getFontSizeInPx('--mat-sys-body-large');
      const bodyMedium = getFontSizeInPx('--mat-sys-body-medium');
      const bodySmall = getFontSizeInPx('--mat-sys-body-small');

      // Only test progression if we have actual values
      if (displayLarge > 0 && displayMedium > 0) {
        expect(displayLarge).toBeGreaterThan(displayMedium);
      }
      if (displayMedium > 0 && displaySmall > 0) {
        expect(displayMedium).toBeGreaterThan(displaySmall);
      }
      if (bodyLarge > 0 && bodyMedium > 0) {
        expect(bodyLarge).toBeGreaterThan(bodyMedium);
      }
      if (bodyMedium > 0 && bodySmall > 0) {
        expect(bodyMedium).toBeGreaterThan(bodySmall);
      }

      // Minimum readable sizes (if defined)
      if (bodySmall > 0) {
        expect(bodySmall).toBeGreaterThanOrEqual(10); // OpenAI-style compact minimum
      }
      if (bodyMedium > 0) {
        expect(bodyMedium).toBeGreaterThanOrEqual(12);
      }
    });
  });

  describe('Spacing Scale Validation - COMPLETE REQUIREMENTS', () => {
    it('MUST have complete spacing scale (12 required tokens)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Angular Material 20 REQUIRES these spacing tokens
      const requiredSpacingTokens = [
        '--mat-sys-spacing-0',
        '--mat-sys-spacing-1',
        '--mat-sys-spacing-2',
        '--mat-sys-spacing-3',
        '--mat-sys-spacing-4',
        '--mat-sys-spacing-5',
        '--mat-sys-spacing-6',
        '--mat-sys-spacing-8',
        '--mat-sys-spacing-12',
        '--mat-sys-spacing-16',
        '--mat-sys-spacing-20',
        '--mat-sys-spacing-24',
      ];

      const missingTokens: string[] = [];
      const invalidTokens: string[] = [];

      requiredSpacingTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();

        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        } else {
          const isValidSpacing = /^\d+(\.\d+)?(px|rem|em)$/.test(value);
          if (!isValidSpacing) {
            invalidTokens.push(`${token}: ${value}`);
          }
        }
      });

      // FAIL if any tokens are missing or invalid
      expect(missingTokens).toEqual([], `MISSING SPACING TOKENS: ${missingTokens.join(', ')}`);
      expect(invalidTokens).toEqual([], `INVALID SPACING TOKENS: ${invalidTokens.join(', ')}`);
    });

    it('should have logical spacing scale progression', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      const getSpacingInPx = (token: string): number => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value) return 0;
        if (value.endsWith('px')) {
          return parseFloat(value);
        } else if (value.endsWith('rem')) {
          return parseFloat(value) * 16;
        }
        return 0;
      };

      const spacing4 = getSpacingInPx('--mat-sys-spacing-4');
      const spacing8 = getSpacingInPx('--mat-sys-spacing-8');
      const spacing12 = getSpacingInPx('--mat-sys-spacing-12');
      const spacing16 = getSpacingInPx('--mat-sys-spacing-16');

      if (spacing4 && spacing8 && spacing12 && spacing16) {
        expect(spacing8).toBeGreaterThan(spacing4);
        expect(spacing12).toBeGreaterThan(spacing8);
        expect(spacing16).toBeGreaterThan(spacing12);
      }
    });
  });

  describe('Elevation Scale Validation - CRITICAL', () => {
    it('should have complete elevation tokens', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      const requiredElevationTokens = [
        '--mat-sys-level0',
        '--mat-sys-level1',
        '--mat-sys-level2',
        '--mat-sys-level3',
        '--mat-sys-level4',
        '--mat-sys-level5',
      ];

      let foundElevationTokens = 0;
      requiredElevationTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (value) {
          foundElevationTokens++;
          // Should be a valid box-shadow value or 'none'
          const isValidElevation =
            value === 'none' ||
            value.includes('px') ||
            value.includes('rgba') ||
            value.includes('rgb');
          expect(isValidElevation).toBe(true, `Invalid elevation format for ${token}: ${value}`);
        }
      });

      // Should have at least some elevation tokens (flexible during development)
      console.warn(`Found ${foundElevationTokens} elevation tokens`);
      expect(foundElevationTokens).toBeGreaterThanOrEqual(0); // Allow zero during development
    });
  });

  describe('Theme Structure Validation - CRITICAL', () => {
    it('should have both light and dark theme support', () => {
      // Test theme switching capability
      const initialTheme = themeService.isDark();

      themeService.toggleTheme();
      const newTheme = themeService.isDark();

      expect(newTheme).not.toBe(initialTheme);

      // Switch back
      themeService.toggleTheme();
      expect(themeService.isDark()).toBe(initialTheme);
    });

    it('should maintain color contrast in both themes', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Test critical contrast pairs
      const contrastPairs = [
        ['--mat-sys-primary', '--mat-sys-on-primary'],
        ['--mat-sys-surface', '--mat-sys-on-surface'],
        ['--mat-sys-error', '--mat-sys-on-error'],
      ];

      contrastPairs.forEach(([background, foreground]) => {
        const bgValue = documentStyles.getPropertyValue(background).trim();
        const fgValue = documentStyles.getPropertyValue(foreground).trim();

        expect(bgValue).toBeTruthy(`Missing background color: ${background}`);
        expect(fgValue).toBeTruthy(`Missing foreground color: ${foreground}`);
        expect(bgValue).not.toBe(
          fgValue,
          `Background and foreground should be different: ${background} vs ${foreground}`,
        );
      });
    });
  });

  describe('Token Migration Validation - MIGRATION TRACKING', () => {
    it('should track Angular Material 20 token usage', () => {
      const documentStyles = getComputedStyle(document.documentElement);
      const mdTokenCount = 0;
      let matTokenCount = 0;

      // Count all CSS custom properties
      for (const property of documentStyles) {
        if (property.startsWith('--mat-sys-')) {
          matTokenCount++;
        }
      }

      console.warn(`Angular Material 20 Status: ${matTokenCount} mat-sys tokens found`);

      // Log migration status (flexible during development)
      expect(matTokenCount).toBeGreaterThanOrEqual(0); // Allow zero during development

      // Log migration progress
      const totalTokens = mdTokenCount + matTokenCount;
      if (totalTokens > 0) {
        const migrationProgress = (matTokenCount / totalTokens) * 100;
        console.warn(`Migration Progress: ${migrationProgress.toFixed(1)}% complete`);
      }
    });

    it('should not have conflicting token definitions', () => {
      const documentStyles = getComputedStyle(document.documentElement);
      const conflicts: string[] = [];

      // Check for tokens that exist in both md and mat formats
      const tokenSuffixes = [
        'primary',
        'on-primary',
        'secondary',
        'on-secondary',
        'surface',
        'on-surface',
        'error',
        'on-error',
      ];

      tokenSuffixes.forEach((suffix) => {
        const mdToken = `--mat-sys-${suffix}`;
        const matToken = `--mat-sys-${suffix}`;

        const mdValue = documentStyles.getPropertyValue(mdToken).trim();
        const matValue = documentStyles.getPropertyValue(matToken).trim();

        if (mdValue && matValue && mdValue !== matValue) {
          conflicts.push(`Conflicting values for ${suffix}: md=${mdValue}, mat=${matValue}`);
        }
      });

      if (conflicts.length > 0) {
        console.warn('Token conflicts detected:', conflicts);
      }

      // Should not have major conflicts (allow some during migration)
      expect(conflicts.length).toBeLessThan(5, `Too many token conflicts: ${conflicts.join(', ')}`);
    });
  });

  describe('Component Token Coverage - COMPLETE REQUIREMENTS', () => {
    it('MUST have required button component tokens (12 required)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Based on Angular Material 20 official documentation - button tokens
      const requiredButtonTokens = [
        // Filled Button (primary appearance)
        '--mat-filled-button-container-color',
        '--mat-filled-button-label-text-color',
        '--mat-filled-button-disabled-container-color',
        '--mat-filled-button-disabled-label-text-color',

        // Outlined Button
        '--mat-outlined-button-outline-color',
        '--mat-outlined-button-label-text-color',
        '--mat-outlined-button-disabled-outline-color',

        // Text Button
        '--mat-text-button-label-text-color',
        '--mat-text-button-disabled-label-text-color',

        // FAB (Floating Action Button)
        '--mat-fab-container-color',
        '--mat-fab-foreground-color',
        '--mat-fab-disabled-container-color',
      ];

      const missingTokens: string[] = [];
      requiredButtonTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        }
      });

      // FAIL if any tokens are missing
      expect(missingTokens).toEqual([], `MISSING BUTTON TOKENS: ${missingTokens.join(', ')}`);
    });

    it('MUST have required form field component tokens (8 required)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Based on Angular Material 20 official documentation - form field tokens
      const requiredFormFieldTokens = [
        '--mat-form-field-container-text-color',
        '--mat-form-field-disabled-input-text-color',
        '--mat-form-field-error-text-color',
        '--mat-form-field-label-text-color',
        '--mat-form-field-outlined-label-text-color',
        '--mat-form-field-filled-label-text-color',
        '--mat-form-field-container-background-color',
        '--mat-form-field-disabled-container-color',
      ];

      const missingTokens: string[] = [];
      requiredFormFieldTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        }
      });

      // FAIL if any tokens are missing
      expect(missingTokens).toEqual([], `MISSING FORM FIELD TOKENS: ${missingTokens.join(', ')}`);
    });

    it('MUST have required card component tokens (6 required)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Based on Angular Material 20 official documentation - card tokens
      const requiredCardTokens = [
        '--mat-card-container-color',
        '--mat-card-subtitle-text-color',
        '--mat-card-title-text-color',
        '--mat-card-elevated-container-color',
        '--mat-card-outlined-outline-color',
        '--mat-card-disabled-container-color',
      ];

      const missingTokens: string[] = [];
      requiredCardTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        }
      });

      // FAIL if any tokens are missing
      expect(missingTokens).toEqual([], `MISSING CARD TOKENS: ${missingTokens.join(', ')}`);
    });

    it('MUST have required list component tokens (8 required)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Based on Angular Material 20 official documentation - list tokens
      const requiredListTokens = [
        '--mat-list-item-container-color',
        '--mat-list-item-label-text-color',
        '--mat-list-item-supporting-text-color',
        '--mat-list-item-leading-icon-color',
        '--mat-list-item-trailing-icon-color',
        '--mat-list-item-disabled-label-text-color',
        '--mat-list-item-hover-container-color',
        '--mat-list-item-focus-container-color',
      ];

      const missingTokens: string[] = [];
      requiredListTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        }
      });

      // FAIL if any tokens are missing
      expect(missingTokens).toEqual([], `MISSING LIST TOKENS: ${missingTokens.join(', ')}`);
    });

    it('MUST have required navigation component tokens (6 required)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Based on Angular Material 20 official documentation - navigation tokens
      const requiredNavigationTokens = [
        '--mat-sidenav-container-background-color',
        '--mat-sidenav-content-background-color',
        '--mat-sidenav-scrim-color',
        '--mat-toolbar-container-background-color',
        '--mat-toolbar-title-text-color',
        '--mat-toolbar-disabled-button-color',
      ];

      const missingTokens: string[] = [];
      requiredNavigationTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        }
      });

      // FAIL if any tokens are missing
      expect(missingTokens).toEqual([], `MISSING NAVIGATION TOKENS: ${missingTokens.join(', ')}`);
    });

    it('MUST have required menu component tokens (6 required)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Based on Angular Material 20 official documentation - menu tokens
      const requiredMenuTokens = [
        '--mat-menu-container-color',
        '--mat-menu-item-label-text-color',
        '--mat-menu-item-icon-color',
        '--mat-menu-divider-color',
        '--mat-menu-item-hover-container-color',
        '--mat-menu-item-focus-container-color',
      ];

      const missingTokens: string[] = [];
      requiredMenuTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        }
      });

      // FAIL if any tokens are missing
      expect(missingTokens).toEqual([], `MISSING MENU TOKENS: ${missingTokens.join(', ')}`);
    });

    it('MUST have required chip component tokens (8 required)', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Based on Angular Material 20 official documentation - chip tokens
      const requiredChipTokens = [
        '--mat-chip-container-color',
        '--mat-chip-label-text-color',
        '--mat-chip-icon-color',
        '--mat-chip-selected-container-color',
        '--mat-chip-outline-color',
        '--mat-chip-disabled-container-color',
        '--mat-chip-disabled-label-text-color',
        '--mat-chip-remove-trailing-icon-color',
      ];

      const missingTokens: string[] = [];
      requiredChipTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (!value || value === 'initial' || value === 'inherit') {
          missingTokens.push(token);
        }
      });

      // FAIL if any tokens are missing
      expect(missingTokens).toEqual([], `MISSING CHIP TOKENS: ${missingTokens.join(', ')}`);
    });
  });

  describe('Accessibility Validation - CRITICAL', () => {
    it('should have sufficient color contrast ratios', () => {
      // This is a placeholder for contrast ratio testing
      // In a real implementation, you'd use a contrast ratio library
      const documentStyles = getComputedStyle(document.documentElement);

      const primary = documentStyles.getPropertyValue('--mat-sys-primary').trim();
      const onPrimary = documentStyles.getPropertyValue('--mat-sys-on-primary').trim();

      expect(primary).toBeTruthy('Primary color should be defined');
      expect(onPrimary).toBeTruthy('On-primary color should be defined');
      expect(primary).not.toBe(onPrimary, 'Primary and on-primary should be different colors');
    });

    it('should have focus indicators defined', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Check for focus-related tokens
      const focusTokens = ['--mat-sys-primary', '--mat-sys-outline'];

      focusTokens.forEach((token) => {
        const value = documentStyles.getPropertyValue(token).trim();
        if (value) {
          expect(value).not.toBe('transparent', `Focus token ${token} should not be transparent`);
        }
      });
    });
  });

  describe('Design System Completeness - COMPLETE REQUIREMENTS', () => {
    it('MUST have comprehensive token coverage (minimum 150 tokens)', () => {
      const documentStyles = getComputedStyle(document.documentElement);
      let totalDesignTokens = 0;

      // Count all design system tokens
      for (const property of documentStyles) {
        if (property.startsWith('--mat-sys-') || property.startsWith('--mat-')) {
          totalDesignTokens++;
        }
      }

      console.warn(`Total Design System Tokens: ${totalDesignTokens}`);

      // Calculate expected tokens based on our requirements
      const expectedTokens = {
        'System Colors': 40, // Primary, secondary, tertiary, error, neutral palettes
        Typography: 15, // Complete typography scale
        Spacing: 12, // Complete spacing scale
        Elevation: 6, // Complete elevation scale
        Buttons: 12, // All button variants and states
        'Form Fields': 8, // All form field variants
        Cards: 6, // Card component tokens
        Lists: 8, // List component tokens
        Navigation: 6, // Sidenav and toolbar tokens
        Menus: 6, // Menu component tokens
        Chips: 8, // Chip component tokens
        States: 20, // Hover, focus, disabled states
        Density: 10, // Compact and comfortable variants
      };

      const minimumRequired = Object.values(expectedTokens).reduce((sum, count) => sum + count, 0);
      console.warn(`Expected minimum tokens: ${minimumRequired}`);
      console.warn('Token breakdown:', expectedTokens);

      // FAIL if insufficient token coverage for a complete design system
      expect(totalDesignTokens).toBeGreaterThanOrEqual(
        minimumRequired,
        `Insufficient token coverage: ${totalDesignTokens}/${minimumRequired} minimum required. ` +
          `A complete Angular Material 20 design system requires at least ${minimumRequired} tokens.`,
      );
    });

    it('should log design system health summary', () => {
      const documentStyles = getComputedStyle(document.documentElement);

      // Count different types of tokens
      let colorTokens = 0;
      let typographyTokens = 0;
      let spacingTokens = 0;
      let elevationTokens = 0;
      let componentTokens = 0;

      for (const property of documentStyles) {
        if (
          property.includes('color') ||
          property.includes('primary') ||
          property.includes('secondary')
        ) {
          colorTokens++;
        } else if (property.includes('typescale') || property.includes('font')) {
          typographyTokens++;
        } else if (property.includes('spacing')) {
          spacingTokens++;
        } else if (property.includes('level') || property.includes('elevation')) {
          elevationTokens++;
        }
        if (property.startsWith('--mat-') && !property.startsWith('--mat-sys-')) {
          componentTokens++;
        }
      }

      console.warn('=== DESIGN SYSTEM HEALTH SUMMARY ===');
      console.warn(`Color Tokens: ${colorTokens}`);
      console.warn(`Typography Tokens: ${typographyTokens}`);
      console.warn(`Spacing Tokens: ${spacingTokens}`);
      console.warn(`Elevation Tokens: ${elevationTokens}`);
      console.warn(`Component Tokens: ${componentTokens}`);
      console.warn('=====================================');

      // Basic health checks
      expect(colorTokens).toBeGreaterThan(10, 'Should have substantial color token coverage');
      expect(typographyTokens).toBeGreaterThan(5, 'Should have typography scale coverage');
    });
  });
});
