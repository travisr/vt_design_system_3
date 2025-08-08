import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VenntierThemeService {
  private isDarkMode = signal(false);
  
  readonly isDark = this.isDarkMode.asReadonly();
  
  toggleTheme(): void {
    this.isDarkMode.update(v => !v);
    document.documentElement.setAttribute(
      'data-theme',
      this.isDarkMode() ? 'dark' : 'light'
    );
  }
  
  setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
  }
}