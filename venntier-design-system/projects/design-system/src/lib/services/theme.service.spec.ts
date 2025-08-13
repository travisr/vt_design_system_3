import { TestBed } from '@angular/core/testing';
import { VenntierThemeService } from './theme.service';

describe('VenntierThemeService', () => {
  let service: VenntierThemeService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Reset document attributes and classes
    document.documentElement.removeAttribute('data-vt-theme');
    document.documentElement.removeAttribute('data-mat-sys-color-scheme');
    document.documentElement.classList.remove('vt-theme-dark', 'vt-theme-light');

    TestBed.configureTestingModule({});
    service = TestBed.inject(VenntierThemeService);
  });

  afterEach(() => {
    // Clean up after tests
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide read-only signal for dark mode state', () => {
    expect(service.isDark()).toBe(false);
    expect(typeof service.isDark).toBe('function');
  });

  it('should provide computed theme class', () => {
    expect(service.themeClass()).toBe('vt-theme-light');

    service.toggleTheme();
    expect(service.themeClass()).toBe('vt-theme-dark');
  });

  it('should provide computed theme attributes', () => {
    const attrs = service.themeAttributes();
    expect(attrs['data-vt-theme']).toBe('light');
    expect(attrs['data-mat-sys-color-scheme']).toBe('light');

    service.toggleTheme();
    const darkAttrs = service.themeAttributes();
    expect(darkAttrs['data-vt-theme']).toBe('dark');
    expect(darkAttrs['data-mat-sys-color-scheme']).toBe('dark');
  });

  it('should toggle theme state', () => {
    expect(service.isDark()).toBe(false);

    service.toggleTheme();
    expect(service.isDark()).toBe(true);

    service.toggleTheme();
    expect(service.isDark()).toBe(false);
  });

  it('should set theme explicitly', () => {
    service.setTheme(true);
    expect(service.isDark()).toBe(true);

    service.setTheme(false);
    expect(service.isDark()).toBe(false);
  });

  it('should update DOM attributes when theme changes', (done) => {
    const documentElement = document.documentElement;

    service.toggleTheme();

    // Use setTimeout to allow effect to run
    setTimeout(() => {
      expect(documentElement.getAttribute('data-vt-theme')).toBe('dark');
      expect(documentElement.getAttribute('data-mat-sys-color-scheme')).toBe('dark');
      expect(documentElement.classList.contains('vt-theme-dark')).toBe(true);
      expect(documentElement.classList.contains('vt-theme-light')).toBe(false);

      service.toggleTheme();

      setTimeout(() => {
        expect(documentElement.getAttribute('data-vt-theme')).toBe('light');
        expect(documentElement.getAttribute('data-mat-sys-color-scheme')).toBe('light');
        expect(documentElement.classList.contains('vt-theme-light')).toBe(true);
        expect(documentElement.classList.contains('vt-theme-dark')).toBe(false);
        done();
      }, 0);
    }, 0);
  });

  it('should save theme preference to localStorage', (done) => {
    service.setTheme(true);

    setTimeout(() => {
      expect(localStorage.getItem('vt-theme-preference')).toBe('dark');

      service.setTheme(false);

      setTimeout(() => {
        expect(localStorage.getItem('vt-theme-preference')).toBe('light');
        done();
      }, 0);
    }, 0);
  });

  it('should load saved theme preference on initialization', () => {
    // Test loading dark theme preference
    localStorage.setItem('vt-theme-preference', 'dark');

    // Create a fresh TestBed for this test
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const newService = TestBed.inject(VenntierThemeService);
    expect(newService.isDark()).toBe(true);

    // Clean up
    localStorage.removeItem('vt-theme-preference');
  });

  it('should respect system preference when no saved preference exists', () => {
    // Clear any saved preference
    localStorage.removeItem('vt-theme-preference');

    // Mock matchMedia for dark mode preference
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jasmine.createSpy('matchMedia').and.returnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      dispatchEvent: jasmine.createSpy('dispatchEvent'),
      addListener: jasmine.createSpy('addListener'),
      removeListener: jasmine.createSpy('removeListener'),
      onchange: null,
    } as MediaQueryList);

    // Create a fresh TestBed for this test
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const newService = TestBed.inject(VenntierThemeService);
    expect(newService.isDark()).toBe(true);

    // Restore original matchMedia
    window.matchMedia = originalMatchMedia;
  });

  it('should handle localStorage errors gracefully', () => {
    // Spy on console.warn before creating service
    const consoleSpy = spyOn(console, 'warn');

    // Mock localStorage to throw errors
    spyOn(localStorage, 'getItem').and.throwError('Storage error');

    // Create a fresh TestBed for this test
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    // Should not throw when localStorage fails during initialization
    expect(() => {
      TestBed.inject(VenntierThemeService);
    }).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith('Unable to load theme preference:', jasmine.any(Error));
  });
});
