import { TestBed } from '@angular/core/testing';
import { VenntierThemeService } from './theme.service';

// Jest type declarations - simplified to avoid type conflicts
declare const jest: {
  fn: (implementation?: (...args: never[]) => unknown) => unknown;
  spyOn: (object: Record<string, unknown>, method: string) => unknown;
  restoreAllMocks: () => void;
};

/**
 * Simple theme service test that works with Karma/Jasmine
 */
describe('VenntierThemeService - Simple Test (Works Now)', () => {
  let service: VenntierThemeService;

  beforeEach(async () => {
    // Clear any existing theme state
    localStorage.clear();
    document.documentElement.removeAttribute('data-vt-theme');
    document.documentElement.classList.remove('vt-theme-dark', 'vt-theme-light');

    await TestBed.configureTestingModule({
      providers: [VenntierThemeService],
    }).compileComponents();

    service = TestBed.inject(VenntierThemeService);
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
    document.documentElement.removeAttribute('data-vt-theme');
    document.documentElement.classList.remove('vt-theme-dark', 'vt-theme-light');
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should start with light theme by default', () => {
    expect(service.isDark()).toBe(false);
  });

  it('should toggle theme state', () => {
    // Start with light
    expect(service.isDark()).toBe(false);

    // Toggle to dark
    service.toggleTheme();
    expect(service.isDark()).toBe(true);

    // Toggle back to light
    service.toggleTheme();
    expect(service.isDark()).toBe(false);
  });

  it('should set theme directly', () => {
    // Set to dark
    service.setTheme(true);
    expect(service.isDark()).toBe(true);

    // Set to light
    service.setTheme(false);
    expect(service.isDark()).toBe(false);
  });

  it('should provide correct theme class', () => {
    // Light theme
    service.setTheme(false);
    expect(service.themeClass()).toBe('vt-theme-light');

    // Dark theme
    service.setTheme(true);
    expect(service.themeClass()).toBe('vt-theme-dark');
  });

  it('should provide correct theme attributes', () => {
    // Light theme
    service.setTheme(false);
    const lightAttrs = service.themeAttributes();
    expect(lightAttrs['data-vt-theme']).toBe('light');

    // Dark theme
    service.setTheme(true);
    const darkAttrs = service.themeAttributes();
    expect(darkAttrs['data-vt-theme']).toBe('dark');
  });

  it('should apply theme to document element', (done) => {
    // Set dark theme
    service.setTheme(true);

    // Wait for Angular effects to run
    setTimeout(() => {
      const documentElement = document.documentElement;
      expect(documentElement.getAttribute('data-vt-theme')).toBe('dark');
      expect(documentElement.classList.contains('vt-theme-dark')).toBe(true);
      done();
    }, 10);
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setItemSpy = (jest.spyOn(localStorage as any, 'setItem') as any).mockImplementation(
      () => {
        throw new Error('Storage error');
      },
    );

    // Should not throw when localStorage fails
    expect(() => {
      service.setTheme(true);
    }).not.toThrow();

    // Theme should still work even if localStorage fails
    expect(service.isDark()).toBe(true);

    // Restore
    setItemSpy.mockRestore();
  });
});
