import { Injectable, signal, effect, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class VenntierThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isDarkMode = signal(false);

  readonly isDark = this.isDarkMode.asReadonly();

  readonly themeClass = computed(() => (this.isDarkMode() ? 'vt-theme-dark' : 'vt-theme-light'));

  readonly themeAttributes = computed(() => ({
    'data-vt-theme': this.isDarkMode() ? 'dark' : 'light',
    // Note: data-mat-sys-color-scheme is now handled automatically by color-scheme CSS property
  }));

  constructor() {
    // Use effect to handle side effects when theme changes
    effect(() => {
      const isDark = this.isDarkMode();
      if (isPlatformBrowser(this.platformId)) {
        this.applyThemeToDOM(isDark);
        this.saveThemePreference(isDark);
      }
    });

    // Load saved theme on initialization
    if (isPlatformBrowser(this.platformId)) {
      this.loadSavedTheme();
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update((current) => !current);
  }

  setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
  }

  private applyThemeToDOM(isDark: boolean): void {
    const root = document.documentElement;

    // MD3 BEST PRACTICE: Use color-scheme CSS property for automatic theme switching
    // Set color-scheme to let the browser handle light-dark() function resolution
    root.style.colorScheme = isDark ? 'dark' : 'light';

    // Keep data-vt-theme for application-specific logic
    root.setAttribute('data-vt-theme', isDark ? 'dark' : 'light');

    // Remove manual data-mat-sys-color-scheme - let color-scheme handle this automatically

    // Add/remove class for CSS targeting (for backwards compatibility)
    if (isDark) {
      root.classList.add('vt-theme-dark');
      root.classList.remove('vt-theme-light');
    } else {
      root.classList.add('vt-theme-light');
      root.classList.remove('vt-theme-dark');
    }
  }

  private loadSavedTheme(): void {
    try {
      const savedTheme = localStorage.getItem('vt-theme-preference');
      if (savedTheme === 'dark') {
        this.isDarkMode.set(true);
      } else if (savedTheme === 'light') {
        this.isDarkMode.set(false);
      } else {
        // Check system preference if no saved preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }
    } catch (error) {
      console.warn('Unable to load theme preference:', error);
    }
  }

  private saveThemePreference(isDark: boolean): void {
    try {
      localStorage.setItem('vt-theme-preference', isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Unable to save theme preference:', error);
    }
  }
}
