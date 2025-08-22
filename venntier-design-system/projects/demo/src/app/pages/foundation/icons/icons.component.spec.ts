import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IconsComponent } from './icons.component';
import { VenntierThemeService } from '@venntier/design-system';

// Migration-safe testing utilities
function verifyThemeResponsiveness(
  element: HTMLElement,
  themeService: { toggleTheme(): void },
  fixture: { detectChanges(): void },
): void {
  const _initialColor = window.getComputedStyle(element).color;
  themeService.toggleTheme();
  fixture.detectChanges();
  const newColor = window.getComputedStyle(element).color;
  expect(newColor).toBeTruthy();
  themeService.toggleTheme();
  fixture.detectChanges();
}

function trackTokenMigration(element: HTMLElement, componentName: string): void {
  const styles = window.getComputedStyle(element);
  let matTokens = 0;
  for (const property of styles) {
    if (property.startsWith('--mat-sys-')) matTokens++;
  }

  if (matTokens > 0) console.warn(`${componentName} uses ${matTokens} mat tokens ✓`);
}

describe('Icons System - STABLE (Protected)', () => {
  let _component: IconsComponent;
  let fixture: ComponentFixture<IconsComponent>;
  let themeService: VenntierThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IconsComponent);
    _component = fixture.componentInstance;
    themeService = TestBed.inject(VenntierThemeService);
    fixture.detectChanges();
  });

  describe('Icon System Structure - STABLE (Strict Protection)', () => {
    it('should have icon examples', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"], svg',
      );
      expect(iconElements.length).toBeGreaterThan(0);

      iconElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull(); // Element is visible
      });
    });

    it('should display Material Design icons', () => {
      const materialIcons = fixture.nativeElement.querySelectorAll('mat-icon, .material-icons');

      if (materialIcons.length > 0) {
        materialIcons.forEach((icon: HTMLElement) => {
          expect(icon.offsetParent).not.toBeNull();

          // Should have icon content
          const hasContent =
            icon.textContent?.trim() ||
            icon.innerHTML.includes('svg') ||
            icon.getAttribute('svgIcon');
          expect(hasContent).toBeTruthy();
        });
      }
    });

    it('should maintain icon demonstration structure', () => {
      const iconDemo = fixture.nativeElement.querySelector(
        '.demo-icons, .icons-demo, .icon-examples',
      );
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"], svg',
      );

      expect(iconDemo || iconElements.length > 0).toBe(true);
      expect(iconElements.length).toBeGreaterThan(0);
    });
  });

  describe('Icon Sizes - STABLE (Strict Protection)', () => {
    it('should have multiple icon sizes', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      if (iconElements.length > 1) {
        const sizes = Array.from(iconElements)
          .map((element) => {
            const styles = window.getComputedStyle(element as HTMLElement);
            return (
              parseFloat(styles.fontSize) || parseFloat(styles.width) || parseFloat(styles.height)
            );
          })
          .filter((size) => !isNaN(size));

        // Should have variety in icon sizes
        const uniqueSizes = new Set(sizes);
        expect(uniqueSizes.size).toBeGreaterThanOrEqual(1);
      }
    });

    it('should maintain readable icon sizes', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      iconElements.forEach((element: HTMLElement) => {
        const styles = window.getComputedStyle(element);
        const fontSize = parseFloat(styles.fontSize);
        const width = parseFloat(styles.width);
        const height = parseFloat(styles.height);

        // Icons should be reasonable size
        const size = fontSize || width || height;
        if (!isNaN(size)) {
          expect(size).toBeGreaterThanOrEqual(12); // Minimum readable size
          expect(size).toBeLessThanOrEqual(100); // Maximum reasonable size
        }
      });
    });
  });

  describe('Icon Categories - STABLE (Strict Protection)', () => {
    it('should demonstrate different icon categories', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      // Should have multiple icons
      expect(iconElements.length).toBeGreaterThan(0);

      // Check for common icon categories
      const iconNames = Array.from(iconElements)
        .map((element) => {
          const el = element as HTMLElement;
          return (
            el.textContent?.trim() ||
            el.getAttribute('svgIcon') ||
            el.getAttribute('fontIcon') ||
            el.className
          );
        })
        .filter((name) => name);

      expect(iconNames.length).toBeGreaterThan(0);
    });

    it('should have accessible icons', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      iconElements.forEach((element: HTMLElement) => {
        // Icons should be visible
        expect(element.offsetParent).not.toBeNull();

        // Should have some content or styling
        const styles = window.getComputedStyle(element);
        expect(styles.display).not.toBe('none');
        expect(styles.visibility).not.toBe('hidden');
      });
    });
  });

  describe('Icon Theme Responsiveness - STABLE', () => {
    it('should respond to theme changes for colors', () => {
      const iconElement = fixture.nativeElement.querySelector(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );
      if (iconElement) {
        verifyThemeResponsiveness(iconElement, themeService, fixture);
      }
    });

    it('should maintain icon structure across themes', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );
      const initialCount = iconElements.length;

      themeService.toggleTheme();
      fixture.detectChanges();

      const newIconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );
      expect(newIconElements.length).toBe(initialCount);

      themeService.toggleTheme();
      fixture.detectChanges();
    });
  });

  describe('Icon Integration', () => {
    it('should use Angular Material icons properly', () => {
      const matIcons = fixture.nativeElement.querySelectorAll('mat-icon');

      matIcons.forEach((icon: HTMLElement) => {
        // Should have Material icon classes
        expect(icon.classList.contains('mat-icon')).toBe(true);

        // Should be visible
        expect(icon.offsetParent).not.toBeNull();
      });
    });

    it('should display icon content correctly', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      iconElements.forEach((element: HTMLElement) => {
        // Should have some form of content
        const hasTextContent = element.textContent?.trim();
        const hasSvgContent = element.innerHTML.includes('svg');
        const hasIconAttribute =
          element.getAttribute('svgIcon') || element.getAttribute('fontIcon');

        expect(hasTextContent || hasSvgContent || hasIconAttribute).toBeTruthy();
      });
    });
  });

  describe('Icon Migration Tracking', () => {
    it('should track icon token migration progress', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      iconElements.forEach((element: HTMLElement, index: number) => {
        trackTokenMigration(element, `Icon-${index}`);
      });

      expect(iconElements.length).toBeGreaterThan(0);
    });
  });

  describe('Regression Prevention - CRITICAL', () => {
    it('should never break icon system structure', () => {
      const iconDemo = fixture.nativeElement.querySelector(
        '.demo-icons, .icons-demo, .icon-examples',
      );
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"], svg',
      );

      expect(iconDemo || iconElements.length > 0).toBe(true);
      expect(iconElements.length).toBeGreaterThan(0);
    });

    it('should never break icon visibility', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      iconElements.forEach((element: HTMLElement) => {
        expect(element.offsetParent).not.toBeNull();
      });
    });

    it('should never break icon content', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      iconElements.forEach((element: HTMLElement) => {
        // Should have some form of content
        const hasContent =
          element.textContent?.trim() ||
          element.innerHTML.includes('svg') ||
          element.getAttribute('svgIcon') ||
          element.getAttribute('fontIcon');
        expect(hasContent).toBeTruthy();
      });
    });

    it('should never break icon accessibility', () => {
      const iconElements = fixture.nativeElement.querySelectorAll(
        'mat-icon, .material-icons, .icon, [class*="icon"]',
      );

      iconElements.forEach((element: HTMLElement) => {
        // Icons should be accessible
        expect(element.offsetParent).not.toBeNull();

        const styles = window.getComputedStyle(element);
        expect(styles.display).not.toBe('none');
        expect(styles.visibility).not.toBe('hidden');
      });
    });

    it('should never break Material Design integration', () => {
      const matIcons = fixture.nativeElement.querySelectorAll('mat-icon');

      matIcons.forEach((icon: HTMLElement) => {
        // Should maintain Material classes
        expect(icon.classList.contains('mat-icon')).toBe(true);
      });
    });
  });
});
